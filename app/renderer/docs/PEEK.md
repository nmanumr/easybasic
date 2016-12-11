# PEEK
`value = PEEK(address)`

Returns the value of the memory at `segment * 16 + address` where segment is the current `segment` set with `DEF SEG`.

## Parameters
* `address` is a numeric expression in `[-32768—65535]`. Negative values are interpreted as their two's complement.
## Notes
* The memory is only partly emulated in PC-BASIC. See Memory model for supported addresses. Outside emulated areas, `PEEK` returns 0.
* Values for particular memory address can be preset on the command line using the `peek` option. This can be used for compatibility with old programs. These values will override video or data segment values, if they are in those locations.
## Errors
* `address` has a string value: `Type mismatch`.
* `address` is not in `[-32768—65535]`: `Overflow`.