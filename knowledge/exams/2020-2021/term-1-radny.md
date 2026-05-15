# 2020/2021 - řádný termín

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `pin exact` |
| Primární zdroj | Discord pin `842402024532475915`, 13. 5. 2021 |

## Zdroje

- Normalizovaný digest: [[raw/manual/pin-assignments|pin assignments]], sekce `2020/2021 - řádný termín`.
- Primární signál: Discord pin `842402024532475915`, 13. 5. 2021.
- Doplňkový raw signál: [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]]; Haskell, důkaz i Prolog část sedí se stávajícím záznamem a sbírka navíc obsahuje studentská řešení.

## FP/Haskell

1. Haskell: definovat datový typ pro aritmetické operace `+` a `-`.
2. Funkce `eval` pro vyhodnocování aritmetických operací.
3. Funkce `load`: načíst ze souboru prefixový tvar operace do datového typu.
4. Důkaz:

```haskell
all xs = foldr (&&) True xs
```

při definici:

```haskell
all [] = True
all (x:xs) = x && all xs
```

5. Lambda-kalkul: definovat `xor`, `true`, `false`.
6. Bonus: obousměrně vázaný seznam a funkce pro zjištění délky; prvky se neopakují.

## LP/Prolog

Magické čtverce:

1. Reprezentace matice.
2. Doplnit hodnotu na pozici `x,y`.
3. Dopočítat zbylou matici.

## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
