const tasks = [
  {
    id: "free-vars",
    topic: "data",
    tag: "Datové typy",
    title: "Lambda výrazy a volné proměnné",
    source: "2024/2025 řádný, Haskell část",
    sourcePath: "knowledge/exams/2024-2025/term-1-radny-photo.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Původní téma: lambda AST, množinové operace a fv; pevné názvy jsou přidané kvůli testům.",
    checkId: "freeVars",
    concepts: ["datové typy", "rekurze", "seznamové množiny", "volné proměnné"],
    make(rng) {
      const helper = pick(rng, ["union", "minus", "insertUniq"]);
      return {
        subtitle: `Přesné názvy pro test: LExp, Var, Lam, App, fv. Pomocná funkce se může jmenovat ${helper}.`,
        text: `Cílem je modelovat lambda výraz jako jednoduchý AST a spočítat jeho volné proměnné.

Lambda výraz v tomhle drillu má jen tři tvary:
- proměnná,
- lambda abstrakce, která váže jednu proměnnou v těle,
- aplikace jednoho výrazu na druhý.

Definuj typ přesně s těmito názvy konstruktorů:

data LExp = Var String | Lam String LExp | App LExp LExp

Požadavky:
- doplň vhodné odvozené instance,
- definuj union :: Eq a => [a] -> [a] -> [a] pro seznamy bez duplicit,
- definuj fv :: LExp -> [String],
- výsledek fv ber jako množinu reprezentovanou seznamem bez duplicit,
- u Var je proměnná volná,
- u App jsou volné proměnné sjednocením obou podvýrazů,
- u Lam jméno vázané lambdou už ve výsledku volné být nesmí.

Příklad očekávaného chování:

fv (Var "x") == ["x"]
fv (Lam "x" (Var "x")) == []
fv (Lam "x" (App (Var "x") (Var "y"))) == ["y"]

Nepoužívej importy.`,
        rubric: [
          "Typ má přesně konstruktory Var, Lam a App.",
          "union nevrací duplicity a funguje i pro prázdný seznam.",
          "Lam odstraní vázanou proměnnou z výsledku těla.",
          "App spojí volné proměnné obou podvýrazů množinově.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
data LExp = Var String | Lam String LExp | App LExp LExp
  deriving (Eq, Show)

insertUniq x xs =
  if elem x xs then xs else x : xs

union [] ys = ys
union (x:xs) ys = union xs (insertUniq x ys)

remove _ [] = []
remove x (y:ys)
  | x == y = remove x ys
  | otherwise = y : remove x ys

fv (Var x) = [x]
fv (Lam x e) = remove x (fv e)
fv (App a b) = union (fv a) (fv b)
\`\`\`

Klíčový bod je případ \`Lam\`: proměnná vázaná abstrakcí se nesmí objevit ve výsledku \`fv\`.`,
      };
    },
  },
  {
    id: "sets",
    topic: "lists",
    tag: "Seznamy",
    title: "Množiny jako seznamy",
    source: "2024/2025 řádný, Haskell část",
    sourcePath: "knowledge/exams/2024-2025/term-1-radny-photo.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází z množinové části starého zadání, ale je zúžené na samostatný drill.",
    checkId: "sets",
    concepts: ["base cases", "rekurze", "Eq", "duplicity"],
    make(rng) {
      const order = pick(rng, ["pořadí prvního výskytu", "nejdřív prvky levé množiny", "stabilní pořadí zleva"]);
      return {
        subtitle: `Reprezentace bez duplicit, ${order}.`,
        text: `Množiny reprezentuj seznamy bez duplicit.

1. Definuj union :: Eq a => [a] -> [a] -> [a].
2. Definuj symd :: Eq a => [a] -> [a] -> [a] pro symetrický rozdíl.
3. Připiš 3 malé příklady vstup-výstup v komentáři.

Nepoužívej Data.List ani jiné importy.`,
        rubric: [
          "union pokryje prázdné vstupy a nezavádí duplicity.",
          "symd vrací prvky, které jsou právě v jedné ze vstupních množin.",
          "Typy jsou obecné přes Eq a.",
          "Příklady odpovídají zvolené reprezentaci.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
add x xs =
  if elem x xs then xs else x : xs

union [] ys = ys
union (x:xs) ys = union xs (add x ys)

inter x xs = elem x xs

symd xs ys =
  [x | x <- union xs ys, not (elem x xs && elem x ys)]
\`\`\`

U množin jako seznamů je nejdůležitější invariant **bez duplicit**. Pořadí může být jiné, pokud je konzistentní a vysvětlitelné.`,
      };
    },
  },
  {
    id: "bst",
    topic: "io",
    tag: "IO + strom",
    title: "Tabulka ze souboru do BST",
    source: "2024/2025 předtermín, Haskell fragment",
    sourcePath: "knowledge/exams/2024-2025/term-0-pretermin-photo-fragment.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází z fragmentu se stromem/IO; API je zpřesněné pro post-hoc test.",
    checkId: "bst",
    concepts: ["BST invariant", "Maybe", "rekurze", "IO rozhraní"],
    make(rng) {
      const sep = pick(rng, [":", "=", "|"]);
      return {
        subtitle: `Přesné názvy pro test: Tree, empty, ins, lookupT. Oddělovač v IO části: ${sep}`,
        text: `Definuj binární vyhledávací strom:

data Tree k v = ...
empty :: Tree k v
ins :: Ord k => k -> v -> Tree k v -> Tree k v
lookupT :: Ord k => k -> Tree k v -> Maybe v

Požadavky:
- ins vloží dvojici klíč-hodnota,
- při existujícím klíči hodnotu nahradí,
- lookupT vrací Nothing pro chybějící klíč,
- doplň readTable :: FilePath -> IO (Tree Int String).

Soubor má na každém řádku tvar k${sep}v. Vstup je korektní.
Nepoužívej importy.`,
        rubric: [
          "Tree má prázdný a neprázdný konstruktor.",
          "ins zachovává BST invariant a přepisuje duplicitní klíč.",
          "lookupT pokrývá všechny větve a vrací Maybe.",
          "IO část odděluje načtení souboru od čistého parsování.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
data Tree k v = Empty | Node k v (Tree k v) (Tree k v)
  deriving (Eq, Show)

empty = Empty

ins k v Empty = Node k v Empty Empty
ins k v (Node k0 v0 l r)
  | k < k0 = Node k0 v0 (ins k v l) r
  | k > k0 = Node k0 v0 l (ins k v r)
  | otherwise = Node k v l r

lookupT _ Empty = Nothing
lookupT k (Node k0 v0 l r)
  | k < k0 = lookupT k l
  | k > k0 = lookupT k r
  | otherwise = Just v0
\`\`\`

IO část si napiš jako tenký wrapper nad čistým parserem řádku a \`foldr\`/rekurzivním skládáním stromu.`,
      };
    },
  },
  {
    id: "histogram",
    topic: "data",
    tag: "Datové typy",
    title: "Histogram známek",
    source: "2025/2026 půlsemestrálka signál",
    sourcePath: "knowledge/exams/2025-2026/pulsemka-2026-signal.md",
    sourceKind: "signal",
    sourceLabel: "signál",
    sourceNote: "Není staré zkouškové zadání. Je to drill podle letošního signálu na datové typy a histogram.",
    checkId: "histogram",
    concepts: ["výčtový typ", "fold", "četnosti", "String výstup"],
    make(rng) {
      const outputName = pick(rng, ["ht", "showHist", "histText"]);
      return {
        subtitle: `Přesné názvy pro test: Grade, Result, hist. Textovou funkci nazvi ${outputName}.`,
        text: `Definuj:

data Grade = A | B | C | D | E | F
data Result = Result String Grade

1. Doplň vhodné odvozené instance.
2. Definuj hist :: [Result] -> [(Grade, Int)].
3. Výsledek hist vracej v pořadí A-F a známky s nulovou četností vynech.
4. Definuj ${outputName} :: [Result] -> String ve formátu:

A: 3
B: 1

Nepoužívej importy.`,
        rubric: [
          "Grade je konečný výčtový typ s použitelnou rovností.",
          "Result obsahuje identifikátor a známku.",
          "hist počítá četnosti čistě a nevrací nulové řádky.",
          "Textová funkce jen formátuje už spočítaný histogram.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
data Grade = A | B | C | D | E | F
  deriving (Eq, Ord, Show)
data Result = Result String Grade
  deriving (Eq, Show)

grades = [A,B,C,D,E,F]

gradeOf (Result _ g) = g

countGrade _ [] = 0
countGrade g (r:rs) =
  (if gradeOf r == g then 1 else 0) + countGrade g rs

hist rs = [(g,n) | g <- grades, let n = countGrade g rs, n > 0]

${outputName} rs = unlines [show g ++ ": " ++ show n | (g,n) <- hist rs]
\`\`\`

Nejčistší řešení má oddělené počítání četností od formátování textu.`,
      };
    },
  },
  {
    id: "take-drop-proof",
    topic: "proof",
    tag: "Důkaz",
    title: "take/drop",
    source: "2023/2024 první opravný, Haskell část",
    sourcePath: "knowledge/exams/2023-2024/term-2-prvni-opravny-photo.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Téma take/drop bylo nalezené ve staré zkoušce; formulace je normalizovaná pro cvičení.",
    checkId: null,
    concepts: ["indukce", "++", "případy", "definice funkcí"],
    make() {
      return {
        subtitle: "Strukturální indukce s případem n = 0.",
        text: `Mějme definováno:

take 0 xs = []
take _ [] = []
take n (x:xs) = x : take (n-1) xs

drop 0 xs = xs
drop _ [] = []
drop n (x:xs) = drop (n-1) xs

Dokaž:

take n xs ++ drop n xs = xs

pro všechna nezáporná n a konečné seznamy xs.
Uvažuj nutné případy tak, aby bylo jasné, kdy používáš indukční předpoklad.`,
        rubric: [
          "Případ n = 0 je rozepsaný samostatně.",
          "Případ xs = [] je rozepsaný samostatně.",
          "Krok pro n > 0 a xs = x:xs' vede na IP pro n-1 a xs'.",
          "Použití definice ++ je explicitní.",
        ],
        reference: `Kostra důkazu:

1. **Případ \`n = 0\`**:

\`\`\`text
take 0 xs ++ drop 0 xs
= [] ++ xs
= xs
\`\`\`

2. **Případ \`xs = []\`** pro \`n > 0\`:

\`\`\`text
take n [] ++ drop n []
= [] ++ []
= []
\`\`\`

3. **Krok \`n > 0\`, \`xs = x:xs'\`**:

\`\`\`text
take n (x:xs') ++ drop n (x:xs')
= (x : take (n-1) xs') ++ drop (n-1) xs'
= x : (take (n-1) xs' ++ drop (n-1) xs')
= x : xs'                 -- IP
\`\`\``,
      };
    },
  },
  {
    id: "fold-proof",
    topic: "proof",
    tag: "Důkaz",
    title: "concat přes foldr",
    source: "2024/2025 řádný bonus, Haskell část",
    sourcePath: "knowledge/exams/2024-2025/term-1-radny-photo.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Téma ccat/con je ze starého bonusu; podobný foldr důkaz se objevuje i v 2021/2022.",
    checkId: null,
    concepts: ["foldr", "indukce", "asociativita", "definice ++"],
    make() {
      return {
        subtitle: "Důkaz nad seznamem seznamů.",
        text: `Mějme:

ccat [] = []
ccat (xs:xss) = xs ++ ccat xss

con = foldr (++) []

Dokaž:

ccat xss = con xss

pro všechny konečné seznamy seznamů xss.
Piš kroky rovnosti a označ použití indukčního předpokladu.`,
        rubric: [
          "Báze prázdného seznamu je vyhodnocená na obou stranách.",
          "Indukční krok rozepíše ccat i foldr.",
          "IP je použitá na ocasu xss.",
          "Pokud používáš vlastnost ++, je pojmenovaná a potřebná.",
        ],
        reference: `Kostra důkazu indukcí podle \`xss\`:

\`\`\`text
Báze:
ccat []
= []
= foldr (++) [] []
= con []

Krok xss = xs:xss', IP: ccat xss' = con xss'
ccat (xs:xss')
= xs ++ ccat xss'
= xs ++ con xss'          -- IP
= foldr (++) [] (xs:xss')
= con (xs:xss')
\`\`\`

Tady je důležité neplést indukci nad vnějším seznamem seznamů s indukcí nad jedním \`xs\`.`,
      };
    },
  },
  {
    id: "words-by-length",
    topic: "io",
    tag: "IO",
    title: "Skupiny slov podle délky",
    source: "2023/2024 první opravný, Haskell IO",
    sourcePath: "knowledge/exams/2023-2024/term-2-prvni-opravny-photo.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází z nalezené IO úlohy se seskupováním slov; názvy funkcí se generují.",
    checkId: null,
    typecheckOnly: true,
    concepts: ["IO", "čisté jádro", "rekurze", "formátování"],
    make(rng) {
      const fn = pick(rng, ["fx", "groupWords", "printGroups"]);
      return {
        subtitle: `Hlavní IO akce: ${fn} :: FilePath -> IO ().`,
        text: `Definuj:

${fn} :: FilePath -> IO ()

Akce načte soubor, rozdělí obsah na slova a vypíše slova do skupin podle délky.

Požadavky:
- skupiny vypisuj od nejkratší po nejdelší,
- na pořadí slov uvnitř skupiny nezáleží,
- před každou skupinu uveď její délku,
- prázdný soubor ošetři rozumně.

Použij Prelude a běžné IO funkce, bez importů.`,
        rubric: [
          "Čistá část umí zařadit slova podle délky.",
          "Výpis je seřazen podle délky.",
          "IO akce je krátká a skládá čisté funkce.",
          "Prázdný vstup nepadá na pattern match.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
insertWord w [] = [(length w, [w])]
insertWord w ((n,ws):gs)
  | length w == n = (n, w:ws) : gs
  | length w < n = (length w, [w]) : (n,ws) : gs
  | otherwise = (n,ws) : insertWord w gs

groups = foldr insertWord []

showGroup (n,ws) = show n ++ ": " ++ unwords ws

${fn} path = do
  s <- readFile path
  putStr (unlines (map showGroup (groups (words s))))
\`\`\`

V zadání na papír stačí držet tvar: čisté \`groups\` a malý IO wrapper.`,
      };
    },
  },
  {
    id: "expr-pp",
    topic: "data",
    tag: "Datové typy",
    title: "Pretty-print aritmetického výrazu",
    source: "2022/2023 předtermín, Haskell styl",
    sourcePath: "knowledge/exams/2022-2023/term-0-pretermin.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází ze starého tématu výrazů a pretty-printu; operátory se variantují.",
    checkId: null,
    typecheckOnly: true,
    concepts: ["AST", "precedence", "rekurze", "prostředí"],
    make(rng) {
      const ops = pick(rng, ["sčítání a násobení", "sčítání a odčítání", "sčítání, násobení a negace"]);
      return {
        subtitle: `Operátory: ${ops}.`,
        text: `1. Definuj datový typ pro celočíselné aritmetické výrazy: konstanta, proměnná a ${ops}.
2. Definuj eval pro prostředí reprezentované seznamem dvojic (jméno, hodnota).
3. Definuj pp :: Expr -> String s minimálním nutným závorkováním.

Příklad stylu:

(1+2)*3
1+2+3

Pokud si nejsi jistý prioritami, napiš je explicitně jako pomocnou funkci.`,
        rubric: [
          "Datový typ odpovídá všem operátorům v zadání.",
          "eval korektně rekurzuje a řeší proměnné z prostředí.",
          "pp používá precedenci nebo kontext.",
          "Asociativita je konzistentní.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
data Expr
  = Const Int
  | Var String
  | Add Expr Expr
  | Mul Expr Expr
  deriving (Eq, Show)

lookupEnv x ((y,v):ys)
  | x == y = v
  | otherwise = lookupEnv x ys

eval env (Const n) = n
eval env (Var x) = lookupEnv x env
eval env (Add a b) = eval env a + eval env b
eval env (Mul a b) = eval env a * eval env b

pp = ppPrec 0
\`\`\`

U pretty-printu si nejdřív napiš pomocnou funkci s kontextovou prioritou, jinak se v závorkách rychle ztratíš.`,
      };
    },
  },
  {
    id: "readh",
    topic: "lists",
    tag: "Seznamy",
    title: "Hex řetězec na číslo",
    source: "2024/2025 předtermín, Haskell část",
    sourcePath: "knowledge/exams/2024-2025/term-0-pretermin-photo-fragment.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází ze staré úlohy `readh`; formulace je zúžená na samostatný testovatelný drill.",
    checkId: "readh",
    concepts: ["rekurze", "Char", "akumulátor", "Prelude"],
    make(rng) {
      const helper = pick(rng, ["digit", "hexVal", "value"]);
      return {
        subtitle: `Přesný název pro test: readh. Pomocnou funkci můžeš nazvat ${helper}.`,
        text: `Definuj:

readh :: String -> Integer

Vstup je validní hexadecimální řetězec s číslicemi 0-9 a velkými písmeny A-F.

Požadavky:
- "0" se převede na 0,
- "A" se převede na 10,
- "10" se převede na 16,
- "1F" se převede na 31,
- řešení piš bez importů.

Použij Prelude a běžné porovnávání znaků.`,
        rubric: [
          "Pomocná funkce správně mapuje znaky 0-9 a A-F.",
          "Rekurze nebo fold násobí akumulátor základem 16.",
          "Prázdný zbytek řetězce vrací akumulátor nebo 0 podle zvolené definice.",
          "Výsledný typ je Integer, ne String.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
readh :: String -> Integer
digit '0' = 0
digit '1' = 1
-- ...
digit '9' = 9
digit 'A' = 10
-- ...
digit 'F' = 15

readh = go 0
  where
    go acc [] = acc
    go acc (c:cs) = go (16 * acc + digit c) cs
\`\`\`

Nejčastější chyba je sčítat číslice bez násobení dosavadního akumulátoru šestnácti.`,
      };
    },
  },
  {
    id: "lfi",
    topic: "lists",
    tag: "Seznamy",
    title: "Nekonečný Fibonacci list",
    source: "2024/2025 předtermín, Haskell část",
    sourcePath: "knowledge/exams/2024-2025/term-0-pretermin-photo-fragment.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází ze staré úlohy `lfi :: [Integer]`; test očekává začátek 0,1,1,2,...",
    checkId: "lfi",
    concepts: ["lazy list", "rekurze", "Prelude", "nekonečná data"],
    make(rng) {
      const style = pick(rng, ["přes pomocnou funkci", "pomocí zipWith", "jako samostatnou definici"]);
      return {
        subtitle: `Přesný název pro test: lfi :: [Integer]. Doporučený styl: ${style}.`,
        text: `Definuj:

lfi :: [Integer]

Má to být nekonečný seznam Fibonacciho posloupnosti:

0, 1, 1, 2, 3, 5, 8, ...

Požadavky:
- definice musí být produktivní,
- \`take 10 lfi\` má vrátit prvních deset prvků,
- nepoužívej importy.`,
        rubric: [
          "Seznam začíná přesně 0, 1, 1, 2.",
          "Definice je nekonečná a funguje s take.",
          "Neprobíhá výpočet celé nekonečné struktury najednou.",
          "Typ je [Integer].",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
lfi :: [Integer]
lfi = 0 : 1 : zipWith (+) lfi (tail lfi)
\`\`\`

Alternativa bez \`zipWith\`:

\`\`\`haskell
lfi = fibs 0 1
  where
    fibs a b = a : fibs b (a + b)
\`\`\``,
      };
    },
  },
  {
    id: "mid",
    topic: "lists",
    tag: "Seznamy",
    title: "Pivot rozdělující seznam",
    source: "2021/2022 speciální/předtermín, Haskell část",
    sourcePath: "knowledge/exams/2021-2022/term-0-special.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází z úlohy `mid`; test kontroluje vlastnost pivotu, ne konkrétní algoritmus.",
    checkId: "mid",
    concepts: ["Ord", "seznamy", "rekurze", "invariant"],
    make(rng) {
      const strategy = pick(rng, ["seřadit a vzít prostředek", "počítat menší/větší prvky", "pomocný insert sort"]);
      return {
        subtitle: `Přesný název pro test: mid :: Ord a => [a] -> a. Možná strategie: ${strategy}.`,
        text: `Definuj:

mid :: Ord a => [a] -> a

Funkce pro neprázdný seznam vrátí hodnotu pivotu tak, že počet prvků menších než pivot a počet prvků větších než pivot se liší nejvýše o 1.

Požadavky:
- vstup je neprázdný,
- můžeš předpokládat, že testovací vstupy nemají duplicity,
- nepoužívej importy.`,
        rubric: [
          "Signatura je polymorfní přes Ord a.",
          "Řešení funguje pro lichou i sudou délku.",
          "Nepoužívá knihovní sort z Data.List.",
          "Hraniční případ singleton vrací jediný prvek.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
insert x [] = [x]
insert x (y:ys)
  | x <= y = x:y:ys
  | otherwise = y : insert x ys

sort' [] = []
sort' (x:xs) = insert x (sort' xs)

at 0 (x:_) = x
at n (_:xs) = at (n-1) xs

mid xs = at (length xs \`div\` 2) (sort' xs)
\`\`\`

Na papíře je důležité napsat, jak řešíš sudou délku. Test akceptuje libovolný pivot splňující rozdíl délek nejvýše o 1.`,
      };
    },
  },
  {
    id: "expr-eval",
    topic: "data",
    tag: "Datové typy",
    title: "Aritmetický výraz a eval",
    source: "2020/2021 řádný, Haskell část",
    sourcePath: "knowledge/exams/2020-2021/term-1-radny.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází ze starého zadání s aritmetickými operacemi; `load` je bonusově popsaný, testuje se `eval`.",
    checkId: "exprEval",
    concepts: ["AST", "rekurze", "pattern matching", "eval"],
    make(rng) {
      const loadShape = pick(rng, ["prefixový tvar", "řádkový prefix", "jednoduchý token stream"]);
      return {
        subtitle: `Přesné názvy pro test: Expr, Val, Add, Sub, eval. Bonusový load formát: ${loadShape}.`,
        text: `Definuj:

data Expr = Val Int | Add Expr Expr | Sub Expr Expr
eval :: Expr -> Int

Požadavky:
- \`eval (Val n)\` vrátí n,
- \`Add\` sčítá výsledky podvýrazů,
- \`Sub\` odečítá výsledky podvýrazů,
- stručně popiš, jak bys doplnil load pro prefixový zápis.

Nepoužívej importy.`,
        rubric: [
          "Typ má přesně konstruktory Val, Add a Sub.",
          "eval rekurzivně prochází oba podvýrazy.",
          "Sub zachovává správné pořadí operandů.",
          "Návrh load odděluje parsing od evaluace.",
        ],
        reference: `Jedna možná kostra:

\`\`\`haskell
data Expr = Val Int | Add Expr Expr | Sub Expr Expr
  deriving (Eq, Show)

eval (Val n) = n
eval (Add a b) = eval a + eval b
eval (Sub a b) = eval a - eval b
\`\`\`

Pro \`load\` bych si nejdřív udělal čistou funkci \`parse :: [String] -> (Expr, [String])\` a IO nechal jen načíst soubor a zavolat parser.`,
      };
    },
  },
  {
    id: "sum-fold-proof",
    topic: "proof",
    tag: "Důkaz",
    title: "Akumulační suma a foldl",
    source: "2022/2023 předtermín, Haskell důkaz",
    sourcePath: "knowledge/exams/2022-2023/term-0-pretermin.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází ze starého důkazu `suma 0 xs = foldl (+) 0 xs`; hlavní pointa je silnější IP.",
    checkId: null,
    concepts: ["foldl", "akumulátor", "silnější IP", "indukce"],
    make() {
      return {
        subtitle: "Důkaz akumulační funkce; nestačí slabá indukční hypotéza jen pro 0.",
        text: `Mějme:

suma a [] = a
suma a (x:xs) = suma (a + x) xs

Dokaž:

suma 0 xs = foldl (+) 0 xs

pro všechny konečné seznamy čísel xs.
Napiš, jakou silnější indukční hypotézu používáš.`,
        rubric: [
          "Je zvolená silnější věta pro obecný akumulátor a.",
          "Báze pro [] je přepsaná na obou stranách.",
          "Krok pro x:xs používá IP s akumulátorem a+x.",
          "Závěr specializuje obecné tvrzení na a = 0.",
        ],
        reference: `Správná kostra je dokázat silnější tvrzení:

\`\`\`text
P(xs): pro všechna a platí suma a xs = foldl (+) a xs
\`\`\`

Báze:

\`\`\`text
suma a []
= a
= foldl (+) a []
\`\`\`

Krok:

\`\`\`text
suma a (x:xs)
= suma (a+x) xs
= foldl (+) (a+x) xs      -- IP pro akumulátor a+x
= foldl (+) a (x:xs)
\`\`\`

Pak dosadíš \`a = 0\`.`,
      };
    },
  },
  {
    id: "all-foldr-proof",
    topic: "proof",
    tag: "Důkaz",
    title: "all jako foldr",
    source: "2020/2021 řádný, Haskell důkaz",
    sourcePath: "knowledge/exams/2020-2021/term-1-radny.md",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází ze starého důkazu `all xs = foldr (&&) True xs`.",
    checkId: null,
    concepts: ["foldr", "Bool", "indukce", "definice funkcí"],
    make() {
      return {
        subtitle: "Mechanický důkaz strukturální indukcí nad seznamem.",
        text: `Mějme:

all [] = True
all (x:xs) = x && all xs

Dokaž:

all xs = foldr (&&) True xs

pro všechny konečné seznamy Bool hodnot xs.
Piš každý krok rovnosti podle definice.`,
        rubric: [
          "Báze [] přepíše all i foldr.",
          "Krok x:xs rozepíše definici all.",
          "IP je použitá na all xs.",
          "Na konci je rozpoznaná definice foldr pro x:xs.",
        ],
        reference: `Kostra:

\`\`\`text
Báze:
all []
= True
= foldr (&&) True []

Krok xs = x:xs', IP: all xs' = foldr (&&) True xs'
all (x:xs')
= x && all xs'
= x && foldr (&&) True xs'       -- IP
= foldr (&&) True (x:xs')
\`\`\`

Tahle úloha je hlavně o čistém zápisu kroků, ne o nápadu.`,
      };
    },
  },
];

const weakConceptCatalog = [
  ["syntax", "syntaxe"],
  ["types", "typy"],
  ["base-cases", "base cases"],
  ["recursion", "rekurze"],
  ["prelude", "Prelude"],
  ["io", "IO"],
  ["proof", "důkaz"],
  ["data-model", "datový model"],
];

const errorTagCatalog = [
  ["syntax", "syntaxe/odsazení"],
  ["types", "typy/signatury"],
  ["names", "názvy/konstruktory"],
  ["base-cases", "base cases"],
  ["recursion", "rekurzivní krok"],
  ["invariant", "invariant/duplicity"],
  ["prelude", "Prelude/helpery"],
  ["io", "IO hranice"],
  ["proof", "důkaz/IP"],
  ["behavior", "chování/testy"],
];

const completionCatalog = [
  ["map", "Prelude"],
  ["filter", "Prelude"],
  ["foldr", "Prelude"],
  ["foldl", "Prelude"],
  ["elem", "Prelude"],
  ["length", "Prelude"],
  ["take", "Prelude"],
  ["drop", "Prelude"],
  ["span", "Prelude"],
  ["concat", "Prelude"],
  ["zipWith", "Prelude"],
  ["head", "Prelude"],
  ["tail", "Prelude"],
  ["not", "Prelude"],
  ["otherwise", "Prelude"],
  ["read", "Prelude"],
  ["show", "Prelude"],
  ["lines", "Prelude"],
  ["unlines", "Prelude"],
  ["words", "Prelude"],
  ["unwords", "Prelude"],
  ["readFile", "IO"],
  ["writeFile", "IO"],
  ["putStr", "IO"],
  ["putStrLn", "IO"],
  ["openFile", "IO"],
  ["hGetContents", "IO"],
  ["hPutStr", "IO"],
  ["hClose", "IO"],
  ["ReadMode", "IO"],
  ["WriteMode", "IO"],
  ["data", "syntaxe"],
  ["deriving", "syntaxe"],
  ["where", "syntaxe"],
  ["let", "syntaxe"],
  ["in", "syntaxe"],
  ["case", "syntaxe"],
  ["of", "syntaxe"],
  ["if", "syntaxe"],
  ["then", "syntaxe"],
  ["else", "syntaxe"],
  ["do", "syntaxe"],
  ["Maybe", "typ"],
  ["Just", "konstruktor"],
  ["Nothing", "konstruktor"],
  ["IO", "typ"],
  ["String", "typ"],
  ["Int", "typ"],
  ["Integer", "typ"],
  ["Bool", "typ"],
  ["True", "konstruktor"],
  ["False", "konstruktor"],
  ["Eq", "class"],
  ["Ord", "class"],
  ["Show", "class"],
];

const reservedCompletionWords = new Set([
  "case",
  "class",
  "data",
  "deriving",
  "do",
  "else",
  "if",
  "import",
  "in",
  "instance",
  "let",
  "module",
  "of",
  "then",
  "type",
  "where",
]);

const QUARTZ_BASE_URL = "https://theramsay.github.io/flp-final-exam/";

const state = {
  current: null,
  running: false,
  finished: false,
  variant: 0,
  startedAt: null,
  finishedAt: null,
  checkResult: null,
  detectedErrorTags: [],
  api: false,
  completionItems: [],
  completionIndex: 0,
  completionsUsed: 0,
};

const els = {
  topic: document.getElementById("topic"),
  assistMode: document.getElementById("assistMode"),
  start: document.getElementById("start"),
  submit: document.getElementById("submit"),
  next: document.getElementById("next"),
  reset: document.getElementById("reset"),
  statusText: document.getElementById("statusText"),
  serverStatus: document.getElementById("serverStatus"),
  stats: document.getElementById("stats"),
  source: document.getElementById("source"),
  sourceLink: document.getElementById("sourceLink"),
  sourceNote: document.getElementById("sourceNote"),
  provenance: document.getElementById("provenance"),
  checkability: document.getElementById("checkability"),
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  tag: document.getElementById("tag"),
  assignmentText: document.getElementById("assignmentText"),
  autocomplete: document.getElementById("autocomplete"),
  answer: document.getElementById("answer"),
  editorStatus: document.getElementById("editorStatus"),
  modeStatus: document.getElementById("modeStatus"),
  review: document.getElementById("review"),
  rubricList: document.getElementById("rubricList"),
  referenceSolution: document.getElementById("referenceSolution"),
  runCheck: document.getElementById("runCheck"),
  checkOutput: document.getElementById("checkOutput"),
  selfScore: document.getElementById("selfScore"),
  errorTags: document.getElementById("errorTags"),
  weakConcepts: document.getElementById("weakConcepts"),
  notes: document.getElementById("notes"),
  saveAttempt: document.getElementById("saveAttempt"),
};

function pick(rng, values) {
  return values[Math.floor(rng() * values.length)];
}

function hashSeed(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function rng() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function node(tagName, className, text) {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function sourceUrl(task) {
  if (!task.sourcePath) return "";
  return `${QUARTZ_BASE_URL}${task.sourcePath.replace(/\.md$/, "")}`;
}

function appendInline(parent, text) {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > index) {
      parent.append(document.createTextNode(text.slice(index, match.index)));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parent.append(node("strong", null, token.slice(2, -2)));
    } else {
      parent.append(node("code", null, token.slice(1, -1)));
    }
    index = match.index + token.length;
  }
  if (index < text.length) {
    parent.append(document.createTextNode(text.slice(index)));
  }
}

function highlightCode(text, lang = "haskell") {
  if (lang === "text") return escapeHtml(text);
  const tokenPattern =
    /(--.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)'|\b(?:case|class|data|deriving|do|else|if|import|in|infixl|infixr|instance|let|module|newtype|of|then|type|where)\b|\b(?:Eq|Ord|Show|Maybe|Just|Nothing|IO|String|Int|Integer|Bool|True|False)\b|\b[A-Z][A-Za-z0-9_']*\b|::|->|=>)/gm;
  let output = "";
  let index = 0;
  for (const match of text.matchAll(tokenPattern)) {
    output += escapeHtml(text.slice(index, match.index));
    const token = match[0];
    let className = "syntax-symbol";
    if (token.startsWith("--")) className = "syntax-comment";
    else if (token.startsWith('"') || token.startsWith("'")) className = "syntax-string";
    else if (/^(Eq|Ord|Show|Maybe|Just|Nothing|IO|String|Int|Integer|Bool|True|False)$/.test(token)) {
      className = "syntax-type";
    } else if (/^[A-Z]/.test(token)) {
      className = "syntax-constructor";
    } else if (/^[a-z]/.test(token)) {
      className = "syntax-keyword";
    }
    output += `<span class="${className}">${escapeHtml(token)}</span>`;
    index = match.index + token.length;
  }
  output += escapeHtml(text.slice(index));
  return output;
}

function appendCodeBlock(root, lines, lang = "haskell") {
  if (!lines.length) return;
  const language = lang || "haskell";
  const pre = node("pre", "assignment-code");
  pre.dataset.lang = language === "text" ? "text" : "Haskell";
  const codeEl = document.createElement("code");
  codeEl.innerHTML = highlightCode(lines.join("\n"), language);
  pre.append(codeEl);
  root.append(pre);
}

function selectedTags(container) {
  return Array.from(container.querySelectorAll("input:checked")).map((input) => input.value);
}

function selectedWeakConcepts() {
  return selectedTags(els.weakConcepts);
}

function selectedErrorTags() {
  return selectedTags(els.errorTags);
}

function renderTagCatalog(container, catalog) {
  container.replaceChildren(
    ...catalog.map(([value, label]) => {
      const wrap = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = value;
      wrap.append(input, document.createTextNode(label));
      return wrap;
    }),
  );
}

function renderReviewTags() {
  renderTagCatalog(els.errorTags, errorTagCatalog);
  renderTagCatalog(els.weakConcepts, weakConceptCatalog);
}

function setTagSelection(container, values, checked) {
  const wanted = new Set(values);
  container.querySelectorAll("input").forEach((input) => {
    if (wanted.has(input.value)) input.checked = checked;
  });
}

function detectedErrorTags(result) {
  if (!result || result.ok) return [];
  if (Array.isArray(result.errorTags)) return result.errorTags;
  const output = [result.typecheck?.output, result.tests?.output].filter(Boolean).join("\n").toLowerCase();
  const tags = [];
  if (/parse error|lexical error|layout/.test(output)) tags.push("syntax");
  if (/couldn't match|ambiguous type|expected|actual/.test(output)) tags.push("types");
  if (/not in scope|data constructor/.test(output)) tags.push("names");
  if (result.tests && !result.tests.ok) tags.push("behavior");
  return [...new Set(tags.length ? tags : ["behavior"])];
}

function editorModeEnabled() {
  return els.assistMode.value === "editor";
}

function modeLabel() {
  return editorModeEnabled() ? "editor mode" : "paper mode";
}

function currentTokenRange() {
  const value = els.answer.value;
  const caret = els.answer.selectionStart;
  const before = value.slice(0, caret).match(/[A-Za-z_][A-Za-z0-9_']*$/);
  const after = value.slice(caret).match(/^[A-Za-z0-9_']+/);
  const prefix = before ? before[0] : "";
  return {
    start: caret - prefix.length,
    end: caret + (after ? after[0].length : 0),
    prefix,
  };
}

function completionItem(label, detail, priority = 0) {
  return { label, insert: label, detail, priority };
}

function addCompletionItem(map, label, detail, priority) {
  if (!label || label.length < 2) return;
  if (/^\d/.test(label)) return;
  const existing = map.get(label);
  if (!existing || priority > existing.priority) {
    map.set(label, completionItem(label, detail, priority));
  }
}

function identifiers(text) {
  return Array.from(String(text).matchAll(/[A-Za-z_][A-Za-z0-9_']*/g), (match) => match[0]);
}

function taskCompletionItems(map) {
  if (!state.current) return;
  const source = `${state.current.subtitle || ""}\n${state.current.text || ""}`;
  for (const match of source.matchAll(/`([^`]+)`/g)) {
    for (const id of identifiers(match[1])) {
      addCompletionItem(map, id, /^[A-Z]/.test(id) ? "ze zadání" : "název ze zadání", 40);
    }
  }
  for (const line of source.split("\n")) {
    const trimmed = line.trim();
    if (!isCodeLine(trimmed) && !trimmed.includes("::") && !trimmed.startsWith("data ")) continue;
    for (const id of identifiers(trimmed)) {
      if (reservedCompletionWords.has(id)) continue;
      addCompletionItem(map, id, /^[A-Z]/.test(id) ? "typ/konstruktor" : "ze zadání", 38);
    }
  }
}

function localCompletionItems(map) {
  const { prefix } = currentTokenRange();
  const skip = new Set([...reservedCompletionWords, prefix]);
  for (const id of identifiers(els.answer.value)) {
    if (skip.has(id)) continue;
    if (id.length === 1 && !/^[a-z]$/.test(id)) continue;
    addCompletionItem(map, id, /^[A-Z]/.test(id) ? "lokální typ" : "lokální název", 45);
  }
}

function rankedCompletionItems(prefix, force = false) {
  const map = new Map();
  for (const [label, detail] of completionCatalog) {
    addCompletionItem(map, label, detail, 10);
  }
  taskCompletionItems(map);
  localCompletionItems(map);
  const lower = prefix.toLowerCase();
  return Array.from(map.values())
    .filter((item) => force || item.label.toLowerCase().startsWith(lower))
    .sort((a, b) => {
      const exact = Number(b.label === prefix) - Number(a.label === prefix);
      if (exact) return exact;
      if (b.priority !== a.priority) return b.priority - a.priority;
      return a.label.localeCompare(b.label);
    })
    .slice(0, 10);
}

function caretPositionInEditor() {
  const textarea = els.answer;
  const style = window.getComputedStyle(textarea);
  const mirror = document.createElement("div");
  const mirroredProps = [
    "boxSizing",
    "width",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "lineHeight",
    "letterSpacing",
    "textTransform",
    "wordSpacing",
    "tabSize",
  ];
  for (const prop of mirroredProps) {
    mirror.style[prop] = style[prop];
  }
  mirror.style.position = "absolute";
  mirror.style.visibility = "hidden";
  mirror.style.whiteSpace = "pre-wrap";
  mirror.style.wordBreak = "break-word";
  mirror.style.overflowWrap = "break-word";
  mirror.style.top = "0";
  mirror.style.left = "-9999px";
  mirror.textContent = textarea.value.slice(0, textarea.selectionStart);
  const marker = document.createElement("span");
  marker.textContent = textarea.value.slice(textarea.selectionStart, textarea.selectionStart + 1) || ".";
  mirror.append(marker);
  document.body.append(mirror);
  const markerRect = marker.getBoundingClientRect();
  const mirrorRect = mirror.getBoundingClientRect();
  document.body.removeChild(mirror);
  return {
    left: markerRect.left - mirrorRect.left - textarea.scrollLeft,
    top: markerRect.top - mirrorRect.top - textarea.scrollTop,
  };
}

function positionAutocomplete() {
  const panelRect = els.answer.parentElement.getBoundingClientRect();
  const answerRect = els.answer.getBoundingClientRect();
  const caret = caretPositionInEditor();
  const popupWidth = Math.min(360, Math.max(260, panelRect.width - 28));
  const left = Math.min(
    Math.max(14, answerRect.left - panelRect.left + caret.left),
    Math.max(14, panelRect.width - popupWidth - 14),
  );
  const top = Math.min(
    Math.max(56, answerRect.top - panelRect.top + caret.top + 30),
    Math.max(56, panelRect.height - 266),
  );
  els.autocomplete.style.left = `${left}px`;
  els.autocomplete.style.top = `${top}px`;
  els.autocomplete.style.width = `${popupWidth}px`;
}

function hideAutocomplete() {
  els.autocomplete.hidden = true;
  state.completionItems = [];
  state.completionIndex = 0;
}

function renderAutocomplete(items) {
  state.completionItems = items;
  state.completionIndex = 0;
  els.autocomplete.replaceChildren(
    ...items.map((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "completion-item";
      button.dataset.index = String(index);
      button.setAttribute("aria-selected", index === 0 ? "true" : "false");
      button.append(node("span", "completion-label", item.label), node("span", "completion-detail", item.detail));
      button.addEventListener("mousedown", (event) => {
        event.preventDefault();
        applyCompletion(index);
      });
      return button;
    }),
  );
  positionAutocomplete();
  els.autocomplete.hidden = false;
}

function updateAutocompleteSelection() {
  Array.from(els.autocomplete.children).forEach((child, index) => {
    child.setAttribute("aria-selected", index === state.completionIndex ? "true" : "false");
    if (index === state.completionIndex) child.scrollIntoView({ block: "nearest" });
  });
}

function showAutocomplete(force = false) {
  if (!editorModeEnabled() || !state.running || state.finished || els.answer.readOnly) {
    hideAutocomplete();
    return;
  }
  const { prefix } = currentTokenRange();
  if (!force && prefix.length < 2) {
    hideAutocomplete();
    return;
  }
  const items = rankedCompletionItems(prefix, force);
  if (!items.length) {
    hideAutocomplete();
    return;
  }
  renderAutocomplete(items);
}

function applyCompletion(index = state.completionIndex) {
  const item = state.completionItems[index];
  if (!item) return;
  const { start, end } = currentTokenRange();
  const value = els.answer.value;
  els.answer.value = `${value.slice(0, start)}${item.insert}${value.slice(end)}`;
  const caret = start + item.insert.length;
  els.answer.setSelectionRange(caret, caret);
  state.completionsUsed += 1;
  hideAutocomplete();
  updateEditorStatus();
  els.answer.focus();
}

function moveAutocomplete(delta) {
  if (els.autocomplete.hidden || !state.completionItems.length) return;
  state.completionIndex =
    (state.completionIndex + delta + state.completionItems.length) % state.completionItems.length;
  updateAutocompleteSelection();
}

function handleAutocompleteKeydown(event) {
  if (event.ctrlKey && event.code === "Space") {
    event.preventDefault();
    showAutocomplete(true);
    return;
  }
  if (els.autocomplete.hidden) return;
  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveAutocomplete(1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    moveAutocomplete(-1);
  } else if (event.key === "Enter" || event.key === "Tab") {
    event.preventDefault();
    applyCompletion();
  } else if (event.key === "Escape") {
    event.preventDefault();
    hideAutocomplete();
  }
}

function syncAssistModeStatus() {
  hideAutocomplete();
  if (state.running && !state.finished) {
    els.modeStatus.textContent = modeLabel();
  }
  els.statusText.textContent = editorModeEnabled()
    ? "Editor režim: autocomplete pro názvy, Prelude a lokální proměnné. Ctrl+Space otevře nabídku."
    : "Paper režim: bez nápovědy, rubrika a testy až po odevzdání.";
}

function updateEditorStatus() {
  const chars = els.answer.value.length;
  const lines = els.answer.value ? els.answer.value.split("\n").length : 0;
  els.editorStatus.textContent = `${chars} znaků, ${lines} řádků`;
  if (state.startedAt && state.running) {
    els.modeStatus.textContent = modeLabel();
  }
}

function chooseTask(rng) {
  const topic = els.topic.value;
  const pool = topic === "any" ? tasks : tasks.filter((task) => task.topic === topic);
  return pick(rng, pool.length ? pool : tasks);
}

function isCodeLine(line) {
  const value = line.trim();
  if (!value) return false;
  return (
    /^data\s/.test(value) ||
    /^[a-z][A-Za-z0-9_']*\s*::/.test(value) ||
    /^[a-z][A-Za-z0-9_']*\s+.*=/.test(value) ||
    /^[a-z][A-Za-z0-9_']*\s*=/.test(value) ||
    /^[A-Z]:\s/.test(value) ||
    /^[(][^)]/.test(value) ||
    /^=/.test(value) ||
    /^[0-9A-Za-z_()]+\s*[+*\/-]\s*[0-9A-Za-z_()+*\/-]+$/.test(value) ||
    value.includes(" -> ") ||
    value.includes(" = ") ||
    value.includes("++")
  );
}

function isNoteLine(line) {
  const value = line.trim();
  return /^(Nepoužívej|Použij|Vstup je|Soubor má|Pokud si|Uvažuj|Piš)/.test(value);
}

function isSectionHeading(line) {
  return /^(Definuj|Požadavky|Příklad požadovaného stylu|Příklad stylu|Mějme|Dokaž):$/.test(line.trim());
}

function sectionInfo(line) {
  const key = line.trim().replace(/:$/, "");
  const labels = {
    Definuj: ["statement", "Zadání"],
    Požadavky: ["requirements", "Požadavky"],
    "Příklad požadovaného stylu": ["examples", "Příklad"],
    "Příklad stylu": ["examples", "Příklad"],
    Mějme: ["given", "Dáno"],
    Dokaž: ["goal", "Cíl"],
  };
  return labels[key] || ["section", key];
}

function appendSectionHeading(root, kind, label) {
  const heading = node("h3", `assignment-section ${kind}`);
  appendInline(heading, label);
  root.append(heading);
}

function renderMarkdown(text, target, options = {}) {
  const root = document.createDocumentFragment();
  let paragraph = [];
  let code = [];
  let codeLang = "haskell";
  let list = null;
  let fenced = false;
  let currentSection = null;
  let requirementsInserted = false;
  let sectionRendered = false;

  function ensureStatementSection() {
    if (!options.problem || sectionRendered) return;
    appendSectionHeading(root, "statement", "Zadání");
    currentSection = "statement";
    sectionRendered = true;
  }

  function flushParagraph() {
    if (!paragraph.length) return;
    ensureStatementSection();
    const p = node("p", "assignment-paragraph");
    appendInline(p, paragraph.join(" "));
    root.append(p);
    paragraph = [];
  }

  function flushCode() {
    if (!code.length) return;
    ensureStatementSection();
    appendCodeBlock(root, code, codeLang);
    code = [];
    codeLang = "haskell";
  }

  function flushList() {
    if (!list) return;
    root.append(list);
    list = null;
  }

  function startList(type) {
    if (!list || list.tagName.toLowerCase() !== type) {
      flushList();
      if (options.problem && !requirementsInserted && currentSection !== "examples") {
        appendSectionHeading(root, "requirements", "Požadavky");
        currentSection = "requirements";
        requirementsInserted = true;
        sectionRendered = true;
      }
      list = document.createElement(type);
      list.className = options.problem && currentSection === "requirements" ? "requirements-list" : "assignment-list";
    }
  }

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      if (fenced) {
        flushCode();
        fenced = false;
      } else {
        flushParagraph();
        flushList();
        fenced = true;
        codeLang = trimmed.slice(3).trim() || "haskell";
      }
      continue;
    }
    if (fenced) {
      code.push(line);
      continue;
    }
    if (!trimmed) {
      flushParagraph();
      flushCode();
      flushList();
      continue;
    }

    const numbered = trimmed.match(/^(\d+)\.\s+(.*)$/);
    const bullet = trimmed.match(/^-\s+(.*)$/);
    if (numbered || bullet) {
      flushParagraph();
      flushCode();
      startList(numbered ? "ol" : "ul");
      const li = document.createElement("li");
      appendInline(li, numbered ? numbered[2] : bullet[1]);
      list.append(li);
      continue;
    }

    if (isSectionHeading(trimmed)) {
      flushParagraph();
      flushCode();
      flushList();
      const [kind, label] = sectionInfo(trimmed);
      currentSection = kind;
      if (kind === "requirements") requirementsInserted = true;
      appendSectionHeading(root, kind, label);
      sectionRendered = true;
      continue;
    }

    if (isNoteLine(trimmed)) {
      flushParagraph();
      flushCode();
      flushList();
      ensureStatementSection();
      const note = node("p", "assignment-note");
      appendInline(note, trimmed);
      root.append(note);
      continue;
    }

    if (isCodeLine(trimmed) || line.startsWith("  ")) {
      flushParagraph();
      flushList();
      codeLang = currentSection === "given" || currentSection === "goal" ? "text" : "haskell";
      code.push(line);
      continue;
    }

    flushCode();
    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushCode();
  flushList();
  target.replaceChildren(root);
}

function renderAssignment(text) {
  renderMarkdown(text, els.assignmentText, { problem: true });
}

function renderTask(task, generated) {
  state.current = {
    id: task.id,
    topic: task.topic,
    tag: task.tag,
    title: task.title,
    source: task.source,
    sourcePath: task.sourcePath,
    sourceKind: task.sourceKind,
    sourceLabel: task.sourceLabel,
    sourceNote: task.sourceNote,
    checkId: task.checkId,
    typecheckOnly: task.typecheckOnly || false,
    concepts: task.concepts,
    ...generated,
  };
  state.checkResult = null;
  state.detectedErrorTags = [];
  state.completionsUsed = 0;
  els.source.textContent = task.source;
  const sourceHref = sourceUrl(task);
  els.sourceLink.href = sourceHref || "#";
  els.sourceLink.hidden = !sourceHref;
  els.sourceNote.textContent = task.sourceNote || "";
  els.provenance.textContent = task.sourceLabel;
  els.provenance.className = `meta-token ${task.sourceKind}`;
  els.provenance.title = task.sourceNote;
  els.checkability.textContent = task.checkId ? "GHC test" : task.typecheckOnly ? "GHC typy" : "rubrika";
  els.checkability.className = task.checkId || task.typecheckOnly ? "meta-token check" : "meta-token";
  els.title.textContent = task.title;
  els.subtitle.textContent = generated.subtitle;
  els.tag.textContent = task.tag;
  renderAssignment(generated.text);
  renderMarkdown(generated.reference || "Bez řešitelské kostry.", els.referenceSolution);
  els.rubricList.replaceChildren(
    ...generated.rubric.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );
  els.answer.value = "";
  els.answer.readOnly = false;
  hideAutocomplete();
  els.review.hidden = true;
  els.runCheck.disabled = true;
  els.saveAttempt.disabled = true;
  els.checkOutput.textContent = "Po odevzdání dostupné pro vybraná zadání.";
  els.notes.value = "";
  els.selfScore.value = "3";
  els.errorTags.querySelectorAll("input").forEach((input) => {
    input.checked = false;
  });
  els.weakConcepts.querySelectorAll("input").forEach((input) => {
    input.checked = false;
  });
  updateEditorStatus();
}

function startDrill(offset = 0) {
  const day = new Date().toISOString().slice(0, 10);
  const seed = hashSeed(`${day}:${els.topic.value}:${offset}`);
  const rng = mulberry32(seed);
  const task = chooseTask(rng);
  renderTask(task, task.make(rng));
  state.running = true;
  state.finished = false;
  state.startedAt = new Date().toISOString();
  state.finishedAt = null;
  els.submit.disabled = false;
  els.modeStatus.textContent = modeLabel();
  els.statusText.textContent = editorModeEnabled()
    ? "Editor režim: piš normálně, autocomplete se ukáže po 2 znacích nebo přes Ctrl+Space."
    : "Paper režim: bez nápovědy. Testy a rubrika se ukážou po odevzdání.";
  els.answer.focus();
}

function finishSession() {
  if (!state.current || state.finished) return;
  state.running = false;
  state.finished = true;
  state.finishedAt = new Date().toISOString();
  els.answer.readOnly = true;
  hideAutocomplete();
  els.submit.disabled = true;
  els.review.hidden = false;
  const canCheck = state.api && (state.current.checkId || state.current.typecheckOnly);
  els.runCheck.disabled = !canCheck;
  els.saveAttempt.disabled = !state.api;
  els.modeStatus.textContent = "odevzdáno";
  els.statusText.textContent = "Odevzdáno. Teď můžeš pustit GHC check, projít rubriku a uložit pokus.";
}

function resetSession() {
  state.running = false;
  state.finished = false;
  state.startedAt = null;
  state.finishedAt = null;
  state.checkResult = null;
  state.detectedErrorTags = [];
  state.completionsUsed = 0;
  els.answer.readOnly = false;
  hideAutocomplete();
  els.submit.disabled = true;
  els.runCheck.disabled = true;
  els.saveAttempt.disabled = true;
  els.review.hidden = true;
  els.modeStatus.textContent = modeLabel();
  els.statusText.textContent = editorModeEnabled()
    ? "Editor režim: autocomplete pro názvy, Prelude a lokální proměnné. Ctrl+Space otevře nabídku."
    : "Paper režim: bez nápovědy, rubrika a testy až po odevzdání.";
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || `HTTP ${response.status}`);
    error.data = data;
    throw error;
  }
  return data;
}

async function loadHealth() {
  try {
    const health = await api("/api/health");
    state.api = true;
    els.serverStatus.className = "server-status ok";
    els.serverStatus.textContent = `server ok, GHC ${health.ghcVersion || "?"}`;
    await refreshStats();
  } catch (_error) {
    state.api = false;
    els.serverStatus.className = "server-status off";
    els.serverStatus.textContent = "server offline";
    els.stats.textContent = "Spusť: node tools/haskell-paper-drill/server.js";
  }
}

function appendStatRows(rows) {
  for (const [key, value] of rows) {
    const row = node("div", "stat-row");
    row.append(node("span", "stat-key", key), node("span", null, value));
    els.stats.append(row);
  }
}

function appendStatBars(title, items) {
  if (!items?.length) return;
  const section = node("div", "stat-section");
  section.append(node("div", "stat-section-title", title));
  const max = Math.max(...items.map((item) => item.count), 1);
  for (const item of items.slice(0, 6)) {
    const row = node("div", "stat-bar");
    const label = node("div");
    label.append(node("div", "stat-name", item.label || item.topic || item.tag));
    const track = node("div", "stat-bar-track");
    const fill = node("div", "stat-bar-fill");
    fill.style.width = `${Math.max(8, Math.round((item.count / max) * 100))}%`;
    track.append(fill);
    label.append(track);
    row.append(label, node("span", "stat-count", String(item.count)));
    section.append(row);
  }
  els.stats.append(section);
}

function renderStats(stats) {
  els.stats.innerHTML = "";
  if (!stats.attempts) {
    els.stats.append(node("div", "muted", "Zatím žádné uložené pokusy."));
    return;
  }
  appendStatRows([
    ["Pokusy", String(stats.attempts)],
    ["Průměr", stats.averageScore === null ? "-" : `${stats.averageScore.toFixed(1)} / 5`],
    ["Nejčastější chyba", stats.topError?.label || "-"],
    ["Doporučení", stats.recommendations[0] || "-"],
  ]);
  appendStatBars("Chyby", stats.errorStats);
  appendStatBars("Okruhy podle chyb", stats.topicErrorStats);
  if (stats.recent.length) {
    const recent = node("div", "muted");
    const last = stats.recent[0];
    const errors = last.errors?.length ? `, ${last.errors.join(", ")}` : "";
    recent.textContent = `Naposledy: ${last.title} (${last.score}/5${errors})`;
    els.stats.append(recent);
  }
}

function elapsedSeconds() {
  if (!state.startedAt || !state.finishedAt) return null;
  return Math.max(0, Math.round((new Date(state.finishedAt).getTime() - new Date(state.startedAt).getTime()) / 1000));
}

async function refreshStats() {
  if (!state.api) return;
  const stats = await api("/api/stats");
  renderStats(stats);
}

async function runCheck() {
  if (!state.current || !state.finished) return;
  els.runCheck.disabled = true;
  els.checkOutput.textContent = "Běží...";
  try {
    const result = await api("/api/check", {
      method: "POST",
      body: JSON.stringify({
        answer: els.answer.value,
        checkId: state.current.checkId,
        typecheckOnly: state.current.typecheckOnly,
      }),
    });
    state.checkResult = result;
    state.detectedErrorTags = detectedErrorTags(result);
    setTagSelection(els.errorTags, state.detectedErrorTags, true);
    const status = result.ok ? "OK" : "FAIL";
    const detail = [result.typecheck?.output, result.tests?.output].filter(Boolean).join("\n\n");
    const detected = state.detectedErrorTags.length ? `\nChyby: ${state.detectedErrorTags.join(", ")}` : "";
    els.checkOutput.textContent = `${status}${detected}\n${detail || "Bez výstupu."}`;
  } catch (error) {
    els.checkOutput.textContent = `FAIL\n${error.message}`;
  } finally {
    els.runCheck.disabled = !(state.api && state.finished && (state.current.checkId || state.current.typecheckOnly));
  }
}

async function saveAttempt() {
  if (!state.current || !state.finished || !state.api) return;
  const attempt = {
    taskId: state.current.id,
    title: state.current.title,
    topic: state.current.topic,
    tag: state.current.tag,
    source: state.current.source,
    sourcePath: state.current.sourcePath,
    sourceKind: state.current.sourceKind,
    sourceLabel: state.current.sourceLabel,
    concepts: state.current.concepts,
    checkId: state.current.checkId,
    startedAt: state.startedAt,
    finishedAt: state.finishedAt,
    limitMin: null,
    elapsedSec: elapsedSeconds(),
    chars: els.answer.value.length,
    answer: els.answer.value,
    assistMode: els.assistMode.value,
    completionsUsed: state.completionsUsed,
    selfScore: Number(els.selfScore.value),
    errorTags: selectedErrorTags(),
    detectedErrorTags: state.detectedErrorTags,
    weakConcepts: selectedWeakConcepts(),
    notes: els.notes.value,
    checkResult: state.checkResult,
  };
  els.saveAttempt.disabled = true;
  try {
    await api("/api/attempts", { method: "POST", body: JSON.stringify(attempt) });
    await refreshStats();
    els.statusText.textContent = "Pokus uložen.";
  } catch (error) {
    els.statusText.textContent = `Uložení selhalo: ${error.message}`;
    els.saveAttempt.disabled = false;
  }
}

els.start.addEventListener("click", () => {
  state.variant = 0;
  startDrill(state.variant);
});

els.next.addEventListener("click", () => {
  state.variant += 1;
  startDrill(state.variant);
});

els.submit.addEventListener("click", () => finishSession());
els.reset.addEventListener("click", resetSession);
els.assistMode.addEventListener("change", syncAssistModeStatus);
els.answer.addEventListener("input", () => {
  updateEditorStatus();
  showAutocomplete(false);
});
els.answer.addEventListener("keydown", handleAutocompleteKeydown);
els.answer.addEventListener("click", () => showAutocomplete(false));
els.answer.addEventListener("blur", () => {
  window.setTimeout(hideAutocomplete, 120);
});
els.answer.addEventListener("scroll", () => {
  if (!els.autocomplete.hidden) positionAutocomplete();
});
window.addEventListener("resize", () => {
  if (!els.autocomplete.hidden) positionAutocomplete();
});
els.runCheck.addEventListener("click", runCheck);
els.saveAttempt.addEventListener("click", saveAttempt);

renderReviewTags();
resetSession();
loadHealth();
