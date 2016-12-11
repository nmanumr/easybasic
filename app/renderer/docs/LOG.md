# LOG
`y = LOG(x)`

Returns the natural logarithm of `x`.

## Parameters

* `x` is a numeric expression greater than zero.

## Notes
* Unless PC-BASIC is run with the `double` option, this function returns a single-precision value.
* `LOG(x)` can differ from GW-BASIC by 1 in the least significant digit.
## Errors
* `x` has a string value: `Type mismatch`.
* `x` is zero or negative: `Illegal function call`. 
 