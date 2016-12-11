# CINT
`y = CINT(x)`
Converts the numeric expression `x` to a signed integer.

## Errors
* `x` has a string value: `Type mismatch`.
* `x` is not in `[-32768—32767]`: `Overflow`.