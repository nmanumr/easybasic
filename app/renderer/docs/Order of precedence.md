# Order of precedence
The order of precedence of operators is as follows, from tightly bound (high precedence) to loosely bound (low precedence):

12. `^`
11. `*` `/`
10. `\`
9. `MOD`
8. `+` `-` (unary and binary)
7. `=` `<>` `><` `<` `>` `<=` `=<` `>=` `=>`
6. `NOT` (unary)
5. `AND`
4. `OR`
3. `XOR`
2. `EQV`
1. `IMP`

Expressions within parentheses `()` are evaluated first. All binary operators are left-associative: operators of equal precedence are evaluated left to right.

## Examples
* Exponentiation is more tightly bound than negation: `-1^2 = -(1^2) = -1` but `(-1)^2 = 1`.

* Exponentiation is left-associative: `2^3^4 = (2^3)^4 = 4096`.

##Errors

* If any operator other than `+`, `-` or `NOT` is used without a left operand, `Syntax error` is raised.

* At the end of a statement, if any operator is used without a right operand, `Missing operand` is raised. If this occurs elsewhere inside a statement, such as within brackets, `Syntax error` is raised.