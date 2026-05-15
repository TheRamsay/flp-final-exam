# Haskell důkazy

## Nejčastější tvary

- `sum xs = foldr (+) 0 xs`
- `len xs = foldr (\_ n -> 1+n) 0 xs`
- `all xs = foldr (&&) True xs`
- `take n xs ++ drop n xs = xs`
- `len xs = len' xs` pro akumulační/pravou rekurzi.
- vztah `map (uncurry f) (zip xs ys)` a `zipWith f xs ys`.

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

## Tréninkové skupiny

- `foldr` proti ruční rekurzi: `all`, `concat`, součet.
- Akumulační funkce: `foldl`, `length'`, `suma`; často potřebuješ zobecnit tvrzení.
- Dvojice funkcí nad seznamem: `take/drop`, `zip/zipWith`.
- Zadání s vlastní pomocnou funkcí: nejdřív přepiš definici helperu, až pak používej indukční hypotézu.

## Zdroje

- [[knowledge/exams/2024-2025/term-2-prvni-opravny-fragment|2024-2025 1. opravný fragment]] - důkaz `len xs = len' xs`
- [[knowledge/exams/2023-2024/term-2-prvni-opravny-photo|2023-2024 1. opravný foto]] - `take n xs ++ drop n xs = xs`
- [[knowledge/exams/2022-2023/term-0-pretermin|2022-2023 předtermín]] - `suma 0 xs = foldl (+) 0 xs`
- [[knowledge/exams/2021-2022/term-0-special|2021-2022 speciální termín]] - `concat xs ++ ys = foldr (:) ys xs`
- [[knowledge/exams/2021-2022/term-2-prvni-opravny-student|2021-2022 1. opravný]] - `map (uncurry f) (zip xs ys)` vs `zipWith f xs ys`
- [[knowledge/exams/2020-2021/term-1-radny|2020-2021 řádný termín]] - `all xs = foldr (&&) True xs`
- [[knowledge/exams/2017-2018/term-2-prvni-opravny-student|2017-2018 1. opravný]] - délka přes `foldl`
- [[knowledge/exams/2017-2018/term-1-radny-student|2017-2018 řádný]] - `foldr (&&) True xs = all xs`
