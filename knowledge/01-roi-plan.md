# ROI plán

## Naučit jako první

1. Haskell na papír: `data`, pattern matching, rekurze nad seznamy/stromy, `Maybe`, `Eq/Ord/Show`.
2. Prelude a IO: `foldr`, `foldl`, `map`, `filter`, `elem`, `span`, `take`, `drop`, `lines`, `unlines`, `read`, `show`, `openFile`, `hGetContents`, `hPutStr`, `hClose`.
3. Důkazy nad seznamy: `foldr`, `foldl`, `++`, `take/drop`, akumulační verze funkcí.
4. Lambda-kalkul: booleany, `XOR`, `SUB`, pevný bod, jednoduchá rekurze přes `Y`.
5. Rust místo Prologu: ownership, borrowing, `mut`, lifetimes, `Option`/`Result`, `enum`/`match`, `struct`, `impl`, trait basics.

## Druhá vlna

1. IO řetězová zadání: typ → pomocná funkce → IO akce.
2. Datové modely: lambda výrazy, aritmetické výrazy, BST, mapování klíč-hodnota.
3. Funkce nad množinami reprezentovanými seznamy: `union`, symetrický rozdíl, volné proměnné.
4. Pretty-print a minimální závorkování.
5. Rust compile/fix otázky: proč borrow checker odmítne kód, jak změnit signaturu nebo vlastnictví.

## Nízká priorita

1. Detailní Prolog implementace magických čtverců, Turingova stroje, rezistorů a cest.
2. Staré Prolog predikáty typu `assertz`/`retractz`.
3. Historické materiály před rokem 2021 mimo základní Haskell/Lambda vzory.

## Praktický režim

Největší návratnost má psaní bez editoru:

1. Vygeneruj zadání v `tools/haskell-paper-drill/`.
2. Piš bez GHC, HLS, Copilota a bez hledání v dokumentaci.
3. Po odevzdání si ručně projdi syntaxi, base cases, typy a okrajové případy.
4. U testovatelných úloh pusť GHC až po dokončení řešení.

## Zdroje

- Syntéza z [[knowledge/exams/00-index|minulých zadání]], hlavně Haskell částí 2020/2021 až 2024/2025.
- Aktuální změna Prolog -> Rust: [[knowledge/exams/2025-2026/current-format|2025/2026 - aktuální formát]].
- Detailní rozpad Haskell/lambda stability: [[knowledge/03-variabilita-haskell-lambda|Variabilita Haskell a lambda-kalkul zadání]].
