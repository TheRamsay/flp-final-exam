#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from collections import Counter
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent.parent
INPUT_DIR = ROOT / "raw" / "discord"
PINS_DIR = ROOT / "raw" / "discord-pins"
OUTPUT_DIR = ROOT / "raw" / "discord-analysis"

CHANNEL_IDS = ["621775580471492638", "939975599450124288"]

EXAM_SIGNAL_RE = re.compile(
    r"\b("
    r"zkou[šs]k|sk[uú][šs]k|term[ií]n|zad[aá]n[ií]|ot[aá]zk|p[řr]edterm[ií]n|predtermin|"
    r"[řr][aá]dn|riadn|opravn|test|p[ií]semk|body|bod[uů]|varianta|skupina|"
    r"haskell|prolog|rust|lambda|funkcion[aá]ln|logick[eé]|programov[aá]n[ií]|flp|"
    r"fold|map|filter|zip|scan|recurs|rekurz|strom|tree|seznam|list|parser|gramatik|"
    r"monad|functor|applicative|typ|type|pattern|matching|guard|where|let|"
    r"unifik|rezoluc|cut|predik[aá]t|cargo|borrow|ownership|trait|enum|struct|match"
    r")\b",
    re.IGNORECASE,
)

ASSIGNMENT_RE = re.compile(
    r"\b("
    r"bylo|bol[ao]|padl[oa]|měli|mali|m[ěe]l[ioa]|ot[aá]zk[ay]|zad[aá]n[ií]|"
    r"v testu|na zkou[šs]ce|na sk[uú][šs]ke|u zkou[šs]ky|p[řr]edterm[ií]n|predtermin|"
    r"[řr][aá]dn[yý]|riadn[yý]|opravn[yý]|dneska|dnes|minule|loni|vloni"
    r")\b",
    re.IGNORECASE,
)

TOPIC_PATTERNS = {
    "Haskell - listy a vyšší řády": r"haskell|fold|foldr|foldl|map|filter|zip|scan|list|seznam",
    "Haskell - rekurze a datové typy": r"rekurz|recurs|data\s+|strom|tree|binary|pattern|matching",
    "Haskell - typy a typeclasses": r"\btyp|\btype|typeclass|class\s+|instance|functor|applicative|monad",
    "Haskell - parsování": r"parser|parse|gramatik|token|lexer|syntakt",
    "Prolog - unifikace a predikáty": r"prolog|unifik|predik[aá]t|fakt|pravidl|dotaz",
    "Prolog - seznamy a řez": r"prolog|seznam|list|cut|!",
    "Rust - vlastnictví a borrow": r"rust|ownership|borrow|reference|lifetime|move|clone",
    "Rust - enum/struct/match/traits": r"rust|enum|struct|match|trait|impl|option|result",
    "Zkouška a organizace": r"zkou[šs]k|sk[uú][šs]k|term[ií]n|body|bod[uů]|p[řr]edterm|zad[aá]n[ií]",
}


@dataclass
class Signal:
    source: str
    channel_id: str
    channel_name: str
    year: str
    timestamp: str
    author: str
    content: str
    url: str
    attachments: list[str]
    embeds: list[str]
    topics: list[str]
    score: int


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def trim_text(text: str, limit: int = 1200) -> str:
    text = normalize_text(text)
    if len(text) <= limit:
        return text
    return text[: limit - 3] + "..."


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def message_url(guild_id: str, channel_id: str, message_id: str) -> str:
    if guild_id:
        return f"https://discord.com/channels/{guild_id}/{channel_id}/{message_id}"
    return f"https://discord.com/channels/@me/{channel_id}/{message_id}"


def attachment_names(message: dict[str, Any]) -> list[str]:
    names = []
    for attachment in message.get("attachments") or []:
        names.append(attachment.get("fileName") or attachment.get("filename") or attachment.get("url") or "")
    return [name for name in names if name]


def embed_urls(message: dict[str, Any]) -> list[str]:
    urls = []
    for embed in message.get("embeds") or []:
        value = embed.get("url")
        if isinstance(value, str):
            urls.append(value)
        for key in ("image", "thumbnail", "video"):
            nested = embed.get(key)
            if isinstance(nested, dict) and isinstance(nested.get("url"), str):
                urls.append(nested["url"])
    return urls


def topic_hits(text: str) -> list[str]:
    hits = []
    for topic, pattern in TOPIC_PATTERNS.items():
        if re.search(pattern, text, re.IGNORECASE):
            hits.append(topic)
    return hits


def score_message(text: str, attachments: list[str], embeds: list[str], is_pinned: bool) -> int:
    score = 0
    lowered = text.lower()
    if is_pinned:
        score += 7
    if ASSIGNMENT_RE.search(text):
        score += 6
    if EXAM_SIGNAL_RE.search(text):
        score += 4
    if re.search(r"\b[1-9][.)]\s+", text):
        score += 4
    if len(re.findall(r"\b[1-9][.)]\s+", text)) >= 3:
        score += 5
    if any(word in lowered for word in ["zkou", "skus", "zadani", "zadání", "otaz", "otáz", "termín"]):
        score += 4
    if any(word in lowered for word in ["haskell", "prolog", "rust"]):
        score += 3
    if attachments:
        score += 2
    if embeds:
        score += 1
    if len(text) >= 160:
        score += 2
    if len(text) >= 500:
        score += 2
    hits = topic_hits(text)
    if hits:
        score += min(8, 2 * len(hits))
    return score


