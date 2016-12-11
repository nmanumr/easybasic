# LEFT$
`child = LEFT$(parent, num_chars)`

Returns the leftmost `num_chars` characters of `parent`.

## Parameters
* `parent` is a string expression.
* `num_chars` is a numeric expression in `[0—255]`.

## Notes
* If `num_chars` is zero or `parent` is empty, `LEFT$` returns an empty string.
* If `num_chars` is greater than the length of `parent`, returns `parent`.

## Errors
* `parent` has a numeric value or num_chars has a string value: `Type mismatch`.
* `num_chars` is not in `[-32768—32767]`: `Overflow`.
* `num_chars` is not in `[0—255]`: `Illegal function call`.