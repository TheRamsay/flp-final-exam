# Lambda kalkul

## Must know

```text
True  = \x y. x
False = \x y. y
NOT   = \b. b False True
XOR   = \a b. a (NOT b) b
IF    = \c t f. c t f
```

## Pevný bod

V zadáních se opakuje vlastnost:

```text
Y F = F (Y F)
```

Použití: definovat rekurzivní funkci bez pojmenované rekurze, např. odečítání, Fibonacci, Ackermann.

## Opakované šablony

- Booleany a větvení: `True`, `False`, `NOT`, `XOR`, implikace, ternární operátor.
- Rekurze přes pevný bod: `SUB`, `LT`, Fibonacci, Ackermann, `eq`, `odds`.
- Substituce a volné/vázané proměnné: spíš teoretická kontrola než dlouhé programování.
- Krátká redukce na příkladu: ukaž base case a jeden rekurzivní krok, nepřeskakuj aplikaci `Y F = F (Y F)`.

## Co typicky hodnotí

- Definuješ všechny pomocné symboly, které nejsou v zadání.
- Beta-redukce má správné závorkování.
- U přirozených čísel jasně pracuješ s dostupnými funkcemi (`iszero`, `succ`, `pred`, `sub`).

## Zdroje

- [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024-2025 předtermín - pevný bod a Ackermann]]
- [[knowledge/exams/2024-2025/term-2-prvni-opravny-fragment|2024-2025 1. opravný fragment - Fibonacci přes pevný bod]]
- [[knowledge/exams/2023-2024/term-2-prvni-opravny-photo|2023-2024 1. opravný foto]] - `SUB`
- [[knowledge/exams/2022-2023/term-0-pretermin|2022-2023 předtermín]] - `True`, `False`, `XOR`
- [[knowledge/exams/2021-2022/term-0-special|2021-2022 speciální termín]] - `LT` přes pevný bod
- [[knowledge/exams/2020-2021/term-3-druhy-opravny-student|2020-2021 2. opravný]] - platná a neplatná substituce
- [[knowledge/exams/2019-2020/term-0-pretermin-student|2019-2020 předtermín]] - `False`, ternární operátor, `eq`
- [[knowledge/exams/2025-2026/pulsemka-2026-signal|2025-2026 půlsemestrálka signal]] - `odds`
