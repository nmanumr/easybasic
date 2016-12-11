# ENVIRON$
`value = ENVIRON[ ]$(x)`

Returns an environment variable.

## Parameters
 `x` is an expression.

* If `x` has a string value, returns the value for the environment variable `x` or the empty string if no variable with the name `x` is set in the environment table.
* If `x` has a numeric value, it must be in `[1—255]`. Returns the `x`th entry in the environment table.
## Errors
* `x` is the empty string: `Illegal function call`.
* `x` is a number not in `[-32768—32767]`: `Overflow`.
* `x` is a number not in `[1—255]`: `Illegal function call`.