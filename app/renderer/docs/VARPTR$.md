# VARPTR$
`pointer = VARPTR$(name)`

Returns the memory address of variable` name` in the form of a 3-byte string. The first byte is the length of the record the pointer points to:

|2|      |for integers|
|--------|------------|
|3|      |for strings (length + pointer to string space)|
|4|      |for single-precision floats|
|8|      |for double-precision floats|

The last two bytes are the pointer address (as returned by `VARPTR`) in little-endian order.

## Errors
* `name` has not been previously defined: `Illegal function call`.