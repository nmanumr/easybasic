# POINT
`coord = POINT(fn)`

Returns a currently active coordinate of the graphics screen. This is usually the last position at which a pixel has been plotted, the second corner given in a `LINE` command, or the centre of the viewport if nothing has been plotted. `fn` is a numeric expression in `[0—3]`.

The coordinate returned depends on the value of `fn`:

| fn	| Return value|
|-------|-------------|
|0	    | viewport x|
|1	    | viewport y|
|2	    | logical x|
|3	    | logical y|

## Parameters
* `fn` is a numeric expression in `[0—3]`.
## Notes
* In text mode, returns the active coordinate of any previous graphics mode; if no graphics mode has been active, returns 0.
## Errors
* `fn` has a string value: `Type mismatch`.
* `fn` is not in `[-32768—32767]`: `Overflow`.
* `fn` is not in `[0—3]`: `Illegal function call`.