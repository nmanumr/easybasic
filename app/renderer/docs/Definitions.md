# Definitions

A program line consists of a line number followed by a compound statement. Program lines are terminated by a `CR` or or by the end of the file (optionally through an `EOF` character). Anything on a program line after a `NUL` character is ignored.

A line number is a whole number in the range `[0—65535]`. Note that the line numbers `65530—65535` cannot be entered from the console or a text program file, but can be part of a tokenised program file.

A compound statement consists of statements separated by colons:
```
statement [: statement] ...
```
An expression takes one of the following forms:
```
unary_operator {literal | variable | array_element | function}
```
```
expression binary_operator expression
```
```
(expression)
```
whose elements are described the sections Literals, Variables, Operators and Functions.

An array element takes the form
```
array {[|(} numeric_expression [, numeric_expression ] ... {)|]}
```