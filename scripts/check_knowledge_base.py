#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CHECK_DIRS = [
    ROOT / "knowledge",
    ROOT / "raw" / "manual",
]
CHECK_FILES = [
    ROOT / "README.md",
    ROOT / "index.md",
    ROOT / "raw" / "FLP studentská sbírka úloh.md",
]

WIKILINK_RE = re.compile(r"\[\[([^\]\n]+)\]\]")
REQUIRED_EXAM_HEADINGS = ("## Metadata", "## Zdroje")


def iter_markdown_files() -> list[Path]:
    files: list[Path] = []
    for directory in CHECK_DIRS:
        if directory.exists():
            files.extend(directory.rglob("*.md"))
    files.extend(path for path in CHECK_FILES if path.exists())
    return sorted(set(files))


def display(path: Path) -> str:
    return str(path.relative_to(ROOT))


def target_exists(target: str) -> bool:
    target = target.split("#", 1)[0].strip()
    if not target or re.match(r"^[a-z]+://", target):
        return True
    candidate = ROOT / target
    return (
        candidate.exists()
        or candidate.with_suffix(".md").exists()
        or (candidate / "index.md").exists()
        or (candidate / "00-index.md").exists()
    )


def check_wikilinks(path: Path, text: str) -> list[str]:
    errors: list[str] = []
    in_fence = False
    for line_no, line in enumerate(text.splitlines(), start=1):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        for match in WIKILINK_RE.finditer(line):
            body = match.group(1)
            target, _, alias = body.partition("|")
            if "`" in alias:
                errors.append(
                    f"{display(path)}:{line_no}: wikilink alias contains inline code: {match.group(0)}"
                )
            if not target_exists(target):
                errors.append(
                    f"{display(path)}:{line_no}: wikilink target not found: {target}"
                )
    return errors


def check_exam_page(path: Path, text: str) -> list[str]:
    errors: list[str] = []
    relative = path.relative_to(ROOT)
    if not re.match(r"knowledge/exams/\d{4}-\d{4}/term-", str(relative)):
        return errors

    for heading in REQUIRED_EXAM_HEADINGS:
        if heading not in text:
            errors.append(f"{display(path)}: missing {heading}")
    if "## FP/Haskell" not in text:
        errors.append(f"{display(path)}: missing ## FP/Haskell")
    if "## LP/Prolog" not in text and "2025-2026" not in str(relative):
        errors.append(f"{display(path)}: missing ## LP/Prolog")
    if "## Aktuální relevance" not in text:
        errors.append(f"{display(path)}: missing ## Aktuální relevance")
    return errors


def main() -> int:
    errors: list[str] = []
    for path in iter_markdown_files():
        text = path.read_text(encoding="utf-8")
        errors.extend(check_wikilinks(path, text))
        errors.extend(check_exam_page(path, text))

    if errors:
        print("Knowledge base check failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print("Knowledge base check passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
