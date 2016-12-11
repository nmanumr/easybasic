# TIMER
`seconds = TIMER`

Returns the number of seconds since midnight on the internal BASIC clock.

## Notes
* `TIMER` updates in ticks of 1/20 second.
* The least-significant two bytes of `TIMER` are often used as a seed for the pseudorandom number generator through `RANDOMIZE TIMER`. Since these bytes only take values from a limited set, that's not in fact a particularly good random seed. However, the pseudorandom number generator included with GW-BASIC and PC-BASIC is so weak that it should not be used for anything serious anyway.
* This function takes no arguments.