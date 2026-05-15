# 2020/2021 - 2. opravný termín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell/Prolog/Lambda/Důkazy `2. opravný termín` |

## Zdroje

- Studentská sbírka, Haskell řádky 478-520.
- Studentská sbírka, Prolog řádky 1853-1969.
- Studentská sbírka, Lambda řádky 2826-2841.
- Studentská sbírka, Důkazy řádky 3202-3248.

## FP/Haskell

1. Definovat `substrs`, která pro řetězec vrátí seznam všech jeho podřetězců.
2. Definovat `subsets`, která pro řetězec vrátí všechny kombinace znaků; lze použít dříve definované `suf` a `pref`.
3. Definovat `ff`: první argument je soubor s řádky `<key>:<value>`, druhý argument hledaný klíč; funkce vrátí hodnotu klíče nebo informaci, že klíč nebyl nalezen.

## FP/Lambda a důkaz

- Lambda: napsat příklad platné a neplatné substituce v rámci jednoho výrazu.
- Důkaz: dodefinovat `f` tak, aby platilo `zp f xs ys = df xs ys`, a dokázat pro konečné `xs` a `ys`.

## LP/Prolog

1. Holý Prolog plus `not`, `!`, `member`, `length`.
2. `getAllNodes(+Num)`: unifikuje počet unikátních uzlů.
3. `tsp`: varianta úlohy obchodního cestujícího, najít nejlevnější trasu mezi uzly.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
