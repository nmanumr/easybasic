# CALL
`CALL address_var [( p0 [, p1] ... )]`

Does nothing.

## Notes
* In GW-BASIC, `CALL` executes a machine language subroutine.
* This statement is not implemented in PC-BASIC.
## Parameters
* `address_var` is a numeric variable.
* `p0, p1, ...` are variables.
## Errors
* `address_var` is a `string variable`: `Type mismatch`.
* `address_var` is a literal: `Syntax error`.