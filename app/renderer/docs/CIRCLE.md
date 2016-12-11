# CIRCLE
`CIRCLE [STEP] (x, y), radius [, [colour] [, [start] [, [end] [, aspect]]]`

Draw an ellipse or ellipse sector.

## Parameters
* The midpoint of the ellipse is at `(x,y)`. If `STEP` is specified, the midpoint is `(x`,`y)` away from the current position.
* `radius` is the radius, in pixels, along the long axis.
* `colour` is the colour attribute.
* If `start` and `end` are specified, a sector of the ellipse is drawn from `start` radians to `end` radians, with zero radians the intersection with the right-hand x axis. If a negative value is specified, the arc sector is connected by a line to the midpoint.
* `aspect` specifies the ratio between the y radius and the x radius. If it is not specified, the standard value for the `SCREEN` mode is used (see there), so as to make the ellipse appear like a circle on the original hardware.
## Notes
* For `aspect <> 1`, the midpoint algorithm used does not pixel-perfectly reproduce GW-BASIC's ellipses.
## Errors
* The statement is executed in text mode: `Illegal function call`.
* `start` or `end` is not in `[0—2π]`: `Illegal function call`.
* The statement ends with a comma: `Missing operand`.