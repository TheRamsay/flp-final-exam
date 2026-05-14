# Rust 021 - slides extract

Zdroj: `raw/rust.021.pdf`, 313 stran, PDF vytvořené 25. 2. 2026. Tento soubor není doslovný přepis všech slidů, ale studijní Markdown výtah po tématech.

---

## 1. Základní nástroje

- `rustc main.rs` přeloží jednoduchý soubor.
- `cargo new`, `cargo build`, `cargo run`, `cargo check`, `cargo build --release`.
- Rust vyžaduje snake case pro běžné názvy.

Zkouškově: spíš poznat účel `cargo check` vs `cargo build`, ne psát projekt.

---

## 2. Proměnné, konstanty, shadowing

- `let x = 5;` je immutable binding.
- `let mut x = 5;` dovolí změnit hodnotu stejného bindingu.
- `const NAME: Type = expr;` vyžaduje typ a konstantní výraz.
- Shadowing vytváří nový binding:

```rust
let spaces = "   ";
let spaces = spaces.len();
```

- Mutace nemění typ bindingu:

```rust
let mut spaces = "   ";
spaces = spaces.len(); // chyba: &str vs usize
```

Zkouškově: rozlišit `mut` a shadowing; určit, proč se změna typu kompiluje jen u shadowingu.

---

## 3. Základní typy

- Celá čísla: `i8` ... `i128`, `isize`; `u8` ... `u128`, `usize`.
- Default integer typ obvykle `i32`, floating point `f64`.
- Literály: `98_222`, `0xff`, `0o77`, `0b1111_0000`, `b'A'`.
- Další typy: `bool`, `char`.

Zkouškově: byte literal je jen `u8`; `char` není totéž co byte.

---

## 4. Složené typy

- Tuple:

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;
let first = tup.0;
```

- Array má pevnou délku:

```rust
let a: [i32; 5] = [1, 2, 3, 4, 5];
let a = [3; 5]; // [3, 3, 3, 3, 3]
```

Zkouškově: array `[T; N]` není `Vec<T>`.

---

## 5. Funkce, výrazy, statements

- Parametry funkcí musí mít typy.
- Návratový typ se píše `-> T`.
- Výraz bez středníku vrací hodnotu.

```rust
fn plus_one(x: i32) -> i32 {
    x + 1
}
```

- Se středníkem by blok vracel `()`, takže by vznikla typová chyba.

Zkouškově: častá otázka je „proč se to nekompiluje?“ kvůli středníku na konci návratového výrazu.

---

## 6. Control flow

- `if` je výraz, větve musí dávat kompatibilní typy.
- Smyčky: `loop`, `while`, `for`.
- Rozsahy: `2..5` znamená 2, 3, 4; `1..=5` včetně 5.
- Labeled loop:

```rust
'outer: loop {
    loop {
        break 'outer;
    }
}
```

Zkouškově: odhad výstupu smyčky, hranice range, `break` z vnější smyčky.

---

## 7. Ownership

Tři pravidla:

- každá hodnota má ownera,
- owner je v danou chvíli jen jeden,
- po opuštění scope se hodnota dropne.

`Copy` typy se kopírují:

```rust
let x = 5;
let y = x;
println!("{x}");
```

Heapová hodnota typu `String` se při přiřazení přesune:

```rust
let s1 = String::from("hello");
let s2 = s1;
println!("{s1}"); // chyba: use after move
```

Zkouškově: určit, kde nastal move a která proměnná je potom neplatná.

---

## 8. Clone, Copy, předávání do funkcí

- `clone()` udělá hlubší kopii heapové hodnoty.
- `Copy` typy zůstávají použitelné po přiřazení i předání do funkce.
- Funkce může hodnotu převzít a vrátit, ale idiomaticky se často použije reference.

```rust
fn takes_ownership(s: String) {}
fn makes_copy(x: i32) {}
```

Zkouškově: opravit kód buď přidáním `clone()`, nebo změnou signatury na referenci. `clone()` je funkční, ale často horší odpověď než borrow.

---

## 9. Reference a borrowing

- `&T` je immutable reference.
- `&mut T` je mutable reference.
- V jednu chvíli může existovat buď mnoho immutable referencí, nebo jedna mutable reference.

```rust
let mut s = String::from("hello");
let r1 = &s;
let r2 = &s;
let r3 = &mut s; // chyba, pokud r1/r2 ještě žijí
```

- Reference nesmí viset na hodnotě, která už zanikla.

Zkouškově: nejpravděpodobnější typ Rust otázky. Poznat konflikt `&` vs `&mut`, navrhnout kratší scope nebo změnu pořadí.

---

## 10. Slices

- String slice má typ `&str`.
- Slice odkazuje na část kolekce bez převzetí vlastnictví.
- Funkce pro „first word“ má být spíš:

```rust
fn first_word(s: &str) -> &str
```

ne funkce vracející index do `String`.

Zkouškově: rozdíl `String`, `&String`, `&str`; proč je `&str` obecnější parametr.

---

## 11. Struct a impl

- Struct definuje pojmenovaná data.
- Update syntax:

```rust
let user2 = User {
    email: String::from("x@y.cz"),
    ..user1
};
```

- Pozor: ne-`Copy` fields se mohou přesunout z původní struktury.
- Metody jsou v `impl`, receiver je `self`, `&self` nebo `&mut self`.
- Associated function nemá `self`, typicky `Type::new(...)`.

Zkouškově: poznat move při `..user1`, rozdíl metoda vs associated function.

---

## 12. Enum, Option, match

- Enum varianty mohou nést data:

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}
```

