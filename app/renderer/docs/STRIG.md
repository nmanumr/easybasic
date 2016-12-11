# STRIG 
`result = STRIG(mode)`

Returns the status of the joystick trigger buttons. `STRIG` returns the following results, all Boolean values:

| mode	   | Return value|
|----------|-------------|
|0	       |1st joystick, 1st trigger has been pressed since last poll.|
|1	       |1st joystick, 1st trigger is currently pressed.|
|2	       |2nd joystick, 1st trigger has been pressed since last poll.|
|3	       |2nd joystick, 1st trigger is currently pressed.|
|4	       |1st joystick, 2nd trigger has been pressed since last poll.|
|5	       |1st joystick, 2nd trigger is currently pressed.|
|6	       |2nd joystick, 2nd trigger has been pressed since last poll.|
|7	       |2nd joystick, 2nd trigger is currently pressed.|

## Parameters
* `mode` is a numeric expression in `[0—7]`.
## Notes
* The `STRIG` function returns correct results regardless of the `STRIG ON` status or whether `STRIG(0)` has been called first.
## Errors
* `mode` has a string value: `Type mismatch`.
* `mode` is not in `[-32768—32767]`: `Overflow`.
* `mode` is not in `[0—7]`: `Illegal function call`.