# 2016/2017 - řádný termín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell/Prolog `Řádný termín` |

## Zdroje

- Studentská sbírka, Haskell řádky 1029-1088.
- Studentská sbírka, Prolog řádky 2564-2719.

## FP/Haskell

IO transformace:

1. Funkce `fdup` načte soubor podle názvu v parametru.
2. Soubor vypíše na standardní výstup.
3. Pokud řádek začíná dvěma znaky `+`, vypíše se dvakrát a bez těchto dvou znaků.
4. Pořadí řádků se nesmí změnit.
5. Bonus: reprezentace Prolog termů a funkce `unify`, která vrátí nejobecnější unifikátor dvou termů.

## LP/Prolog

1. Navrhnout strukturu pro boolovské výrazy `and`, `or`, `not`, proměnné a literály `true`/`false`.
2. Navrhnout strukturu pro tabulku hodnot proměnných.
3. `eval(Table, Expr, Res)`: vyhodnotit boolovský výraz.
4. `msort`: implementovat merge sort s klasickou, ne kvadratickou složitostí.
5. Predikát s prvním argumentem jako predikátem a druhým argumentem jako seznamem seznamů; postupně aplikovat predikát na seznamy a zpracovat výsledky. Přesné znění je ve sbírce fragmentární.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
