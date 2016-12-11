# BSAVE
```
BSAVE file_spec, offset, length
```

Saves a region of memory to an image file.

## Parameters
* The string expression `file_spec` is a valid file specification indicating the file to write to.
* `offset` is a numeric expression in the range `[-32768—65535]` indicating the offset into the current `DEF SEG` segment from where to start reading.
* `length` is a numeric expression in the range `[-32768—65535]` indicating the number of bytes to read.
* If `offset` or `length` are negative, their two's complement will be used.
## Errors
* `file_spec` has a numeric value: `Type mismatch`.
* `file_spec` contains disallowed characters: `Bad file number` (on `CAS1:`); `Bad file name` (on disk devices).
* `offset` is not in the range` [-32768—65535]`: `Overflow`.
* `length` is not in the range `[-32768—65535]`: `Overflow`.