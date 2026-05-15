# 2021/2022 - speciální/předtermín

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `pin exact` |
| Primární zdroj | Discord pin `959496107271028746`, 1. 4. 2022 |

## Zdroje

- Normalizovaný digest: [[raw/manual/pin-assignments|pin assignments]], sekce `2021/2022 - speciální/předtermín`.
- Primární signál: Discord pin `959496107271028746`, 1. 4. 2022.
- Doplňkový raw signál: [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]], label `termin`; obsahově sedí s tímto záznamem.

## FP/Haskell

1. Lambda-kalkul: operátor pevného bodu pro LT. K dispozici `iszero`, `prev`, reprezentace celých čísel; zbytek bylo třeba navrhnout.
2. Haskell `mid`: pro seřaditelný seznam vrátí hodnotu, která seznam rozdělí na menší a větší prvky s délkami lišícími se nejvýše o 1.
3. Důkaz:

```haskell
concat xs ++ ys = foldr (:) ys xs
```

pro konečné `xs` a `ys`.

4. Haskell IO: načíst soubor, každý řádek trimovat, vypsat `delka:radek` a na konec `pocet_radku/pocet_prazdnych_po_trimu`.

## LP/Prolog

1. Pro seznam množin vypsat doplněk každé množiny vůči univerzu vzniklému sjednocením všech množin.
2. `splt(P,A,AT,AF)` jako `span`: `AT` je souvislý prefix splňující predikát `P`, `AF` zbytek seznamu.
3. Fragment: vyhledání všech klíčů ve stromě, které se vážou k dané hodnotě.
4. Fragment: krok/cesta v nekonečném stavovém prostoru.

## Aktuální relevance

- FP/Haskell, lambda a důkazové části ber jako historický trénink stylu zadání a ručního řešení.
- LP/Prolog část je pro 2025/2026 jen historický vzor; druhou praktickou část nahrazuje Rust.
- U statusu `raw only` používej zadání jako slabší signál než `pin exact` nebo `photo transcript`.
