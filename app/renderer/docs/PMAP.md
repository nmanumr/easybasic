# PMAP
`transformed_coord = PMAP(original_coord, fn)`

Maps between viewport and logical `(WINDOW)` coordinates. If no `VIEW` has been set, the viewport coordinates are physical coordinates.

Depending on the value of `fn`, `PMAP` transforms from logical to viewport coordinates or vice versa:

| fn	| Return value|
|-------|-------------|
|0	    |return viewport x given logical x|
|1	    |return viewport y given logical y|
|2	    |return logical x given viewport x|
|3	    |return logical y given viewport y|
## Parameters
* `fn` is a numeric expression in `[0—3]`.
## Notes
* Initially, in text mode, `PMAP` returns 0.
* In GW-BASIC, `PMAP` behaves anomalously on `SCREEN` changes, where it sometimes returns results as if the last `WINDOW` setting had persisted. This behaviour is not implemented in PC-BASIC.
## Errors
* Any of the parameters has a string value: `Type mismatch`.
* A physical coordinate is not in `[-32768—32767]`: `Overflow`.
* `fn` is not in `[-32768—32767]`: `Overflow`.
* `fn` is not in `[0—3]`: `Illegal function call`.