# WRITE
```
WRITE [# file_num,] expr_0 [{,|;} expr_1] ...
```

Writes values to a file or the screen in machine-readable form. Values are separated by commas and the line is ended with a `CR LF` sequence. Strings are delimited by double quotes `"`. No padding spaces are inserted.

When writing to the screen, the same control characters are recognised as for the `PRINT` statement.
## Parameters
* `expr_0, expr_1, ...` are expressions whose value is to be printed.

## Errors
* `file_num` has a string value: `Type mismatch`.
* `file_num` is open for `INPUT`: `Bad file mode`.

