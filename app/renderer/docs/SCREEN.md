# SCREEN
`value = SCREEN(row, column [, fn])`

Returns the code point or colour attribute for the character at position `row`, `col`.

## Parameters
* `row` is a numeric expression in the range `[1—25]`.
* `col` is a numeric expression between 1 and the screen width (40 or 80).
* `fn` is a numeric expression in `[0—255]`. If it is zero or not specified, the code point of the character is returned. If it is non-zero, in text mode the attribute is returned; in other screens, 0 is returned.
## Errors
* Any parameter has a string value: `Type mismatch`.
* `fn` is not in `[0—255]`: `Illegal function call`.
* `fn` is not in `[-32768—32767]`: `Overflow`.
* `row` is not inside the current `VIEW PRINT` area: `Illegal function call`.
* `KEY ON` and `row=25`: `Illegal function call`.
* `col` is not in `[1, width]`: `Illegal function call`.