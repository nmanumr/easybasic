# MKI$
`bytes = MKI$(int)`

Returns the internal 2-byte little-endian representation of an integer.

## Errors
* `int` has a string value: Type mismatch.
* `int` is not in `[-32768—32767]`: `Overflow`.