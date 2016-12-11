# LOF
`length = LOF(file_num)`

Returns the number of bytes in the file open under `file_num`.

## Parameters
* `file_num` is a numeric expression in the range `[0—255]`.

## Notes
* If `file_num` is open to a `COM`: device, `LOF` returns the number of bytes free in the input buffer.

## Errors
* `file_num` has a string value: `Type mismatch`.
* `file_num` is not in `[-32768—32767]`: `Overflow`.
* `file_num` is not in `[0—255]`: `Illegal function call`.
* `file_num` is not an open file: `Bad file number`.
* `file_num` is open to a LPT device: `Bad file mode`.