# STICK
`pos = STICK(axis)`

Returns a coordinate of a joystick axis. All coordinates returned are in the range `[1—254]` with `128` indicating the neutral position.

| axis	  | Return value|
|---------|-------------|
| 0	      |1st joystick x coordinate|
| 1	      |1st joystick y coordinate|
| 2	      |2nd joystick x coordinate|
| 3	      |2nd joystick y coordinate|

## Parameters
* `axis` is a numeric expression in `[0—3]` and indicates which axis to read.
## Errors
* `axis` has a string value: `Type mismatch`
* `axis` is not in `[-32768—32767]`: `Overflow`.
* `axis` is not in `[0—3]`: `Illegal function call`.