- `Option<T>` je `Some(T)` nebo `None`.
- `match` musí být exhaustivní.
- `_` zachytí zbytek.

Zkouškově: doplnit chybějící větev `None` nebo `_`; vysvětlit, proč nelze používat `T` přímo jako `Option<T>`.

---

## 13. if let, while let

- `if let` je zkrácený zápis pro jeden zajímavý pattern.

```rust
if let Some(x) = value {
    println!("{x}");
}
```

- `while let` opakuje, dokud pattern sedí.

Zkouškově: přepsat jednoduchý `match` na `if let` nebo vysvětlit, co se ignoruje.

---

## 14. Moduly, crates, visibility

- Package obsahuje crates.
- Crate může být binární nebo knihovní.
- Moduly tvoří strom; položky jsou defaultně privátní.
- `pub` zveřejní modul, typ nebo funkci.
- U structu musí být zvlášť public i field, pokud má být přístupný.
- Enum varianty jsou public, když je public enum.
- `use`, `as`, `pub use` pro import, alias a re-export.

Zkouškově: proč nejde přistoupit k poli structu nebo modulu; kam dát `pub`.

---

## 15. Kolekce

- `Vec<T>`: dynamické pole, `push`, indexování, iterace.
- Vector je homogenní; více typů lze modelovat přes enum.
- `String`: UTF-8, modifikace přes `push_str`, `push`, `+`, `format!`.
- Přímé indexování stringu je problematické kvůli UTF-8.
- `HashMap<K, V>`: `insert`, `entry`, `or_insert`.

Zkouškově: proč `s[0]` u `String` není v Rustu správně; ownership při vložení `String` do `HashMap`.

---

## 16. Error handling

- Neobnovitelné chyby: `panic!`.
- Obnovitelné chyby: `Result<T, E>`.
- `unwrap()` a `expect()` jsou zkratky, ale mohou panicnout.
- Propagace chyb:

```rust
fn read_username() -> Result<String, std::io::Error> {
    std::fs::read_to_string("hello.txt")
}
```

- Operátor `?` vrací chybu z funkce ven; funkce musí vracet kompatibilní `Result`/`Option`.

Zkouškově: proč nejde použít `?` ve funkci vracející obyčejné `String` nebo `()`.

---

## 17. Generika a traits

