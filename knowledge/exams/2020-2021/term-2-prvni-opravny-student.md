# 2020/2021 - 1. opravný termín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell/Prolog `1. opravný` |

## Zdroje

- Studentská sbírka, Haskell řádky 368-477.
- Studentská sbírka, Prolog řádky 1739-1852.

## FP/Haskell

Lambda výrazy a práce nad nimi:

1. Definovat datovou strukturu pro lambda výrazy.
2. Definovat množinové operace `union`, `intersection`, `delete`.
3. Definovat `fv` pro výpočet volných proměnných.
4. Řešit otázku aplikovatelnosti beta redukce/substituce, ve sbírce zmiňováno jako `isApp E X F` a `isValid`.
5. IO varianta: vypsat soubor s přidanými čísly řádků zarovnanými doprava.

## LP/Prolog

1. Prohledáváním najít celočíselná řešení `solve(+Xm, +Ym, -X, -Y, -Z)` rovnice `x^2 + y^2 = z^2` pro rozsahy `1..Xm` a `1..Ym`.
2. `resolve`: podobné jako `solve`, ale levá a pravá strana rovnice se zadává obecněji.
3. `zip(L1,L2,L12)`.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
