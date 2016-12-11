# MID$
`substring = MID$(string, position [, length])`

Returns a substring of `string` starting at `position`, counting from 1. The substring has length `length` if specified, defaulting to 1.

## Parameters
* `string` is a string expression.
* `position` is a numeric expression between 1 and the string length, inclusive.
* `length` is a numeric expression in `[0—255]`.
## Errors
* `string` has a number value or `position` or `length` have string values: `Type mismatch`.
* `position` or `length` are not in `[-32768—32767]`: `Overflow`.
* `position` is not in `[1—255]`: `Illegal function call`.
* `length` is not in `[0—255]`: `Illegal function call`.