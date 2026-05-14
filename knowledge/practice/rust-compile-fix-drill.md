# Rust compile/fix drill

Formát: u každého úryvku řekni:

1. zkompiluje se?
2. pokud ne, jaká je hlavní chyba?
3. jaká je nejmenší rozumná oprava?

---

## Otázky

### 1. Move po přiřazení

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{s1}");
    println!("{s2}");
}
```

---

### 2. Copy typ

```rust
fn main() {
    let x = 10;
    let y = x;
    println!("{x} {y}");
}
```

---

### 3. Předání vlastnictví do funkce

```rust
fn print_len(s: String) {
    println!("{}", s.len());
}

fn main() {
    let name = String::from("rust");
    print_len(name);
    println!("{name}");
}
```

---

### 4. Immutable borrow a mutace

```rust
fn main() {
    let mut s = String::from("hi");
    let r = &s;
    s.push_str("!");
    println!("{r}");
}
```

---

### 5. Dvě mutable reference

```rust
fn main() {
    let mut x = 5;
    let a = &mut x;
    let b = &mut x;
    *a += 1;
    *b += 1;
    println!("{x}");
}
```

---

### 6. Mutable reference bez mutable bindingu

```rust
fn main() {
    let s = String::from("hello");
    let r = &mut s;
    r.push_str("!");
}
```

---

### 7. Shadowing vs mutace typu

```rust
fn main() {
    let mut spaces = "   ";
    spaces = spaces.len();
    println!("{spaces}");
}
```

---

### 8. Návratový výraz se středníkem

```rust
fn plus_one(x: i32) -> i32 {
    x + 1;
}

fn main() {
    println!("{}", plus_one(4));
}
```

---

### 9. Dangling reference

```rust
fn make_ref() -> &String {
    let s = String::from("abc");
    &s
}

fn main() {
    let r = make_ref();
    println!("{r}");
}
```

---

### 10. Lifetime návratové reference

```rust
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

---

### 11. `Option<T>` jako obyčejné `T`

```rust
fn main() {
    let x: Option<i32> = Some(4);
    println!("{}", x + 1);
}
```

---

### 12. Neúplný `match`

```rust
fn value(x: Option<i32>) -> i32 {
    match x {
        Some(n) => n,
    }
}
```

---

### 13. `Result` a `?`

```rust
fn read_name() -> String {
    let s = std::fs::read_to_string("name.txt")?;
    s
}
```

---

### 14. String indexování

```rust
fn main() {
    let s = String::from("hello");
    println!("{}", s[0]);
}
```

---

### 15. Move do `HashMap`

```rust
use std::collections::HashMap;

fn main() {
    let key = String::from("blue");
    let value = String::from("10");
    let mut scores = HashMap::new();
    scores.insert(key, value);
    println!("{key}");
}
```

---

### 16. Chybějící trait bound

```rust
fn bigger<T>(a: T, b: T) -> T {
    if a > b {
        a
    } else {
        b
    }
}
```

---

### 17. Spotřebovaný iterator

```rust
fn main() {
    let v = vec![1, 2, 3];
    let iter = v.iter();
    let sum: i32 = iter.sum();
    for x in iter {
        println!("{x}");
    }
    println!("{sum}");
}
```

---

### 18. `thread::spawn` a borrow lokální hodnoty

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];
    let handle = thread::spawn(|| {
        println!("{v:?}");
    });
    handle.join().unwrap();
}
```

---

### 19. `Rc` mezi vlákny

```rust
use std::rc::Rc;
use std::thread;

fn main() {
    let x = Rc::new(5);
    thread::spawn(move || {
        println!("{x}");
    }).join().unwrap();
}
```

---

### 20. Pattern shadowing

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(y) => println!("matched {y}"),
        _ => println!("default"),
    }

    println!("y = {y}");
}
```

Otázka: zkompiluje se? Pokud ano, co vypíše a co znamená `Some(y)`?

---

## Odpovědi

### 1

Nezkompiluje se. `String` není `Copy`; `s1` se přesune do `s2`. Oprava: používat `s2`, nebo `let s2 = s1.clone();`, případně pracovat s referencí.

### 2

Zkompiluje se. `i32` je `Copy`, takže `y = x` kopíruje hodnotu a `x` zůstává použitelná.

### 3

Nezkompiluje se. `print_len(name)` převezme vlastnictví `String`. Lepší oprava:

```rust
fn print_len(s: &str) {
    println!("{}", s.len());
}

print_len(&name);
```

### 4

Nezkompiluje se. `r` je immutable borrow a ještě se používá po mutaci `s`. Oprava: použít `println!("{r}")` před `push_str`, nebo zkrátit scope `r`.

### 5

Nezkompiluje se. Nelze mít dvě živé `&mut` reference na stejnou hodnotu. Oprava: používat je postupně v oddělených scopech.

### 6

Nezkompiluje se. Binding `s` není mutable. Oprava: `let mut s = String::from("hello");`.

### 7

Nezkompiluje se. `mut` dovoluje změnu hodnoty, ne změnu typu bindingu z `&str` na `usize`. Oprava:

```rust
let spaces = "   ";
let spaces = spaces.len();
```

### 8

Nezkompiluje se. `x + 1;` je statement a funkce fakticky vrací `()`, ne `i32`. Oprava: odstranit středník.

### 9

Nezkompiluje se. Funkce vrací referenci na lokální `s`, která po návratu zanikne. Oprava: vracet `String`, nebo vracet referenci na parametr.

### 10

Nezkompiluje se bez lifetime anotace, protože návratová reference může pocházet z `x` nebo `y`. Oprava:

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str
```

### 11

Nezkompiluje se. `Option<i32>` není `i32`. Oprava: `match`, `if let`, nebo třeba `x.unwrap() + 1` pokud je panic přijatelný.

### 12

Nezkompiluje se. `match` není exhaustivní, chybí `None`. Oprava například `None => 0`.

### 13

Nezkompiluje se. `?` propaguje chybu, ale funkce vrací `String`. Oprava:

```rust
fn read_name() -> std::io::Result<String> {
    std::fs::read_to_string("name.txt")
}
```

### 14

Nezkompiluje se. `String` je UTF-8 a nelze ji indexovat přes `s[0]`. Oprava podle záměru: `s.as_bytes()[0]`, `s.chars().next()`, nebo slice s platnými byte hranicemi.

### 15

Nezkompiluje se. `key` bylo přesunuto do `scores.insert`. Oprava: vložit `key.clone()`, nebo už `key` nepoužívat, nebo při čtení použít referenci na mapu.

### 16

Nezkompiluje se. Operátor `>` vyžaduje trait bound. Navíc návrat `a`/`b` po porovnání je v tomto tvaru v pořádku pro owned hodnoty. Oprava:

```rust
fn bigger<T: PartialOrd>(a: T, b: T) -> T
```

### 17

Nezkompiluje se. `sum()` spotřebuje iterator. Oprava: vytvořit nový iterator pro druhé použití, například `v.iter().sum()` a potom `for x in v.iter()`.

### 18

Nezkompiluje se. Closure může přežít scope `main`, takže si nemůže jen půjčit `v`. Oprava: `thread::spawn(move || { ... })`.

### 19

Nezkompiluje se. `Rc<T>` není thread-safe (`Send`). Oprava: pro sdílení mezi vlákny použít `Arc<T>`, případně `Arc<Mutex<T>>` pro mutaci.

### 20

Zkompiluje se. Vypíše:

```text
matched 5
y = 10
```

`Some(y)` zavádí novou proměnnou `y`, která shadowuje vnější `y`. Není to porovnání s hodnotou `10`.

