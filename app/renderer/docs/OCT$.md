# OCT$
`octal = OCT$(x)`

Returns a string with the octal representation of `x`.

## Parameters
* `x` is a numeric expression in `[-32768—65535]`. Values for negative `x` are shown as two's-complement.
## Errors
* `x` has a string value: `Type mismatch`.
* `x` is not in `[-32768—65535]`: `Overflow`.