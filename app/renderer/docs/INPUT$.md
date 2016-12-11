# INPUT$
`chars = INPUT[ ]$ (num_chars [, [#] file_num])`

Returns a string of `num_chars` characters from the keyboard or, if `file_num` is provided, from a text file.

## Parameters

* `num_chars` is a numeric expression in `[1—255]`.
* `file_num` is a numeric expression that returns the number of a text file opened in `INPUT` mode. The `#` is optional and has no effect.
## Notes

* This is a blocking read. It will wait for characters if there are none in the buffer.
* All control characters except `Ctrl`+`Break`, `Ctrl`+`Scroll Lock` and `Pause` are passed to the string by `INPUT$`. `Ctrl`+`Break` and `Ctrl`+`Scroll Lock` break execution whereas `Pause` halts until another key is pressed (and not read).
* When reading from the keyboard directly or through `KYBD`: `arrow keys`, `Del`, `Home`, `End`, `Pg Up`, `Pg Dn` are passed as `NUL` characters. Function keys are ignored if they are event-trapped, otherwise function-key macro replacement is active as normal.

## Errors
* `num_chars` is not in `[-32768—32767]`: `Overflow`.
* `num_chars` is not in `[1—255]`: `Illegal function call`.
* `file_num` is not an open file: `Bad file number`.
* `file_num` is less than zero: `Illegal function call`.
* `file_num` is greater than `32767`: `Overflow`.
* `file_num` is not open for INPUT: `Bad file mode`.
* `num_chars` or `file_num` are strings: `Type mismatch`.
* `file_num` is open to a `COM` port and this is the first `INPUT`, `LINE INPUT` or `INPUT$` call on that port since the buffer has filled up completely (i.e. `LOF(file_num)` has become zero): `Communication buffer overflow`.