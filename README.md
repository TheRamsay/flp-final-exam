# FLP Final Exam

Obsidian-friendly archiv zadání a přípravy na zkoušku z FLP.

Hlavní zdroje jsou lokální Discord exporty a lokální materiály z `~/school/flp`. Raw exporty jsou záměrně ignorované:

- `raw/discord/<channel>/<year>/<channel>.json` - roční okna 15. 4. až 1. 7.
- `raw/discord-pins/<channel>/pins.json` - aktuální piny.
- `raw/discord-pins/<channel>/media/` - stažené přílohy z pinů.
- `raw/discord-analysis/` - automatický scratchpad kandidátů.

Token není uložený v repozitáři. Export skript čte `DISCORD_TOKEN`, `USER_TOKEN`, nebo hodnotu ze stdin.

Vybrané fotky původních zadání jsou publikované jen jako zmenšené kopie bez EXIF metadat v `knowledge/assets/exams/`.

## Start

- [[knowledge/00-rozcestnik|Rozcestník]]
- [[knowledge/exams/overview|Přehled termínů]]
- [[knowledge/exams/00-index|Minulá zadání]]
- [[knowledge/01-roi-plan|ROI plán]]
- [[knowledge/practice/00-index|Practice index]]
- [[knowledge/topics/00-index|Topic index]]
- [[raw/manual/pin-assignments|Zadání vytěžená z pinů]]
- [[raw/manual/conversation-assignments|Zadání vytěžená z konverzace]]

## Paper Haskell drill

Samostatné lokální cvičné prostředí je v `tools/haskell-paper-drill/`.

```sh
node tools/haskell-paper-drill/server.js
```

Pak otevři `http://127.0.0.1:8787`. Appka má minimalistický editor, 14 Haskell drillů podle starých zadání a letošních signálů, Paper režim bez nápovědy, Editor režim s autocomplete nápovědou pro Prelude/názvy/proměnné, označenou zdrojovost, řešitelské kostry po odevzdání, post-hoc GHC kontrolu u vybraných úloh a historii/statistiky podle chyb v `.paper-drill/history.json`.

Staticky jde otevřít i `tools/haskell-paper-drill/index.html`, ale bez serveru nefunguje ukládání historie ani GHC testy.

## Kontrola knowledge base

Před commitem nebo deployem spusť:

```sh
scripts/check_knowledge_base.py
```

Kontrola hlídá rozbité wikilinky, Quartz-nebezpečné aliasy s inline kódem a základní strukturu zkouškových stránek.
