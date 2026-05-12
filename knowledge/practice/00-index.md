# Practice index

## Nástroje

- `tools/haskell-paper-drill/` - lokální paper drill appka s minimalistickým editorem, variantami zadání, označenou zdrojovostí, historií a post-hoc GHC testy.

Spuštění:

```sh
node tools/haskell-paper-drill/server.js
```

URL: `http://127.0.0.1:8787`

## Doporučený postup

1. Vyber okruh a seed, případně nech mix.
2. Piš bez kompilátoru a bez rubric panelu; ten se ukáže až po odevzdání.
3. Po odevzdání zkontroluj base cases, typové signatury, povolené funkce a zápis IO.
4. U testovatelných úloh pusť GHC check až po odevzdání, pak ulož skóre a slabé koncepty.

## Variace, které má smysl točit

- AST + `eval`/pretty-print.
- BST + `find`/`insert`.
- Množiny jako seznamy + volné proměnné.
- IO transformace souboru.
- Důkaz nad `foldr`, `foldl`, `take/drop`, akumulátorem.
