# CHAIN
`AIN [MERGE] file_spec [, [line_number_expr] [, ALL] [, DELETE range [, ign]]]`

Loads a program from file into memory and runs it, optionally transferring variables.

* If `ALL` is specified, all variables are transferred. If not, the variables specified in a `COMMON` statement are transferred.
* If `MERGE` is specified, the loaded program is merged into the existing program. To be able to use this, the program file indicated by `file_spec` must be in plain text format.
* If `DELETE` is specified, the `range` of line numbers is deleted from the existing code before the merge. This is pointless without `MERGE`.
## Parameters
* The string expression `file_spec` is a valid file specification indicating the file to read the program from.
* `line_number_expr` is a numeric expression. It will be interpreted as a line number in the new program and execution will start from this line number. If `line_number_expr` is negative, it will be interpreted as its two's-complement.
* `range` is a line number range of which the closing line number is specified and exists before the merge.
* `ign` is optional and ignored.
## Notes
* `CHAIN` preserves the `OPTION BASE` setting.
* `COMMON` variables remain `COMMON` for the next CHAIN.
* Only if `ALL` is specified, `DEF FN` definitions are preserved.
* Only if `MERGE` is specified, `DEFINT`, `DEFSTR`, `DEFSNG`, `DEFDBL` definitions are preserved.
* If specified, `ALL` must precede `DELETE`; if unspecified, no comma must be put in its place and only two commas should precede `DELETE`.
## Errors
* `file_spec` has a numeric value: `Type mismatch`.
* `file_spec` contains disallowed characters: `Bad file number` (on `CAS1:`); `Bad file name` (on disk devices).
* The file specified in `file_spec` cannot be found: `File not found`.
* `MERGE` is specified and the loaded program was not saved in plain-text mode: `Bad file mode`.
* A line number in `range` is greater than 65529: `Syntax error`.
* If a `Syntax error` is raised by `CHAIN`, no lines are deleted and the new program is not loaded.
* The closing line number in `range` does not exist: `Illegal function call`
* If `line_number_expr` does not evaluate to an existing line number in the new program, `Illegal function call` is raised but the load or merge is being performed.