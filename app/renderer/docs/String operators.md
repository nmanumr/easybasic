## String operators
The string concatenation operator is `+`. It has a binary as well as a unary form. The unary minus may also be used on strings, but has no effect.

|Code   | Operation	    |Result |
|:-----:|:-------------:|:-----|
|x + y	| Concatenation	|The string formed by x followed by y |
|+ y	| Unary Plus	|Value of y |
|- y	| Unary Minus	|Value of y |

##Errors

* If either (but not both) operands to a concatenation are numeric, `Type mismatch` will be raised.

* If `LEN(x) + LEN(y) > 255`, `x + y` will raise `String too long`.