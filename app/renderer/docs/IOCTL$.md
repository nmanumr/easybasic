# IOCTL$
`result = IOCTL[ ]$ ([#] file_num)`

Raises `Illegal function call`.

## Notes
* In GW-BASIC, `IOCTL$` reads the reply to `IOCTL` from a device.
* This function is not implemented in PC-BASIC.
##Errors
* `file_num` has a string value: `Type mismatch`.
* `file_num` is not in `[-32768—32767]`: `Overflow`.
* `file_num` is not an open file: `Bad file number`.
* Otherwise: `Illegal function call`