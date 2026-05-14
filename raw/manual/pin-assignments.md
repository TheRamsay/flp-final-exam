# Zadání vytěžená z pinů

Ruční digest nejdůležitějších pinů. Raw exporty jsou lokální v `raw/discord-pins/`; veřejné očištěné kopie vybraných fotek jsou pod `knowledge/assets/exams/`.

## 2025/2026 - aktuální formát

Zdroj: pin `1498292826918748200`, `2026-04-27`, FLP private.
Normalizovaná stránka: [[knowledge/exams/2025-2026/current-format|2025-2026 - aktuální formát]].

- Zkouška má mít 51 bodů a čas 2 h 25 min.
- Starší Prolog část je pro aktuální rok nahrazená Rustem.
- Rust: psací otázka na koncepty, vlastnictví, výpůjčky, `mut`, typové anotace, lifetime a rozdíly proti běžným jazykům; pasivní znalost typu "zkompiluje/nezkompiluje se"; oprava/upravení krátkého kódu.
- Haskell: znát Prelude a základní funkce (`foldy`, `concat`, `split`, `span`, `take`, ...), správně použít `openFile`/IO, `data`, `deriving`, `if then else`, `let`, `case of`; číst zadání přesně.
- Lambda kalkul: podobně jako půlsemestrálka.
- Řetězové zadání: když chybí předchozí část, další část psát "jako by předchozí byla správně".

## 2025/2026 - půlsemestrálka signal

Zdroj: piny `1485649559534305442` a `1485622017477709956`, `2026-03-23`, FLP private; foto příloha `20260323_1339271.jpg`.
Normalizovaná stránka: [[knowledge/exams/2025-2026/pulsemka-2026-signal|2025-2026 - půlsemestrálka signal]].

Není to finální zkouška, ale je to dobrý signál k aktuálnímu stylu lambda-kalkul + Haskell.

1. Lambda-kalkul: definovat funkci `odds`, která spočítá lichá čísla v seznamu tvaru `0 n1 n2 ... n 0`; první `0` je akumulátor, poslední `0` konec seznamu. Dostupné byly `iseven`, `iszero` a ternární operátor.
2. Haskell: definovat `Grade` pro známky A-F, `Result` s id studenta a známkou, a funkci `ht` pro histogram známek ve formátu `Známka: Počet`; nulové četnosti se nevypisují.

## 2024/2025 - řádný termín, foto

Zdroj: pin `1374046174633267281`, `2025-05-19`, přílohy `20250519_172606.jpg`, `20250519_172639.jpg`.
Normalizovaná stránka: [[knowledge/exams/2024-2025/term-1-radny-photo|2024-2025 - řádný termín foto]].

FP/Haskell:

1. Datový typ pro reprezentaci výrazů v lambda-kalkulu; jména proměnných volná, převoditelná na `String` a porovnatelná na ekvivalenci.
2. Funkce `union` a `symd` pro množiny reprezentované seznamy.
3. Rekurzivní funkce `fv` pro množinu volných proměnných v lambda-výrazu.
4. IO akce `wr`: pro seznam dvojic `(číslo, lambda-výraz)`, vstupní soubor a výstupní soubor načíst čísla po řádcích a vypsat odpovídající textové reprezentace lambda-výrazů.
5. Bonus: důkaz ekvivalence `ccat xss = con xss` pro konečné seznamy.

LP/Prolog:

1. `transp(+Mat, -TranspMat)` pro transpozici matice jako seznamu seznamů.
2. `isMatOK(+Mat)`: čtvercová matice má v každém řádku a sloupci právě jednu `1`, jinak `0`.
3. `fs(+N, -Mat)`: najít rozmístění `N` dam na šachovnici `N x N` tak, aby se neohrožovaly.

## 2024/2025 - předtermín, foto fragment

Zdroj: pin `1372587942802882621`, `2025-05-15`, příloha `bb441125-417b-4018-9534-1b6c92497133.jpg`.
Normalizovaná stránka: [[knowledge/exams/2024-2025/term-0-pretermin-photo-fragment|2024-2025 - předtermín foto fragment]].

FP/Haskell:

1. Lambda-kalkul: definovat a demonstrovat pevný bod a operátor pevného bodu; definovat Ackermannovu funkci jako lambda-výraz.
2. `lfi :: [Integer]`: nekonečný seznam Fibonacciho posloupnosti jako one-liner.
3. `readh :: String -> Integer`: převod validního hexadecimálního řetězce s velkými písmeny na celé číslo.
4. Datový typ pro binární vyhledávací strom a funkce `ins` pro vložení/nahrazení hodnoty podle klíče.
5. IO akce `readf`: ze souboru s řádky `klíč:hodnota`, kde klíč je hex řetězec, sestavit strom.
6. Bonus: důkaz ekvivalence obyčejné sumy seznamu a akumulační verze.

LP/Prolog:

