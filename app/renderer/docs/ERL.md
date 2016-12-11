# ERL
`error_line = ERL`

Returns the line number where the last error was raised.

## Notes
* If the error was raised by a direct statement, returns 65535.
* If no error has been raised, returns 0.
* This function takes no arguments.