def iter_exports() -> list[tuple[str, Path, dict[str, Any]]]:
    exports = []
    for channel_id in CHANNEL_IDS:
        channel_dir = INPUT_DIR / channel_id
        if not channel_dir.exists():
            continue
        for year_dir in sorted(channel_dir.iterdir()):
            if not year_dir.is_dir():
                continue
            paths = sorted(year_dir.glob(f"{channel_id}-*.json"))
            if not paths:
                legacy = year_dir / f"{channel_id}.json"
                paths = [legacy] if legacy.exists() else []
            for path in paths:
                exports.append((year_dir.name, path, json.loads(path.read_text(encoding="utf-8"))))
    return exports


def collect_window_signals(exports: list[tuple[str, Path, dict[str, Any]]]) -> tuple[list[Signal], dict[str, Any]]:
    signals: list[Signal] = []
    topic_messages: Counter[str] = Counter()
    topic_mentions: Counter[str] = Counter()
    top_days: Counter[str] = Counter()
    yearly_rows = []
    channel_names: dict[str, str] = {}
    total_messages = 0
    total_attachments = 0
    total_embeds = 0
    total_pins = 0

    for year, path, export in exports:
        channel = export.get("channel") or {}
        guild = export.get("guild") or {}
        channel_id = str(channel.get("id") or path.stem)
        channel_name = str(channel.get("name") or channel_id)
        guild_id = str(guild.get("id") or "")
        channel_names[channel_id] = channel_name
        messages = export.get("messages") or []
        total_messages += len(messages)

        year_topics: Counter[str] = Counter()
        year_signals = 0
        year_attachments = 0

        for message in messages:
            text = normalize_text(message.get("content") or "")
            attachments = attachment_names(message)
            embeds = embed_urls(message)
            total_attachments += len(attachments)
            total_embeds += len(embeds)
            if attachments:
                year_attachments += len(attachments)
            if message.get("isPinned"):
                total_pins += 1

            topics = topic_hits(text)
            for topic in topics:
                topic_messages[topic] += 1
                topic_mentions[topic] += len(re.findall(TOPIC_PATTERNS[topic], text, re.IGNORECASE))
                year_topics[topic] += 1

            timestamp = str(message.get("timestamp") or "")
            if timestamp:
                top_days[timestamp[:10]] += 1

            score = score_message(text, attachments, embeds, bool(message.get("isPinned")))
            if score < 9:
                continue
            author = (message.get("author") or {}).get("name") or "unknown"
            signals.append(
                Signal(
                    source="conversation-window",
                    channel_id=channel_id,
                    channel_name=channel_name,
                    year=year,
                    timestamp=timestamp,
                    author=str(author),
                    content=trim_text(text),
                    url=message_url(guild_id, channel_id, str(message.get("id") or "")),
                    attachments=attachments,
                    embeds=embeds,
                    topics=topics,
                    score=score,
                )
            )
            year_signals += 1

        yearly_rows.append(
            {
                "channel_id": channel_id,
                "channel_name": channel_name,
                "year": year,
                "messages": len(messages),
                "signals": year_signals,
                "attachments": year_attachments,
                "date_after": (export.get("dateRange") or {}).get("after", "")[:10],
                "date_before": (export.get("dateRange") or {}).get("before", "")[:10],
                "top_topics": ", ".join(f"{topic} ({count})" for topic, count in year_topics.most_common(5)),
            }
        )

    overview = {
        "generatedAt": datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "channels": channel_names,
        "messageCount": total_messages,
        "attachmentCount": total_attachments,
        "embedCount": total_embeds,
        "pinnedMessagesInsideWindows": total_pins,
        "signalCount": len(signals),
        "topDays": top_days.most_common(25),
        "topicCounts": [[topic, topic_mentions[topic], topic_messages[topic]] for topic in topic_mentions],
        "yearlyRows": yearly_rows,
    }
    return signals, overview


def collect_pin_signals() -> list[Signal]:
    signals: list[Signal] = []
    for channel_id in CHANNEL_IDS:
        path = PINS_DIR / channel_id / "pins.json"
        if not path.exists():
            continue
        payload = json.loads(path.read_text(encoding="utf-8"))
        for item in payload.get("items") or []:
            message = item.get("message") or {}
            text = normalize_text(message.get("content") or "")
            attachments = attachment_names(message)
            embeds = embed_urls(message)
            topics = topic_hits(text)
            timestamp = str(message.get("timestamp") or item.get("pinned_at") or "")
            year = timestamp[:4] if timestamp else "unknown"
            author_data = message.get("author") or {}
            author = author_data.get("username") or author_data.get("global_name") or author_data.get("name") or "unknown"
            guild_id = str(message.get("guild_id") or "")
            signals.append(
                Signal(
                    source="pin",
                    channel_id=channel_id,
                    channel_name=channel_id,
                    year=year,
                    timestamp=timestamp,
                    author=str(author),
                    content=trim_text(text),
                    url=message_url(guild_id, channel_id, str(message.get("id") or "")),
                    attachments=attachments,
                    embeds=embeds,
                    topics=topics,
                    score=score_message(text, attachments, embeds, True),
                )
            )
    return signals


