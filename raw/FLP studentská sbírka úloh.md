# FLP studentská sbírka úloh

Přehlednější sbírka oficiálních řešení + zadání z fitušky od studentů.
Upravujte, přidávejte dle libosti. Držte pls nějakou strukturu, ať se v tom dá vyznat a nedopadne to jak sdílený dokument. Pro diskuzi se dají použít komentáře u odstavců/kódů.

- Haskell časť je za 30b a Prolog časť za 30b
- LEN na riadnom termíne je vždy bonus +10b
- nie každý termín obsahuje dôkaz či Lambda kalkul

# Haskell
## 2022/2023
### Předtermín

1) Lambda kalkul: zadefinujte jakkoliv True, False a XOR (pripadne cokoliv dalsiho je potreba). Ukazte, ze XOR T F -> T (7b)
2) V haskellu je dano
    - `suma a [] = a`
    - `suma a (x:xs) = suma (a + x) xs`

    Dokazte, ze `suma 0 xs = foldl (+) 0 xs`. Byla tam poznamka, ze mame vhodne zvolit indukcni hypotezu (8b)

3) Zadefinujte datovy typ pro vyrazy s celymi cisly, jejich scitanim a nasobenim (2b)
4) Nadefinujte akci `pp` (pretty-print) prijimajici argument odpovidajici typu z ulohy 3, co na standardni vystup vypise vyraz uzavorkovany tak, aby vyznam zustal zachovan (nesmi ale byt zadne zavorky navic). Mohli jsme pouzit Prelude a navic `putChar`, `putStr`. Na pomocnem papire bylo asi 5 prikladu uzavorkovani, neco jako: (13b)

```https://hackmd.io/JB5CYyAZRoS55_WFMbdUkQ?both#
        +
      /  \
     *    3   -> 1*2+3
    / \
   1  2

        *
      /  \
     +    3   -> (1+2)*3
    / \
   1  2

        *
      /  \
     +    +   -> (1+2)*(3+4)
    / \  / \
   1  2 3   4

        +
      /  \
     +    +   -> 1+2+3+4
    / \  / \
   1  2 3   4
```
```haskell
data Expr = Val Int | Add Expr Expr | Mul Expr Expr

pp' :: Expr -> String
pp' (Val val) = show val
pp' (Add e1 e2) = pp' e1 ++ "+" ++ pp' e2
pp' (Mul a1@(Add _ _) a2@(Add _ _)) = "(" ++ pp' a1 ++ ")*(" ++ pp' a2 ++ ")"
pp' (Mul a1@(Add _ _) v) = "(" ++ pp' a1 ++ ")*" ++ pp' v
pp' (Mul v a2@(Add _ _)) = pp' v ++ "*(" ++ pp' a2 ++ ")"
pp' (Mul e1 e2) = pp' e1 ++ "*" ++ pp' e2

pp :: Expr -> IO ()
pp expr = putStr (pp' expr)
```
5) Premie: Nadefinovat typ pro double linked list (2b). Napsat funkci `l2dll`, co vezme bezny haskellovsky seznam a udela z nej ten nas DLL (8b).

## 2021/2022
### termin

