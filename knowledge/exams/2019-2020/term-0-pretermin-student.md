# 2019/2020 - předtermín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell/Prolog/Lambda/Důkazy `Předtermín` |

## Zdroje

- Studentská sbírka, Haskell řádky 522-583.
- Studentská sbírka, Prolog řádky 1971-2065.
- Studentská sbírka, Lambda řádky 2843-2862.
- Studentská sbírka, Důkazy řádky 3250-3283.

## FP/Haskell

Neorientovaný graf:

1. Vstupní soubor obsahuje po řádcích jména uzlů, prázdný řádek a hrany jako dvojice jmen oddělené dvojtečkou.
2. Definovat reprezentaci neorientovaného grafu.
3. Zkontrolovat korektnost grafu funkcí `checkUG`.
4. Vytvořit funkci, která smaže izolované uzly.

## FP/Lambda a důkaz

- Definovat `False`, ternární operátor a funkci `eq` pro porovnání dvou čísel v lambda kalkulu.
- Povoleno využít `iszero`, `prev` a operátor pevného bodu.
- Důkazová část: důkaz nad `foldr`; definiční rovnice pro `foldr` bylo potřeba uvést.

## LP/Prolog

Klika v neorientovaném grafu:

1. Uložit graf `ug(vertices, edges)` do dynamické databáze přes `node/2` a `edge/2`.
2. Otestovat, zda množina uzlů tvoří kliku.
3. Dopočítat stupně uzlů.
4. Hledat kliku určité velikosti v okolí uzlu.
5. Najít větší, ideálně největší kliku.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
