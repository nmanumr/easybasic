# FRE
`free_mem = FRE(x)`

Returns the available BASIC memory.

## Parameters
* `x` is an expression.



* If `x` has a numeric value, it is ignored.
* If `x` has a string value, garbage collection is performed before returning available memory.