![](https://media.discordapp.net/attachments/621775580471492638/973595388504317982/unknown_973594542941024347_372131404412354571.jpg?width=854&height=484)

1.
Vlastnosť operátoru pevného bodu -- `Y E = E (Y E)`
Definícia LT v λ-kalkule s použitím operátora pevného bodu (`Y`), `iszero` a `prev`:
```
LET ?: = λ x y z . x y z
LET LTfn = λ f x y . (iszero y) ? False : ((iszero x) ? True : (f (prev x) (prev y)))
LET LT = Y LTfn
```

2.
- funkce mid, která pro vstupní seřaditelný seznam vrací takovou hodnotu, která seznam rozdělí na dvě části, kde jedna obsahuje pouze menší prvky, druhá pouze větší prvky a jejichž délka se liší nanejvýš o 1.

Nebylo ale v zadání zmíněno, zda musí být prvky v seznamu unikátní. Pokud by nebyly, imo nebude řešení existovat.
K dispozici afaik holý Haskell.
```haskell
-- ak holy haskell definuj aj head, init, tail
head []= errorEmptyList "head"
head (x:_) = x

tail [] = errorEmptyList "tail"
tail (_:xs) = xs

init :: [Int] -> [Int]
init [] = errorEmptyList "init"
init [x] = []
init (x:xs) = x : init xs

quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) = smaller ++ [x] ++ bigger
    where
        smaller = quicksort [a | a <- xs, a <= x]
        bigger = quicksort [a | a <- xs, a > x]

-- najde median
mida:: [a] -> a
mida l@(_:_:_:_) = mida $ tail $ init l
mida l = head l

mid l = mida $ quicksort l
```
alebo
```haskell
quick :: Ord a => [a] -> [a]
quick [] = []
quick [x] = [x]
quick (x:xs) = smaller ++ [x] ++ larger
   where
       smaller = quick [y | y <- xs , y <= x]
       larger = quick [y | y <- xs, y > x]

myInit [] = undefined
myInit [x] = []
myInit (x:xs) = x:myInit xs

myTail [] = undefined
myTail [x] = []
myTail (x:xs) = xs

mid :: Ord a => [a] -> a
mid [] = undefined
mid [x] = x
mid [x,y] = x
mid xs = mid (myInit $ myTail $ quick xs)

```

- Haskell io
Načíst soubor a vypsat jej, přičemž každý řádek je trimmed o whitespaces (funkce trim k dispozici) a před každým řádkem je jeho počet znaků po trimu.
Např.: "    Hello   " -> "5:Hello"
Za takto upraveným vypsaným souborem přidat
(Počet řádků celkem) ++ "/" ++ (počet po trimu prázdných řádků)
Např.: "1/0"

K dispozici klasické IO funkce, Prelude (unlines/lines, ...), byly k nim i signatury.

```haskell
trim :: String -> String
trim str =
    let dropLastSpace [] = []
        dropLastSpace s = if last s == ' ' then dropLastSpace $ init s else s
    in dropLastSpace $ dropWhile (\x -> x == ' ') str

length' :: [a] -> Integer
length' [] = 0
length' (_ : xs) = 1 + length' xs

map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' f (x : xs) = f x : map' f xs

trim :: String -> String
trim l = f (f l)
 where
   f = reverse . dropWhile isSpace

processLine :: String -> String
processLine line = show (length' trimmed) ++ ":" ++ trimmed
 where
   trimmed = trim line

emptyLines :: [String] -> Integer
emptyLines [] = 0
emptyLines ((count : _) : xs)
 | count == '0' = emptyLines xs + 1
 | otherwise = emptyLines xs

lenls :: FilePath -> IO ()
lenls path = do
 handle <- openFile path ReadMode
 content <- hGetContents handle
 let l = map' processLine (lines content)
 let emptyLinesCount = emptyLines l
 putStr (unlines l ++ show (length' l) ++ "/" ++ show emptyLinesCount)
```

### Riadny
1. Definuj štruktrúru zásobníka pre riešenie v konštantnom čase (tj. bez rekurzie)
- `empty` - inicializuje prázdny zásobnik
- `top` - vráti vrchol zásobnika
- `push` - pridá položku na vrchol zásobnika
- `pop` - odstráni vrch zásobníka
- `len` - vráti počet položiek v zásobníku
```haskell
data PD a
= PD Int [a]
deriving (Show,Eq)

empty :: PD a
empty = PD 0 []

top (PD _ (x:_)) = x

push (PD s l) v = PD (s+1) (v:l)

pop (PD s (x:xs)) = (x,PD (s-1) xs)

len (PD s _) = s
```

2. definovať funkcie
- pushStr, ktorá vloží reťazec na zásobník
- popStr, ktorá popne reťazec zo zásobníka ak sa zhoduje
```haskell
pushStr pda str =
    foldr (\x pda -> push pda x) pda str
--
popStr pda str
    | lstr > len pda = Nothing
    | not res = Nothing
    | True = Just newPda
    where
        lstr = length str
        (res,newPda) = checkPop pda str
        checkPop pda [] = (True,pda)
        checkPop pda (s:ss) = let
            (v,pdaN) = pop pda
            in if v==s then checkPop pdaN ss else (False,pda)

```

alternatívna implementácia
```haskell
-- 1.
data Stack a = Stack [a] Int

empty :: Stack a
empty = Stack [] 0

top :: Stack a -> a
top (Stack [] _) = error "empty stack"
top (Stack (x : _) _) = x

push :: Stack a -> a -> Stack a
push (Stack s i) x = Stack (x : s) (i + 1)

pop :: Stack a -> (a, Stack a)
pop (Stack [] _) = error "empty stack"
pop (Stack (x : s) i) = (x, Stack s (i - 1))

len :: Stack a -> Int
len (Stack _ i) = i

-- 2.
pushStr :: Stack a -> [a] -> Stack a
pushStr = foldr (\x s -> push s x)

popStr :: (Eq a) => Stack a -> [a] -> Maybe (Stack a)
popStr stack xs = if len stack < length xs then Nothing else popStr' stack xs
  where
    popStr' stack [] = Just stack
    popStr' stack (x : xs) = let (y, newStack) = pop stack in if x == y then popStr' newStack xs else Nothing
```

3. definovať dátovú štruktúru pre reprezentáciu pravidiel deterministického konečného automatu
```haskell
data Rule a = R a [a] [a] Int Int deriving (Show,Eq)

```

4. IO úloha - spracovat súbor do vnútornej reprezentacie pravidiel (štruktúry z predchádzajúcej úlohy)
```haskell
-- read_symbol:pop_string:push_string:from_state:next_state
-- read symbol je 1 char
-- pop_string, push_string sú reťazce, môžu byť prázdne
-- from_state, next_state - 1 číslo
-- oddelené vždy dvojbodkou

a:ab:ab:1:2
b:::2:3
```
```haskell
readRules fname = do
    h <- openFile fname ReadMode
    c <- hGetContents h
    let lns = lines c
    let rules = loadLines lns
    (\r ->
        (return $! length r) >>= (\_ -> hClose h >> return r)
    ) $! rules


loadLines [] = []
loadLines (l:ls) = R c popS puS ((read fromS)::Int) ((read l4)::Int) : loadLines ls
    where
        (c:':':l1) = l
        (popS,(_:l2)) = span (/=':') l1
        (puS,(_:l3))  = span (/=':') l2
        (fromS,(_:l4)) = span (/=':') l3
```

Bonus: isRuleApplicable - najst pravidlo ktore je aplikovatelné pre determinitický konecný automat + napísať štruktúru

### 1. opravný
Implementovať IO funkciu, ktorá spojí nasledujúce riadky ak ich dĺžka dokopy je menej, rovná 120. Tieto riadky očísluje na zaciatku, prida dvojbodku a pridá obsah spojených riadkov. Spojené riadky zapíse do súboru fileinput s koncovkou .out

```haskell
fx fname = do
    h <- openFile fname ReadMode
    o <- openFile (fname ++ ".out") WriteMode
    c <- hGetContents h
    hPutStr o $ unlines $ wrap 1 $ lines c
    hClose o
    hClose h
wrap n (a:b:ls)
    | (length a + length b) <= 120 = wrap n ((a++b):ls)
    | True = (show n ++ ":" ++ a) : wrap (n+1) (b:ls)
wrap n [l] = [show n ++ ":" ++ l]
wrap _ [] = []
```
<!-- ### 2. opravný -->
## 2020/2021
### Riadny
- zadefinovať datovy typ pre aritmeticke operacie +/-
```haskell
data Expr
    = Val Integer
    | Add Expr Expr
    | Sub Expr Expr
    deriving (Show,Eq)
```
- spraviť funkciu eval pre vyhodnocovanie arit. operacii + a -
```haskell
eval :: Expr -> Integer
eval (Val v) = v
eval (Add e1 e2) = eval e1 + eval e2
eval (Sub e1 e2) = eval e1 - eval e2
```
- funkcia load, načítať zo subora v tvare prefix operacii do datoveho typu
napr. `+ 4 2` ~~alebo to bolo možno so zatvorkami `+(4 2)`~~ (malo by to byť jedno v podstate)
```haskell
load :: FilePath -> IO Expr
load f = do
    h <- openFile f ReadMode
    c <- hGetContents h
    --
    let (res,_) = parse c
    --
    (\ ret -> hClose h >> return ret) $! res

parse :: String -> (Expr,String)
parse ('+':_:xs) = (Add l r, cont)
    where
        (l,rest) = parse xs
        (r,cont) = parse rest
parse ('-':_:xs) = (Sub l r, cont)
    where
        (l,rest) = parse xs
        (r,cont) = parse rest
parse is = (Val ((read val) :: Integer), st rest)
    where
        (val, rest) = span (\x -> elem x ['0'..'9']) is
        st [] = []
        st (_:t) = t
```
### 1. opravný
1. LE datova struktura
[iné riesenie - 19/20 1. op](https://hackmd.io/JB5CYyAZRoS55_WFMbdUkQ?both#1-opravn%C3%BD-term%C3%ADn)
```haskell
data LE a
    = App (LE a) (LE a)
    | Abs a (LE a)
    | Var a
    deriving (Show,Eq)
```
Konkrétny priklad
`\x.xy` = `Abs (x) (App (Var x) (Var y))`
`\xy.x(xy) = (\x.(\y.x(xy)))` = `Abs (x) (Abs (y) (App (Var x) (App (Var x) (Var y))))`

3. union, intersection, delete
```haskell
delete _ [] = []
delete x (y:ys) =
    if x == y then ys else y : delete x ys
-- alebo
delete d ys = [ x | x <- ys, x /= d ]


union [] ys = ys
union (x:xs) ys =
    if elem x ys then union xs ys else x : union xs ys


-- pomocou generatoru
intrsect xs ys = [ z | z <- xs, z `elem` ys]
-- alebo
intrsect [] _ = []
intrsect (x:xs) ys =
    if elem x ys then x: intrsect xs ys else intrsect xs ys
```
4. fv - Vytvorenie zoznamu voľných premenných v lambda výraze
[riesenie](https://hackmd.io/JB5CYyAZRoS55_WFMbdUkQ?both#1-opravn%C3%BD-term%C3%ADn)
```haskell
fv (Var v) = [v]
fv (App e1 e2) = union (fv e1) (fv e2)
fv (Abs x e) = delete x (fv e)
```

5. `isApp E X F` - ci je beta redukcia `F` za `X` aplikovatelna vo vyraze `E`, tak True
```haskell
isApp (App (Abs x e) sub) = isValid e x sub
isApp _ = False
```
6. isValid
[riesenie](https://hackmd.io/JB5CYyAZRoS55_WFMbdUkQ?both#1-opravn%C3%BD-term%C3%ADn)
alebo
```haskell
isValid wh var new = vv wh []
    where
        fvn = fv new
        vv (Var v) bnd
            | elem v bnd = True
            | v==var = intrsect bnd fvn == []
            | True = True
        vv (App e1 e2) bnd = vv e1 bnd && vv e2 bnd
        vv (Abs x e) bnd = vv e (if elem x bnd then bnd else x:bnd)
```
7. print suboru s tym ze sa na zaciatku pridaju cisla zarovnane vpravo
napr.:
```
bla
blaa
bla

bla bla
blaa
blaaaa
bla bla bla
bla
balalaa
banana
banana bla
```
výstup:
```
 1 bla
 2 blaa
 3 bla
 4
 5 bla bla
 6 blaa
 7 blaaaa
 8 bla bla bla
 9 bla
10 balalaa
11 banana
12 banana bla
```
```haskell
numlines f = do
    h <- openFile f ReadMode
    c <- hGetContents h
    let lns = lines c
    let numl = length lns
    let maxn = length $ show numl
    writeln maxn 1 lns
    hClose h
writeln _ _ [] = return ()
writeln w n (l:ls) = do
    putStrLn (align n w ++ " " ++ l)
    writeln w (n+1) ls
align n w = [' ' | _ <- [1..(w-length sn)]] ++ sn
    where
        sn = show n
```
### 2. opravný termín
/6b/ Definovať funkciu `suf`, ktorá prijíma ako argument zoznam a vracia zoznam všetkých sufixov tohto zoznamu. Definovať funkciu `pre`, ktorá prijíma ako argument zoznam a vracia zoznam všetkých prefixov tohto zoznamu. Funkcia `pre` musí korektne fungovať aj pre nekonečné zoznamy, t.j. `take 10 $ pre [1..]` vráti zoznam desiatich zoznamov.
```haskell
suf [] = [[]]
suf l@(_:xs) = l : suf xs

pre [] = []
pre l = mkpr [] l
    where
        mkpr rp (a:as) = reverse (a:rp) : mkpr (a:rp) as
        mkpr _ [] = []

-- alebo
pre _ [] = [[]]
pre c (x:xs) = (c++[x]) : (pre (c++[x]) xs)
```

/4b/ Definovať funkciu `substrs`, ktorá prijíma ako argument reťazec a vracia zoznam všetkých podreťazcov tohto reťazca. Definovať funkciu `subsets`, ktorá prijíma ako argument reťazec a vracia zoznam všetky kombinácie tohto reťazca. Môžte použiť aj funkcie `suf` a `pref` z predošlej úlohy.
```haskell
substrs xs = concat $ map pre $ suf xs

subsets [] = [[]]
subsets (a:as) = ss ++ map (a:) ss
    where
        ss = subsets as
```
/6b/ Definovať funkciu `ff`, prvý argument je meno súboru v ktorom je každý riadok vo formáte `<key>:<value>` a druhý argument je hľadaný klúč. Funkcia `ff` vráti hodnotu tohto klúča. Ak sa daný klúč v súbore nenachádza, funkcia vráti, že zadaný klúč nenašiel.
```haskell
ff f key = do
    h <- openFile f ReadMode
    c <- hGetContents h
    let lns = lines c
    (\res -> hClose h >> return res) $! find (show key) lns

find _ [] = "Not found"
find keystr (l:ls) =
    if take (length keystr) l == keystr then
        let rest = drop (length keystr) l
        in if head rest == ':' then tail rest
            else find keystr ls
    else
        find keystr ls
```
## 2019/2020
### Předtermín
Definovat datovou strukturu, která reprezentuje neorientovaný graf (prostě množina vrcholů a množina hran, kde hrana je dvojice - vrchol, vrchol).
```haskell
data Graph v = UG {vertices::[v], edges :: [(v,v)]}
    deriving (Eq,Show)
```
Vytvořit funkci, co maže izolované uzly v neorientovaném grafu:
```haskell
delIso :: Eq v => Graph v -> Graph v
delIso (UG vs es) = UG (del vs es) es
    where
        del [] _ = []
        del (v:vs) es =
            if elemVEs v es then v : del vs es else del vs es

elemVEs :: Eq v => v -> [(v, v)] -> Bool
elemVEs v ((v1,v2):es) = v==v1 || v==v2 || elemVEs v es
elemVEs _ [] = False
```

Dán typ pro neorientovaný graf, soubor, v něm po řádcích jména uzlů, volný řádek, dvojice jmen oddělených dvojtečkou dává hrany.
Zkontrolovat funkcí checkUG, zda-li je to jinak korektní graf. Vrátit graf.
```haskell
loadG :: FilePath -> IO (Maybe (GraphString))
loadG file = do
    h <- openFile file ReadMode
    c <- hGetContents h
    let (vs,es) = parse $ lines c
    let g = UG vs es
    let gok = check g
    if gok then hClose h >> (return $ Just g) else hClose h >> return Nothing

parse :: [String] -> ([String], [(String, String)])
parse ("":es) = ([], pe es)
parse (v:vs) = let
    (vxs,es) = parse vs
               in (v:vxs,es)

pe :: [String] -> [(String, String)]
pe (e:es) =let
    (v1,x) = span (/=':') e
    in (v1,tail x) : pe es
pe [] = []
```
Alebo
```haskell
loadG file = do
        h <- openFile file ReadMode
        c <- hGetContents h
        let lns = lines c
        let (vs, es) = parse lns
        let g = UG vs es
        let gok = checkUG g
        if gok then hClose h >> (return $ Just g) else hClose h >> return Nothing

        parse lns = (vs, es)
        where
                (vs, (_:rest)) = span (/="") lns
                es = pe rest
                pe ((v1:':':v2):re) = (v1,v2) : pe re
                pe [] = []
```
### Řádný termín

Dáno (CS - context sensitive grammar):
```haskell
data CSgrammar nt t = CSG nt [Rule nt t]
    deriving (Show, Eq)

data Rule nt t = Rule [Either nt t] [Either nt t]
    deriving (Show, Eq)
```
Úkoly:
```haskell
appRule :: (Eq nt, Eq t) => [Either nt t] -> Rule nt t -> [[Either nt t]]
appRule sf (Rule lft rgt) = proc [] sf
    where
        -- test every suffix of the sf whether its prefix is not a LHS of the rule,
        -- if yes then do a derivation else continue
        proc _ [] = []
        proc pref sf@(s:ss) =
            if repl then (reverse pref ++ rgt ++ rest) : proc (s:pref) ss
            else proc (s:pref) ss
            where
                (repl,rest) = replT lft sf
        -- if it is a prefix, return rest behind the prefix and True
        -- otherwise False (and something)
        replT [] rest = (True,rest)
        replT (x:xs) (r:rs) =
            if x==r && res then w else (False,rs)
            where
                w@(res,xxs) = replT xs rs
        replT _ [] = (False,[])

----------

appAll :: (Eq nt, Eq t) => CSgrammar nt t -> [Either nt t] -> [[Either nt t]]
appAll (CSG _ rules) sf =
    -- apply or rules, if possible
    if null applicable then [] else concatMap (appRule sf) applicable
    where
        -- select only applicable rules
        applicable = filter (isApp sf) rules

----------

genNew :: (Eq nt, Eq t2) => CSgrammar nt t2 -> [[Either nt t2]] -> [[Either nt t2]]
genNew gram inSFs = cleanRep newSFs
    where
        newSFs = concatMap (appAll gram) inSFs
        cleanRep [] = []
        cleanRep (sf:sfs) =
            if elem sf inSFs || elem sf sfs then cleanRep sfs else sf : cleanRep sfs

----------

testInL :: (Eq a, Eq t) => CSgrammar a t -> [Either a t] -> Bool
testInL gram@(CSG st _) sentence =
    if not $ isTerminal sentence
        then error "Not a sentence on input in testInL"
        else proc [[Left st]] []
    where
        sentLen = length sentence
        proc sfs done
            | elem sentence terms = True
            | null nterms = False
            | True = proc notdone (notdone ++ done)
            where
                step = genNew gram sfs
                leqsfs = filter (\s -> length s <= sentLen) step
                terms = filter isTerminal leqsfs
                nterms = filter (not . isTerminal) leqsfs
                notdone = filter (\sf -> not (elem sf done)) nterms
```

### 1. opravný termín
**/3b/** Funkcie na prienik a zjednotenie množín v čistom Haskelli. Jedna musela byť napísaná s využitím generátorov zoznamov a druhá iným spôsobom.
```haskell
uni [] l = l
uni l [] = l
uni (x:xs) l =
    if x `elem` l then uni xs l else x : uni xs l
--
int xs ys = [ z | z <- xs, z `elem` ys]
```

**/2b/** Datová štruktúra pre lambda výrazy.
[iné riesenie - 20/21 1. op](https://hackmd.io/JB5CYyAZRoS55_WFMbdUkQ?view#1-opravn%C3%BD)

```haskell
data LE a
    = App (LE a) (LE a)
    | Abs a (LE a)
    | Var a
    deriving (Show,Eq)
```
**/4b/** Vytvorenie zoznamu voľných premenných v lambda výraze
```haskell
fv (Var v) = [v]
fv (App e1 e2) = uni (fv e1) $ fv e2
fv (Abs v e) = [x | x <- fv e, x /= v]
```
**/8b/** .....
```haskell
isValid (Var _) _ _ = True
isValid (App e1 e2) ne v = isValid e1 ne v && isValid e2 ne v
isValid (Abs w ee) ne v = proc [w] ee
    where
        fvne = fv ne
        proc bound (Var x)
            | x == v && x `elem` bound = True
            | x == v                   = null $ bound `int` fvne
            | otherwise                = True
        proc bound (App e1 e2) =
            proc bound e1 && proc bound e2
        proc bound (Abs x ex) = proc (x:bound) ex
```
**/6b/** Niečo s leftmost outermost deriváciou/aplikáciou
```haskell
lmom w@(Var _) = w
lmom (App e1 e2) =
    case e1 of
        (Abs v e) -> if isValid e e2 v then subst e e2 v else (App e1 e2)
        _ -> App (lmom e1) e2
lmom (Abs w ee) =
    Abs w (lmom ee)

```


## 2018/2019
### Řádný termín
- Nadefinovat strukturu pre DirTree.
- Urobit funkciu, ktora spocita velkost obsahu složky.
- Urobit funkciu ktora vrati zoznam suborov a složek, ktory obsahuju zadany prefix.
- Funkcia na rekurzivny vypis obsahu priecinka, nieco ako:
```
(tohle je soucast zadani jeste)
-* Root
+ +-* SubDir
+ + + file2
+ file1
+
```

```haskell
data DirTree a
    = File String Integer a
    | Dir String Integer a [DirTree a]
    deriving (Show,Eq)

dirSize (File _ s _) = s
dirSize (Dir _ s _ dir) = foldr (+) s $ map dirSize dir

findAllPref file dir =
    findPath "" dir
    where
        cmpp [] _ = True
        cmpp _ [] = False
        cmpp (p:ps) (f:fs) = p==f && cmpp ps fs
        findPath p (File name _ _) =
            if cmpp file name then [p++name] else []
        findPath p (Dir name _ _ dir) =
            let
                cur = if cmpp file name then [p++name++"/"] else []
                other = concatMap (findPath $ p++name++"/") dir
            in
                cur++other
printDir (File name size _) = putStrLn $ "+ " ++name++" "++show size
printDir d@(Dir _ _ _ _) =
    prd "" d
    where
        prd pref (File name size _) = putStrLn $ pref++" "++name++" "++show size
        prd pref (Dir name _ _ dir) = do
            putStrLn $ pref++"-* "++name
            mapM_ (prd $ pref++" +") dir
            putStrLn $ pref++" ."
```
- BONUS: Red–black tree:
```haskell
data Color
    = Black
    | Red
    deriving (Show,Eq,Ord,Bounded,Read,Enum)
data RBT a
    = Nil
    | Nd Color a (RBT a) (RBT a)
    deriving (Show,Eq)

countBlack Nil = Just 1
countBlack (Nd Red _ l r) =
    cmpLR 0 (countBlack l) (countBlack r)
countBlack (Nd _ _ l r) =
    cmpLR 1 (countBlack l) (countBlack r)
cmpLR x (Just lv) (Just rv) = if lv == rv then Just $ x+lv else Nothing
cmpLR _ _ _ = Nothing

```
### 1. Opravný termín

2-6) Pomocí haskell implementovat lambda výrazy a nějakou práci nad nima, myslím, že tam byl substr
```haskell
data LE
    = Var String
    | App LE LE
    | Abs String LE
    deriving (Eq,Show)

remove _ [] = []
remove x (y:ys) =
    if x == y then ys else y : remove x ys

union [] ys = ys
union (x:xs) ys =
    if elem x ys then union xs ys else x : union xs ys

fv (Var v) = [v]
fv (App e1 e2) =
    let
        f1 = fv e1
        f2 = fv e2
    in
        union f1 f2
fv (Abs v e) =
    remove v (fv e)


----------------------------------------------
-- subst what var where
subst w var ins = run ins
    where
        fvs = fv w
        comb (Just e1) (Just e2) = Just $ App e1 e2
        comb _ _ = Nothing
        run vv@(Var v) = if v == var then Just w else Just vv
        run vv@(Abs v e) =
            if elem var (fv e) && elem v fvs then Nothing else
            if v == var then Just vv else
            case run e of
                Nothing -> Nothing
                Just e -> Just $ Abs v e
        run (App e1 e2) = comb re1 re2
            where
                re1 = run e1
                re2 = run e2

----------------------------------------------
-- varianta bez bonusu
pp' x = ppp x >> putStrLn ""

ppp (Var v) = putStr v
ppp (App e1 e2) = do
    putStr "("
    ppp e1
    putStr " "
    ppp e2
    putStr ")"
ppp (Abs v e) = do
    putStr "(\\ "
    putStr v
    putStr " -> "
    ppp e
    putStr")"

----------------------------------------------
-- varianta na bonus
pp (Var v) = putStrLn v
pp (App e1 e2) = do
    apply e1
    mkp True e2
    putStrLn ""
pp e = do
    mkp False e
    putStrLn ""

mkp f (Var v) = do
    if f then putStr " " else return ()
    putStr v
mkp f (Abs v e) = do
    if f then putStr " ( " else return ()
    putStr $ "\\ "++v
    nest e
    if f then putStr " )" else return ()
mkpf (App e1 e2) = do
    if f then putStr " (" else return ()
    if f then mkp f e1 else apply e1
    mkp True e2
    if f then putStr " )" else return ()

nest (Abs v e) = do
    putStr $ " "++v
    nest e
neste = do
    putStr " -> "
    mkp False e

apply (Var v) = do
    putStr v
apply (App e1 e2) = do
    apply e1
    mkp True e2
apply (Abs v e) = do
    putStr "( "
    putStr $ "\\ "++v
    nest e
    putStr" )"
```

### 2. Opravný termín

1. Nadefinovat typ BTree, který má předem daný počet potomků a předem zadanou hloubku stromu (zadáno při tvorbě). Listy mají jako hodnotu seznam dvojic (klíč, hodnota), které jsou předem neznámého typu. Uzly mají pak jako hodnotu seznam, který odpovídá potomkům a v každá hodnota v seznamu značí maximální klič, který může daný potomek obsahovat.
2. Vytvoření funkce `create :: Integer -> Integer -> Int -> Int -> BTree`. Kde parametry jsou po sobě: Max klíč, min klíč, hloubka, počet potomků.
**BONUS:** za řešení, které se vypořádá s tím, když je počet potomků/pater nesoudělný s celkovým počtem klíčů.
3. Vytvoření funkce `ins :: (typ neuveden)`, která dostává argumenty: klíč, data, strom a která podle zadaného klíče buď upraví hodnotu ve stromu, nebo ji přidá.
4. Vytvoření funkce `allList :: (typ neuveden)`, která ze zadaného stromu vybere z listů všechny hodnoty a vrátí je jako jediný konkatenovaný seznam hodnot.
**BONUS:** pokud tato funkce bude pracovat s lineární časovou složitostí



## 2017/2018
### Řádný termín
/4b/ Funkce sort v holem Haskellu, bere seznam hodnot nad tridou Ord a vraci serazene od nejmensiho po nejvetsi. K dispozici fold*, map a operace nad tridou Ord.


```haskell
ins x [] = [x]
ins x l@(y:ys) =
    if x < y then x : l else  y : ins x ys

sort l = foldr ins [] l
```


/13b/ Nadefinovat funkciu pt, ktora berie nazov suboru ako argument. Z tohoto suboru nacita zaznamy ve formatu Cislo_typu_Integer#String, pripadne prazdny riadok. Zaznam reprezentovat datovym typom DLog. Vypsat zaznamy s cisly, ktere jsou nasobkem 5 (cislo mod 5 == 0). Odelene budu tentoraz dvojbodkou (:).
Je potrebne uviest typove defincie pre kazdu pouzitu funkciu.
Zadane byly typove definicie nekterych funkci pro praci s IO (openFile, hGetContents, lines, unlines, ReadMode, WriteMode, atp.).

```haskell
data DLog
    = Empty
    | IT Integer String
    deriving (Show,Eq)

pr :: [DLog] -> IO ()
pr [] = return ()
pr (Empty:xs) = pr xs
pr ((IT i s):xs) =
    if i `mod` 5 == 0
    then putStrLn (show i ++ ":" ++ s) >> pr xs
    else pr xs

pl :: String -> IO ()
pl fn = do
    h <- openFile fn ReadMode
    c <- hGetContents h
    pr $ proc $ lines c
    hClose h

proc :: [String] -> [DLog]
proc [] = []
proc (l:ls) =
    if null l
    then Empty : proc ls
    else (mk l) : proc ls

mk :: String -> DLog
mk l = IT ((read (takeWhile (/='#') l))::Integer)
    (tail $ dropWhile (/='#') l)

-- Varianta SPAN
pl' :: String -> IO()
pl' fn = do
    h <- openFile fn ReadMode
    c <- hGetContents h
    pr $ map mkDL $ lines c
    hClose h

mkDL :: String -> DLog
mkDL [] = Empty
mkDL l = let (n,s) = span (/='#') l
    in IT ((read n)::Integer) (tail s)
```
/6b/ BONUS otazka - Vytvorit datovou strukturu pro reprezentaci stromu. Vytvorit funkci initTree, ktera dostane jako parametr hodnotu a vytvori nekonecny strom, kde vsechny uzly obsahuji tuto hodnotu. Vytvorit funkci takeLev, ktera vrati strom az po urcitou uroven danou parametrem.
```haskell
data Tree a
    = Nd a (Tree a) (Tree a)
    | Lf
    deriving (Show,Eq)

takeLev :: Int -> Tree a -> Tree a
takeLev 0 _ = Lf
takeLev _ Lf = Lf
takeLev n (Nd v l r) =
    Nd v (takeLev (n-1) l) (takeLev (n-1) r)

initTree :: a -> Tree a
initTree val = Nd val (initTree val) (initTree val)
```
### 1. opravný termín
Vytvořit nekonečný seznam prvočísel.

```haskell
primes = 2:[x | x <- [3,5..], isPrime x primes]
    where
        isPrime x (p:ps) =
            (p*p > x) || (x `mod` p /= 0 && isPrime x ps)
-- alebo
primes = isPrime [2..]
  where
    isPrime (p:xs) = p : isPrime [x|x <- xs, x `mod` p > 0]
```

Haskell s dostupnými IO funkcemi. Napsat funkci `mkR`, která dostane jméno souboru. V řádcích souboru se nachází buď FIT login, nebo prázdný řádek, nebo nějaký jiný text. Funkce má vypsat nejdříve počet řádků s validními loginy, pak počet textových řádků, pak počet prázdných řádku a nakonec vypsat všechny tyto validní loginy v náhodném pořadí. Pro generování náhodných čísel je k dispozici funkce `randomRIO :: Random a => (a, a) -> IO a`.
```haskell
mkR :: String -> IO ()
mkR file = do
    h <- openFile file ReadMode
    c <- hGetContents h
    let alllogs = lines c
    let empty = length $ filter (=="") alllogs
    let wempty = filter (/="") alllogs
    let notLogs = length $ filter (not . isLogin) wempty
    let correct = filter isLogin wempty
    putStrLn $ show (length correct) ++ "/" ++ show notLogs ++ "/" ++ show empty
    randLog <- genRand correct
    putStrLn $ unlines randLog
    hClose h

isLogin :: String -> Bool
isLogin x =
    length x == 8 && head x == 'x' &&
    (all (\x -> elem x ['a'..'z']) $ take 5 $ tail x) &&
    (all (\x -> elem x (['0'..'9']++['a'..'z'])) $ drop 6 x)

genRand :: [a] -> IO [a]
genRand [] = return []
genRand l = do
    ir <- randomRIO (0,length l - 1) :: IO Int
    let (h,t) = splitAt ir l
    let v = head t
    let r = tail t
    mkr <- genRand (h++r)
    return (v:mkr)

```

## 2016/2017
### Řádný termín
 Holý Haskell. Definovat datový typ pro asociativní pole. Dále napsat funkci test, která ověří, že klíče v asociativním poli jsou unikátní. (7b)
```haskell
data AL k d
    = Val k d (AL k d)
    | Nil
    deriving (Show,Eq)

test Nil = True
test (Val k _ rest) = noKey k rest && test rest

noKey _ Nil = True
noKey k (Val k' _ rest) = k/=k' && noKey k rest
```
Haskell + prelude (kromě readFile) + nějaké IO funkce jako (hGetContents, hClose, openFile, hPutStr). Napsat funkci fdup, která načte soubor jehož nazev je v jejím parametru a potom tento soubor vypíše na výstup, ale s tím, že pokud jsou na začátku řádku dva znaky +, tak se tento řádek vypíše 2x, ale už bez těchto dvou plusových znaků. Nesmí se změnit pořadí řádků. (6b)
```haskell
import System.IO

fdup :: FilePath -> IO ()
fdup file = do
    h <- openFile file ReadMode
    c <- hGetContents h
    putStr $ unlines $ dl $ lines c
    hClose h

dl :: [String] -> [String]
dl (('+':'+':l):ls) = l:l:dl ls
dl (l:ls) = l : dl ls
dl [] = []
```
Bonus: Definujte strukturu pro termy v prologu a následně funkci unify s dvěma parametry, která vratí nejobecnější unifikátor dvou termu (8b)
```haskell
data Term
    = Var String
    | ValI Integer
    | Term String [Term]
    deriving (Show,Eq)

unify (ValI a) (ValI b) =
    if a==b then Just [] else Nothing
unify (Term a as) (Term b bs) =
    if a==b && length as==length bs then comb [] as bs
    else Nothing
    where
        comb res [] [] = Just res
        comb res (a:as) (b:bs) =
unify a b >>=
    (\s -> comb (res++s) (map (lapp s) as) (map (lapp s) bs))
unify w@(Var a) t =
    if w==t then Just [] else Just [(a,t)]
unify t w@(Var a) = unify w t

lapp ss t = foldl (flip app) t ss

app (v,t) w@(Var v') =
    if v==v' then t else w
app s (Term t ts) = Term t (map (app s) ts)
app _ x = x
```

# Prolog
## 2022/2023
### Řádný
Implementace funkce prime/1, která ověří, že X je prvočíslo a při zadání prime(X) generuje nekonečkou posloupnost prvočísel.

```prolog
allNums(1, 1) :- !.
allNums(N, X) :- X is N - 1.
allNums(N, X) :- N2 is N - 1, allNums(N2, X).

generateinfity(1).
generateinfity(X) :- generateinfity(X2), X is X2 + 1.
generateinfity(X) :- generateinfity(X).

not_prime(X) :- allNums(X, X1), allNums(X, X2), X is X1 * X2.

prime2(X) :- not_prime(X), !, fail.
prime2(_).

prime(1).
prime(X) :- generateinfity(X), prime2(X).

```




### Předtermín

Implementace deterministickeho Turingova stroje. Je dano `:- dynamic tol/1 tor/1 state/1 head/1.`, kde state je predikat reprezentujici aktualni stav Turingova stroje. `head` obsahuje symbol pod hlavou. `tol` obsahuje seznam reprezentujici pasku vlevo od hlavy. `tor` stejne tak, ale vpravo od hlavy. V obou pripadech je prvni prvek seznamu policko pasky nejblize hlave. Semantika TM je klasicka, tj. neni mozne se posunout doleva, pokud seznam `tol` je prazdny. Doprava je mozne se posunout vzdy (blank pod hlavou). Krok TS je reprezentovany termem `move(State, Symbol, Action)`, kde `State` je soucasny stav, `Symbol` symbol pod hlavou a `Action` akce, co se ma provest (viz 4).

V zadani zminoval, ze mame vzdy co nejvic vyuzivat predikaty vzdy z predchozich ukolu.

1) Implementujte predikat `shl/0`, co pokud je to mozne, pak provede posun hlavy doleva a uspeje. (7b) V dalsich prikladech muzeme predpokladat existenci predikatu shr/0, co posouva doprava, wh/1, co zapisuje pod hlavu a rh/1, co cte symbol pod hlavou.
```prolog
shl :- tol([NewHead|NewLTape]),
        head(OldHead),
        retract(head(_)), assertz(head(NewHead)),
        retract(tol(_)), assertz(tol(NewLTape)),
        tor(OldRTape),
        retract(tor(_)), assertz(tor([OldHead|OldRTape])).

```
2) Implementujte predikat `ttol/1`, co do prvniho argumentu vrati obsah cele pasky (5b za "oneliner", jinak 3b)
```prolog
ttol(FullTape) :-
    tol(LTape),
    tor(RTape),
    head(Head),
    reverse(LTape, RevLTape),
    append(RevLTape, [Head|RTape], FullTape).
```
3) Implementujte predikat findmove(Moves, Action), co ve vstupnim seznamu `Moves` (jeho obsah jsou termy move) najde proveditelnou akci a zunifikuje ji do argumentu `Action`. Pak tam byla asi 4radkova poznamka o tom, ze v seznamu Moves muzou byt i kroky, ktery jdou provest s jakymkoliv symbolem apod, ale mame brat v potaz jen validni. Zaroven mame umoznit backtracking v pripade, ze tech validnich pohybu je vic (ze to v realu nenastane, ale mame to podporovat) (3b)
```prolog
findmove(Moves, Action) :-
    member(move(State, Symbol, Action), Moves),
    head(Symbol),
    state(State).
```
4) Implementujte predikat action/1, ktery dostane jako argument akci a provede ji. Akce muze byt nasledujiciho tvaru (5b):
    a) `act(w, Sym, State)` - zapise Sym pod hlavu a presune se do stavu State
    b) `act(r, State)` - posune hlavu doprava a presune se do stavu State
    c) `act(l, State)` - posune hlavu doleva a presune se do stavu State

```prolog
action(act(r, State)) :-
    shr,
    retract(state(_)),
    assertz(state(State)).

action(act(l, State)) :-
    shl,
    retract(state(_)),
    assertz(state(State)).

action(act(w, Sym, State)) :-
    retract(head(_)),
    assertz(head(Sym)),
    retract(state(_)),
    assertz(state(State)).
```
5) Implementujte predikat work(Moves, InitState, Tape, FinalStates), ktery dostane mozne prechody TS `Moves` (viz format `move`), pocatecni stav `InitState`, seznam koncovych stavu `FinalStates` a pocatecni obsah pasky `Tape` a uspeje, pokud pro tohle zadani existuje reseni. Tim, ze je to deterministicky TM, mame uvazovat, ze je mozne provest vzdy maximalne jeden krok z `Moves`, tj. neuvazovat backtracking. (10b)
```prolog
work(Moves, InitState, [InitHead, RestOfTape], FinalStates) :-
    assertz(state(InitState)),
    assertz(tol([])), assertz(tor(RestOfTape)),
    assertz(head(InitHead)),
    doMoves(Moves, FinalStates).

isInFinal(Finals) :- state(CurrentState), member(CurrentState, Finals), !.

doMoves(Moves, FinalStates) :- isInFinal(FinalStates), !.
doMoves(Moves, FinalStates) :-
    findmove(Moves, NextAction),
    action(NextAction),
    doMoves(Moves, FinalStates).

```
## 2021/2022
### 1. termín
1) [12b.]
Příklad[[1, 2], [2,3,4], []], [[3,4], [1], [1,2,3,4]]

Vstupem seznam množin,
Sjednocení všech množin tvoří univerzum,
Pro každou vstupní množinu vypsat doplněk vůči tomuto univerzu.
K dispozici holý prolog.
```prolog
complements(I,O) :-
    getUniverse(I,U),
    getComplements(I,U,O)
.

getComplements([],_,[]).
getComplements([HI|TI],U,[HO|TO]) :-
    getDifference(HI,U,HO),
    getComplements(TI,U,TO)
.

getDifference(U,U,[]).
getDifference(_,[],[]).
getDifference(S,[HU|SU],[HU|R]) :-
    notMember(HU,S),
    getDifference(S,SU,R)
.
getDifference(S,[_|SU],R) :-
    getDifference(S,SU,R)
.

getUniverse([],[]).
getUniverse([H|T],U) :-
    getUniverse(T,TU),
    append(H,TU,U)
.

notMember(_,[]).
notMember(X,[H|T]) :-
    notMember(X,T),
    X \= H
.

member(_,[]) :- false.
member(X,[X|_]).
member(X,[_|T]) :-
    member(X,T)
.

append([],X,X).
append(X,[],X).
append(L1,L2,R) :-
    appendInner(L1,L2,T),
    removeDuplicates(T,R)
.

appendInner([],X,X).
appendInner(X,[],X).
appendInner([H1|T1],L,[H1|R]) :-
    appendInner(T1,L,R)
.

removeDuplicates([],[]).
removeDuplicates([H|T],[H|R]) :-
    notMember(H,T),
    removeDuplicates(T,R)
.
removeDuplicates([_|T],R) :-
    removeDuplicates(T,R)
.
```

2) [4b.] splt
chová se jako span v Haskellu.
splt (P, A, AT, AF)

vstupem predikát P a seznam A.
Výstupem dva seznamy:
AT = souvislý prefix A, kde pro všechny prvky platí predikát P.
AF = zbytek seznamu A(od prvního prvku, kde P neplatí, do konce).
K dispozici holý prolog.
```prolog
% Pozn.: call a not nie sú v holom prológu, ale bez toho to nejde implementovať
splt(_, [], _, []).
splt(P, [H|T], N, AF) :-
    call(P, H),
    N = [H|Rest],
    splt(P, T, Rest, AF).
splt(P, [H|T], [], [H|T]) :- not(call(P, H)).

% alebo ine riesenie
splt(P,[HA|TA],[HA|ATA],AF) :-
    call(P, HA),
    splt(P,TA,ATA,AF)
.
splt(_,L,[],L).
```
3) [asi 6b.]
Vyhledání všech klíčů ve stromě, které se vážou k dané hodnotě.
Klíče ve stromě byly unikátní, hodnoty byly neznámého typu
```prolog
// test příslušnosti do seznamu
elem(H, [H|_]) :- !.
elem(H, [_|T]) :-
    elem(H, T),
    !.
// sjednocení množin
union([], R, R) :- !.
union(R, [], R) :- !.
union([H|T], U, R) :-
    elem(H, U),
    union(T, U, R),
    !.
union([H|T], U, [H|R]) :-
    union(T, U, R),
    !.
// definice stromu
// strom může být prázdný, to jsem vyjádřil predikátem myTree(stop).
myTree(stop).
// strom může mít tři položky
// -> dvojici (klíč, hodnota), to v prologu vyjádřím zápisem -(_K, _V), spojovník a závorky vyjadřuji, že je to dvojice, podtržítko na začátku vyjadřuje anonymitu.
// -> levý podstrom
// -> pravý podstrom
// musí nutně platit, že Left i Right jsou stromy.
myTree(tree(-(_Key, _Value), Left, Right)) :-
    myTree(Left),
    myTree(Right).
// hledání klíče dle libovolné hodnoty v prázdném stromě vrátí prázdný seznam jako odpověď
getKeysByValue(_, myTree(stop), []) :- !.
// při hledání klíčů dle hodnoty Val naunifikuji do A, B klíče odpovídající hodnotě Val z podstromů Left, Right (po řadě), sjednotím je do R a přidám k nim Key, pokud hodnota aktuálního uzlu odpovídá hledané hodnotě
getKeysByValue(Val, myTree(tree(-(Key, Value), Left, Right)), [Key|R]) :-
    Val == Value,
    getKeysByValue(Val, myTree(Left), A),
    getKeysByValue(Val, myTree(Right), B),
    union(A, B, R),
    !.

Zkuste si třeba:
myTree(stop).
myTree(tree(-(1, 2), stop, tree(-(2, 3), stop, stop))).
getKeysByValue(2, myTree(tree(-(10,2), tree(-(1, 2), stop, stop), tree(-(100, 0), stop, tree(-(1000, 2), stop, stop)))), R).

--Nebo-------
%To predtim mi uplne nefungovalo. Toto mi jde uz spustit:
% Dole jsou i "testy"

union([], [], []).
union([], T, T).

union([H|T], S, [H|U]) :-
    \+ member(H, S),
    union(T, S, U).

union([H|T], S, U) :-
    member(H, S),
    union(T, S, U).

myTree(stop).

myTree(tree(-(_Key, _Value), Left, Right)) :-
    myTree(Left),
    myTree(Right).

getKeysByValue(_, stop, []) :- !.
getKeysByValue(Val, tree(-(Key, Value), Left, Right), R) :-
    getKeysByValue(Val, Left, A),
    getKeysByValue(Val, Right, B),
    (Val == Value -> union(A, B, AB), union(AB, [Key], R) ; union(A, B, R)),
    !.

main :-
  union([1,2,3], [2,3,4], U1),
  format('Test 1: Union = ~w~n', [U1]),

  myTree(tree(-(1, a), tree(-(2, b), stop, stop), tree(-(3, c), stop, stop))),
  format('Test 2: myTree passed~n'),

  getKeysByValue(a, tree(-(1, a), tree(-(2, b), stop, stop), tree(-(3, a), stop, stop)), K1),
  format('Test 3: Keys = ~w~n', [K1]),

  halt.


```

4) [asi 8b.]
~jsme v nekonečném stavovém prostoru, prakticky všechno je neznámé nebo dané parametrem a úkolem je udělat krok/cestu v rámci stavového prostoru ... no idea

### 1. opravný
1. vytvoriť funkciu notelem, ktorá failne ak sa polozka nachádza v zadanom liste notelem(+Val,+List).
- moze sa poouzit !, fail
```prolog
notmem(_,[]).
notmem(X,[X|_]) :- !, fail.
notmem(X,[_|XS]) :- notmem(X,XS).
```
2. implementovat `keyval(Key, Val)` (cca 15b)
- pouzite assert, nonvar, var, !
- ak sú zadané key aj value skúsi vložiť do pamati
```prolog
keyval(1, jeden)
keyval(2, dva)
keyval(3, tri)
```
- ak sú zadany len key, nájde value z pamäti
```prolog
keyval(1, V)
V = jeden

keyval(5, V)
false.
```
- len value - nájde keys
```prolog
keyval(K, jeden)
K = [1,11]
```
- keyval(K, V) - vypíše z pamati
```prolog
K = 1
V = jeden

K = 2
V = dva
```
```prolog
:-dynamic
    kvpair/2.

keyval(Key,Val) :-
    var(Key), var(Val), !, kvpair(Key,Val).
keyval(Key,Val) :-
    var(Val), !, kvpair(Key,Val).
keyval(Key,Val) :-
    var(Key), !, collect(Key,Val).
keyval(Key,Val) :-
    testOrInsert(Key,Val).
collect(Key,Val) :-
    kvpair(K,Val), !,
    take([K],Val,Key).
take(Keys,Val,Res) :-
    kvpair(K,Val), notmem(K,Keys), !,
    take([K|Keys],Val,Res).
take(Keys,_,Keys).
testOrInsert(Key,Val) :-
    kvpair(Key,V), !, Val=V.
testOrInsert(Key,Val) :-
    assertz(kvpair(Key,Val)).
```

3. remKey(Key) - odstráni Key z pamati, neuspeje ak nenájde, remAll - uspeje vždy raz, odstráni predikáty z pamäti
```prolog
remKey(Key) :-
    kvpair(Key,Val),
    retract(kvpair(Key,Val)).
remAll :-
    kvpair(Key,Val), !,
    retract(kvpair(Key,Val)),
    remAll.
remAll.
```

4. vytvoriť zjednocovanie zanorenych listov do obycajného listu - zostanú len najvonkajšejšie zátvorky (najľavejšia+najpravejšia)
`destr([ [1,[]],[2,[3],4],[[], 5] ],[1,2,3,4,5])`
```prolog
destr([],[]).
destr([[]|X],Y) :-
    destr(X,Y),!.
destr([[H|T]|X],Y) :-
    destr([H|[T|X]],Y),!.
destr([H|T],[H|TT]) :-
    destr(T,TT).
```
### Riadny
Lambda calcul v prologu
- viz [riadny 19/20](https://hackmd.io/JB5CYyAZRoS55_WFMbdUkQ?view#riadny)
```prolog
/* 1
var(V)       variable     abs(f,abs(x,var(x))) ... 0
app(E1,E2)   application  abs(f,abs(x,app(var(f),var(x)))) ... 1
abs(V,E)     abstraction  abs(f,abs(x,app(var(f),app(var(f),var(x)))))
V - variable
E,E1,E2 - lambda-expression
*/

/* 2 */
fv(var(V),[V]).
fv(app(E1,E2),Res) :-
    fv(E1,R1), fv(E2,R2),
    union(R1,R2,Res).
fv(abs(V,E),Res) :-
    fv(E,FV),
    del(FV,V,Res).

union([],L,L) :- !.
union(L,[],L) :- !.
union([X|XS],YS,Res) :-
    member(X,YS), !,
    union(XS,YS,Res).
union([X|XS],YS,[X|Res]) :-
    union(XS,YS,Res).

del([],_,[]).
del([X|XS],X,XS) :- !.
del([X|XS],V,[X|Res]) :-
    del(XS,V,Res).

/* 3 */
valid(Where,What,Var) :-
    fv(What,FV),
    chk(Where,Var,[],FV).
chk(var(V),V,BV,FV) :-
    intersect(BV,FV,I), I==[].
chk(app(E1,E2),V,BV,FV) :-
    chk(E1,V,BV,FV),
    chk(E2,V,BV,FV).
chk(abs(V,_),V,_,_) :- !.
chk(abs(W,E),V,BV,FV) :-
    chk(E,V,[W|BV],FV).

intersect([],_,[]) :- !.
intersect(_,[],[]) :- !.
intersect([X|XS],YS,[X|RS]) :-
    member(X,YS),!,
    intersect(XS,YS,RS).
intersect([_|XS],YS,RS) :-
    intersect(XS,YS,RS).

/* 4 */
isEta( abs( V, app(E,var(V)) ) ) :-
    fv(E,FV),
    not(member(V,FV)).
isEta(app(E1,E2)) :-
    isEta(E1) ; isEta(E2).
isEta(abs(_,E)) :-
    isEta(E).
```

<!-- ### 1. opravný -->
<!-- ### 2. opravný -->

## 2020/2021
### Řádný termín
Magicke štvorce - NxN matica s hodnotami 1,...,N^2 hodnotami
- info: 1x1 je jednoduche spravit; 2x2 nejde; 3x3 ...
- suma v riadku, stlpci a uhlopriecke je 15 (pri 3x3)
- viz http://www.mathematische-basteleien.de/magsquare.htm
8....1....6
3....5....7
4....9....2


1. spraviť reprezentaciu matice NxN `cms(+N, -M)`
- `cms(N,M)` skontroluje, že N je číslo, M je pre navrat konečnej matice Magic sqaure
- `cel(N,R)` vytvorí list riadku
- `car(N,N,M)` vytvorí výslednú maticu - list listov (list riadkov pomocou `cel`)
```Prolog
cms(N,M) :-
    integer(N),
    car(N,N,M).

cel(N,[_|T]) :-
    N>0,
    NN is N-1,
    cel(NN,T).
cel(N,[]) :-
    N =< 0.

car(N,A,[L|T]) :-
    A>0,
    cel(N,L),
    AA is A-1,
    car(N,AA,T).
car(_,A,[]) :-
    A =< 0.
```
2. na poziciu X, Y v matici doplnit hodnotu V a vrátiť výslednú maticu - `set(X,Y,M,V,MM)`

```Prolog
set(X,Y,[H|T],V,[H|TT]) :-
    X > 1, XX is X-1,
    set(XX,Y,T,V,TT).
set(X,Y,[H|T],V,[HH|T]) :-
    X == 1,
    yset(Y,H,V,HH).

yset(Y,[H|T],V,[H|TT]) :-
    Y > 1, YY is Y-1,
    yset(YY,T,V,TT).
yset(Y,[_|T],V,[V|T]) :-
    Y == 1.
```
3. doplniť zvyšnú maticu (pomocne funkcie - f. co ti da nevyuzite hodnoty, ...)
```Prolog
solve(N,M,M) :-
    getFree(M,[]),!,
    chk(N,M).
solve(N,M,Res) :-
    getFree(M,Free),
    concat(M,L),
    assertz(size_of(N)),
    step(Free,[],L,[],0,ResL),
    toMS(N,ResL,Res).
solve(_,_,_) :-
    retractall(size_of(_)),
    !,fail.

step([],[],[],Rev,_,Res) :-
    reverse(Rev,Res),
    size_of(N),
    toMS(N,Res,M),
    chk(N,M).
step(Free,[],[X|XS],Rev,Ctr,Res) :-
    integer(X),
    CC is Ctr+1,
    try(Free,[],XS,[X|Rev],CC,Res).
step([F|FS],WasFree,[X|XS],Rev,Ctr,Res) :-
    var(X), % Try F
    CC is Ctr+1,
    append(FS,WasFree,Xfree),
    try(Xfree,[],XS,[F|Rev],CC,Res).
step([F|FS],WasFree,[X|XS],Rev,Ctr,Res) :-
    var(X), % F failed
    step(FS,[F|WasFree],[X|XS],Rev,Ctr,Res).
/* rozsireni prubezny test */
try(Xfree,[],XS,Rev,Ctr,Res) :-
    size_of(N),
    D is Ctr div N,
    M is Ctr mod N,
    D > 1,
    M == 0,!,
    reverse(Rev,O),
    check(N,D,O), /* prubezny test */
    step(Xfree,[],XS,Rev,Ctr,Res).
try(Xfree,[],XS,Rev,Ctr,Res) :-
    step(Xfree,[],XS,Rev,Ctr,Res).
/* .............. */
/* rozsireni o prubezny test - test */
sumupto(N,Rest,0,Rest) :- N =< 0.
sumupto(N,[X|XS],S,Rest) :-
    N > 0,
    N1 is N-1,
    sumupto(N1,XS,Sub,Rest),
    S is X+Sub.
check(N,Rows,L) :-
    Rows>1,
    sumupto(N,L,Val,Rest),
    RR is Rows-1,
    chcl(N,RR,Val,Rest).
chcl(_,Rows,_,_) :- Rows == 0.
chcl(N,Rows,Val,L) :-
    Rows > 0,
    sumupto(N,L,Val,Rest),
    RR is Rows-1,
    chcl(N,RR,Val,Rest).
/* -------------- */
/* -------------- */
/* -------------- */
/* co bylo hotove a k uziti, aby to byly komplet, tak zde */
toMS(_,[],[]).
toMS(N,L,[HH|Rest]) :-
    toArray(N,L,HH,TT),
    toMS(N,TT,Rest).

toArray(0,L,[],L).
toArray(N,[H|T],[H|TT],Rest) :-
    N > 0,
    N1 is N-1,
    toArray(N1,T,TT,Rest).
/* .............. */
getFree(MS,ListN) :-
    getUsed(MS,Used),
    length(MS,N),
    genAll(N,All),
    sd(All,Used,ListN).
genAll(N,L) :-
    NN is N*N,
    mkl(1,NN,L).

mkl(N,M,[N|T]) :-
    N < M, NN is N+1,
    mkl(NN,M,T).
mkl(N,M,[M]) :-
    N == M.

getUsed([],[]).
getUsed([[]|T],R) :-
    getUsed(T,R).
getUsed([[H|T]|TT],R) :-
    var(H),!,
    getUsed([T|TT],R).
getUsed([[H|T]|TT],[H|R]) :-
    getUsed([T|TT],R).
sd([],_,[]).
sd([X|XS],S,R) :-
    member(X,S),!,
    sd(XS,S,R).
sd([X|XS],S,[X|R]) :-
    sd(XS,S,R).
/* .............. */
concat(L1,L2) :- append(L1,L2).
/* .............. */
chk(N,M) :-
    integer(N),
    N>0,
    length(M,N),
    maplist(length,M,LN),
    all(N,LN),
    append(M,AllVals),
    genAll(N,AllPos),
    vals(AllPos,AllVals),
    csum(M).

all(_,[]).
all(N,[N|T]) :-
    all(N,T).

vals([],[]).
vals(Pos,[X|XS]) :-
    integer(X),
    member(X,Pos),
    delete(Pos,X,NewPos),
    vals(NewPos,XS).

csum(M) :-
    maplist(sum_list,M,[H|T]),
    transp(M,MT),
    maplist(sum_list,MT,TT),
    all(H,T), all(H,TT),
    cdiag(H,0,M),
    maplist(reverse,M,MR),
    cdiag(H,0,MR).
cdiag(H,S,[[V]]) :-
    SS is S+V,
    H == SS.
cdiag(H,S,[[V|_]|T]) :-
    SS is S+V,
    maplist(tail,T,TT),
    cdiag(H,SS,TT).

tail([_|T],T).
head([H|_],H).

transp([],[]).
transp([[]|_],[]).
transp(XSS,[HHS|RT]) :-
    maplist(head,XSS,HHS),
    maplist(tail,XSS,TSS),
    transp(TSS,RT).
```
- BONUS: definovat datovy typ obojsmerne viazany zoznam + funkciu ktora zisti dlzku zoznamu - prvky v zozname sa neopakuju

### 1. opravný
1. `genV(+Start,+End, -V)` vygenerovat hodnoty od Start do End vratane (ocakavany vstup je zadany dobre); Start, End su kladné čisla
```prolog
genV(1,3,V).
V=1
V=2
V=3
```

```prolog
genL(E,E,[E]).
genL(S,E,[S|T]) :-
    S<E,
    SS is S+1,
    genL(SS,E,T).

genV(S,E,V) :-
    genL(S,E,L),
    append(_,[V|_],L).

% alebo ina verzia:
genV(S,E,S):- S < (E + 1).
genV(S, E, V):- S < (E + 1), NS is S + 1, genV(NS, E, V).

% alebo este trochu ina verzia
genV(S, E, S) :- S =< E.
genV(S, E, V) :- S < E, NS is S + 1, genV(NS, E, V).
```
2. `solve(+Xm, +Ym, -X, -Y, -Z)` vyriesit prehladavanim pre `1, ...Xm` a `1...Ym` rovnicu `x²+y²=z²`
```prolog
solve(5,5,X,Y,Z)
x=3
y=4
z=5

x=4
y=3
z=5
atd...
```
```prolog
solve(Xm,Ym,X,Y,Z) :-
    genV(1,Xm,X),
    genV(1,Ym,Y),
    ZZ is X*X+Y*Y,
    genZ(X,Y,ZZ,Z).

genZ(M1,M2,ZZ,Z) :-
    max(M1,M2,S),
    Zm is 2*S+1,
    genV(S,Zm,Z),
    Z2 is Z*Z,
    Z2==ZZ.

max(X,Y,X) :- X >= Y.
max(X,Y,Y) :- X < Y.

% alebo menej komplikovane
solve(Xm, Ym, X, Y, Z) :-
    genV(1, Xm, X),
    genV(1, Ym, Y),
    L is X * X + Y * Y,
    genV(1, L, Z),
    P is Z * Z,
    L == P.
```
3. `resolve` ako `solve` ale zadava da lava a prava strana rovnice
```prolog
resolve(5,5,X*X*X+Y*Y*Y,Z*Z,X,Y,Z)
X = 1,
Y = 2,
Z = 3

X = 2,
Y = 1,
Z = 3

X = 2,
Y = 2,
Z = 4
```
```prolog
resolve(Xm,Ym,Xe,Ze,X,Y,Z) :-
    genV(1,Xm,X),
    genV(1,Ym,Y),
    ZZ is Xe,
    genF(ZZ,Ze,Z).

genF(ZZ,Ze,Z) :-
    Zm is ZZ+1,
    genV(1,Zm,Z),
    Z2 is Ze,
    test(Z2,ZZ).     % skor tu malo byť Z2 = ZZ

% alebo menej komplikovane
resolve(Xm, Ym, Le, Pe, X, Y, Z) :-
    genV(1, Xm, X),
    genV(1, Ym, Y),
    L is Le,
    genV(1, L, Z),
    P is Pe,
    L == P.
```
4. `zip(L1,L2,L12)`
```prolog
zip([1,2,3,4],[a,b,c],R)
R = [(1,a),(2,b),(3,c)]
```
```prolog
zip([],_,[]):-!.
zip(_,[],[]):-!.
zip([X|XS],[Y|YS],[(X,Y)|T]) :- zip(XS,YS,T).
```

### 2. opravný termín
Definované:
```prolog
:- dynamic p/1.
node(t,c,92).
node(t,d,45).
node(t,g,71).
node(t,h,40).
node(t,p,67).
node(d,c,50).
node(d,g,42).
node(d,h,20).
node(d,p,54).
node(c,g,36).
node(c,h,54).
node(c,p,58).
node(g,h,32).
node(g,p,22).
node(h,p,36).
```
/8b/ Holý prolog + `not`, `!`, `member`, `length`. Napísať predikát `getAllNodes(+Num)`, ktorý do jediného parametru unifikuje počet jedinečných uzlov.
```prolog!
% cut prevents unnecessary backtracking and ensures that once a node has been
% added to the list of nodes (L), it is not re-added in subsequent iterations
getNodes(L,Res) :-
    node(N,_,_),
    not(member(N,L)),!,
    getNodes([N|L],Res).
getNodes(L,Res) :-
    node(_,N,_),
    not(member(N,L)),!,
    getNodes([N|L],Res).
getNodes(L,L). % we fall here when all node/3 are explored -> unify working L

getAllNodes(Len) :-
    getNodes([],L),
    length(L,Len).
```
/22b/ Travelling salesman problem. Napísať predikát `tsp`, ktorý nájde najlacnejšiu trasu medzi dvoma uzlami. // toto je asi zla definicia, v TSP hladame najlacnejsiu trasu z daneho uzla cez vsetky uzly naspat do daneho uzla (a kazdy uzol okrem startu navstivime 1x)
```prolog
getlen(X,Y,L) :- node(X,Y,L).
getlen(X,Y,L) :- node(Y,X,L).

tsp(From,How,Price) :-
    setof(J,solve(From,J),LL), % get all paths starting from our node From
    best(LL,How,Price).        % find the one with the best Price

% `j` functor usage is not necessary, it just improves readability
% it represents a tuple of path (list visiting all nodes exactly once) and price
best([j(H,P)],H,P) :- !.   % there is only one solution, so we save it
best([j(_,P)|R],RH,RP) :-  % there are multiple solutions
    best(R,RH,RP),         % so we find the best solution from the tail
    RP<P, !.               % and conclude that the head solution is worse
best([j(H,P)|_],H,P).      % if it's not worse, then we save it

solve(From,j(How,Price)) :-
    getAllNodes(LAll),
    CL is LAll+1,         %
    getlen(From,Nxt,L),   %
    go(Nxt,From,Way,P),   %
    Price is P+L,         %
    How = [From|Way],     %
    length(How,CL).       % make sure all nodes are visited

go(T,T,[T],0) :- !.
go(F,T,[F|R],PP) :-
    assertz(p(F)),
    getlen(F,N,P),
    not(p(N)),
    go(N,T,R,PR),
    PP is P+PR.
go(F,_,_,_) :-
    p(F),
    retract(p(F)),
    !, fail.
```
Nebo jine reseni:
```prolog!
tsp(From, To, HowReverse) :-
    findBestPath(From, To, How),
    reverse(How, HowReverse).

% findBestPath(+From, +To, -BestPath)
findBestPath(From, To, BestPath) :-
    findall(Path, findPath([], [From], To, Path), AllPaths),
    sort(AllPaths, [(_, BestPath) | _]).

%AddCostToPath(+Path, -PathCost)
pathCost([], 0).
pathCost([(X, Y)|RestPath], Cost) :-
    node(X, Y, PathCost),
    pathCost(RestPath, RestCost),
    Cost is PathCost + RestCost.

%findPath(?Path, ?VisitedNodes, +To -FinalPath)
%FinalPath = (Cost, Path)
findPath(Path, [To | _], To, (PathCost, Path)) :-
    pathCost(Path, PathCost),
    !.


findPath(Path, [LastNode | RestNodes], To, FinalPath) :-
    VisitedNodes = [LastNode | RestNodes],
    node(LastNode, NextNode, _),
    \+ member(NextNode, VisitedNodes),
    findPath([(LastNode, NextNode)|Path], [NextNode | VisitedNodes], To,  FinalPath).

//Test Cases
node(a, b, 80).
node(b, c, 5).
node(c, e, 10).
node(a, d, 5).
node(d, e, 200).

:- tsp(a, e, Path)
```

## 2019/2020
### Predtermin
Klika - viz [popis](https://fituska.eu/download/file.php?id=13594)
```prolog
:- dynamic edge/2, node/2.
/* 1 */
/* Dána reprezentace pro neorientovaný graf na vstupu ug(vertices,edges),
uložit jako node(uzel,-1) a edge(uzel,uzel) */
insUG(ug(VS,ES)) :-
    inV(VS), inE(ES).

inV([]).
inV([V|VS]) :-
    assertz(node(V,-1)), inV(VS).

inE([]).
inE([p(V1,V2)|ES]) :-
    assertz(edge(V1,V2)), inE(ES).

/* 2 */
/* Otestovat, zda zadaná množina uzlů je klika - graf je v DB */
isC([_]) :- !.
isC([N|NS]) :-
    checkE(N,NS),isC(NS).
isC([]).

checkE(_,[]).
checkE(N,[X|XS]) :-
    (edge(N,X);edge(X,N)),!,
    checkE(N,XS).

/* 3 */
/* Doplnit stupeň uzlu ne každému, kde to ještě není nastaveno */
deg(Node,Deg) :-
    findall(N, edge(Node,N), L1),
    findall(N, edge(N,Node), L2),
    length(L1,N1), length(L2, N2),
    Deg is N1+N2.

mkDegs :-
    node(V,-1),!,
    deg(V,D),
    retract(node(V,-1)),
    assertz(node(V,D)),
    mkDegs.
mkDegs.

/* 4 */
/* Zkusit pro uzel N a jeho okolí Nbr najít mezi nimi co kliku velikosti D-1.
Sousedů je dostatek, nebo více, na to je spoleh.
K dipozici je take jako z Haskellu a perm pro permutace. */
tryC(D,N,Nbrs, [N|Nbrs]) :-
    length(Nbrs,Len),
    Len == D, !,
    isC([N|Nbrs]).
tryC(D,N,Nbrs, [N|L]) :-
    perm(Nbrs,NX),
    take(D,NX,L),
    isC([N|L]).

/* 5 */
/* Zkusit najít kliku v rozsahu (CD,D>, kde je hlavní uzel N a jeho okolí Nbrs.
Klika bude Clique, když se najde. */
repTry(CD,D,N,Nbrs,Clique) :-
    D > CD,
    tryC(D,N,Nbrs,Clique),!.
repTry(CD,D,N,Nbrs,Clique) :-
    DD is D-1,
    DD > CD,
    repTry(CD,DD,N,Nbrs,Clique).

/* 5 */
/* Udělat predikát, co zkusít najít větší kliku než zadanou, ideálně tu největší.
Dostane aktuální velikost kliky - 1 (AcD), tu kliku a nějakou vrátí (ResClique).
K dispozici má getNbr, co vrací sousedy pro uzel a fltr, co zjistí, jestli to má
k aktuální klice smysl v daném okolí kliku hledat a když ano, tak vrátí to okolí,
kde se to ověří. */
findC(ActD,_,ResClique) :-
    node(N,D), D>ActD,
    getNbr(N,AllNbrs),
    fltr(D,AllNbrs,NewD,NewNbrs), NewD>ActD,
    repTry(ActD,NewD,N,NewNbrs,Clique),
    length(Clique,LenC),
    DC is LenC - 1, DC > ActD, !,
    findC(DC,Clique,ResClique).
findC(_,C,C).

/* A když to vyjde, bude toto fungovat. */
getClique(ug(VS,ES),Clique) :-
    retractall(node(_,_)),
    retractall(edge(_,_)),
    insUG(ug(VS,ES)),
    mkDegs,
    node(N,_),
    findC(0,[N],Clique),!.
```
### riadny
Lambda Kalkul v prologu:
- viz [riadny 21/22](https://hackmd.io/JB5CYyAZRoS55_WFMbdUkQ?both#Riadny2)
```prolog
/* 1 definicie + ako reprezentovat LE v prologu
lambda expression:
variable - var(atom)
lambda-application - app(E1,E2)
lambda-abstraction - abs(atom,E)
where E, E1, E2 are lambda expressions
atom is a name of variable
*/
/* 2 */
fv(E,Vs) :-
    fv3(E,[],Vs).

fv3(var(V),Bs,[]) :-
    member(V,Bs), !.
    fv3(var(V),_,[V]).
fv3(app(E1,E2),Bs,Vs) :-
    fv3(E1,Bs,V1),
    fv3(E2,Bs,V2),
    uni(V1,V2,Vs).
fv3(abs(V,E),Bs,Vs) :-
    fv3(E,[V|Bs],Vs).

uni([],L, L).
uni([X|XS],L, YS) :-
    member(X,L), !,
    uni(XS,L, YS).
uni([X|XS],L, [X|YS]) :-
    uni(XS,L, YS).

/* 3 */
subst(Where,What,Var,Res) :-
    fv(What,FW),
    sb(Where,What,FW,Var,[],Res).

sb(var(X),_,_,Var,_,var(X)) :- X \= Var, !.
sb(var(X),_,_,X,Bs,var(X)) :- member(X,Bs).
sb(var(X),What,FW,X,Bs,What) :- notIn(FW,Bs), !.
sb(app(E1,E2),What,FW,Var,Bs,app(R1,R2)) :-
    sb(E1,What,FW,Var,Bs,R1),
    sb(E2,What,FW,Var,Bs,R2).
sb(abs(V,E),What,FW,Var,Bs,abs(V,Res)) :-
    sb(E,What,FW,Var,[V|Bs],Res).

notIn([],_) :- !.
notIn(_,[]) :- !.
notIn([X|_],YS) :-
    member(X,YS),
    !, fail.
notIn([_|XS],YS) :-
    notIn(XS,YS).

/* 4 */
doBR(app(abs(Var,Where),What), Res) :- subst(Where, What, Var, Res).
doBR(app(E1,E2), app(Res,E2)) :- doBR(E1,Res).
doBR(app(E1,E2), app(E1,Res)) :- doBR(E2,Res).
doBR(abs(V,E), abs(V,Res)) :- doBR(E,Res).

/* 5 */
findR(S,S,_,[S]) :- !.
findR(_,_,N,_) :-
    N > 5, !, fail.

findR(S,E,N,[S|Rest]) :-
    assertz(la(S)),
    doBR(S,NS),
    not(la(NS)),
    NN is N+1,
    findR(NS,E,NN,Rest).
findR(S,_,_,_) :-
    la(S),
    retract(la(S)),
    !, fail.
```
### 1. opravný
1.
```prolog
% kontrola ze list Y obsahuje prefix list X
isPref([], _) :-!.
isPref([X|XS],[X|YS]) :- isPref(XS,YS).

% dropuje list L, kym list X obsahuje elementy
dropL([],L,L) :- !.
dropL([_|XS],[_|YS],R) :- dropL(XS,YS,R).
```
2.
```prolog
replaceAll(Where,What,By,Res) :-
    length(Where,WL),
    length(What,AL),
    AL =< WL, !,
    doRepl(Where,What,AL,By,Res).
replaceAll(Where,_,_,Where).

doRepl([W|WS], What, AL, By, [R1|Res]) :-
    isPref(What, [W|WS]), !,
    dropL(What, [W|WS], Rest),
    append(By, Rest, R1),
    doRepl(WS, What, AL, By, SR),
    prep(W, SR, Res).
doRepl(WS, _, AL, _, []) :-
    length(WS, WL),
    WL < AL, !.
doRepl([W|WS], What, AL, By, Res) :-
    doRepl(WS, What, AL, By, SR),
    prep(W, SR, Res).

prep(X, XS, [X|XS]).
```
3.
```prolog
replLines([], _,_, []).
replLines([L|LS], What,By, [RL|RLS]) :-
    replaceAll(L,What,By, RL),
    replLines(LS, What,By, RLS).
```
4.
```prolog
mkLines([[]|LS],RS) :- !, mkLines(LS,RS).
mkLines([LX|_],_) :- length(LX,L), L>1, !, fail.
    mkLines([[L]|LS],[L|RS]) :- mkLines(LS,RS).
    mkLines([],[]).
```
5.
```prolog
find(Lines1,SR,Lines2,Res) :-
    assertz(done(Lines1,[])),
    findP(Lines1,SR,Lines2,Res).
find(Lines1,_,_,_) :-
    retract(done(Lines1,[])),
    !,fail

findP(Lines1,_,Lines1,[]) :- !.
findP(Lines1,SR,Lines2,[T|TS]) :-
    length(Lines2,LL2),
    append(_,[T|_],SR),
    not(done(_,T)),
    T =.. [sr,What,By],
    replLines(Lines1,What,By,LRep),
    mkLines(LRep,LinesNew),
    length(LinesNew,LN),
    LN >= LL2,
    not(done(LinesNew,_)),
    asr_ret(LinesNew,T),
    findP(LinesNew,SR,Lines2,TS).

asr_ret(L,T) :-
    assertz(done(L,T)).
asr_ret(L,T) :-
    retract(done(L,T)),
    !,fail.

```
## 2018/2019
### Řádný termín

1. Napsat predikaty pro zjisteni, jestli je prvek v seznamu a pro odstraneni hodnoty ze seznamu. Dat si bacha na to, ze seznam muze obsahovat nenavazane promenne a prvek se s nima nesmi zunifikovat.
2. Transpozice matice.
3. Predikat, ktery bere sudoku reprezentovane matici 9x9 a vytvori seznam bloku 3x3.
4. Predikat, ktery pro danou pozici v sudoku zjisti seznam moznych hodnot, ktere se na to policko daji doplnit. Mame k dispozici predikat getIth(X,M,L), ktery z matice M vytahne radek X do seznamu L. A meli jsme napsane, jak se z pozice [X,Y] v matici urci cislo bloku.
5. Predikat solves, ktery s vyuzitim definovanych predikatu vyresi sudoku, ktere ma na vstupu zadane matici 9x9. Neobsazene policka jsou reprezentovana volnou promennou. Muzem pouzit getIth, getRC, ktery pro zadanou pozici a matici vrati prvek na tech souradnicich a setRC, ktery nastavi prvek v matici na nejakou hodnotu.

```prolog
/* -- vv -- */
elemNV(X,[V|_]) :- nonvar(V), V=X, !.
elemNV(X,[_|VS]) :- elemNV(X,VS).

remVals([],_,[]).
remVals([X|XS],L,R) :- elemNV(X,L), !, remVals(XS,L,R).
remVals([X|XS],L,[X|R]) :- remVals(XS,L,R).

/* -- vv -- */
trp([[]|_],[]) :- !.
trp(XSS,[L|LS]) :- heads(XSS,L,YSS), trp(YSS,LS).

heads([[H|TS]|XSS],[H|T],[TS|YSS]) :- heads(XSS,T,YSS).
heads([],[],[]).

/* -- vv -- */
blocks([[A,B,C|CS],[D,E,F|FS],[G,H,I|IS]|XSS],[[A,B,C,D,E,F,G,H,I]|LS]) :- blocks([CS,FS,IS|XSS],LS).
blocks([[],[],[]|XSS],LS) :- blocks(XSS,LS).
blocks([],[]).

/* -- vv -- */
valsFor(X,Y,M,[V|VS]) :-
    getIth(X,M,L),
    remVals([1,2,3,4,5,6,7,8,9],L,[H|T]),
    trp(M,TM),
    getIth(Y,TM,R),
    remVals([H|T],R,[HH|TT]),
    blocks(M,BM),
    P is (3*((X-1)//3)) + (1+((Y-1)//3)),
    getIth(P,BM,B),
    remVals([HH|TT],B,[V|VS]).

/* -- vv -- */
solves(M) :- search(1,1,M).

search(R,C,M) :-
    getRC(R,C,M,V),
    nonvar(V), !,
    goNonvar(R,C,M).
search(R,C,M) :-
    valsFor(R,C,M,VS),
    testVals(R,C,M,VS).

goNonvar(9,9,_) :- !.
goNonvar(R,C,M) :-
    newRC(R,C,RR,CC),
    search(RR,CC,M).

testVals(9,9,M,[X]) :-
    getRC(9,9,M,X), !.
testVals(R,C,M,[X|_]) :-
    getRC(R,C,M,X),
    newRC(R,C,RR,CC),
    search(RR,CC,M).
testVals(R,C,M,[_|XS]) :-
    testVals(R,C,M,XS).

/* co bylo k dispozici jako hotove, pro uplnost */
newRC(R,C,R,CC) :-
    C<9, !, CC is C+1.
newRC(R,9,RR,1) :-
    R<9, RR is R+1.

getIth(1,[X|_],X) :- !.
getIth(N,[_|XS],X) :- N1 is N-1, getIth(N1,XS,X).

getRC(R,C,M,V) :-
    getIth(R,M,L),
    getIth(C,L,V).
```
### 1. opravny termín
Dámy
```prolog
/* -------------------------------------------------------------------- */
genAll(0,_,[]).
genAll(Size,Col,[pos(Col,Size)|Res]) :-
    Size > 0,
    SS is Size - 1,
    genAll(SS,Col,Res).
/* -------------------------------------------------------------------- */
inConf([pos(X,_)|_], pos(X,_)) :- !.
inConf([pos(_,Y)|_], pos(_,Y)) :- !.
inConf([pos(XX,YY)|_], pos(X,Y)) :-
    tst(XX,X,YY,Y), !.
inConf([_|PS], P) :-
    inConf(PS,P).

tst(XX,X,YY,Y) :-
    XX<X, !, tst(X,XX,YY,Y).
tst(XX,X,YY,Y) :-
    YY<Y, !, tst(XX,X,Y,YY).
tst(XX,X,YY,Y) :-
    XR is XX-X,
    YR is YY-Y,
    XR == YR.
/* -------------------------------------------------------------------- */
filterNot(_, [], []).
filterNot(Pred, [X|XS], YS) :-
    call(Pred, X), !,
    filterNot(Pred, XS, YS).
filterNot(Pred, [X|XS], [X|YS]) :-
    filterNot(Pred, XS, YS).
/* -------------------------------------------------------------------- */
tryNext(PS,Size,Possible) :-
    length(PS,LPS),
    NewCol is LPS+1,
    genAll(Size,NewCol,NewPs),
    filterNot(inConfPS),NewPs,Possible).
/* -------------------------------------------------------------------- */
findQ(Size,PS,PS) :-
    length(PS,Size),
    !.
findQ(Size,PS,[]) :-
    tryNext(PS,Size,[]),
    !, fail.
findQ(Size,PS,Res) :-
    tryNext(PS,Size,NewPS),
    tryAll(Size,PS,NewPS,Res).
tryAll(_,_,[],_) :-
    !, fail.
tryAll(Size,PS,[N|_],Res) :-
    findQ(Size,[N|PS],Res).
tryAll(Size,PS,[_|NS],Res) :-
    tryAll(Size,PS,NS,Res).
/* -------------------------------------------------------------------- */
queens(Size,Ress) :-
    setof(P,findQ(Size,[],P),Ress).
/* -------------------------------------------------------------------- */
```

### 2. opravný termín
**Obchodní cestující:**


1. Definovat predikát `search (From, To, L)`, který vyhledá nejkratší cestu z `From` do `To` a vrátí její délku v `L`. Přičemž využívá `get_distance(From,To,L)`, což je predikát pro navrácení délky cesty mezi dvěma místy.
2. Definovat predikát `fsf (+From, Where, Distances)`, který vhodně navrací nejkratší vzdálenosti od `From` do všech míst z množiny `Where` v argumentu `Distances`.
3. Definovat predikát `gc (+Distances, Closest, L)`, který vybere a vrátí nejbližší bod od `From` z předchozího bodu v argumentu `Closest` a vzdálenost k němu v `L`.
4. Definovat predikát `ts (+From, +Where, -Path, -L)`, jež dostává výchozí bod a množnu dalších, které je nutné navštívit. Musí pak vybrat nejkratší cestu a vrátit ji i její délku.


## 2017/2018
### Řádný termín
1) /6b/ Flatten seznamu - vytvorit predikat e, ktery bere 2 argumenty. Prvni je seznam libovolne zanorenych seznamu (i prazdnych), napr. `[[], [1, 2], [ [[ ]] ], [atom, atom]]`. Druhy argument je vysledny seznam bez zanoreni.
2) /7b/ Funkce XOR, ktera vraci symterickou diferenci dvou mnozin (sjednoceni mnozin bez jejich pruseciku). Bere prvni a druhy parametr mnozinu reprezentovanou seznamem, treti parametr je vysledna mnozina reprezentovana seznamem.
3) /9b/ Napisat predikat search(PocatecniPozice, SeznamCest), ktory najde vsechny cesty z dane pozice zpet do teto pozice, delky 20 az 22 kroku (netrapit se tim, jestli vracet prvni/posledni prvek ci ne). Kazdy prvok je mozne nastivit len jeden krat vyjma prveho (== posledneho). Definicia pozicie je neznama, napiste funkci nextStep(Pos, NewPos) nad neznamym a NEKONECNYM stavovym priestorom. Mozno pouzit retract*, assert*, bagof, setof, length.
4) /8b/ Napisat predikat lookup. Prvy arguement vhodne reprezentovana tabulka symbolov, 2-hy argument kluc, 3-ty argument hodnota. A posledny a vysledny argument je modifikovana, pripadne vstupna tabulka symbolov.

Predikat pracuje v dvoch rezimoch. Ak je zadana hodnota, tak sa modifikuje pripadne modifikuje zaznam (klic -> hodnota?) v tabulke symbolov. Ak nie je zadana hodnota, tak vyhladavame v tabulku hodnotu so zadanym klucom. Ak sa nemylim, tak bolo mozne pouzit vsetko zo zakladnej kniznice Prologu. Ja som pouzil var(), nonvar() na zistenie, ci (nie) je zadana hodnota a nemyslim si, ze by to bolo v zadani spomenute. -- priklad byl mozna lehce modifikovany?

```prolog
:- dynamic
pos/1.
/* ---------------------------------- */
e([],[]).
e([[]|R],Res) :- !, e(R,Res).
e([[X|XS]|YS],Res) :- !, e([X,XS|YS],Res).
e([V|XS],[V|Res]) :- e(XS,Res).

/* ---------------------------------- */
xor([],L,L) :- !.
xor(L,[],L) :- !.
xor(L,R,Res) :- sub(L,R,L1),sub(R,L,R1),app(L1,R1,Res).

sub([],_,[]).
sub([X|XS],YS,RS) :- elem(X,YS),!,sub(XS,YS,RS).
sub([X|XS],YS,[X|RS]) :- sub(XS,YS,RS).

elem(X,[X|_]) :- !.
elem(X,[_|XS]) :- elem(X,XS).

app([],L,L).
app([X|XS],L,[X|RS]) :- app(XS,L,RS).
/* ---------------------------------- */
search(P,Res) :-
    setof(Path,s(P,P,0,Path),Res).

s(P,P,N,[P]) :- N =< 22, N >= 20, !.
s(_,_,N,_) :- N > 22, !, fail.
s(P,P,N,_) :- N \= 0, !, fail.
s(A,P,N,[A|R]) :-
    assertz(pos(A)),
    NN is N+1,
    nextStep(A,AA),
    ( not(pos(AA)) ; AA=P ) ,
    s(AA,P,NN,R).
s(A,_,_,_) :-
    pos(A),
    retract(pos(A)),
    !,fail.

nextStep(p(X,Y),p(XX,Y)) :- XX is X+1.
nextStep(p(X,Y),p(XX,Y)) :- XX is X-1.
nextStep(p(X,Y),p(X,YY)) :- YY is Y+1.
nextStep(p(X,Y),p(X,YY)) :- YY is Y-1.
/* ---------------------------------- */
emptyT([]).

lookup(T,_,_,_) :- var(T), !, fail.
lookup(T,Var,Val,NT) :- nonvar(Var),nonvar(Val), !, iT(T,Var,Val,NT).
lookup(T,Var,Val,T) :- nonvar(Var), lT(T,Var,Val).

iT([], R, L, [p(R,L)]).
iT([p(R,_)|PS], R, L, [p(R,L)|PS]) :- !.
iT([p(RR,LL)|PS], R, L, [p(RR,LL)|PPS]) :- iT(PS,R,L,PPS).

lT([p(R,L)|_],R,L) :- !.
lT([_|PS],R,L) :- lT(PS,R,L).

/* EOF */

```
### 1. opravny termín
1. Holý Prolog. Napsat predikát `mkTrans(ListOfLists,ListOfLists)`, která dostane v 1. argumentu matici, kterou transponovanou unifikuje do 2. argumentu.

```prolog
:- dynamic
pos/1.
/* ---------------------------------- */
mkTrans([],[]).
mkTrans([[]|_],[]).
mkTrans(LS,[HS|HHS]) :-
    trans(LS,HS,TS),
    mkTrans(TS,HHS).

trans([],[],[]).
trans([[H|T]|LS],[H|HS],[T|TS]) :-
    trans(LS,HS,TS).
```
2. Holý Prolog. Napsat predikát `subseq`, který v 1. argumentu dostane seznam a do 2. argumentu unifikuje seznam všech jeho podseznamů, tedy jde tam o prefix a suffix matching.

```prolog
/* ---------------------------------- */
suff([],[[]]).
suff([H|T],[[H|T]|R]) :-
    suff(T,R).

subseq(S,[[]|SS]) :-
    suff(S,SUFS),
    proc(SUFS,SS).

proc([],[]).
proc([S|SS],RES) :-
    pref(S,[_|PS]),
    proc(SS,PSS),
    append(PS,PSS,RES).

pref([H|T],[[]|R]) :-
    pref(T,PS),
    prepAll(H,PS,R).
pref([],[[]]).

prepAll(_,[],[]).
prepAll(X,[L|LS],[[X|L]|XS]) :-
    prepAll(X,LS,XS).
```
3. Prolog s `bagof, setof, assert, retract` atp. Prohledávání stavového prostoru. Napsat predikát `search(Start,Cíl, Nejkratší_cesta)`, který dostane nějakou startovní a koncovou pozici a unifikuje do 3. argumentu nejkratší cestu mezi nimi. Napsat také predikát `nextStep`, který bude vracet další novou pozici. úkolem není napsat optimální řešení, ale využít elegantnosti Prologu.
```prolog
search(S,E,Res) :-
    retractall(pos(_)),
    steptry(S,E,0,Res).

steptry(S,E,N,Res) :-
    s(S,E,N,Res), !.
steptry(S,E,N,Res) :-
    NN is N+1,
    steptry(S,E,NN,Res).

s(E,E,0,[E]) :- !.
s(_,_,N,_) :- N < 0, !, fail.
s(A,E,N,[A|R]) :-
    assertz(pos(A)),
    NN is N-1,
    nextStep(A,AA),
    not(pos(AA)) ,
    s(AA,E,NN,R).
s(A,_,_,_) :-
    pos(A),
    retract(pos(A)),
    !,fail.

nextStep(p(X,Y),p(XX,Y)) :- XX is X+1.
nextStep(p(X,Y),p(XX,Y)) :- XX is X-1.
nextStep(p(X,Y),p(X,YY)) :- YY is Y+1.
nextStep(p(X,Y),p(X,YY)) :- YY is Y-1.
```
4. Prolog s celočíselným dělením, dělením a is. Napsat Prologovou reprezentaci racionálních čísel a operaci násobení a sčítání nad nimi.
```prolog
/* ---------------------------------- */
/* rac(numerartor,denominator) */
/* op('+',L,R).
* op('*',L,R).
* rac(N,D).
*/
gcd(N,N,N) :- !.
gcd(N,M,M) :-
    N > M,
    NN is mod(N,M),
    NN==0, !.
gcd(N,M,D) :-
    N > M, !,
    NN is mod(N,M),
    gcd(M,NN,D).
gcd(N,M,N) :-
    M > N,
    MM is mod(M,N),
    MM is 0, !.
gcd(N,M,D) :-
    MM is mod(M,N),
    gcd(N,MM,D).

ev(op('+',L,R),rac(NN,DD)) :-
    ev(L,rac(LN,LD)),
    ev(R,rac(RN,RD)),
    N1 is LN*RD + RN*LD,
    D1 is LD*RD,
    norm(N1,D1,NN,DD).
ev(op('*',L,R),rac(NN,DD)) :-
    ev(L,rac(LN,LD)),
    ev(R,rac(RN,RD)),
    N1 is LN*RN,
    D1 is LD*RD,
    norm(N1,D1,NN,DD).
ev(rac(X,Y),rac(X,Y)).

norm(N,D,NN,DD) :-
    gcd(N,D,G), G>1,!,
    NN is div(N,G),
    DD is div(D,G).
norm(N,D,N,D).
```

## 2016/2017
### Riadny termín
1. Prohledávání stavového prostoru. Napsat predikát getPath, který má jako první parametr startovní bod a jako druhý cílový bod a do třetího unifikuje nejkratší (s nejmenší cenou) cestu mezi těmito body. Předpokládejte, že stavový prostor je konečný. Máte k dispozici predikát nextStep(X, XX, P), který jako první parametr dostane nějaký stav stavového prostoru a v druhém vrátí další stav a ve třetím bude výsledná cena tohoto kroku. (14b)

```prolog

% graph definition for testing etc.
% from: https://ibpublicimages.s3-us-west-2.amazonaws.com/tutorial/dijkstra3.png
nextStep('a', 'b', 3). nextStep('a', 'c', 2). nextStep('a', 'f', 5).
nextStep('b', 'a', 3). nextStep('b', 'c', 1). nextStep('b', 'd', 6).
nextStep('c', 'a', 2). nextStep('c', 'b', 1). nextStep('c', 'd', 4). nextStep('c', 'e', 4).
nextStep('d', 'b', 6). nextStep('d', 'c', 4). nextStep('d', 'e', 3).
nextStep('e', 'c', 4). nextStep('e', 'd', 3). nextStep('e', 'f', 2).
nextStep('f', 'a', 5). nextStep('f', 'e', 2).

:- dynamic
    visited/1,      % for preventing cycles
    best_price/1,   % when searched node is found, we save path price here for later comparison
    best_path/1.    % when we find some path to searched node, it is saved here

getPath(S,E,Path) :-
    retractall(visited(_)),
    retractall(best_price(_)),
    retractall(best_path(_)),
    assert(best_price(none)),
    getPathHelper(S,E,Path).

% search always fails, but it keeps trying to explore all possible paths
getPathHelper(S,E,_) :- search(S,E,0,[]).
% eventually we fall here (no paths to explore) and check if we found some path
getPathHelper(S,_,[S|Path]) :- best_path(Path).

% when we reach the searched node, we check the price of our current path
search(E,E,Price,Path) :- checkP(Price, Path), fail.
% this is the base-case of the computation
search(S,E,P,TP) :-
    assertz(visited(S)),    % saving the visited node
    nextStep(S,Nxt,SP),     % find a neighbouring node and price of the edge
    not(visited(Nxt)),      % make sure we have not been in this node already
    NP is P+SP,             % add the price
    append(TP,[Nxt],NTP),   % add the node to our current path
    search(Nxt,E,NP,NTP).   % keep searching
% we fall here when we reach a dead-end = all possible neighbors have been visited
search(S,_,_,_) :-
    retract(visited(S)),    % we "unvisit" this dead-end node
    !, fail.                % and backtrack

% in this case, we have not yet found any solution
checkP(NP,Path) :-
    best_price(none),            % in which case this should be true
    retract(best_price(none)),
    assert(best_price(NP)),      % so we set our price
    assert(best_path(Path)).     % and our path
% in this case, we have found some solution before
checkP(NP,Path) :-
    best_price(P),               % so we get its price
    NP<P,                        % we make sour our current solution is better
    retract(best_price(P)),
    retract(best_path(_)),
    assert(best_price(NP)),
    assert(best_path(Path)).     % and update best price, best path
```

2. Holý prolog (unifikace, základní práce se seznamy, + řez tuším). Navrhnout strukturu pro ukládání boolovských výrazů (pro and, or, not) nad proměnnými a literály true/false. Dále strukturu pro ukládání hodnot proměnných. Dále napsat predikát eval(Table, Expr, Res), která vyhodnotí daný bool výraz. V table je tabulka hodnot proměnných. Expr je vyhodnocovaný výraz. Do Res se unifikuje výsledek. (6b)

```prolog
% ground truth
eval(_,true,true).
eval(_,false,false).

% cuts are necessary, so that when a evaluation of expression gives false as a result,
% we don't explore further
eval(T,var(V),R) :- getVal(T,V,R), !.
eval(T,not(E),R) :-
    eval(T,E,EvalE1),
    % we use short-circuit evaluation here
    % (also note that , has a higher priority than ; )
    % if EvalE1 is unified with true,
    % we have to also do the second part of the conjuction
    % to satisfy the first part of the or (;) expression
    % if EvalE1 is unified with false,
    % the first part of the or (;) expression cannot be true
    % because there is conjuction there, so we skip to the R=false part.
    (EvalE1, eval(_, false, R); eval(_, true, R)), !.
eval(T,and(E1,E2),R) :-
    eval(T,E1,EvalE1),
    (EvalE1, eval(T,E2,R); eval(_,false,R)), !.
eval(T,or(E1,E2),R) :-
    eval(T,E1,EvalE1),
    (EvalE1, eval(_,true,R); eval(T,E2,R)), !.

% table of bool variable values is just a list of tuples
getVal([(V,Value)|_],V,Value).
getVal([_|WS],V,Value) :- getVal(WS,V,Value).

% usage examples:
% eval([(1, true), (2, false)], not(and(not(var(1)), var(2))), X).
% eval([('a', true), ('b', false)], or((var('a'), var('b')), X).
```

3. Holý prolog (unifikace, základní práce se seznamy). Implementujte predikát msort, který provádí merge sort řazení seznamu hodnot. Musí to být merge sort s jeho klasickou složitostí (ne kvadratickou...). (7b)
```prolog
merge([],L,L).
merge(L,[],L).
merge([H1|T1],[H2|T2],[H1|TT]) :- % to place H1 at the start of the result
    H1 =< H2,                     % it has to be smaller than H2
    merge(T1,[H2|T2],TT).         % we then call merge on the rest
merge([H1|T1],[H2|T2],[H2|TT]) :- % other case (H2 is smaller)
    H2 < H1,
    merge([H1|T1],T2,TT).

msort([],[]).   % list with no items is already sorted
msort([V],[V]). % list with 1 item is already sorted
msort([A,B|T],R) :-
    divide(T,L1,L2), % split input list T into two equal-size lists
    msort([A|L1],S1), % sort both of these lists individually
    msort([B|L2],S2),
    merge(S1,S2,R). % merge them together

% items with even idx (0,2,...) go to first list, odd idxs go to second
divide([],[],[]).
divide([V],[V],[]).
divide([A,B|T],[A|TA],[B|TB]) :-
    divide(T,TA,TB).
```

4. Cely prolog, ale nesmi se pouzit vestaveny append a jeste 2 veci co si nepamatuju. Mame predikat, kde prvni parametr je predikat (dvouparametrovy - tedy jeden vstup a výsledek) a druhy je seznam seznamu. Z druheho parametru se postupně berou seznamy a ma se provest aplikace predikatu na vsechny hodnoty v seznamu a dat dohromady vysledky do jednoducheho seznamu (tedy ne seznam seznamu). (6b)

```prolog!
% we first recursively fall here, so the RES list is unified as []
mapOnListOfLists(_,[],[]) :- !.
% so that RES is in the correct order, we do the computation "backwards"
% we first have to get the whole result (recursively),
% and then apply F on the head list (HL) and
mapOnListOfLists(F,[HL|TL],RES) :-
    mapOnListOfLists(F,TL,RT),      % we perform F() on the rest first
    mapOnList(F,HL,RT,RES).         % then we do the head list

% once we have no more values to map a function over,
% R (3rd parameter) is unified with what was in RES (4th parameter)
mapOnList(_,[],R,R) :- !.
% base case => X contains the result with the mapped values
% it is appended to the result
mapOnList(F,[H|T],R,[X|RES]) :-
    % next two lines could also be done using `call(F, H, X),`
    C =.. [F,H,X],        % construct a predicate F(H,X)
    % we cannot do that directly since F is a variable
    call(C),              % call it (result is stored in X)
    mapOnList(F,T,R,RES).

% example usage:
% mapOnListOfLists(abs, [[1,2,3], [-4,5,-6], [-10], []], X).
sqr(X,Y) :- Y is X*X.
% mapOnListOfLists(sqr, [[1,2,3], [-4,5,-6], [-10], []], X).
```


# Lambda kalkul
## Pevny bod
- prezentacia lambda calcul 30-33 slide
- pomocka aby si mohol duplikovat/replikovat/rekurzivne pracovat s funkciou
- napr. klasicky mas sucet 2 cisel, ale s vyuzitim pevneho bodu mozes scitat hocikolko cisel
cize mozes spravit `SUM 1 2 3 4 5 6 7 8 9`
miesto len `SUM 1 2`
```
k - pevny bod
E - vyraz
Y - operator pevneho bodu

Y E = k
E k = k
E (Y E) = Y E
```
![](https://media.discordapp.net/attachments/621775580471492638/973626236033179739/unknown.png)
## Cheatsheet
```
LET True = λxy . xy
LET False = λxy . yx

LET NOT = λa . a (λs.False) (λt.True) -- negace

LET AND = λab . a (λs.b) (λt.False) -- konjunkce
LET OR = λab . a (λs.True) (λt.b) -- disjunkce
LET EQ = λab . a (λs.b) (λt.NOT b) -- ekvivalence
LET XOR = λab . a (λs.NOT b) (λt.b) -- negace ekvivalence
LET IMP = λab . a (λs.b) (λt.True) -- implikace
LET NAND = λab . a (λs.NOT b) (λt. True) -- negace konjunkce
LET NOR = λab . a (λs. False) (λt.NOT b) -- negace disjunkce
LET NIMP = λab . a (λs. NOT b) (λt. False) -- negace implikace
LET OIMP = λab . a (λs. True) (λt. NOT b) -- obrácená implikace
LET NOIMP = λab . a (λs. False) (λt. b) -- negace obrácené implikace
LET A = λab . a -- identita prvniho argumentu
LET B = λab . b -- identita druheho argumentu
LET NA = λab . NOT a -- negace identity prvniho argumentu
LET NB = λab . NOT b -- negace identity druheho argumentu
LET TAUT = λab . True -- tautologie
LET CONT = λab . False -- kontradikce

LET TERNARY = λabc . a (λs.b) (λt.c) -- ternarni operator

LET EQU =  \x y . x (\s . y) (\r . (NOT y))

-- Peanova aritmetika
LET GTE = λab . iszero(sub b a)
LET LTE = λab . iszero(sub a b)
LET EQ = λab . iszero(sub a b) ? iszero(sub b a) : false

LET GT = λab . TERNARY (EQ a b) (False) (GTE a b)
LET LT = λab . TERNARY (EQ a b) (False) (LTE a b)
```

![](https://media.discordapp.net/attachments/621775580471492638/841748540211462204/unknown.png)

## 2021/2022
### termin

- operátor pevného bodu pro LT
k dispozici je: iszero, prev, reprezentace celých čísel (prev 0 = 0), zbytek si musíme navrhnout sami (ternární operátor třeba k dispozici nebyl)

```
LET LT = Y
    ( \ f x y . iszero x
        ? (iszero y ? False : True)
        : (iszero y ? False : f (prev x) (prev y))
    )
```

### 1. opravný
- POW x n - x ^ n, zadané True, dolplniť false, ternarny operator a
```
E k = k vlastnost pevného bodu
Y E = k funkce operátoru pevného bodu
E (Y E) = Y E vlastnost operátoru
LET True = \ x y . x y
LET False = \ x y . y
LET (?:) = \ c t f . c (\ x . t) f
LET POW = Y (\ f x n . iszero n ? 1 : mul x (f x (prev n)) )
```

<!-- ### 2. opravný -->

## 2020/2021
### riadny
definovať xor, true false podla seba
```
LET True = \ x y . x
LET False = \ x y . y
LET XOR = \ a b . a (b False True) b
```
```
-- konkretny priklad (nebol treba)
XOR True False =
(\ a b . a (b False True) b) True False =
(\ b . True (b False True) b) False =
True (False False True) False  =
(\ x y . x )(False False True) False  =
(\y . (False False True)) False =
False False True =
(\ x y . y ) False True =
(\ y . y )  True =
True
```

### 2. opravný termín
/2b/ Napísať výraz, kde 2 premenné sú volné a zároveň aj viazané
- vrámci jedného výrazu (NIE 2 rôznych výrazov).
```
-- napr.:
(\x . (\b a . a b) a b)
-- Pozn.: vrámci (\b a . a b) sú a b viazané
```
/4b/ Napísať príklad pre platnú a neplatnú substitúciu
- vrámci jedného výrazu (NIE 2 rôznych výrazov).
```
-- napr.:
(\x y z. x y) a z
-- Pozn.: subtitucia a je platná ale substitúcia z nie
```

## 2019/2020
### předtermín
Bylo definovaný `True` jako `\xy.xy`.
Muselo se definovat `False` libovolným způsobem.
Dál bylo potřeba definovat ternární operátor `? :`.
A v poslední řadě definovat funkci `eq`, která porovnává dvě celá čísla. U toho bylo možné využít funkce `iszero` a `prev`. Tohle bylo potřeba implementovat pomocí operátoru pevného bodu.

```
máme: celá čísla, iszero, prev

LET True = \ x y . x y
LET False = \ x y . y
LET (?:) = \ c t f . c (\ z. t) f

LET eq = Y (\ f x y .
        iszero x
            ? (iszero y ? True : False)
            : (iszero y ? False : f (prev x) (prev y))
        )
```

## 2018/2019
LT bude asi funkcia less <
```
E k = k
Y E = k
Y E = E (Y E)

LET True = \ x y. x
LET False = \ x y. y

LET LT = Y(\f x y. iszero y False (iszero x True (f (prev x) (prev y))))

```
## 2017/2018
/6b/ Op. pevneho bodu - MINUS x y. Nadefinovat True + False. K dispozici isZero, prev. Pripadne si dodefinovat dalsi funkce.
```
LET True = \ x y . x
LET False = \ x y . y
LET (?:) = \ c t f . c t f

    Y E = k
    E k = k
    Y E = E k = E (Y E)

LET minus = Y (\ f x y . iszero x ? 0 : (iszero y ? x : f (prev x) (prev y) ))
```

## 2016/2017
Ukázat vlastnost operátoru pevného bodu. V lamda kalkulu definovat násobení (MUL) s dvěma parametry pomocí prev, add, iszero a ternárního operátoru (6b)
```
k - pevny bod
E - vyraz
Y - operator pevneho bodu

    Y E = k
    E k = k
    E (Y E) = Y E

LET mul = \ a b . (iszero a ? 0 : (iszero b ? 0 : mf a b 0))
LET mf = Y (\ f a b r . iszero a ? r : f (pred a) b (add r b))
```

## 2015/2016
Popsat operátor pevného bodu, jeho vlastnost.
Pomocí něj a předdefinovaných funkcí isZero, add a ternárního operátoru vytvořit výraz SUM (funkce fungují tak jak čekáme, ale mají nám neznámou implementaci, taky čísla mají neznámou implementaci).
Výraz SUM vezme dvě čísla, x a y, a pokud je y=0, vrátí x, jinak vrátí SUM (x+y) (tedy částečně aplikovaného sama sebe).
Ukázat vyhodnocení SUM 2 3 0.

```
Pro vyraz E je pevny bod k: E k = k
Operator pevneho bodu Y: Y E = k = E (Y E)

LET G = \ f x y. iszero y ? x : f (add x y)
LET SUM = Y G

SUM 2 3 0 =
    = (Y G) 2 3 0
    = (G (Y G)) 2 3 0
    = (G SUM) 2 3 0
    = ((\ f x y. iszero y ? x : f (add x y )) SUM) 2 3 0
    = (iszero 3 ? 2 : SUM (add 2 3)) 0
    = (SUM 5) 0 = SUM 5 0
    = (Y G) 5 0
    = (G (Y G)) 5 0
    = (G SUM) 5 0
    = ((\ f x y. iszero y ? x : f (add x y )) SUM) 5 0
    = iszero 0 ? 5 : SUM (add 5 0)
    = 5
```

### 1. opravný

Mějme definováno True jako: ``True = \ x y . x y``.
Definujte False standardního významu dle libosti. S jejích pomoci definujte IMP (implikace zleva doprava) standardního významu.
Redukujte po krocích```IMP True False = False```
```
LET True = \ x y . x y
LET False = \ x y . y
LET IMP = \ x y . x (\ z . y) True

IMP True False =
    = (\ x y . x (\ z . y) True) True False
    = (\ y . True (\ z . y) True) False
    = True (\ z . False) True
    = (\ x y . x y) (\ z . False) True
    = (\ y . (\ z . False) y) True
    = (\ z . False) True
    =  False
```

## 2014/2015
### Řádny
Definicia vlastnosti operatoru pevneho bodu.
Potom pomocou tohoto operatoru, iszero a prev nadefinovat minus, ktore berie 2 cisla a odcita ich a - b, pricom vysledok je nezaporny (tj. ==0 ak je b vacsie ako a).
Mali sme zohladnit, ze iszero, prev a cisla maju neznamu definiciu, ale znamy vyznam. True a False je mozne si nadefinovat podla seba.
```
let T =  \ x y . x
let F =  \ x y . y

nechť Y je operátor pevného bodu, E je lambda-výraz a
k je pevný bod pro E, potom:
Y E = k = E k
Y E = E (Y E) ~ k = E k

LET minus = Y (\ f x y. iszero y ? x : (f (prev x) (prev y)))
```

### 1. opravný
```
LET True  = \ x y. x y
LET False = \ x y. y

LET NOR = \ a b. a (\i.False) (b (\k.False) True)

NOR True False =
    (\ a b. a (\i.False) (b (\k.False) True)) True False ->Beta
    (\ b. True (\i.False) (b (\k.False) True)) False ->Beta
    True (\i.False) (False (\k.False) True) =
    (\ x y. x y) (\i.False) (False (\k.False) True) ->Beta
    (\ y. (\i.False) y) (False (\k.False) True) ->Beta
    (\i.False) (False (\k.False) True) ->Beta
    False
```

## 2013/2014
pevny bod, nadefinovat GE
```
Y E = E (Y E)

LET gef = \ f x y . (iszero x ? iszero y : (iszero y ? True : f (prev x) (f prev y)))
let GE = Y gef
```

# Důkazy
## Návod
Ne všechno je definované v zadání. Například foldr, foldl a podobné definice je potřeba znát z paměti.

- vždy číslujte ake pravidla (rovnice) použivate
- všetko krokujte postupne nespajajte kroky
- zatvorkovanie spravte ako samostatny krok
- https://haskellhero.grifart.cz/index.php?page=lessons&lesson=56

Pamatať si:
- foldr(hlavne)

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f z [] = z
foldr f z (x:xs) = f x (foldr f z xs)
```
```haskell
foldl :: (a -> b -> a) -> a -> [b] -> a
foldl f z [] = z
foldl f z (x:xs) = foldl f (f z x) xs
```
```haskell
map :: (a -> b) -> [a] -> [b]
map f [] = []
map f (x:xs) = f x : map f xs
```
```haskell
len [] = 0
len (x:xs) = 1 + len xs
```
```haskell
rev [] = []
rev (x:xs) = rev xs ++ [x]
```
```haskell
concat :: [[a]] -> [a]
concat [] = []
concat (x:xs) = x ++ concat xs
```
```haskell
-- Pozn.: nefunguje ako filter, ale and pre Bool zoznam
-- [True, True] vrati True
-- [True False] vrati False
all [] = True
all (x:xs) = x && all xs
```
```haskell
any [] = False
any (x:xs) = x || any xs
```
```haskell
sum [] = 0
sum (x:xs) = x + sum xs
```
```haskell
[] ++ ys = ys
(x:xs) ++ ys = x:(xs ++ ys)
(xs ++ ys) ++ zs = xs ++ (ys ++ zs)
```
- úprava prefix na infix
```haskell
(++) a (foldr (++) [] as) = a ++ (foldr (++) [] as)
```
- aplikacia beta-redukcie
```haskell
-- _ sa nahradi a
(\_ n -> 1+n) a (foldr (\_ n -> 1+n) 0 as) = |beta-reduction
-- n sa nahradi (foldr (\_ n -> 1+n) 0 as)
(\n-> 1+n) (foldr (\_ n -> 1+n) 0 as) = |beta-reduction
1 + (foldr (\_ n -> 1+n) 0 as)
```
```haskell
take n _ | n <= 0 = []
take _ [] = []
take n (x:xs) = x : take (n-1) xs
```
```haskell
drop n xs | n <= 0 = xs
drop _ [] = []
drop n (x:xs) = drop (n-1) xs
```
------
je treba dokazať L=P pre
- ak je v zadaní len xs:
· xs = []
· xs = (a:as)
- ak je v zadaní xs aj ys:
· xs = [] (ľubovolné ys - pozn. zostáva také isté)
· ys = [] (ľubovolné xs - pozn. zostáva také isté)
· xs = (a:as), ys = (b:bs)

I.P./I.H. je same shit indukčný predpoklad/hypotéza (je to v podstate odpisane len dokazovane zadanie)

## 2022/2023
### Předtermín

 V haskellu je dano
    - `suma a [] = a`
    - `suma a (x:xs) = suma (a + x) xs`

    Dokazte, ze `suma 0 xs = foldl (+) 0 xs`. Byla tam poznamka, ze mame vhodne zvolit indukcni hypotezu (8b)


Pozor na fold**l** a ne fold**r**

## 2021/2022
### termin
- concat = foldr (:) pro konečné xs a ys
`concat xs ++ ys = foldr (:) ys xs`

```haskell
concat [] ++ ys = ys
concat (x:xs) ++ ys = x : (concat xs ++ ys)
```

![](https://media.discordapp.net/attachments/621775580471492638/973301244372353064/IMG_20220509_211115.jpg?width=810&height=608)

### 1. opravný
(14b alebo 16b)
Axiomy:
```haskell
uncurry f (x,y) = f x y (1)
zip [] _ = [] (3)
zip _ [] = [] (4)
zip (x:xs) (y:ys) = (x,y) : zip xs ys (5)
map f [] = [] (6)
map f (x:xs) f x : map f xs (7)
zipWith f [] _ = [] (8)
zipWith f _ [] = [] (9)
zipWith f (x:xs) (y:ys) = f x y : zipWith f xs ys (10)
```
Dokazujeme pomocí strukturální indukce s indukční proměnnou xs:

`map (uncurry f) (zip xs ys) = zipWith f xs ys`
```haskell
1) xs = [], ys je libovolné
L = map (uncurry f) (zip [] ys) =|3
    = map (uncurry f) ([]) =|závorky
    = map (uncurry f) [] =|6
    = []
P = zipWith f [] ys =|8
    = []
L=P

2) xs je libovolné, ys = []
L = map (uncurry f) (zip xs []) =|4
    = map (uncurry f) ([]) =|závorky
    = map (uncurry f) [] =|6
    = []
P = zipWith f xs [] =|9
    = []
L=P

3) I.H.: map (uncurry f) (zip xs ys) = zipWith f xs ys
xs = (a:as), ys=(b:bs)
L = map (uncurry f) (zip (a:as) (b:bs)) =|5
    = map (uncurry f) ((a,b) : zip as bs) =|7
    = (uncurry f) (a,b) : map (uncurry f) (zip as bs) =|závorky
    = uncurry f (a,b) : map (uncurry f) (zip as bs) =|1
    = f a b : map (uncurry f) (zip as bs)
P = zipWith f (a:as) (b:bs) =|10
    = f a b : zipWith f as bs =|I.H.
    = f a b : map (uncurry f) (zip as bs)
L = P
Q.E.D
```
<!-- ### 2. opravný -->

## 2020/2021
### riadny
Zadanie: `all xs = foldr (&&) True xs`
```haskell
all' [] = True -- 1
all' (x:xs) = x && all' xs -- 2
```
Dôkaz:
```haskell
foldr' f a [] = a -- 3
foldr' f a (x:xs) = f x (foldr' f a xs) -- 4


foldr (&&) True xs = all xs -- dokazat
1)
xs = []
L = foldr (&&) True [] =|3
= True
P = all [] =|1
= True
L = P

2)
I.H.: foldr (&&) True as = all as
xs = (a:as)
L = foldr (&&) True (a:as) =|4
= (&&) a (foldr (&&) True as) =|IH
= (&&) a (all as) =|prefix->infix
= a && (all as) =|priorita
= a && all as
P = all (a:as) =|2
= a && all as
L = P

Q.E.D.
```

### 2. opravný termín
Zadané:
```haskell
df [] ys = ys -- 1
df xs [] = xs -- 2
df (x:xs) (y:ys) = x:y:df xs ys -- 3
zp _ [] ys = ys -- 4
zp _ xs [] = xs -- 5
zp f (x:xs) (y:ys) = f x y (zp f xs ys) -- 6
```
Dodefinujte funkciu `f` tak, aby platilo `zp f xs ys = df xs ys` a dokážte to pre všetky konečné `xs` a `ys`.
```haskell
f a b l = a:b:l -- 7

zp f xs ys = df xs ys -- dokazat
1)
xs = []
L = zp f [] ys =|4
 = ys
P = df [] ys =|1
 = ys
L = P

2)
ys = []
L = zp f xs p[] =|5
 = xs
P = df xs p[] =|2
 = xs
L = P

3)
xs=(a:as)
ys=(b:bs)
I.P.
zp f as bs = df as bs
L = zp f (a:as) (b:bs) =|6
 = f a b (zp f as bs) =|7
 = a:b:(zp f as bs) =|zbytecne zavorky
 = a:b:zp f as bs =|I.P.
 = a:b:df as bs
P = df (a:as) (b:bs) =|3
 = a:b:df as bs
L=P

Q.E.D.
```
## 2019/2020
### předtermín
Dokázat, že `concat xs = foldr (++) [] xs`, když:
```haskell
concat [] = []                    -- 1
concat (x:xs) = x ++ concat xs    -- 2
```
Definiční rovnice pro foldr bylo potřeba si nadefinovat.
```haskell
foldr f z [] = z                       -- 3
foldr f z (x:xs) = f x (foldr f z xs)  -- 4
-------
1:
xs = []
L = concat [] =|1
  = []
P = foldr (++) [] [] =|3
  = []
 L=P
-------
2:
I.P.: concat xs = foldr (++) [] xs
xs = (a:as)

L = concat (a:as) =|2
  = a ++ concat as =|I.P.
  = a ++ foldr (++) [] as
P = foldr (++) [] (a:as) =|4
  = (++) a (foldr (++) [] as) =|prefix -> infix
  = a ++ (foldr (++) [] as) =|zavorky zbytecne, priorita
  = a ++ foldr (++) [] as
 L=P

Q.E.D.
```
### riadny
Pre `len xs = foldr (\_ n-> 1+n) 0 xs`
```haskell
len [] = 0 -- 1
len (x:s) = 1 + len xs -- 2
```
Postup:
```haskell
foldr f z [] = z -- 3
foldr f z (x:xs) = f x (foldr f z xs) -- 4
1)
xs = []
L = len [] =|1
= 0
P = foldr (\_ n-> 1+n) 0 [] =|3
= 0
L = P
2)
I.H.: len as = foldr (\_ n-> 1+n) 0 as
xs = (a:as)
L = len (a:as) =|2
= 1 + len as =|I.H.
= 1 + foldr (\_ n -> 1+n) 0 as
P = foldr (\_ n -> 1+n) 0 (a:as) =|4
= (\_ n -> 1+n) a (foldr (\_ n -> 1+n) 0 as) =|beta-reduction
= (\n-> 1+n) (foldr (\_ n -> 1+n) 0 as) =|beta-reduction
= 1 + (foldr (\_ n -> 1+n) 0 as) =|remove-brackets-unnecessary
= 1 + foldr (\_ n -> 1+n) 0 as
L = P
```
### 1. opravny
Pre `map (+1) xs = inc xs`
```haskell
inc [] = [] -- 1
inc (x:xs) = x+1 : inc xs -- 2
```
Postup:
```haskell
map f [] = [] -- 3
map f (x:xs) = f x : map f xs -- 4
1) xs = []
L = map (+1) [] =|3
= []
P = inc [] =|1
= []
L = P
2)
I.H.: map (+1) as = inc as
xs = (a:as)
L = map (+1) (a:as) =|4
= (+1) a : map f as =|I.H.
= (+1) a : inc as =|Haskell notation
= (a+1) : inc as =| priority
= a+1 : inc as
P = inc (a:as) =|2
= a+1 : inc as
L = P
Q,E.D.
```

## 2018/2019
### riadny
Dokážte, že platí `any xs = foldr (||) False xs` když:
```haskell
any [] = False -- 1
any (x:xs) = x || any xs -- 2
```
```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f z [] = z -- 3
foldr f z (x:xs) = f x (foldr f z xs) -- 4

any xs = foldr (||) False xs

1) xs = []

L = any [] =|1
  = False
P = foldr (||) False [] =|3
  = False

L = P

I.H.: any xs = foldr (||) False xs

2) xs = (a:as)

L = any (a:as) =|2
  = a || any as
P = foldr (||) False (a:as) =| 4
  = (||) a (foldr (||) False as) =|I.H.
  = (||) a (any as) =|prefix->infi
  = a || (any as) =|priorita
  = a || any as
L=P
Q.E.D.

```
### 1. opravny
Dokážte, že platí `[] ++ as = as ++ [] = as` když:
```haskell
[] ++ ys = ys -- 1
(x:xs) ++ ys = x:(xs++ys) -- 2
```
Postup:
```haskell
[] ++ as = as ++ [] = as
1)
as = []
L = [] ++ [] =|1
= []
M = [] ++ [] =|2
= []
P = []
L=P=M
2)
I.P. : []++as = as++[] = []
as = (x:xs)
L = [] ++ (x:xs) =|1
= (x:xs)
M = (x:xs) ++ [] =|2
= x:(xs++[]) =|I.P.
= x:([]++xs) =|1
= x:(xs) =|zbytecne zavorky pryc
= x:xs =|zavorky kolem pridat
= (x:xs)
P = (x:xs)
L=P=M
Q.E.D.
```

## 2017/2018
### Radny
```haskell
all' [] = True -- 1
all' (x:xs) = x && all' xs -- 2
foldr' f a [] = a -- 3
foldr' f a (x:xs) = f x (foldr' f a xs) -- 4

Ukazat:
foldr (&&) True xs = all xs

1)
xs = []

L = foldr (&&) True [] =|3
  = True
P = all [] =|1
  = True

L = P

2)
I.H.: foldr (&&) True as = all as

xs = (a:as)

L = foldr (&&) True (a:as) =|4
  = (&&) a (foldr (&&) True as) =|IH
  = (&&) a (all as) =|prefix->infix
  = a && (all as) =|priorita
  = a && all as

P = all (a:as) =|2
  = a && all as
L = P
Q.E.D.

```
### Opravny
```haskell
length' a [] = a -- 1
length' a (_:xs) = length' (a+1) xs -- 2
foldl' f a [] = a -- 3
foldl' f a (x:xs) = foldl' f (f a x) xs -- 4

length 0 xs = foldl (\ a _ -> a+1) 0 xs

1)
xs = []

L = length 0 [] =|1
  = 0
P = foldl (\ a -> a+1) 0 [] =|3
  = 0

L = P

2)
I.P.
forall k in N: length k as = foldl (\ a _ -> a+1) k as

xs = (a:as)

L = length 0 (a:as) =|2
    = length (0+1) as =|soucet
    = length (1) as =|prebytecne zavorky
    = length 1 as =|I.P.
    = foldl (\ a _ -> a+1) 1 as

P = foldl (\ a _ -> a+1) 0 (a:as) =|4
    = foldl (\ a _ -> a+1) ((\ a _ -> a+1) 0 a) as =|beta_redukce
    = foldl (\ a _ -> a+1) ((\ _ -> 0+1) a) as =|beta_redukce
    = foldl (\ a _ -> a+1) (0+1) as =|soucet
    = foldl (\ a _ -> a+1) (1) as =|prebytecne zavorky
    = foldl (\ a _ -> a+1) 1 as
L = P
Q.E.D.

```
## 2016/2017
```haskell
-- apostrofy pouze pro akceptaci v ghci
sum' [] = 0 -- 1
sum' (x:xs) = x + sum' xs -- 2
foldr' f a [] = a -- 3
foldr' f a (x:xs) = f x (foldr' f a xs) -- 4

sum xs = foldr (+) 0 xs

(1) xs = []

L = sum [] =|1
  = 0
P = foldr (+) 0 [] =|3
  = 0
L=P

2) xs = (a:as)

I.H.
sum as = foldr (+) 0 as

L = sum (a:as) =|2
  = a + sum as
P = foldr (+) 0 (a:as) =|4
  = (+) a (foldr (+) 0 as) =|I.H.
  = (+) a (sum as) =|prefix->infix
  = a + (sum as) =|priorita aplikace nejvyssi -> eliminace zavorek
  = a + sum as
L = P
Q.E.D.

```

## staršie
1.
Zadanie: `take n as ++ drop n as = as`
riešenie:
```haskell
take :: Int -> [a] -> [a]
take n _ | n <= 0 = [] (1.)
take _ [] = [] (2.)
take n (x:xs) = x : take (n-1) xs (3.)
drop :: Int -> [a] -> [a]
drop n xs | n <= 0 = xs (4.)
drop _ [] = [] (5.)
drop n (x:xs) = drop (n-1) xs (6.)
(++) :: [a] -> [a] -> [a]
[] ++ ys = ys (7.)
(x:xs) ++ ys = x : (xs ++ ys) (8.)

Pro xs = []:
dokazuji: take n [] ++ drop n [] = []
L = take n [] ++ drop n []
= [] ++ drop n [] // použito 2. zleva doprava
= [] ++ [] // použito 5. zleva doprava
= [] // použito 7. zleva doprava
L = P

Předpoklad:
take n as ++ drop n as = as
Pro xs = (a:as):
dokazuji: take n (a:as) ++ drop n (a:as) = (a:as)
L = take n (a:as) ++ drop n (a:as)
= a:(take (n-1) as) ++ drop n (a:as) // použito 3. zleva doprava
= a:(take (n-1) as ++ drop n (a:as) ) // použito 8. zleva doprava
= a:(take (n-1) as ++ drop (n-1) as) // použito 6. zleva doprava
= (a:as) // použit předpoklad
L = P
```

2. Zadanie `len(xs ++ ys) = len xs + len ys`
[fituska link](https://fituska.eu/download/file.php?id=11612)
![](https://i.imgur.com/6UyTCj8.jpg)

3. Zadanie `map f (xs ++ ys) = map f xs ++ map f ys`
[fituska link](https://fituska.eu/download/file.php?id=11651)

4. Zadanie `rev xs = reverse xs`
```haskell
rev [ ] = [ ] (1)
rev (x:xs) = rev xs ++ [x] (2)
reverse xs = rev’ xs [] (3)
rev’ [ ] ys = ys (4)
rev’ (x:xs) ys = rev’ xs (x:ys) (5)
1) xs = []
L = rev xs
= rev [] // 1
= []
P = reverse xs
= reverse [] // 3
= rev’ [] [] // 4
= []
L == P

2) xs = (a:as)
IP : rev as = reverse as
L = rev xs
= rev (a:as) // 2
= rev as ++ [a] // IP
= reverse as ++ [a] // 3
= rev’ as [] ++ [a]
= rev’ as [a]
= rev’ as (a:[])
= rev’ (a:as) []
= reverse (a:as)
= reverse xs = P
```

5. Zadanie `foldr (++) [] xs = ccat xs`
```haskell
(1) foldr f zs [] = zs
(2) foldr f zs (xs:xss) = f xs (foldr f zs xss)
(3) ccat [] = []
(4) ccat (xs:xss) = (++) xs (ccat xss)
----
1. xs = []
L = foldr (++) [] []
  = []

P = ccat []
  = []
L = P


2. xs = (a:as)
IP/IH: foldr (++) [] xs = ccat xs
L = foldr (++) [] (a:as)
  = (++) a (foldr (++) [] (as))
  = a:(foldr (++) [] (as))

P = ccat (a:as)
-- TODO
L = P

```

6. Zadanie `map f (xs ++ ys) = (map f xs) ++ (map f ys)`
![](https://i.imgur.com/mhIqALy.jpg)

7. Zadanie `sum (xs ++ ys) == sum xs + sum ys`
```haskell
1: sum [] = 0
2: sum (x:xs) = x + sum xs
3: (++) a b = a ++ b
4: (++) [] ys = ys
5: (++) (x:xs) ys = x:((++) xs ys)
6: 0 + x = x
```

```haskell
1.: xs = []

L = sum ([] ++ ys) // axiom 3 zprava doleva
= sum ((++) [] ys) // axiom 4 zleva doprava
= sum (ys) // odstranění závorek kolem samostatného členu
= sum ys

P = sum [] + sum ys // axiom 1 zleva doprava
= 0 + sum ys // axiom 6 zleva doprava
= sum ys

2.: xs = (a:as)

Indukční předpoklad: sum (as ++ ys) == sum as + sum ys

Dokazujeme: sum ((a:as) ++ ys) == sum (a:as) + sum ys

L = sum ((a:as) ++ ys) // axiom 3 zprava doleva
= sum ((++) (a:as) ys) // axiom 5 zleva doprava
= sum (a:((++) as ys)) // axiom 2 zleva doprava
= a + sum((++) as ys) // axiom 3 zleva doprava
= a + sum(as ++ ys) // indukční předpoklad zleva doprava
= a + sum as + sum ys

P = sum (a:as) + sum ys // axiom 2 zleva doprava
= a + sum as + sum ys

L = P

Q.E.D.
```
8. Zadanie `length (xs ++ ys) == length xs + length ys`

```haskell
1: length [] = 0
2: length (x:xs) = 1 + length xs
3: (++) a b = a ++ b
4. (++) [] ys = ys
5. (++) (x:xs) ys = x:((++) xs ys)
6. 0 + x = x
```
Dokazujeme pomocí strukturální indukce nad proměnnou xs.

První krok: `xs = []`
```haskell
L = length ([] ++ ys) // axiom 3 zprava doleva
= length ((++) [] ys) // axiom 4 zleva doprava
= length (ys) // odstranění závorek kolem samostatného členu
= length ys

P = length [] + length ys // axiom 1 zleva doprava
= 0 + length ys // axiom 6 zleva doprava
= length ys

L = P
```
Druhý krok: `xs = (a:as)`

Indukční předpoklad: `length (as ++ ys) == length as + length ys`

Dokazujeme: `length ((a:as) ++ ys) == length (a:as) + length ys`
```haskell
L = length ((a:as) ++ ys) // axiom 3 zprava doleva
= length ((++) (a:as) ys) // axiom 5 zleva doprava
= length (a:((++) as ys)) // axiom 2 zleva doprava
= 1 + length ((++) as ys) // axiom 3 zleva doprava
= 1 + length (as ++ ys) // indukční předpoklad zleva doprava
= 1 + length as + length ys

P = length (a:as) + length ys // axiom 2 zleva doprava
= 1 + length as + length ys

L = P

Q.E.D.
```

9.
V jazyku Haskell, necht je operátor
```
(++) : [a]-> [a]-> [a]
[] ++ ys = ys
(x:xs) ++ ys = x : (xs++ys)
```
Ukažte, že `xs ++ ys = foldr (:) ys xs` pro danou definici ++ a všechna konečná xs a ys.
Axiomy:
```haskell
1 - [] ++ ys = ys
2 - (x:xs) ++ ys = x : ( xs ++ ys)
3 - foldr f a [] = a
4 - foldr f a (x:xs) = f x (foldr f a xs)
```
Postup:
```haskell
1, ak xs = []
    L: [] ++ ys = ys     –axiom1 zlava do prava
    P: foldr (:) ys [] = ys     –axiom 3 zlava do prava
    L=P
2, ak xs = (a:as)    IP: as ++ ys = foldr (:) ys as
    L: (a:as) ++ ys = a : (as ++ ys)    –axiom 2 zlava do prava
    P: foldr (:) ys (a:as) =        – axiom 4 zlava do prava
    = (:) a (foldr (:) ys as) =    – IP zprava do lava
    = (:) a (as ++ ys) =        – prepis prefix na infix
    = a : (as ++ ys)
    L = P
    Q.E.D
```
