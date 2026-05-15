# 2021/2022 - řádný termín, studentská sbírka

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], Haskell `Riadny`, Prolog `Riadny` |

## Zdroje

- Studentská sbírka, Haskell řádky 189-305.
- Studentská sbírka, Prolog řádky 1460-1527.

## FP/Haskell

1. Definovat zásobník s konstantním přístupem k délce:
   `empty`, `top`, `push`, `pop`, `len`.
2. Definovat `pushStr`, která vloží řetězec na zásobník.
3. Definovat `popStr`, která odebere řetězec ze zásobníku, pokud se shoduje.
4. Definovat datovou strukturu pro pravidla deterministického konečného automatu.
5. IO úloha: zpracovat soubor do vnitřní reprezentace pravidel automatu.
6. Bonus: `isRuleApplicable` pro nalezení aplikovatelného pravidla deterministického konečného automatu.

## LP/Prolog

Lambda kalkul v Prologu:

1. Reprezentace lambda výrazu přes `var(V)`, `app(E1,E2)`, `abs(V,E)`.
2. `fv/2`: množina volných proměnných.
3. Test, zda je substituce validní vzhledem k volným a vázaným proměnným.
4. `isEta/1`: detekce eta redukce někde ve výrazu.

## Poznámka

Sbírka uvádí odkaz na podobné zadání `riadny 19/20`; status je proto jen `raw only`.


## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
