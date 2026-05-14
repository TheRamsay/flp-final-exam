# Zadání vytěžená z konverzace

Ruční digest relevantních konverzačních zpráv z období 15. 4. až 1. 7.

## 2024/2025 - 1. opravný termín, fragment

Zdroj: zprávy `2025-06-02` až `2025-06-09` v `raw/discord/621775580471492638/2025/621775580471492638-jun1.json`.
Normalizovaná stránka: [[knowledge/exams/2024-2025/term-2-prvni-opravny-fragment|2024-2025 - 1. opravný fragment]].

- Haskell důkaz:

```haskell
len [] = 0
len (_:xs) = 1 + len xs

len' l = fl (\_ z -> 1 + z) 0 l
  where
    fl _ z [] = z
    fl f z (x:xs) = f x (fl f z xs)
```

Dokázat `len xs = len' xs` pro všechny konečné seznamy.

- Lambda-kalkul: podle diskuse šlo o Fibonacciho funkci, pravděpodobně návrat prvku Fibonacciho posloupnosti na zadané pozici; k dispozici byl `sub`/odčítání a řešilo se zapomenutí `Y`.
- Prolog: evaluace výrazů a rovnic, termy typu `eq`, `op`, `val`, `var`; zadání mělo být řešitelné bez `assertz`/`retractz`, napárováním termů přímo v predikátu.

## Obecné zkouškové signály

- Opakovaně se potvrzuje, že historicky se zadání skládala z lambda-kalkulu, Haskellu, důkazu a Prologu.
- V roce 2025/2026 je Prolog nahrazen Rustem; staré Prolog úlohy jsou proto užitečné hlavně jako vzor řetězového zadání a práce s reprezentací problému, ne jako přímá predikce.
- Haskell bývá "na papír": datové typy, rekurze, Prelude, IO, důkazy nad seznamy, přesné čtení omezení `holý Haskell` vs `Prelude`.
