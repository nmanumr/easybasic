# e-ASCII codes
Alongside scancodes, most keys also carry a character value the GW-BASIC documentation calls extended ASCII. Since this is a rather overloaded term, we shall use the abbreviation e-ASCII exclusively for these values. The values returned by the INKEY$ function are e-ASCII values.

e-ASCII codes are one or two bytes long; single-byte codes are simply ASCII codes whereas double-byte codes consist of a `NUL` character plus a code indicating the key pressed. Some, but certainly not all, of these codes agree with the keys' scancodes.

Unlike scancodes, e-ASCII codes of unmodified keys and those of keys modified by `Shift`, `Ctrl` or `Alt` are all different.

Unmodified, `Shift`ed and `Ctrl`ed e-ASCII codes are connected to a key's meaning, not its location. For example, the e-ASCII for `Ctrl`+`a` are the same on a French and a US keyboard. By contrast, the `Alt`ed codes are connected to the key's location, like scancodes. The US keyboard layout is used in the table below.

| Key | e-ASCII | e-ASCII `shift` | e-ASCII `CTRL` | e-ASCII `Alt` |
|:---:|:-------:|:---------------:|:--------------:|:-------------:|
| `Esc` | 1B | 1B | 1B | - |	
| `1 !` | 31 | 21 | - | 00 78 |
| `2 @` | 32 | 40 | 00 03 | 00 79 |
| `3 #` | 33 | 23 | - | 00 7A |
| `4 $` | 34 | 24 | - | 00 7B |
| `5 %` | 35 | 25 | - | 00 7C |
| `6 ^` | 36 | 5E | 1E | 00 7D |
| `7 &` | 37 | 26 | - | 00 7E |
| `8 *` | 38 | 2A | - | 00 7F |
| `9 (` | 39 | 28 | - | 00 80 | 
| `0 )` | 30 | 29 | - | 00 81 |
| `- _` | 2D | 5F | 1F | 00 82 |
| `= +` | 3D | 2B | - | 00 83 |
| `Backspace` | 08 | 08 | 7F | 00 8C |
| `Tab` | 09 | 00 0F | 00 8D | 00 8E |
| `q Q` | 71 | 51 | 11 | 00 10|
| `w W` | 77 | 57 | 17 | 00 11|
| `e E` | 65 | 45 | 05 | 00 12|
| `r R` | 72 | 52 | 12 | 00 13|
| `t T` | 74 | 54 | 14 | 00 14|
| `y Y` | 79 | 59 | 19 | 00 15|
| `u U` | 75 | 55 | 15 | 00 16|
| `i I` | 69 | 49 | 09 | 00 17|
| `o O` | 6F | 4F | 0F | 00 18|
| `p P` | 70 | 50 | 10 | 00 19|
| `[ {` | 5B | 7B | 1B | - | 
| `] }` | 5D | 7D | 1D | - | 
| `Enter`| 0D | 0D | 0A | 00 8F |
| `a A` |61 | 41 | 01 | 00 1E |
| `s S` |73 | 53 | 13 | 00 1F |
| `d D` |64 | 44 | 04 | 00 20 |
| `f F` |66 | 46 | 06 | 00 21 |
| `g G` |67 | 47 | 07 | 00 22 |
| `h H` |68 | 48 | 08 | 00 23 |
| `j J` |6A | 4A | 0A | 00 24 |
| `k K` |6B | 4B | 0B | 00 25 |
| `l L` |6C | 4C | 0C | 00 26 |
| `; :` |3B | 3A | 	
| `' "` |27 | 22 | 	
| `` ~` |60 | 7E | 	
| `\ |` |5C | 7C | 1C |
| `z Z` |7A | 5A | 1A | 00 2C |
| `x X` |78 | 58 | 18 | 00 2d |
| `c C` |63 | 43 | 03 | 00 2E |
| `v V` |76 | 56 | 16 | 00 2F |
| `b B` |62 | 42 | 02 | 00 30 |
| `n N` |6E | 4E | 0E | 00 31 |
| `m M` |6D | 4D | 0D | 00 32 |
| `, <` |2C | 3C | 	
| `. >` |2E | 3E | 	
| `/ ?` |2F | 3F | 	
| `PrtSc` |	- | - |	00 72 | 00 46 |
| `Space` |	20 | 20 |20 |00 20 |
| `F1` | 00 3B | 00 54 | 00 5E | 00 68 |
| `F2` | 00 3C | 00 55 | 00 5F | 00 69 |
| `F3` | 00 3D | 00 56 | 00 60 | 00 6A |
| `F4` | 00 3E | 00 57 | 00 61 | 00 6C |
| `F5` | 00 3F | 00 58 | 00 62 | 00 6D |
| `F6` | 00 40 | 00 59 | 00 63 | 00 6E |
| `F7` | 00 41 | 00 5A | 00 64 | 00 6F |
| `F8` | 00 42 | 00 5B | 00 65 | 00 70 |
| `F9` | 00 43 | 00 5C | 00 66 | 00 71 |
| `F10`	| 00 44 | 00 5D | 00 67 | 00 72 |
| `F11` (Tandy)	| 00 98 | 00 A2 | 00 AC | 00 B6 |
| `F12` (Tandy)	| 00 99 | 00 A3 | 00 AD | 00 B7 |
| `Home` | 00 47 | 00 47 | 00 77 |	
| `End`	 | 00 4F | 00 4F | 00 75 |	
| `PgUp` | 00 49 | 00 49 | 00 84 |	
| `PgDn` | 00 51 | 00 51 | 00 76 |	
| `↑` | 00 48 |	00 48|		|
| `←` | 00 4B |	00 87|	00 73|	
| `→` | 00 4D |	00 88|	00 74|	
| `↓` | 00 50 |	00 50|		|
| `keypad 5` | 35 | 35 | - |05 |
| `Ins`	| 00 52 |00 52|		
| `Del`	| 00 53 |00 53|