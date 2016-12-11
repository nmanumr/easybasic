# CVI
`y = CVI(s)`
Converts a two-byte string to a signed integer.

## Parameters
* `s` is a string expression that represents an integer using little-endian two's complement encoding. Only the first two bytes are used.

## Errors
* `s` has a numeric value: `Type mismatch`.