# Mathematical operators
operate on numeric expressions only. Note however that `+` can take the role of the string concatenation operator if both operands are strings.

| Code	| Operation	 | Result |
|-------|-------|--------|
| x ^ y	| Exponentiation	| x raised to the power of y |
| x * y	| Multiplication	| Product of x and y |
| x / y	| Division	Quotient|  of x and y |
| x \ y	| Truncated division| 	Integer quotient of x and y |
| x MOD y | Modulo	| Integer remainder of x by y (with the sign of x) |
| x + y	| Addition	| Sum of x and y |
| x - y	| Subtraction	| Difference of x and y |
| + y	| Unary Plus	| Value of y |
| - y	| Negation	| Negative value of y |

Where necessary, the result of the operation will be upgraded to a data type able to hold the result. For example, dividing integers 3 by 2 will yield a single-precision 1.5. However, the exponentiation operator `^` will give at most a single-precision result unless the double option is used.

## Errors
* If either operand is a string, `Type mismatch` will be raised. The exception is `+` which will only raise `Type mismatch` if either but not both operands are strings.
* If `y=0`, `x / y`, `x MOD y` and `x \ y` will raise `Division by zero`.
* If `x=0` and `y<0`, `x^y` will raise `Division by zero`.
* If the result of any operation is too large to fit in a floating-point data type, `Overflow is raised`.
* If operands or result of `\` or `MOD` are not in `[-32768–32767]`, `Overflow` is raised.
* If `x<0` and `y` is a fractional number, `x ^ y` will raise `Illegal function call`.