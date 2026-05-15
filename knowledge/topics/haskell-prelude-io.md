# Haskell Prelude a IO

## Funkce, které se v signálech explicitně objevily

- Seznamy: `foldr`, `foldl`, `map`, `filter`, `concat`, `concatMap`, `elem`, `span`, `take`, `drop`, `head`, `tail`.
- Řetězce: `lines`, `unlines`, `words`, `unwords`, `read`, `show`.
- Tuple: `fst`, `snd`.
- IO: `openFile`, `hGetContents`, `hPutStr`, `hClose`, `putStr`, `putStrLn`, `putChar`.

## Typický IO pattern

```haskell
action :: FilePath -> FilePath -> IO ()
action input output = do
  hIn <- openFile input ReadMode
  content <- hGetContents hIn
  hOut <- openFile output WriteMode
  hPutStr hOut (transform content)
  hClose hOut
  hClose hIn
```

## Historické IO rodiny

| Rodina | Tvar vstupu/výstupu | Zdrojové vzory |
|---|---|---|
| Řádky a statistika | trim, délka, počet prázdných řádků, číslování | [[knowledge/exams/2021-2022/term-0-special|2021/2022 speciální]], [[knowledge/exams/2021-2022/term-2-prvni-opravny-student|2021/2022 1. opravný]], [[knowledge/exams/2020-2021/term-2-prvni-opravny-student|2020/2021 1. opravný]] |
| Lookup podle klíče | řádky `key:value`, hledání nebo převod na strukturu | [[knowledge/exams/2020-2021/term-3-druhy-opravny-student|2020/2021 2. opravný]], [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024/2025 předtermín]] |
| Záznamy a report | validní login, `Integer#String`, filtrovaný výpis | [[knowledge/exams/2017-2018/term-2-prvni-opravny-student|2017/2018 1. opravný]], [[knowledge/exams/2017-2018/term-1-radny-student|2017/2018 řádný]] |
| Strukturální vstup | graf, DFA pravidla, výraz nebo lambda výraz | [[knowledge/exams/2019-2020/term-0-pretermin-student|2019/2020 předtermín]], [[knowledge/exams/2021-2022/term-1-radny-student|2021/2022 řádný]], [[knowledge/exams/2024-2025/term-1-radny-photo|2024/2025 řádný]] |
| Přepis souboru | změnit obsah po řádcích a zachovat pořadí | [[knowledge/exams/2016-2017/term-1-radny-student|2016/2017 řádný]] |

## Pozor

- Monadic do-notation se používá jen pro IO, ne jako obecný zápis nad seznamy.
- Pokud zadání říká holý Haskell, nepředpokládej `++`, `head`, `tail`, pokud nejsou dané nebo si je nedefinuješ.

## Zdroje

- Aktuální požadavek znát Prelude a IO funkce: [[knowledge/exams/2025-2026/current-format|2025-2026 - aktuální formát]].
- Historické IO úlohy: [[knowledge/exams/2024-2025/term-1-radny-photo|2024-2025 řádný]] - `wr`, [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024-2025 předtermín]] - `readf`, [[knowledge/exams/2023-2024/term-2-prvni-opravny-photo|2023-2024 1. opravný]] - `fx`, [[knowledge/exams/2021-2022/term-0-special|2021-2022 speciální termín]] - trim řádků.
- Starší IO varianty jsou shrnuté v [[knowledge/exams/overview|Přehledu termínů]].
