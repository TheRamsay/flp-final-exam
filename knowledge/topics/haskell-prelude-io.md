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

## Pozor

- Monadic do-notation se používá jen pro IO, ne jako obecný zápis nad seznamy.
- Pokud zadání říká holý Haskell, nepředpokládej `++`, `head`, `tail`, pokud nejsou dané nebo si je nedefinuješ.

## Zdroje

- Aktuální požadavek znát Prelude a IO funkce: [[knowledge/exams/2025-2026/current-format|2025-2026 - aktuální formát]].
- Historické IO úlohy: [[knowledge/exams/2024-2025/term-1-radny-photo|2024-2025 řádný]] - `wr`, [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024-2025 předtermín]] - `readf`, [[knowledge/exams/2023-2024/term-2-prvni-opravny-photo|2023-2024 1. opravný]] - `fx`, [[knowledge/exams/2021-2022/term-0-special|2021-2022 speciální termín]] - trim řádků.
