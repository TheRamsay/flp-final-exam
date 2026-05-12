# Lambda kalkul

## Must know

```text
True  = \x y. x
False = \x y. y
NOT   = \b. b False True
XOR   = \a b. a (NOT b) b
IF    = \c t f. c t f
```

## Pevný bod

V zadáních se opakuje vlastnost:

```text
Y F = F (Y F)
```

Použití: definovat rekurzivní funkci bez pojmenované rekurze, např. odečítání, Fibonacci, Ackermann.

## Co typicky hodnotí

- Definuješ všechny pomocné symboly, které nejsou v zadání.
- Beta-redukce má správné závorkování.
- U přirozených čísel jasně pracuješ s dostupnými funkcemi (`iszero`, `succ`, `pred`, `sub`).
