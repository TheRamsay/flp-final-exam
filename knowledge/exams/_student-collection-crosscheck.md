# Studentská sbírka - cross-check import

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `raw only` |
| Primární zdroj | [[raw/FLP studentská sbírka úloh|FLP studentská sbírka úloh]] |
| Import | normalizace do `knowledge/exams/**`, bez přepisování silnějších zdrojů |

## Výsledek porovnání

Bez konfliktu se stávající bází:

- [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 - předtermín]]: Haskell část i Prolog Turingův stroj sedí se stávajícím `pin exact` záznamem; sbírka navíc obsahuje studentská řešení.
- [[knowledge/exams/2021-2022/term-0-special|2021/2022 - speciální/předtermín]]: obsahově sedí lambda LT, Haskell `mid`, IO trim a důkaz `concat xs ++ ys = foldr (:) ys xs`; sbírka používá label `termin`.
- [[knowledge/exams/2020-2021/term-1-radny|2020/2021 - řádný termín]]: Haskell aritmetické výrazy, důkaz `all = foldr (&&) True` a Prolog magické čtverce sedí; sbírka navíc obsahuje rozpracovaná řešení.

Nově přidané raw-only termíny:

- 2022/2023 řádný: Prolog `prime/1`; FP část ve sbírce chybí.
- 2021/2022 řádný a 1. opravný.
- 2020/2021 1. opravný a 2. opravný.
- 2019/2020 předtermín, řádný, 1. opravný.
- 2018/2019 řádný, 1. opravný, 2. opravný.
- 2017/2018 řádný, 1. opravný.
- 2016/2017 řádný.

## Nejasnosti a opatrnost

- Sbírka míchá Haskell, Prolog, lambda kalkul a důkazy v oddělených kapitolách. Termíny byly při importu sloučeny podle roku a labelu, ale u starých ročníků může být label posunutý nebo neúplný.
- Některé sekce obsahují hlavně studentská řešení, ne přesné zadání. V normalizovaných stránkách jsou proto zapsané jen stabilní části zadání.
- U historických Prolog částí platí aktuální caveat: pro 2025/2026 je Prolog nahrazen Rustem.
