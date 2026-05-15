# 2017/2018 - 1. opravný termín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell/Prolog/Důkazy `1. opravný` |

## Zdroje

- Studentská sbírka, Haskell řádky 980-1027.
- Studentská sbírka, Prolog řádky 2443-2562.
- Studentská sbírka, Důkazy řádky 3453-3493.

## FP/Haskell

IO login report:

1. Funkce `mkR` dostane jméno souboru.
2. Řádky obsahují buď FIT login, prázdný řádek, nebo jiný text.
3. Vypsat počet řádků s validními loginy.
4. Vypsat počet textových řádků.
5. Vypsat počet prázdných řádků.
6. Vypsat všechny validní loginy v náhodném pořadí.
7. K dispozici `randomRIO :: Random a => (a, a) -> IO a`.

## FP/Důkaz

Dokázat akumulační délku přes `foldl`:

```haskell
length' a [] = a
length' a (_:xs) = length' (a+1) xs
```

proti:

```haskell
foldl (\a _ -> a+1) 0 xs
```

## LP/Prolog

1. `subseq`: vygenerovat seznam všech podseznamů přes prefix/suffix matching.
2. Prohledávání stavového prostoru: `search(Start, Cil, Nejkratsi_cesta)` a `nextStep`.
3. Reprezentace racionálních čísel a operace násobení a sčítání.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
