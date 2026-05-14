# Haskell paper core

## Co se opakuje

- Návrh `data` typů pro výrazy, lambda-výrazy, BST, seznamové struktury.
- Rekurze přes seznam/strom.
- Funkce jako `eval`, `insert`, `find`, `union`, `symd`, `fv`.
- Řetězová zadání: typ → pomocná funkce → IO akce.

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

## Zdroje

- [[knowledge/exams/2024-2025/term-1-radny-photo|2024/2025 řádný - lambda AST, množiny, `fv`, IO `wr`]]
- [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024/2025 předtermín - Fibonacci list, hex parsing, BST, IO `readf`]]
- [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 předtermín - výrazový typ a pretty-print]]
- [[knowledge/exams/2020-2021/term-1-radny|2020/2021 řádný - aritmetický typ, `eval`, `load`]]
