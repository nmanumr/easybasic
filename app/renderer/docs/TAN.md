# TAN
`tangent = TAN(angle)`

Returns the tangent of `angle`.

## Parameters
* `angle` is a numeric expression giving the angle in radians.
## Notes
* Unless PC-BASIC is run with the `double` option, this function returns a single-precision value.
* The tangent returned usually differs from the value returned by GW-BASIC in the least significant figure.
* For `angle` close to multiples of `π/2`, the tangent is divergent or close to zero. The values returned will have very low precision in these cases.
## Errors
* `angle` has a string value: `Type mismatch`.