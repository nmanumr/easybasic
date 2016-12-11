# EOF
`is_at_end = EOF(file_num)`

Returns -1 if file with number `file_num` has reached end-of-file; 0 otherwise. The file must be open in `INPUT` or `RANDOM` mode. `EOF(0)` returns 0.

## Notes

* If `file_num` is open to `KYBD:`, performs a blocking read and returns -1 if `CTRL`+`Z` is entered, 0 otherwise. The character entered is then echoed to the console.
## Errors
* `file_num` has a string value: `Type mismatch`.
* `file_num` is a number not in `[-32768—32767]`: `Overflow`.
* `file_num` is a number not in `[0—255]`: `Illegal function call`.
* `file_num` is not 0 or the number of an open file: `Bad file number`.
* The file with number `file_num` is in OUTPUT or APPEND mode: `Bad file mode`.