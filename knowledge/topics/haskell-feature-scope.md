# Haskell feature scope

## Must know

Tyhle věci se v zadáních nebo aktuálních signálech opakují přímo.

### Základní syntaxe

- typové signatury: `f :: A -> B`,
- definice funkcí přes rovnice,
- pattern matching na seznamech a vlastních datových typech,
- guards: `| podminka = ...`,
- `if then else`,
- `let ... in ...`,
- `where`,
- `case ... of`,
- lambda výraz `\x -> ...`.

### Datové typy

- `data` pro výčtové typy: `Grade = A | B | ...`,
- `data` pro rekurzivní typy: strom, výraz, lambda výraz,
- konstruktory s argumenty,
- `deriving (Eq, Ord, Show)` podle potřeby,
- typové parametry: `Tree k v`, `[a]`, `Maybe a`.

### Seznamy

- `[]`, `x:xs`, `++`,
- rekurze nad seznamem,
- list comprehension,
- práce bez duplicit přes `elem`,
- množinové operace nad seznamy: `union`, `symd`, rozdíl,
- základní funkce: `map`, `filter`, `foldr`, `foldl`, `concat`, `concatMap`, `span`, `take`, `drop`.

### Stromy a výrazové AST

- BST invariant,
- `insert`/`ins`,
- `find`/`lookupT`,
- `eval`,
- pretty-print s precedencí,
- volné proměnné ve výrazech.

### `Maybe`, dvojice, porovnávání

- `Maybe a`, `Just`, `Nothing`,
- dvojice `(a,b)`, `fst`, `snd`,
- constraints `Eq a =>`, `Ord a =>`, `Show a =>`,
- porovnání přes `==`, `<`, `>`.

### String a parsing v jednoduchém režimu

- `String` jako `[Char]`,
- `lines`, `unlines`,
- `words`, `unwords`,
- `read`, `show`,
- jednoduché parsování po znacích nebo podle oddělovače.

### IO

- `IO ()`, `IO a`,
- `do` notace,
- `<-` pro výsledek IO akce,
- `let` uvnitř `do`,
- `readFile`,
- `putStr`, `putStrLn`, `putChar`,
- `openFile`, `hGetContents`, `hPutStr`, `hClose`, `ReadMode`, `WriteMode`.

### Důkazy

- strukturální indukce nad seznamem,
- indukce nad `n` + seznamem u `take/drop`,
- přepis podle definic,
- důkazy s `foldr`, `foldl`, `++`,
- silnější indukční hypotéza u akumulačních funkcí.

## Stačí umět pasivně nebo jen v základním režimu

Tyhle věci se můžou hodit, ale zatím nevypadají jako hlavní zdroj bodů.

- `newtype` a `type` aliasy,
- record syntax,
- operátorová priorita pro vlastní operátory,
- `Either`,
- `Enum`/`Bounded` pro průchod výčtovým typem,
- jednoduché higher-order funkce mimo `map`/`filter`/`fold`,
- základní lazy lists, hlavně nekonečný Fibonacci list.

## Spíš mimo scope pro zkoušku

Tohle bych netrénoval, pokud už neumíš must-know část.

- monad theory mimo praktické `IO do`,
- monad transformers,
- applicative styl `<$>`, `<*>`,
- functor/applicative/monad instance,
- type classes vlastní implementované od nuly,
- GADTs, DataKinds, TypeFamilies,
- lenses,
- advanced parser combinators,
- Template Haskell,
- strictness/performance tuning,
- concurrency/STM/async,
- cabal/stack projektová struktura,
- QuickCheck/Hspec,
- importy z `Data.Map`, `Data.Set`, `Data.List` jako hlavní řešení.

## Největší pozor

1. Když zadání řekne **holý Haskell**, nespoléhej automaticky na helpery jako `++`, `head`, `tail`, pokud nejsou povolené nebo dané.
2. Když zadání dovolí Prelude, pořád nepředpokládej specializované knihovny.
3. U IO nejdřív napiš čistou transformaci a teprve potom obal `IO`.
4. U `foldl`/akumulátorů bývá potřeba silnější indukční tvrzení než přesně to, které je v zadání.
