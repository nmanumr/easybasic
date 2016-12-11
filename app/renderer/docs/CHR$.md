# CHR$
`char = CHR$(x)`
Returns the character with code point `x`.

## Parameters
* `x` is a numeric expression in the range `[0—255]`.

## Errors
* `x`  has a string value: `Type mismatch`.
* `x` is not in `[-32768—32767]`: `Overflow`.
* `x` is not in `[0—255]`: `Illegal function call`.