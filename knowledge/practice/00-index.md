# Practice index

## Nástroje

- `tools/haskell-paper-drill/` - lokální paper drill appka s minimalistickým editorem, 14 drilly, variantami zadání, Paper režimem bez nápovědy, Editor režimem s autocomplete nápovědou, označenou zdrojovostí, řešitelskými kostrami po odevzdání, historií, statistikami podle chyb a post-hoc GHC testy.
- [[knowledge/practice/rust-compile-fix-drill|Rust compile/fix drill]] - 20 pasivních Rust otázek typu zkompiluje/nezkompiluje, najdi chybu a oprav.

Spuštění:

```sh
node tools/haskell-paper-drill/server.js
```

URL: `http://127.0.0.1:8787`

## Doporučený postup

1. Vyber okruh, případně nech mix.
2. Pro simulaci zkoušky nech `Paper`; pro lehčí procvičení přepni `Editor`, kde funguje autocomplete pro Prelude, názvy ze zadání a lokální proměnné.
3. Po odevzdání zkontroluj base cases, typové signatury, povolené funkce a zápis IO.
4. Po odevzdání srovnej řešení s kostrou a rubrikou.
5. U testovatelných úloh pusť GHC check až po odevzdání, označ typy chyb a slabé koncepty.
6. Ulož pokus; statistiky pak prioritně ukazují opakované chyby, ne jen skóre.

## Variace, které má smysl točit

- AST + `eval`/pretty-print.
- BST + `find`/`insert`.
- Množiny jako seznamy + volné proměnné.
- IO transformace souboru.
- Důkaz nad `foldr`, `foldl`, `take/drop`, akumulátorem.

## Zdroje

- Drill bank je odvozený z [[knowledge/exams/00-index|minulých zadání]] a označuje přímé přepisy vs varianty.
- Aktuální omezení pro Haskell/Paper režim vychází z [[knowledge/exams/2025-2026/current-format|2025-2026 - aktuální formát]].
- Přehled doporučených témat: [[knowledge/01-roi-plan|ROI plán]].
