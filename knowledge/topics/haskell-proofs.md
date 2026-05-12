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
