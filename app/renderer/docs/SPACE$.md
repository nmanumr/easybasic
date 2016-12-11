# SPACE$
`spaces = SPACE$(number)`

Returns a string of `number` spaces.

## Parameters
* `number` is a numeric expression in `[0—255]`.
## Errors
* `number` has a string value: `Type mismatch`.
* `number` is not in `[-32768—32767]`: `Overflow`.
* `number` is not in `[0—255]`: `Illegal function call`.