# PEN 
 `x = PEN(mode)`

Reads the light pen. What this function returns depends on `mode`:

| mode	| Return value |
|-------|--------------|
|0	    |Boolean; whether the light pen has been down since last poll.|
|1	    |x coordinate of last pen down position|
|2	    |y coordinate of last pen down position|
|3	    |Boolean; whether the pen is currently down|
|4	    |x coordinate of current pen position|
|5	    |y coordinate of current pen position|
|6	    |character row coordinate of last pen down position|
|7	    |character row coordinate of current pen position|
|8	    |character row coordinate of current pen position|
|9	    |character column coordinate of current pen position|

## Parameters
* `mode` is a numeric expression in `[0—9]`.

## Notes
In PC-BASIC, for pen down read mouse button pressed. For pen position read mouse pointer position.
## Errors
* `mode` has a string value: `Type mismatch`.
* `mode` is not in `[-32768—32767]`: `Overflow`.
* `mode` is not in `[0—9]`: `Illegal function call`.