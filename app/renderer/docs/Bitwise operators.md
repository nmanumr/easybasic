# Bitwise operators
PC-BASIC has no Boolean type and does not implement Boolean operators. It does, however, implement bitwise operators.

Bitwise operators operate on numeric expressions only. Floating-point operands are rounded to integers before being used.

| Code	| Operation	| Result|
|-------|-----------|-------|
| NOT y	| Complement |	-y-1|
|x AND y|Bitwise conjunction | The bitwise AND of x and y|
| x OR y|Bitwise disjunction | The bitwise OR of x and y|
| x XOR y|Bitwise exclusive or| The bitwise XOR of x and y|
| x EQV y|Bitwise equivalence | NOT(x XOR y)|
| x IMP y|Bitwise implication | NOT(x) OR y|

These operators can be used as Boolean operators only if `-1` is used to represent true while `0` represents false. Note that PC-BASIC represents negative integers using the two's complement, so `NOT 0 = -1`. The Boolean interpretation of bitwise operators is given in the table below.

| Code	    |Operation	       | Result |
| NOT y	    |Logical negation  | True if y is false and vice versa |
|x AND y	|Conjunction	   | Only true if both x and y are true |
|x OR y	    |Disjunction	   | Only false if both x and y are false | 
|x XOR y	|Exclusive or	   | True if the truth values of x and y differ |
|x EQV y	|Equivalence	   | True if the truth values of x and y are the same |
|x IMP y	|Implication	   | True if x is false or y is true |

Be aware that when used on integers other than `0` and `-1`, bitwise operators can not be interpreted as Boolean operators. For example, `2 AND 1` returns `0`.

## Errors
If either operand is a string, `Type mismatch` will be raised.
If the operands or result are not in `[-32768–32767]`, `Overflow`    is raised.
