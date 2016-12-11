# FN

`result = FN[ ]name [(arg_0 [, arg_1] ...)]`

Evaluates the user-defined function previously defined with `DEF FN name`. Spaces between `FN` and `name` are optional.

## Parameters

* `name` is the name of a previously defined function.
* `arg_0, arg_1, ...` are expressions, given as parameters to the function.

## Errors
* No function named `name` is defined: `Undefined user function`.
* The number of parameters differs from the function definition: `Syntax error`.
* The type of one or more parameters differs from the function definition: `Type mismatch`.
* The return type is incompatible with the function name's sigil: `Type mismatch`.
* The function being called is recursive or mutually recursive: `Out of memory`.