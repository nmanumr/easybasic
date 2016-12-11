# EXP
`y = EXP(x)`

Returns the exponential of `x`, i.e. `e` to the power `x`.

## Parameters
* `x` is a number- valued expression.
## Notes
* Unless PC-BASIC is run with the `double` option, this function returns a single-precision value.

* The return value sometimes differs in the least significant digit from GW-BASIC. For large values of `x`, the difference may be 3 digits.
## Errors
* `x` has a string value: `Type mismatch`.
* `x` is larger than the natural logarithm of the maximum single-precision value: `Overflow`.