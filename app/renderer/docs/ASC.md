# ASC
```
val = ASC(char)
```
Returns the code point (ASCII value) for the first character of `char`.

## Parameters
* `char` is an expression with a string value.

## Errors
* `char` has a numeric value: `Type mismatch`.
* `char` equals `""`: `Illegal function call`.