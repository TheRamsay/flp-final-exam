# Haskell paper core

## Co se opakuje

- Návrh `data` typů pro výrazy, lambda-výrazy, BST, seznamové struktury.
- Rekurze přes seznam/strom.
- Funkce jako `eval`, `insert`, `find`, `union`, `symd`, `fv`.
- Řetězová zadání: typ → pomocná funkce → IO akce.
- Starší raw sbírka rozšiřuje domény na stack, DFA pravidla, grafy, B-tree, filesystem a login reporty; technika zůstává stejná.

## Must know šablony

```haskell
data Tree k v = Empty | Node (Tree k v) k v (Tree k v)
```

```haskell
find :: Ord k => k -> Tree k v -> Maybe v
find _ Empty = Nothing
find k (Node l k' v r)
  | k == k' = Just v
  | k < k' = find k l
  | otherwise = find k r
```

```haskell
union :: Eq a => [a] -> [a] -> [a]
union [] ys = ys
union (x:xs) ys
  | elem x ys = union xs ys
  | otherwise = x : union xs ys
```

## Paper checklist

- Napiš typovou signaturu, pokud ji víš.
- Base case pro každý konstruktor.
- Nepoužívej funkce mimo povolený režim (`holý Haskell` vs `Prelude`).
- U IO akce odděl čistou transformaci od `openFile`/`hGetContents`/`hPutStr`.

## Rodiny zadání

| Rodina | Typické jádro | Zdrojové vzory |
|---|---|---|
| Výrazové AST | `data Expr`, `eval`, pretty-print, minimální závorky | [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 předtermín]], [[knowledge/exams/2020-2021/term-1-radny|2020/2021 řádný]] |
| Lambda AST | `Var`/`Lam`/`App`, množiny proměnných, `fv`, substituce | [[knowledge/exams/2024-2025/term-1-radny-photo|2024/2025 řádný]], [[knowledge/exams/2020-2021/term-2-prvni-opravny-student|2020/2021 1. opravný]], [[knowledge/exams/2019-2020/term-2-prvni-opravny-student|2019/2020 1. opravný]] |
| Stromy a mapy | BST/B-tree, `insert`, `find`, invariant podle klíče | [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024/2025 předtermín]], [[knowledge/exams/2018-2019/term-3-druhy-opravny-student|2018/2019 2. opravný]] |
| Lineární struktury | stack, seznam, DLL, log záznamy | [[knowledge/exams/2021-2022/term-1-radny-student|2021/2022 řádný]], [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 předtermín]], [[knowledge/exams/2017-2018/term-1-radny-student|2017/2018 řádný]] |
| Graf/filesystem | vlastní reprezentace plus validace a průchod | [[knowledge/exams/2019-2020/term-0-pretermin-student|2019/2020 předtermín]], [[knowledge/exams/2018-2019/term-1-radny-student|2018/2019 řádný]] |

## Zdroje

- [[knowledge/exams/2024-2025/term-1-radny-photo|2024-2025 řádný foto]] - lambda AST, množiny, `fv`, IO `wr`
- [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024-2025 předtermín foto fragment]] - Fibonacci list, hex parsing, BST, IO `readf`
- [[knowledge/exams/2022-2023/term-0-pretermin|2022-2023 předtermín]] - výrazový typ a pretty-print
- [[knowledge/exams/2020-2021/term-1-radny|2020-2021 řádný termín]] - aritmetický typ, `eval`, `load`
- [[knowledge/exams/overview|Přehled termínů]] - širší mapa starších raw-only variant.
