# VARPTR

`pointer = VARPTR({name|#file_num})`

Returns the memory address of variable `name` or of the File Control Block of file number `file_num`.

## Parameters
* `name` is a previously defined variable or fully indexed array element.
* `file_num` is a legal file number.
## Notes
* `VARPTR` can be used with `PEEK` to read a variable's internal representation.
## Errors
* `name` has not been previously defined: `Illegal function call`.
* `file_num` has a string value: `Type mismatch`.
* `file_num` is not in `[1, max_files]`, where `max_files` is the maximum number of files as set by the `max-files` option: `Bad file number`.