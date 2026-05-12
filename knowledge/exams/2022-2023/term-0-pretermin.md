# 2022/2023 - předtermín

## Metadata

| Pole | Hodnota |
|---|---|
| Status | `pin exact` |
| Primární zdroj | Discord pin `1103640599233560606` a navazující zprávy |

## FP

1. Lambda kalkul: definovat `True`, `False`, `XOR`; ukázat `XOR T F -> T`.
2. Pro:

```haskell
suma a [] = a
suma a (x:xs) = suma (a + x) xs
```

dokázat:

```haskell
suma 0 xs = foldl (+) 0 xs
```

Byla poznámka, že je potřeba vhodně zvolit indukční hypotézu.

3. Definovat datový typ pro výrazy s celými čísly, sčítáním a násobením.
4. Definovat IO akci `pp`, která pretty-printne výraz s minimálním nutným závorkováním.
5. Bonus: datový typ pro obousměrně vázaný seznam a funkce `l2dll`.

## LP

Deterministický Turingův stroj. Zadány dynamické predikáty:

```prolog
:- dynamic tol/1 tor/1 state/1 head/1.
```

Úlohy:

1. `shl/0`: pokud je to možné, posune hlavu doleva.
2. `ttol/1`: vrátí obsah celé pásky.
3. `findmove(Moves, Action)`: najde proveditelnou akci v seznamu přechodů `move(State, Symbol, Action)`.
4. `action/1`: provede akci `act(w, Sym, State)`, `act(r, State)` nebo `act(l, State)`.
5. `work(Moves, InitState, Tape, FinalStates)`: uspěje, pokud deterministický TS doběhne do koncového stavu.
