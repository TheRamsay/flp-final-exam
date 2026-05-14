# Practice index

## Nástroje

- `tools/haskell-paper-drill/` - lokální paper drill appka s minimalistickým editorem, 14 drilly, variantami zadání, označenou zdrojovostí, řešitelskými kostrami po odevzdání, historií, statistikami podle chyb a post-hoc GHC testy.

Spuštění:

```sh
node tools/haskell-paper-drill/server.js
```

URL: `http://127.0.0.1:8787`

## Doporučený postup

1. Vyber okruh a seed, případně nech mix.
2. Piš bez kompilátoru a bez rubric panelu; ten se ukáže až po odevzdání.
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
