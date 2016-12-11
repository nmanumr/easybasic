# VAL
`value = VAL(string)`

Returns the numeric value of the string expression `string`. Parsing stops as soon as the first character is encountered that cannot be part of a number. If no characters are parsed, `VAL` returns zero. See the section on numeric literals for the recognised number formats.

## Notes
* Spaces before or even inside a number are ignored: `VAL(" 1 0")` returns `10`.
* If string contains one of the ASCII separator characters `CHR$(28)` (file separator), `CHR$(29)` (group separator) or `CHR$(31)` (unit separator), `VAL` returns zero. This is not the case with `CHR$(30)` (record separator). This behaviour conforms to GW-BASIC.
## Errors
* `string` has a number value: `Type mismatch`.