1. `store(+Mista1, +Delky, +Mista2)`: z trojice seznamů uložit fakty `dist(Misto1, Delka, Misto2)`, při různých délkách selhat.
2. `getT(+Misto, -TList)`: vrátit všechny fakty `dist(Misto, Delka, Misto2)`.
3. `findC(+MistoStart, +MistoCil, -Cesta)`: najít všechny cesty ze startu do cíle.
4. `sh(+SeznamCest, -NejkratsiCesta, -Delka)`: vybrat nejkratší cestu.

## 2023/2024 - 1. opravný termín, foto

Zdroj: pin `1242781570096566292`, `2024-05-22`, přílohy `IMG_4776.jpg`, `IMG_4777.jpg`.
Normalizovaná stránka: [[knowledge/exams/2023-2024/term-2-prvni-opravny-photo|2023-2024 - 1. opravný termín foto]].

FP/Haskell:

1. Lambda-kalkul: pomocí operátoru pevného bodu definovat `SUB` pro odečítání nezáporných čísel a demonstrovat `SUB 2 1 = 1`.
2. Důkaz: `take n xs ++ drop n xs = xs` pro všechny konečné seznamy `xs` a nezáporná `n`; definice `take` a `drop` byly zadané.
3. IO akce `fx`: načíst soubor, rozdělit slova do skupin podle počtu písmen, vypsat skupiny od nejkratší po nejdelší a před každou skupinu počet písmen v hranatých závorkách.

LP/Prolog:

1. Predikáty `serR(+R1,+R2,-Rser)` a `parR(+R1,+R2,-Rpar)` pro odpory v sérii/paralelně.
2. Termy pro libovolné sériové/paralelní zapojení a `resistance(+Zapojeni,-Odpor)`.
3. `bagdiff(+Bag1,+Bag2,-BagR)` pro multiset difference.
4. `getRes(+BagRes,-ConRes,-RemainingBag)` generující zapojení z multisetů odporů.
5. `getAny(+BagRes,+Res,-Connection)` pro nalezení zapojení s požadovaným odporem.

## 2022/2023 - předtermín

Zdroj: pin `1103640599233560606` a navazující zprávy `1103640929178505286`, `1103641056186204211`, `2023-05-04`.
Normalizovaná stránka: [[knowledge/exams/2022-2023/term-0-pretermin|2022-2023 - předtermín]].

FP:

1. Lambda kalkul: definovat `True`, `False`, `XOR`; ukázat `XOR T F -> T`.
2. Důkaz `suma 0 xs = foldl (+) 0 xs` pro definici `suma a [] = a`, `suma a (x:xs) = suma (a+x) xs`.
3. Datový typ pro celočíselné výrazy se sčítáním a násobením.
4. IO akce `pp` pro pretty-print výrazů s minimálním nutným závorkováním.
5. Bonus: typ pro obousměrně vázaný seznam a funkce `l2dll`.

LP:

- Implementace deterministického Turingova stroje s dynamickými predikáty `tol/1`, `tor/1`, `state/1`, `head/1`.
- `shl/0`, `ttol/1`, `findmove/2`, `action/1`, `work/4`.

## 2021/2022 - speciální/předtermín

Zdroj: pin `959496107271028746`, `2022-04-01`.
Normalizovaná stránka: [[knowledge/exams/2021-2022/term-0-special|2021-2022 - speciální-předtermín]].

FP:

1. Lambda-kalkul: operátor pevného bodu; k dispozici `iszero`, `prev`, reprezentace celých čísel.
2. Haskell `mid`: pro seřaditelný seznam vrátit hodnotu, která rozdělí seznam na menší/větší část s délkami lišícími se nejvýše o 1.
3. Důkaz `concat xs ++ ys = foldr (:) ys xs`.
4. Haskell IO: načíst soubor, trimovat řádky, vypsat `delka:radek` a na konec `pocet_radku/pocet_prazdnych_po_trimu`.

LP:

1. Pro seznam množin vypsat doplněk každé množiny vůči univerzu vzniklému sjednocením všech množin.
2. `splt(P,A,AT,AF)` jako `span`.
3. Fragment: hledání všech klíčů ve stromě pro danou hodnotu.
4. Fragment: krok/cesta v obecném stavovém prostoru.

## 2020/2021 - řádný termín

Zdroj: pin `842402024532475915`, `2021-05-13`.
Normalizovaná stránka: [[knowledge/exams/2020-2021/term-1-radny|2020-2021 - řádný termín]].

FP:

1. Haskell: datový typ pro aritmetické operace `+/-`.
2. Funkce `eval`.
3. Funkce `load`: načíst ze souboru prefixový tvar operace do datového typu.
4. Důkaz `all xs = foldr (&&) True xs`.
5. Lambda-kalkul: definovat `xor`, `true`, `false`.
6. Bonus: obousměrně vázaný seznam a funkce pro délku; prvky se neopakují.

LP:

- Magické čtverce: reprezentace matice, doplnění hodnoty na pozici, dopočítání zbytku matice.
