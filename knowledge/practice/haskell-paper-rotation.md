# Haskell paper rotation

Tahle rotace bere stará zadání jako zdroj variant, ne jako seznam k memorování. Jeden blok dělej bez nápovědy a bez GHC; kontrolu pusť až po dokončení.

## Týdenní rotace

| Blok | Cíl | Zdrojové vzory | Co kontrolovat po řešení |
|---|---|---|---|
| A: `data` + rekurze | vlastní datový typ, konstruktory, pattern matching | [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 předtermín]], [[knowledge/exams/2020-2021/term-1-radny|2020/2021 řádný]], [[knowledge/exams/2018-2019/term-3-druhy-opravny-student|2018/2019 2. opravný]] | názvy konstruktorů, base cases, typové signatury |
| B: množiny a lambda AST | seznam jako množina, `fv`, substituce, validita | [[knowledge/exams/2024-2025/term-1-radny-photo|2024/2025 řádný]], [[knowledge/exams/2020-2021/term-2-prvni-opravny-student|2020/2021 1. opravný]], [[knowledge/exams/2019-2020/term-2-prvni-opravny-student|2019/2020 1. opravný]] | duplicity, odebrání vázané proměnné, pořadí argumentů |
| C: IO transformace | čistá transformace plus malý IO obal | [[knowledge/exams/2024-2025/term-1-radny-photo|2024/2025 řádný]], [[knowledge/exams/2021-2022/term-0-special|2021/2022 speciální]], [[knowledge/exams/2017-2018/term-2-prvni-opravny-student|2017/2018 1. opravný]], [[knowledge/exams/2016-2017/term-1-radny-student|2016/2017 řádný]] | `lines`/`unlines`, zavření handle, oddělení parseru od IO |
| D: důkaz | mechanická indukce nad seznamem | [[knowledge/exams/2024-2025/term-2-prvni-opravny-fragment|2024/2025 1. opravný]], [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 předtermín]], [[knowledge/exams/2021-2022/term-2-prvni-opravny-student|2021/2022 1. opravný]], [[knowledge/exams/2017-2018/term-1-radny-student|2017/2018 řádný]] | báze, indukční hypotéza, silnější tvrzení u akumulátoru |
| E: lambda kalkul | booleany, numerály, pevný bod | [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024/2025 předtermín]], [[knowledge/exams/2022-2023/term-0-pretermin|2022/2023 předtermín]], [[knowledge/exams/2019-2020/term-0-pretermin-student|2019/2020 předtermín]], [[knowledge/exams/2020-2021/term-3-druhy-opravny-student|2020/2021 2. opravný]] | definice pomocných symbolů, base/step, závorkování redukce |
| F: Rust pasivně | zkompiluje/nezkompiluje, oprava | [[knowledge/topics/rust-exam-notes|Rust exam notes]], [[knowledge/practice/rust-compile-fix-drill|Rust compile/fix drill]] | ownership, borrow, `mut`, lifetime, `match` exhaustivita |

## Jak z toho dělat varianty

1. Vezmi jedno reálné zadání a změň doménu, ne techniku: výrazový strom na boolovský strom, BST na mapu loginů, `fv` na seznam použitých proměnných.
2. Nech stejné povolené funkce jako zdroj: holý Haskell vs Prelude je podstatná část obtížnosti.
3. U IO vždy napiš čistou funkci `transform :: String -> String` nebo podobnou a až potom `IO`.
4. Po řešení zapiš chyby do historie drillu: syntax, typy, base case, invariant, IO, důkaz.

## Minimální denní sada

- 20 minut: jeden Haskell `data`/rekurze nebo IO blok.
- 10 minut: jeden malý důkaz nebo lambda redukce.
- 10 minut: dvě Rust compile/fix otázky.

Když máš málo času, vynech historický Prolog. Pro 2025/2026 je důležitý jen jako ukázka stylu navazujících podúloh.
