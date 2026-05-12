# Agent Guide

This repository is an FLP final exam knowledge base. Prefer answering from the Markdown vault before using external sources.

## Start Here

- Human entrypoint: `knowledge/00-rozcestnik.md`
- LLM entrypoint: `knowledge/99-llm-index.md`
- ROI study plan: `knowledge/01-roi-plan.md`
- Exam archive index: `knowledge/exams/00-index.md`
- Practice index: `knowledge/practice/00-index.md`
- Raw source archive: `raw/`

## Source Priority

1. `knowledge/exams/**` for normalized past assignments.
2. `knowledge/topics/*.md` for distilled topic notes and answer templates.
3. `raw/manual/*.md` for manually curated Discord findings.
4. `raw/discord-analysis/*.md` for automatically extracted candidates.
5. Local FLP project/midterm materials under `~/school/flp`.

## Current Exam Caveat

Older FLP final exams usually contained Haskell + Prolog. In 2025/2026, Prolog was removed and Rust is expected instead. Treat older Prolog tasks as useful logic-programming history, not as direct prediction for the current second practical section.

## Search Patterns

Use `rg` first.

```sh
rg -n "Haskell|Prolog|Rust|zadání|zkouš" knowledge raw
rg -n "Termínový label|Jednotné zadání|Stav verifikace" knowledge/exams
rg -n "fold|map|filter|Tree|Maybe|Either|parser" knowledge/topics tools
```
