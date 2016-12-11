# AUTO
`AUTO [line_number|.] [, [increment]]`

Start automatic line numbering. Line numbers are automatically generated when `Enter` is pressed. If a program line exists at a generated line number, a `*` is shown after the line number. To avoid overwriting this line, leave it empty and press `Enter`. To stop automatic line numbering, press `Ctrl`+`Break` or `Ctrl`+`C`. The line being edited at that point is not saved. BASIC will return to command mode, even if `AUTO` was run from a program line.

## Parameters
* Line numbering starts at `line_number`, if specified. If `.` is specified, line numbering starts at the last program line that was stored. Otherwise, line numbering starts at `10`.
* Each next line number is incremented by `increment`, if specified. If a comma is used without specifying an increment, the last increment specified in an `AUTO` command is used. If not, `increment` defaults to `10`.
##Errors
* `line_number` is not an unsigned-integer value in `[0—65529]`: `Syntax error`.
* When automatic line numbering is enabled and `Enter` is pressed on an empty line with number larger than `65519`: `Undefined line number`.
* `increment` is `0`: `Illegal function call`.