def signals_to_markdown(title: str, signals: list[Signal], limit: int | None = None) -> str:
    lines = [f"# {title}", ""]
    current_key = None
    selected = sorted(signals, key=lambda s: (s.year, s.timestamp, -s.score), reverse=True)
    if limit is not None:
        selected = selected[:limit]
    for signal in selected:
        key = (signal.channel_id, signal.year)
        if key != current_key:
            lines.extend(["", f"## {signal.channel_id} / {signal.year}", ""])
            current_key = key
        topic_text = ", ".join(signal.topics) if signal.topics else "-"
        attach_text = ", ".join(signal.attachments) if signal.attachments else "-"
        embed_text = ", ".join(signal.embeds) if signal.embeds else "-"
        lines.append(f"### {signal.timestamp} - {signal.author} - score {signal.score}")
        lines.append("")
        lines.append(f"- Zdroj: {signal.source}")
        lines.append(f"- Odkaz: {signal.url}")
        lines.append(f"- Témata: {topic_text}")
        lines.append(f"- Attachmenty: {attach_text}")
        if signal.embeds:
            lines.append(f"- Embedy: {embed_text}")
        lines.append("")
        if signal.content:
            lines.append("> " + signal.content.replace("\n", "\n> "))
        else:
            lines.append("> [bez textu]")
        lines.append("")
    return "\n".join(lines).strip() + "\n"


def write_tables(overview: dict[str, Any]) -> None:
    yearly_lines = [
        "channel_id\tchannel_name\tyear\tmessages\tsignals\tattachments\tdate_after\tdate_before\ttop_topics"
    ]
    for row in overview["yearlyRows"]:
        yearly_lines.append(
            "\t".join(
                [
                    row["channel_id"],
                    row["channel_name"],
                    row["year"],
                    str(row["messages"]),
                    str(row["signals"]),
                    str(row["attachments"]),
                    row["date_after"],
                    row["date_before"],
                    row["top_topics"],
                ]
            )
        )
    write_text(OUTPUT_DIR / "yearly_summary.tsv", "\n".join(yearly_lines) + "\n")

    topic_lines = ["topic\tmentions\tmessages"]
    for topic, mentions, messages in sorted(overview["topicCounts"], key=lambda item: item[1], reverse=True):
        topic_lines.append(f"{topic}\t{mentions}\t{messages}")
    write_text(OUTPUT_DIR / "topic_counts.tsv", "\n".join(topic_lines) + "\n")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    exports = iter_exports()
    conversation_signals, overview = collect_window_signals(exports)
    pin_signals = collect_pin_signals()

    conversation_signals.sort(key=lambda signal: signal.score, reverse=True)
    pin_signals.sort(key=lambda signal: signal.score, reverse=True)
    all_signals = sorted(pin_signals + conversation_signals, key=lambda signal: signal.score, reverse=True)

    write_text(OUTPUT_DIR / "overview.json", json.dumps(overview, ensure_ascii=False, indent=2) + "\n")
    write_tables(overview)
    write_text(OUTPUT_DIR / "pin-signals.md", signals_to_markdown("Pinned FLP signals", pin_signals))
    write_text(
        OUTPUT_DIR / "conversation-signals.md",
        signals_to_markdown("Conversation FLP assignment signals", conversation_signals, limit=260),
    )
    write_text(OUTPUT_DIR / "top-signals.md", signals_to_markdown("Top FLP signals", all_signals, limit=180))

    summary = [
        "# Discord analysis scratchpad",
        "",
        "Side analysis generated from `raw/discord/<channel>/<year>/<channel>.json` and `raw/discord-pins/<channel>/pins.json`.",
        "",
        "## High-level",
        "",
        f"- Channels: {', '.join(CHANNEL_IDS)}",
        f"- Exported yearly windows: {len(exports)}",
        f"- Total messages in windows: {overview['messageCount']}",
        f"- Attachments in windows: {overview['attachmentCount']}",
        f"- Embeds in windows: {overview['embedCount']}",
        f"- Pinned records fetched: {len(pin_signals)}",
        f"- Conversation signal candidates: {len(conversation_signals)}",
        "",
        "## Topic counts",
        "",
    ]
    for topic, mentions, messages in sorted(overview["topicCounts"], key=lambda item: item[1], reverse=True):
        summary.append(f"- `{topic}`: {mentions} mentions across {messages} messages.")
    summary.extend(["", "## Top days", ""])
    for day, count in overview["topDays"][:15]:
        summary.append(f"- `{day}`: {count} messages")
    write_text(OUTPUT_DIR / "summary.md", "\n".join(summary) + "\n")


if __name__ == "__main__":
    main()
