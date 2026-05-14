# 2020/2021 - řádný termín

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `pin exact` |
| Primární zdroj | Discord pin `842402024532475915`, 13. 5. 2021 |

## Zdroje

- Normalizovaný digest: [[raw/manual/pin-assignments|pin assignments]], sekce `2020/2021 - řádný termín`.
- Primární signál: Discord pin `842402024532475915`, 13. 5. 2021.

## FP

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

## LP

Magické čtverce:

1. Reprezentace matice.
2. Doplnit hodnotu na pozici `x,y`.
3. Dopočítat zbylou matici.
