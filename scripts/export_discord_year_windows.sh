#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
EXPORT_MODE="${1:-${EXPORT_MODE:-all}}"

CHANNEL_IDS=(
  "621775580471492638"
  "939975599450124288"
)

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

if [[ -z "${USER_TOKEN:-}" && -n "${DISCORD_TOKEN:-}" ]]; then
  USER_TOKEN="$DISCORD_TOKEN"
fi

if [[ -z "${USER_TOKEN:-}" ]]; then
  if [[ -t 0 ]]; then
    stty -echo
    IFS= read -r USER_TOKEN
    stty echo
    printf '\n'
  else
    IFS= read -r USER_TOKEN
  fi
fi

: "${USER_TOKEN:?USER_TOKEN is required}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required" >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required" >&2
  exit 1
fi

mkdir -p "$ROOT_DIR/raw/discord" "$ROOT_DIR/raw/discord-pins"

channel_created_year() {
  local channel_id="$1"
  local created_ms=$(((channel_id >> 22) + 1420070400000))
  date -u -r "$((created_ms / 1000))" +%Y
}

export_year_windows() {
  local channel_id="$1"
  local start_year="$2"
  local end_year
  end_year="$(date -u +%Y)"

  for year in $(seq "$start_year" "$end_year"); do
    local out_dir="$ROOT_DIR/raw/discord/$channel_id/$year"
    mkdir -p "$out_dir"

    local windows=(
      "apr2:$year-04-15:$year-05-01"
      "may1:$year-05-01:$year-05-16"
      "may2:$year-05-16:$year-06-01"
      "jun1:$year-06-01:$year-06-16"
      "jun2:$year-06-16:$year-07-01"
    )

    for window in "${windows[@]}"; do
      IFS=: read -r label after before <<< "$window"
      local out_file="$out_dir/${channel_id}-${label}.json"

      if [[ -s "$out_file" ]]; then
        continue
      fi

      docker run --rm \
        -e DISCORD_TOKEN="$USER_TOKEN" \
        -v "$ROOT_DIR:/work" \
        -w /work \
        tyrrrz/discordchatexporter:latest \
        export \
        --channel "$channel_id" \
        --output "/work/raw/discord/$channel_id/$year/${channel_id}-${label}.json" \
        --format Json \
        --after "$after" \
        --before "$before" \
        --utc \
        --fuck-russia true

      if [[ ! -s "$out_file" ]]; then
        echo "Expected export file was not created: $out_file" >&2
        exit 1
      fi
    done
  done
}

api_get() {
  local url="$1"
  curl -sS \
    -H "Authorization: $USER_TOKEN" \
    -H "Accept: application/json" \
    "$url"
}

download_url() {
  local url="$1"
  local output="$2"

  if [[ -s "$output" ]]; then
    return
  fi

  curl -sS -L "$url" -o "$output"
}

safe_name() {
  local value="$1"
  value="${value##*/}"
  value="${value%%\?*}"
  value="${value//[^A-Za-z0-9._-]/_}"
  if [[ -z "$value" ]]; then
    value="asset"
  fi
  printf '%s' "$value"
}

export_pins() {
  local channel_id="$1"
  local pins_dir="$ROOT_DIR/raw/discord-pins/$channel_id"
  local media_dir="$pins_dir/media"
  local page=0
  local before=""

  mkdir -p "$pins_dir/pages" "$media_dir"

  while :; do
    local url="https://discord.com/api/v10/channels/$channel_id/messages/pins?limit=50"
    if [[ -n "$before" ]]; then
      url="$url&before=$before"
    fi

    local page_file="$pins_dir/pages/page_${page}.json"
    api_get "$url" > "$page_file"

    if jq -e 'has("message") and has("code")' "$page_file" >/dev/null; then
      echo "Discord API error while fetching pins for $channel_id:" >&2
      jq -r '.message' "$page_file" >&2
      exit 1
    fi

    local count
    count="$(jq '.items | length' "$page_file")"
    if [[ "$count" -eq 0 ]]; then
      break
    fi

    if ! jq -e '.has_more == true' "$page_file" >/dev/null; then
      break
    fi

    before="$(jq -r '.items[-1].pinned_at | @uri' "$page_file")"
    page=$((page + 1))
  done

  jq -s '{items: map(.items[]), has_more: false}' "$pins_dir"/pages/page_*.json > "$pins_dir/pins.json"

  jq -r '
    .items[]
    | .message as $message
    | ($message.attachments[]? | [$message.id, .id, (.fileName // .filename // ""), .url] | @tsv),
      ($message.embeds[]?.image?.url? | [$message.id, "embed-image", "", .] | @tsv),
      ($message.embeds[]?.thumbnail?.url? | [$message.id, "embed-thumbnail", "", .] | @tsv)
  ' "$pins_dir/pins.json" | while IFS=$'\t' read -r message_id asset_id file_name url; do
    [[ -n "$url" ]] || continue
    local clean_name
    if [[ -n "$file_name" ]]; then
      clean_name="$(safe_name "$file_name")"
    else
      clean_name="$(safe_name "$url")"
    fi
    local output="$media_dir/${message_id}_${asset_id}_${clean_name}"
    download_url "$url" "$output"
  done
}

for channel_id in "${CHANNEL_IDS[@]}"; do
  start_year="$(channel_created_year "$channel_id")"
  if [[ "$EXPORT_MODE" != "pins" ]]; then
    export_year_windows "$channel_id" "$start_year"
  fi
  if [[ "$EXPORT_MODE" != "windows" ]]; then
    export_pins "$channel_id"
  fi
done
