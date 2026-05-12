# 2024/2025 - 1. opravný fragment

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `conversation fragment` |
| Primární zdroj | Discord konverzace 2. 6. 2025 a 8.-9. 6. 2025 |

## Rekonstrukce

### Haskell důkaz

```haskell
len [] = 0
len (_:xs) = 1 + len xs

len' l = fl (\_ z -> 1 + z) 0 l
  where
    fl _ z [] = z
    fl f z (x:xs) = f x (fl f z xs)
```

Dokázat:

```haskell
len xs = len' xs
```

pro všechny konečné seznamy.

### Lambda-kalkul

Diskuse zmiňuje Fibonacciho funkci podle zadané pozice a chyby kolem `Y`/pevného bodu a `sub`.

### Prolog

Diskuse zmiňuje evaluaci výrazů a rovnic, termy typu `eq`, `op`, `val`, `var`. Řešení mělo pracovat přímo s termy v argumentech, ne přes `assertz`/`retractz`.
