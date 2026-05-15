# Pravidla verifikace

## Statusy

- `pin exact`: text byl v pinu nebo přesně navázané zprávě.
- `photo transcript`: zadání je přepsané z fotografie; nečitelná místa jsou zestručněná.
- `conversation fragment`: rekonstruováno z diskuse po zkoušce.
- `raw only`: normalizováno jen ze studentské/raw sbírky, bez silnějšího Discord/foto ověření.

## Poznámky

- Discord JSONy a původní media exporty jsou lokální a ignorované gitem.
- Veřejné fotky v `knowledge/assets/exams/` jsou zmenšené kopie bez EXIF metadat, vložené jen tam, kde bylo zadání původně na fotce.
- Public Markdown obsahuje digest a vybrané očištěné fotky, ne celé raw exporty.
- Staré Prolog části jsou historické; pro 2025/2026 má být místo nich Rust.

## Zdroje

- Ruční zdrojové digests: [[raw/manual/pin-assignments|pin assignments]] a [[raw/manual/conversation-assignments|conversation assignments]].
- Normalizované stránky zkoušek: [[knowledge/exams/00-index|Minulá zadání]].