- Generické typy a funkce:

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T
```

- Trait je podobný typeclass/interface.
- Trait může mít default implementation.
- Trait bound lze psát inline nebo přes `where`.
- `impl Trait` v parametru je zkratka pro trait bound.

Zkouškově: doplnit trait bound, když se uvnitř používá `>` nebo `println!`.

---

## 18. Lifetimes

- Lifetime říká, jak dlouho reference platí.
- Neprodlužuje život hodnoty, jen popisuje vztahy mezi referencemi.
- Typický příklad:

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str
```

- Struct s referencí potřebuje lifetime parametr:

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

Zkouškově: poznat, že funkce vrací referenci odvozenou z parametru; odmítnout návrat reference na lokální proměnnou.

---

## 19. Closures a funkcionální prvky

- Closure může zachytit prostředí immutable borrow, mutable borrow, nebo move.
- Podle zachycení implementuje `Fn`, `FnMut`, nebo `FnOnce`.
- `move` closure převezme vlastnictví zachycených hodnot.
- Iterátory jsou lazy; consumers jako `sum()` je spotřebují.
- Adaptéry jako `map`, `filter` vytváří nové iterátory.

Zkouškově: proč closure lze zavolat jen jednou (`FnOnce`), proč je potřeba `mut`, proč se iterator po `sum()` už nedá použít.

---

## 20. Smart pointers

- `Box<T>`: hodnota na heapu, jeden owner, užitečné pro rekurzivní datové typy.
- `Deref`: chování podobné referenci.
- `Drop`: kód při uvolnění hodnoty, explicitně přes `std::mem::drop`.
- `Rc<T>`: reference counting, více ownerů v jednom vlákně.
- `RefCell<T>`: borrow pravidla kontrolovaná za běhu, ne při překladu.
- `Rc<RefCell<T>>`: více ownerů mutabilních dat, ale možnost runtime panicu.
- Cykly přes `Rc` mohou leaknout paměť.

Zkouškově: vybrat `Box` vs `Rc` vs `RefCell`; rozlišit compile-time borrow error a runtime borrow panic.

---

## 21. Concurrency

- `thread::spawn` vytvoří vlákno.
- `join()` čeká na dokončení.
- `move` closure je často nutná, aby vlákno vlastnilo zachycená data.
- Channels: `mpsc::channel`, `send`, `recv`.
- `Mutex<T>` chrání data, `lock()` vrací guard.
- Sdílený mutex mezi vlákny typicky `Arc<Mutex<T>>`, ne `Rc`.

Zkouškově: proč `Rc<T>` nejde mezi vlákny; proč je potřeba `Arc`; kde je potřeba `move`.

---

## 22. Async

- `async` blok/funkce vytváří future.
- `.await` čeká na výsledek future.
- `join` čeká na více futures; `race` skončí podle první.
- `yield_now().await` předá řízení plánovači.
- Streams jsou asynchronní obdoba iteratorů.

Zkouškově: pravděpodobně nízká priorita, spíš rozpoznat význam `async`, `.await`, future, rozdíl concurrency vs parallelism.

---

## 23. OOP v Rustu

- Struct + `impl` poskytují zapouzdření přes privátní fields a public metody.
- Rust nemá dědičnost v klasickém OOP smyslu.
- Polymorfismus se řeší traits.
- `Box<dyn Trait>` znamená trait object, heterogenní kolekce.
- `Vec<T>` s `T: Trait` je homogenní kolekce jednoho konkrétního typu.

Zkouškově: rozdíl `Vec<Box<dyn Draw>>` vs `Vec<T>` s `T: Draw`.

---

## 24. Pattern matching

- Pattern může obsahovat literály, proměnné, wildcard `_`, ranges, struktury, enumy, tuple, guards.
- Named variable v patternu shadowuje vnější proměnnou.
- `|` znamená více patternů.
- Guard:

```rust
Some(x) if x % 2 == 0 => ...
```

- Destructuring:

```rust
let Point { x, y } = p;
```

- Ignorování zbytku: `..`.
- Binding přes `@`:

