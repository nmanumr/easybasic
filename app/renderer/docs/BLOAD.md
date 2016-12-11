# BLOAD
`BLOAD file_spec [, offset]`

Loads a memory image file into memory.

## Parameters
* The string expression `file_spec` is a valid file specification indicating the file to read the memory image from.
* `offset` is a numeric expression in the range `[-32768—65535]`. It indicates an offset in the current `DEF SEG` segment where the file is to be stored. If not specified, the offset stored in the `BSAVE` file will be used. If negative, its two's complement will be used.
## Errors
* The loaded file is not in `BSAVE format`: `Bad file mode`.
* `file_spec` contains disallowed characters: `Bad file number` (on `CAS1:`); `Bad file name` (on disk devices).
* `file_spec` has a `numeric value`: `Type mismatch`.
* `offset` is not in the range `[-32768—65535]`: `Overflow`.