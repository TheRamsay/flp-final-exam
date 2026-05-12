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