```rust
id: id_variable @ 3..=7
```

Zkouškově: výstup `match`, shadowing v patternu, exhaustivita, destructuring enumu/structu.

---

## 25. Advanced drobnosti

- Type synonym:

```rust
type Kilometers = i32;
```

- Never type:

```rust
fn bar() -> ! { ... }
```

- Function pointer:

```rust
fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32
```

- Návrat closure typicky přes `Box<dyn Fn(...) -> ...>`.

Zkouškově: nízká priorita; může se objevit jako čtení signatury.

---

## 26. Nejpravděpodobnější zkouškové otázky

Podle aktuálního formátu 2025/2026 je Rust náhrada za Prolog a historická Rust zadání v repu zatím nejsou. Pokud učitel říkal, že nebude moc psaní kódu, nejvíc čekej pasivní compile/fix otázky:

1. Kód se nekompiluje kvůli move po přiřazení nebo předání do funkce.
2. Kód se nekompiluje kvůli souběhu `&T` a `&mut T`.
3. Kód vrací referenci na lokální proměnnou.
4. Funkce má špatný návratový typ kvůli středníku na konci výrazu.
5. `match` není exhaustivní, chybí `None`, `Err`, nebo `_`.
6. `Option<T>`/`Result<T, E>` se používá jako obyčejné `T`.
7. `?` je použitý ve funkci se špatným návratovým typem.
8. Chybí `mut` u bindingu, nebo je `mut` omylem očekáváno u reference.
9. `String` je přesunut do `HashMap`, closure, threadu nebo funkce a pak znovu použit.
10. Chybí `move` u `thread::spawn`.
11. Chybí `Arc<Mutex<T>>` pro sdílenou mutaci mezi vlákny.
12. Generická funkce používá operátor/metodu bez trait boundu.
13. Struct field nebo modul je privátní, chybí `pub`.
14. Pattern v `match` shadowuje vnější proměnnou.
15. Iterator je spotřebovaný consumerem (`sum`, `collect`) a pak znovu použit.

---

## 27. Jak odpovídat u compile/fix úloh

Krátká šablona:

1. Urči přesnou kategorii chyby: move, borrow, lifetime, mutability, type mismatch, exhaustivity, visibility.
2. Řekni, na kterém řádku hodnota přestává být použitelná nebo kde vzniká konflikt.
3. Navrhni nejmenší opravu:
   - předat `&x` místo `x`,
   - změnit parametr na `&T` nebo `&mut T`,
   - zkrátit scope reference,
   - přidat `mut`,
   - přidat větev `None`/`Err`/`_`,
   - vracet vlastněnou hodnotu místo reference,
   - doplnit trait bound,
   - použít `Arc<Mutex<T>>` ve vláknech.
4. Zmínit, že `clone()` je často až druhá volba, pokud stačí borrow.

---

## 28. Mini drill

### Move

```rust
let s = String::from("hi");
let t = s;
println!("{s}");
```

Nezkompiluje se. `s` bylo přesunuto do `t`. Oprava: použít `clone()`, nebo dál používat `t`, nebo nepřesouvat vlastnictví.

### Borrow conflict

```rust
let mut s = String::from("hi");
let r = &s;
s.push_str("!");
println!("{r}");
```

Nezkompiluje se. Immutable borrow `r` je ještě použitý po mutaci. Oprava: přesunout `println!("{r}")` před mutaci, nebo zkrátit scope `r`.

### Dangling reference

```rust
fn bad() -> &String {
    let s = String::from("x");
    &s
}
```

Nezkompiluje se. `s` zanikne na konci funkce. Oprava: vrátit `String`, nebo referenci na hodnotu předanou parametrem s lifetime.

### Result a `?`

```rust
fn f() -> String {
    let s = std::fs::read_to_string("x")?;
    s
}
```

Nezkompiluje se. `?` potřebuje návratový typ kompatibilní s `Result`. Oprava: `fn f() -> std::io::Result<String>`.

