# 2018/2019 - 2. opravný termín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell/Prolog `2. opravný termín` |

## Zdroje

- Studentská sbírka, Haskell řádky 890-900.
- Studentská sbírka, Prolog řádky 2362-2371.

## FP/Haskell

B-tree:

1. Definovat typ `BTree` s předem daným počtem potomků a hloubkou.
2. Listy obsahují seznam dvojic `(klíč, hodnota)` neznámých typů.
3. Uzly obsahují seznam mezních klíčů pro potomky.
4. `create`: vytvoření stromu podle maximálního klíče, minimálního klíče, hloubky a počtu potomků.
5. `ins`: vložit nebo upravit hodnotu podle klíče.
6. `allList`: vybrat z listů všechny hodnoty do jednoho seznamu.
7. Bonus: řešit nesoudělnost počtu potomků/pater s počtem klíčů.

## LP/Prolog

Nejkratší cesty:

1. `search(From, To, L)`: najde nejkratší cestu a její délku.
2. `fsf(+From, Where, Distances)`: vzdálenosti z `From` do množiny míst.
3. `gc(+Distances, Closest, L)`: vybere nejbližší bod.
4. `ts(+From, +Where, -Path, -L)`: vybere nejkratší cestu přes zadanou množinu míst.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
