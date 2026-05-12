# Variabilita Haskell a lambda-kalkul zadání

## Shrnutí

Konkrétní příběh zadání se mění dost, ale řešitelská kostra je stabilní.

- Lambda-kalkul: mění se cílová funkce, opakuje se práce s booleany, numerály, testy typu `iszero`, `succ`/`prev` a pevný bod.
- Haskell programování: mění se doména datového typu, opakuje se `data` model, pattern matching, rekurze, seznamy/stromy, `Maybe`, `Eq`/`Ord`/`Show`.
- Haskell IO: mění se formát souboru a výstupu, opakuje se pipeline `readFile/openFile -> lines/words -> čisté funkce -> výpis`.
- Důkazy: mění se tvrzení, opakuje se strukturální indukce nad seznamem a přepis podle definic.

Prakticky: nečekal bych přesně stejné zadání, ale čekal bych velmi podobné tahy.

## Vzorek

| Termín | Lambda-kalkul / lambda téma | Haskell programování | Důkaz |
|---|---|---|---|
| 2024/2025 řádný | lambda-výrazy jako Haskell AST, `fv` | `union`, `symd`, IO `wr` | `ccat xss = con xss` bonus |
| 2024/2025 předtermín | pevný bod, Ackermann | Fibonacci list, `readh`, BST `ins`, IO `readf` | přímá vs akumulační suma bonus |
| 2024/2025 1. opravný fragment | Fibonacci přes pevný bod, `sub` zmínky | fragmentární | `len xs = len' xs` |
| 2023/2024 1. opravný | `SUB` přes pevný bod | IO skupiny slov podle délky | `take n xs ++ drop n xs = xs` |
| 2022/2023 předtermín | `True`, `False`, `XOR` | výrazový typ, pretty-print `pp`, bonus DLL | `suma 0 xs = foldl (+) 0 xs` |
| 2021/2022 speciální/předtermín | pevný bod pro `LT` | `mid`, IO trim řádků | `concat xs ++ ys = foldr (:) ys xs` |
| 2020/2021 řádný | `xor`, `true`, `false` | aritmetický typ, `eval`, `load`, bonus DLL | `all xs = foldr (&&) True xs` |
| 2025/2026 půlsemestrálka signál | `odds` nad list encodingem | `Grade`, `Result`, histogram | není finální zkouška |

## Jak moc se to mění

### Lambda-kalkul

Variabilita konkrétní funkce je vysoká: `XOR`, `SUB`, `LT`, Ackermann, Fibonacci, `odds`.

Variabilita techniky je nízká až střední:

1. rozpoznat dostupné primitivy (`iszero`, `succ`, `prev`, `iseven`, ternární operátor),
2. poskládat base case,
3. zapsat rekurzivní krok,
4. obalit definici operátorem pevného bodu,
5. ukázat krátkou redukci nebo demonstraci na příkladu.

Největší rozdíl mezi termíny je spíš v tom, jak dobře je zadání navedené. Někdy je zadaná skoro celá výbava, jindy je potřeba navrhnout reprezentaci mezikroku.

### Haskell programování

Povrchová variabilita je střední až vysoká:

- jednou lambda AST,
- jednou aritmetické výrazy,
- jednou BST,
- jednou histogram,
- jednou listová funkce typu `mid`,
- jednou parsing/pretty-print.

Vnitřní šablona je ale podobná:

1. napsat datový typ,
2. odvodit instance nebo ručně použít `Eq`/`Ord`/`Show`,
3. napsat čistou rekurzivní funkci,
4. ošetřit prázdné a hraniční případy,
5. oddělit čistou část od IO.

Nejvíc se mění datový model, ne způsob psaní Haskellu.

### IO úlohy

IO se objevuje často, ale obvykle není těžké samo o sobě. Těžká část je čistý parser/transformace.

Opakovaný tvar:

```haskell
akce :: FilePath -> ... -> IO ...
akce path = do
  s <- readFile path
  let xs = map parseLine (lines s)
  ...
```

Varianty:

- načíst čísla a vypsat vybrané výrazy,
- načíst `klíč:hodnota` a postavit BST,
- načíst slova a seskupit podle délky,
- trimovat řádky a vypsat statistiku,
- načíst prefixový tvar výrazu.

### Důkazy

Důkazy jsou nejstabilnější část.

Mění se konkrétní rovnost, ale opakují se stejné principy:

- indukce nad seznamem,
- zvláštní případ pro akumulátor,
- přepis podle definic,
- `foldr`/`foldl`,
- `++`,
- `take/drop`,
- base case a krok přes `x:xs`.

Tady se vyplatí trénovat formu zápisu víc než konkrétní tvrzení.

## Co z toho plyne pro přípravu

Neučit se stará zadání nazpaměť. Učit se převádět nové zadání na jednu z těchto šablon:

1. lambda funkce přes pevný bod,
2. Haskell `data` + rekurze,
3. seznamová množina nebo strom,
4. čistý parser/formatter + IO wrapper,
5. indukční důkaz nad seznamem.

Největší riziko u zkoušky není úplně nová oblast, ale drobná změna v zadání:

- jiná reprezentace vstupu,
- zákaz importů,
- požadavek na minimální závorkování,
- nutnost zachovat invariant bez duplicit,
- důkaz vyžadující silnější indukční hypotézu.

## Hrubé skóre podobnosti

| Oblast | Povrch zadání | Řešitelská šablona | Závěr |
|---|---:|---:|---|
| Lambda-kalkul | mění se hodně | stabilní | trénovat pevný bod + base/step |
| Haskell datové typy | mění se středně | velmi stabilní | trénovat `data`, pattern matching |
| Haskell IO | mění se středně | stabilní | trénovat čisté jádro + IO obal |
| Důkazy | mění se málo až středně | velmi stabilní | trénovat zápis indukce |

Moje pracovní interpretace: Haskell/lambda část je zhruba **60-70 % stejná ve schopnostech**, ale jen **20-40 % stejná v konkrétním příběhu zadání**.
