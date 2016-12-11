# INT
`whole = INT(number)`

Returns `number` truncated towards negative infinity.

## Parameters
* `number` is a numeric expression.

## Notes
*   `FIX` truncates towards zero: it removes the fractional part. By contrast, `INT` truncates towards negative infinity. For negative `x`, `FIX(x)-INT(x)=1`.
## Errors
* `number` is a string expression, `Type mismatch`.