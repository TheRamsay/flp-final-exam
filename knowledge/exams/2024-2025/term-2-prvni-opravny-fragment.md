# 2024/2025 - 1. opravný fragment

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `conversation fragment` |
| Primární zdroj | Discord konverzace 2. 6. 2025 a 8.-9. 6. 2025 |

## Zdroje

- Normalizovaný digest: [[raw/manual/conversation-assignments|conversation assignments]], sekce `2024/2025 - 1. opravný termín, fragment`.
- Primární signál: zprávy z 2. 6. 2025 až 9. 6. 2025 v lokálním Discord exportu kanálu `621775580471492638`.

## FP/Haskell

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

## LP/Prolog

V dostupném konverzačním fragmentu není spolehlivě zachycená historická LP/Prolog část.

### Lambda-kalkul

Diskuse zmiňuje Fibonacciho funkci podle zadané pozice a chyby kolem `Y`/pevného bodu a `sub`.

### Prolog

Diskuse zmiňuje evaluaci výrazů a rovnic, termy typu `eq`, `op`, `val`, `var`. Řešení mělo pracovat přímo s termy v argumentech, ne přes `assertz`/`retractz`.

## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
