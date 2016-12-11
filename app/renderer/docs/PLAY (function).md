# PLAY (function)
`length = PLAY(voice)`

Returns the number of notes in the background music queue. The return value is in `[0—16]`.

## Parameters
* `voice` is a numeric expression in `[0—255]`. If `syntax={pcjr|tandy}`, indicates for which tone voice channel the number of notes is to be returned. If `voice` is not in `[0—2]`, the queue for voice 0 is returned. For other choices of `syntax`, the `voice` value has no effect.
## Notes
* There are at most 16 notes in the music queue. Some GW-BASIC manuals claim there can be up to 32, but in reality `PLAY` only returns at the last 16 notes.
## Errors
* `voice` has a string value: `Type mismatch`.
* `voice` is not in `[0—255]`: `Illegal function call`.
* `voice` is not in `[-32768—32767]`: `Overflow`.