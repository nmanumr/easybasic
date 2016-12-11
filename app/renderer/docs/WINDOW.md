# WINDOW  
```
WINDOW [[SCREEN] (x0, y0)-(x1, y1)]
```

Define logical coordinates for the viewport. If `SCREEN` is not specified, the bottom left of the screen is mapped to the lower coordinates; the top right of the screen is mapped to the higher coordinates. If `SCREEN` is specified, the top left of the screen is mapped to the lower coordinates; the bottom right of the screen is mapped to the higher coordinates.

If `WINDOW` is called without arguments, the logical coordinates are reset to the viewport coordinates.
## Parameters
* `x0`, `y0`, `x1`, `y1` are numeric expressions.

## Errors
* Any of the coordinates have a string value: `Type mismatch`.
* `x0 = x1` or `y0 = y1`: `Illegal function call`.

