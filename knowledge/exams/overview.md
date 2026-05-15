# Přehled termínů

Tahle tabulka je rychlá mapa zkouškových zdrojů. Status říká sílu zdroje, ne obtížnost.

| Termín | Status | FP/Haskell, lambda, důkaz | IO | Historická LP část / aktuální náhrada | Poznámka |
|---|---|---|---|---|---|
| [[knowledge/exams/2025-2026/current-format|2025/2026 aktuální formát]] | `pin exact` | Haskell: datové typy, hodnoty, Prelude, `fold*`, `concat`, `split`, `span`, `take`; lambda podobně jako půlsemestrálka | základní souborové IO | Rust místo Prologu | aktuální pravidla |
| [[knowledge/exams/2025-2026/pulsemka-2026-signal|2025/2026 půlsemestrálka signal]] | `photo transcript` | lambda signál: `odds` a pevný bod | ne | Rust signál z roku 2026 | není finální zkouška |
| [[knowledge/exams/2024-2025/term-2-prvni-opravny-fragment|2024/2025 1. opravný fragment]] | `conversation fragment` | důkaz `len xs = len' xs` přes vlastní `fl` | neznámé | nezachyceno | slabý fragment |
| [[knowledge/exams/2024-2025/term-1-radny-photo|2024/2025 řádný foto]] | `photo transcript` | lambda AST, množiny, `union`, `symd`, `fv`, důkaz `ccat xss = con xss` | `wr`: čísla řádků na lambda výrazy | Prolog: transpozice, validní matice, dámy | velmi relevantní pro Haskell styl |
| [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024/2025 předtermín foto fragment]] | `photo fragment` | Fibonacci list, hex parsing, BST, lambda pevný bod/Ackermann | `readf` | Prolog zachycen jen částečně | foto fragment |
| [[knowledge/exams/2023-2024/term-2-prvni-opravny-photo|2023/2024 1. opravný foto]] | `photo transcript` | seznamy, `take/drop` důkaz, lambda `SUB` | `fx` | historický Prolog | dobrý zdroj pro paper styl |
| [[knowledge/exams/2022-2023/term-1-radny-student|2022/2023 řádný]] | `raw only` | Haskell ve sbírce chybí | ne | Prolog `prime/1` | jen historický Prolog signál |
| [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 předtermín]] | `pin exact` | lambda `True`/`False`/`XOR`, důkaz `suma`, výrazový typ a pretty-print | `pp` na stdout | Prolog: Turingův stroj | jeden z nejlepších reálných FP zdrojů |
| [[knowledge/exams/2021-2022/term-2-prvni-opravny-student|2021/2022 1. opravný]] | `raw only` | důkaz `map (uncurry f) (zip xs ys)` vs `zipWith f xs ys`; lambda fragment | spojování řádků do limitu 120 | Prolog: key-value paměť, flatten | raw sbírka |
| [[knowledge/exams/2021-2022/term-1-radny-student|2021/2022 řádný]] | `raw only` | zásobník s konstantní délkou, DFA pravidla | načtení pravidel automatu | Prolog: lambda kalkul, `fv`, substituce, eta | raw sbírka |
| [[knowledge/exams/2021-2022/term-0-special|2021/2022 speciální/předtermín]] | `pin exact` | lambda `LT`, `mid`, důkaz `concat xs ++ ys` | trim řádků a souhrn | historický Prolog | silný Haskell/lambda zdroj |
| [[knowledge/exams/2020-2021/term-3-druhy-opravny-student|2020/2021 2. opravný]] | `raw only` | `substrs`, `subsets`, lambda substituce, důkaz s `zp`/`df` | lookup klíče v souboru | Prolog: TSP | raw sbírka |
| [[knowledge/exams/2020-2021/term-2-prvni-opravny-student|2020/2021 1. opravný]] | `raw only` | lambda AST, `union`, `intersection`, `delete`, `fv`, beta/substituce validita | číslování řádků | Prolog: rovnice, `zip` | dobrý variantní zdroj pro `fv` |
| [[knowledge/exams/2020-2021/term-1-radny|2020/2021 řádný]] | `pin exact` | aritmetický výraz, `eval`, `load`, důkaz `all = foldr (&&) True` | prefixový `load` | Prolog: magické čtverce | silný starý zdroj |
| [[knowledge/exams/2019-2020/term-2-prvni-opravny-student|2019/2020 1. opravný]] | `raw only` | lambda AST, volné proměnné, leftmost outermost derivace | nejasné | Prolog: nahrazování podseznamů, řádky, substituce | raw sbírka |
| [[knowledge/exams/2019-2020/term-1-radny-student|2019/2020 řádný]] | `raw only` | context-sensitive grammar; důkaz jen postup | nejasné | Prolog: lambda kalkul v Prologu | slabší raw signál |
| [[knowledge/exams/2019-2020/term-0-pretermin-student|2019/2020 předtermín]] | `raw only` | neorientovaný graf, lambda `False`/ternární/`eq`, foldr důkaz | soubor s grafem | Prolog: klika v grafu | raw sbírka |
| [[knowledge/exams/2018-2019/term-3-druhy-opravny-student|2018/2019 2. opravný]] | `raw only` | B-tree, `create`, `ins`, `allList` | ne | Prolog: nejkratší cesty, TSP varianta | raw sbírka |
| [[knowledge/exams/2018-2019/term-2-prvni-opravny-student|2018/2019 1. opravný]] | `raw only` | lambda výrazy, funkce nad výrazy; důkaz fragment | nejasné | Prolog sekce převážně řešení | slabší raw signál |
| [[knowledge/exams/2018-2019/term-1-radny-student|2018/2019 řádný]] | `raw only` | souborový systém, velikost složky, prefixy, rekurzivní výpis; důkaz fragment | filesystem IO | Prolog: sudoku | raw sbírka |
| [[knowledge/exams/2017-2018/term-2-prvni-opravny-student|2017/2018 1. opravný]] | `raw only` | login report, důkaz délky přes `foldl` | počítání typů řádků a validních loginů | Prolog: subseq, stavový prostor, racionální čísla | raw sbírka |
| [[knowledge/exams/2017-2018/term-1-radny-student|2017/2018 řádný]] | `raw only` | `DLog`, důkaz `foldr (&&) True xs = all xs`, nekonečný strom bonus | log soubor `Integer#String` | Prolog: symetrická diference, search, lookup | raw sbírka |
| [[knowledge/exams/2016-2017/term-1-radny-student|2016/2017 řádný]] | `raw only` | `fdup`, bonus Prolog termy/unifikace | duplikace řádků začínajících `++` | Prolog: bool výrazy, merge sort | raw sbírka |

## Jak to číst

- Pro trénink Haskellu dávej nejvyšší váhu statusům `pin exact` a `photo transcript`.
- `raw only` používej hlavně jako zdroj variant, ne jako důkaz přesného znění zkoušky.
- Pro 2025/2026 ignoruj historický Prolog jako obsah, ale nech si z něj styl větvených zadání; obsahově ho nahrazuje Rust.
