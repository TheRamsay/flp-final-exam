# Rust exam notes

## Zdroj

Aktuální signál je pin z 27. 4. 2026. Historická Rust zkoušková zadání zatím v exportu nejsou.

## Očekávaný rozsah

- Ownership: kdo vlastní hodnotu, kdy se hodnota přesune.
- Borrowing: `&T` vs `&mut T`, pravidlo mnoho immutable nebo jedna mutable reference.
- `mut`: mutabilní binding vs mutabilní reference.
- Lifetimes: proč reference nesmí přežít hodnotu, na kterou ukazuje.
- Typové anotace a inference.
- `struct`, `enum`, `match`, `impl`, traits.
- `Option<T>` a `Result<T, E>`.
- Pasivní otázky: zkompiluje se / nezkompiluje se; opravit krátký kód.

## Drill otázky

1. Vysvětli, proč nelze mít současně `&mut x` a `&x`.
2. U krátkého kódu určete, zda dojde k move nebo borrow.
3. Přepiš kód tak, aby nepředával vlastnictví, ale jen referenci.
4. Vysvětli rozdíl mezi `String` a `&str`.
5. Napiš `enum` a `match` pro jednoduchý stavový model.
