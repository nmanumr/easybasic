# EXTERR
`zero = EXTERR(x)`

Returns 0.

## Parameters
* `x` is a numeric expression in `[0—3]`.

## Notes
* In GW-BASIC, this function returns extended error information from MS-DOS.
* This function is not implemented in PC-BASIC.
## Errors
* `x` has a string value: `Type mismatch`.
* `x` is not in `[-32768—32767]`: `Overflow`.
* `x` is not in `[0—3]`: `Illegal function call`.