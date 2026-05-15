# 2021/2022 - 1. opravný termín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell/Prolog/Lambda/Důkazy `1. opravný` |

## Zdroje

- Studentská sbírka, Haskell řádky 306-323.
- Studentská sbírka, Prolog řádky 1375-1459.
- Studentská sbírka, Lambda řádky 2790-2803.
- Studentská sbírka, Důkazy řádky 3114-3164.

## FP/Haskell

IO funkce:

1. Načíst vstupní soubor.
2. Spojovat následující řádky, pokud jejich společná délka je nejvýše 120.
3. Výstupní řádky očíslovat od začátku, přidat dvojtečku a obsah spojených řádků.
4. Zapsat výsledek do souboru se stejným jménem a příponou `.out`.

## FP/Lambda a důkaz

- Lambda část je ve sbírce uvedená jen fragmentárně.
- Důkaz: ukázat vztah mezi:

```haskell
map (uncurry f) (zip xs ys)
zipWith f xs ys
```

pomocí strukturální indukce nad `xs`.

## LP/Prolog

1. `notmem(+Val,+List)`: selže, pokud je prvek v seznamu; lze použít `!` a `fail`.
2. Dynamická paměť klíč-hodnota `keyval(Key, Val)`:
   - zadané `Key` i `Val`: ověří nebo vloží dvojici,
   - zadaný jen `Key`: najde hodnotu,
   - zadaná jen `Val`: najde všechny klíče,
   - oba argumenty proměnné: vypisuje uložené dvojice.
3. `remKey(Key)`: odstraní klíč z paměti, selže pokud neexistuje.
4. `remAll`: odstraní všechny uložené dvojice a uspěje právě jednou.
5. `destr/2`: zanořené seznamy zploští do obyčejného seznamu.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
