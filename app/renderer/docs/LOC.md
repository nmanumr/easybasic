# LOC
`location = LOC(file_num)`

Returns the current location in the file opened under number `file_num`.

* If the file is opened for `INPUT`, `OUTPUT` or `APPEND`, `LOC`returns the number of 128-byte blocks read or written since opening the file.
* If the file is opened for `RANDOM`, `LOC` returns the record number last read or written.
* If the file is opened to a `COM` device, `LOC` returns the number of characters in the input buffer, with a maximum of 255.
If the file is opened to `KYBD`:, `LOC` returns 0.

## Parameters
* `file_num` is a numeric expression in the range `[0—255]`.

## Notes
* `file_num` must not be preceded by a `#`.
* In `OUTPUT` or `APPEND` mode, before any writes `LOC` returns 0. After the 128th character is written, `LOC` returns 1.
* In `INPUT` mode, before any reads `LOC` returns 1. After the 129th character is read, `LOC` returns 2.
## Errors
* `file_num` has a string value: `Type mismatch`.
* `file_num` is not in `[-32768—32767]`: `Overflow`.
* `file_num` is not in `[0—255]`: `Illegal function call`.
* `file_num` is not an open file: `Bad file number`.
* `file_num` is open to a `LPT` device: `Bad file mode`.