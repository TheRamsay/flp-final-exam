# 2021/2022 - speciální/předtermín

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `pin exact` |
| Primární zdroj | Discord pin `959496107271028746`, 1. 4. 2022 |

## FP

1. Lambda-kalkul: operátor pevného bodu pro LT. K dispozici `iszero`, `prev`, reprezentace celých čísel; zbytek bylo třeba navrhnout.
2. Haskell `mid`: pro seřaditelný seznam vrátí hodnotu, která seznam rozdělí na menší a větší prvky s délkami lišícími se nejvýše o 1.
3. Důkaz:

```haskell
concat xs ++ ys = foldr (:) ys xs
```

pro konečné `xs` a `ys`.

4. Haskell IO: načíst soubor, každý řádek trimovat, vypsat `delka:radek` a na konec `pocet_radku/pocet_prazdnych_po_trimu`.

## LP

1. Pro seznam množin vypsat doplněk každé množiny vůči univerzu vzniklému sjednocením všech množin.
2. `splt(P,A,AT,AF)` jako `span`: `AT` je souvislý prefix splňující predikát `P`, `AF` zbytek seznamu.
3. Fragment: vyhledání všech klíčů ve stromě, které se vážou k dané hodnotě.
4. Fragment: krok/cesta v nekonečném stavovém prostoru.
