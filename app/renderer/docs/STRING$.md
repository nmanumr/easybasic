# STRING$
`string = STRING$(length, char)`

Returns a string of `length` times character `char`.

## Parameters
* If `char` is a numeric expression, it must be in `[0—255]` and is interpreted as the code point of the character.
* If `char` is a string expression, its first character is used.
## Errors
* `length` has a string value: `Type mismatch`.
* `char` is the empty string: `Illegal function call`.
* `char` or `length` is not in `[-32768—32767]`: `Overflow`.
* `char` or `length` is not in `[0—255]`: `Illegal function call`.