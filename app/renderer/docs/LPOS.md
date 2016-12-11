# LPOS
`position = LPOS(printer_number)`

Returns the column position for a printer.

## Parameters
* `printer_number` is a numeric expression in `[0—3]`. If it is 0 or 1, the position for `LPT1`: is returned. If it is 2, `LPT2`:; 3, `LPT3`:.
## Notes
* In GW-BASIC, when entering direct mode, `LPT1`: (but not other printers) is flushed and its position is reset to 1. This is not implemented in PC-BASIC.
## Errors
* `printer_number` has a string value: `Type mismatch`.
* `printer_number` is not in `[-32768—32767]`: `Overflow`.
* `printer_number` is not in `[0—3]`: `Illegal function call`.