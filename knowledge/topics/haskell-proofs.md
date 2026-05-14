# Haskell důkazy

## Nejčastější tvary

- `sum xs = foldr (+) 0 xs`
- `len xs = foldr (\_ n -> 1+n) 0 xs`
- `all xs = foldr (&&) True xs`
- `take n xs ++ drop n xs = xs`
- `len xs = len' xs` pro akumulační/pravou rekurzi.

## Zkouškový styl

Piš kroky mechanicky:

1. Báze pro `[]`.
2. Indukční krok pro `(x:xs)` nebo `(a:as)`.
3. Přesně označ použitou definici.
4. Indukční předpoklad použij až ve chvíli, kdy máš tvar z předpokladu.

## Příklad kostry

```text
Tvrzení P(xs): len xs = len' xs

Báze xs = []:
  len []
= 0
= fl f 0 []
= len' []

Krok xs = a:as, IP: len as = len' as:
  len (a:as)
= 1 + len as
= 1 + len' as
= 1 + fl f 0 as
= f a (fl f 0 as)
= fl f 0 (a:as)
= len' (a:as)
```

U konkrétní zkoušky vždy přizpůsob definici `fl` a pořadí rovností.

## Zdroje

- [[knowledge/exams/2024-2025/term-2-prvni-opravny-fragment|2024/2025 - důkaz `len xs = len' xs`]]
- [[knowledge/exams/2023-2024/term-2-prvni-opravny-photo|2023/2024 - `take n xs ++ drop n xs = xs`]]
- [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 - `suma 0 xs = foldl (+) 0 xs`]]
- [[knowledge/exams/2021-2022/term-0-special|2021/2022 - `concat xs ++ ys = foldr (:) ys xs`]]
- [[knowledge/exams/2020-2021/term-1-radny|2020/2021 - `all xs = foldr (&&) True xs`]]
