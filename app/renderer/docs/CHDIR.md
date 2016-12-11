# CHDIR
`CHDIR dir_spec`

Change the current directory on a disk device to `dir_spec`. Each disk device has its own current directory.

## Parameters
The string expression `dir_spe`c is a valid file specification indicating an existing directory on a disk device.
## Errors
* No matching path is found: `Path not found`.
* `dir_spec` has a numeric value: `Type mismatch`.
* `dir_spec` is empty: `Bad file name`.