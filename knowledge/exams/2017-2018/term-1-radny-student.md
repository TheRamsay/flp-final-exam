# 2017/2018 - řádný termín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell/Prolog/Důkazy `Řádný termín` |

## Zdroje

- Studentská sbírka, Haskell řádky 902-979.
- Studentská sbírka, Prolog řádky 2373-2442.
- Studentská sbírka, Důkazy řádky 3416-3452.

## FP/Haskell

IO log:

1. Funkce `pt` dostane název souboru.
2. Soubor obsahuje záznamy ve formátu `Integer#String`, případně prázdný řádek.
3. Záznam reprezentovat datovým typem `DLog`.
4. Vypsat záznamy s čísly dělitelnými 5, oddělené dvojtečkou.
5. Uvést typové definice pro použité funkce.
6. Bonus: nekonečný strom, `initTree` a `takeLev`.

## FP/Důkaz

Dokázat:

```haskell
foldr (&&) True xs = all xs
```

pro rekurzivní definici `all`.

## LP/Prolog

1. Symetrická diference množin reprezentovaných seznamy.
2. `search(PocatecniPozice, SeznamCest)`: najít všechny cesty z pozice zpět do stejné pozice délky 20 až 22 v nekonečném stavovém prostoru.
3. `lookup`: práce s vhodně reprezentovanou tabulkou symbolů, klíčem, hodnotou a modifikovanou tabulkou.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
