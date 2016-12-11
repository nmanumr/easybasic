# INSTR
`position = INSTR([start,] parent, child)`

Returns the location of the first occurrence of the substring `child` in `parent`.

## Parameters
* `parent` and `child` are string expressions.
* `start` is a numeric expression in `[1—255]`, specifying the starting position from where to look; if not specified, the search starts at character 1.

## Notes
* If `child` is not a substring of `parent` occurring at or before `start`, `INSTR` returns 0.
## Errors
* `start` has a string value or `parent` or `child` have numeric values: `Type mismatch`.
* `start` is not in `[-32768—32767]`: `Overflow`.
* `start` is not in `[1—255]`: `Illegal function call`.