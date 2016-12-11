# INKEY$
`key = INKEY$`

Returns one key-press from the keyboard buffer. If the keyboard buffer is empty, returns the empty string. Otherwise, the return value is a one- or two- character string holding the e-ASCII code of the pressed key.

## Notes
* This function takes no arguments.
* When a function key `F1`–`F10` is pressed, `INKEY$` will return the letters of the associated macro — unless this macro has been set to empty with the `KEY` statement, in which case it returns the e-ASCII code for the function key.