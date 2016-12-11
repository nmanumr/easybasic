# RND
`random = RND[(x)]`

Returns a pseudorandom number in the interval `[0—1)`. `x` is a numeric expression. If `x` is zero, `RND` repeats the last pseudo-random number. If `x` is greater than zero, a new pseudorandom number is returned. If `x` is negative, the value of `x` is used to generate a new random number seed; after that, a new pseudorandom number is returned. The seed is generated in a different way than by `RANDOMIZE`.

## Notes
* PC-BASIC's `RND` function generates pseudo-random numbers through a linear congruential generator with modulo 224, multiplier 214013 and increment 2531011. This exactly reproduces the random numbers of GW-BASIC's `RND`.
* It should be noted, however, that this is a very poor random number generator: its parameters imply a recurrence period of 224, meaning that after less than 17 million calls `RND` will wrap around and start running through the exact same series of numbers all over again. `RND` should not be used for  cryptography, scientific simulations or anything else remotely serious.
## Errors
* `x` has a string value: `Type mismatch`.