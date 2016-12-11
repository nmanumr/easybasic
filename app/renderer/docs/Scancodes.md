# Scancodes

PC-BASIC uses PC/XT scancodes, which originated on the 83-key IBM Model F keyboard supplied with the IBM PC 5150. The layout of this keyboard was quite distinct from modern standard keyboards with 101 or more keys, but keys on a modern keyboard produce the same scancode as the key with the same function on the Model F. For example, the key that (on a US keyboard) produces the `\` was located next to the left `Shift` key on the Model F keyboard and has scancode `&h2B`. The (US) backslash key still has this scancode, even though it is now usually found above the `Enter` key.

To further complicate matters, keyboards for different locales have their layout remapped in software rather than in hardware, which means that they produce the same scancode as the key that on a US keyboard is in the same location, regardless of which character they actually produce.

Therefore, the `A` on a French keyboard will produce the same scancode as the `Q` on a UK or US keyboard. The aforementioned US `\` key is identified with the key that is generally found to the bottom left of `Enter` on non-US keyboards. For example, on my UK keyboard this is the `#` key. Non-US keyboards have an additional key next to the left `Shift` which on the UK keyboard is the `\`. Therefore, while this key is in the same location and has the same function as the Model F `\`, it has a different scancode.

In the table below, the keys are marked by their function on a US keyboard, but it should be kept in mind that the scancode is linked to the position, not the function, of the key.

| Key | Scancode |
|:---|:--------|
| `Esc`	| 01 |
| `1 !`	| 02 |
| `2 @`	| 03 |
| `3 #`	| 04 |
| `4 $`	| 05 |
| `5 %`	| 06 |
| `6 ^`	| 07 |
| `7 &`	| 08 |
| `8 *`	| 09 |
| `9 (`	| 0A |
| `0 )`	| 0B |
| `- _`	| 0C |
| `= +`	| 0D |
| `Backspace`	| 0E |
| `Tab`	| 0F |
| `q Q`	| 10 |
| `w W`	| 11 |
| `e E`	| 12 |
| `r R`	| 13 |
| `t T`	| 14 |
| `y Y`	| 15 |
| `u U`	| 16 |
| `i I`	| 17 |
| `o O`	| 18 |
| `p P`	| 19 |
| `[ {`	| 1A |
| `] }`	| 1B |
| `Enter`	| 1C |
| `Ctrl`	| 1D |
| `a A`	| 1E |
| `s S`	| 1F |
| `d D`	| 20 |
| `f F`	| 21 |
| `g G`	| 22 |
| `h H`	| 23 |
| `j J`	| 24 |
| `k K`	| 25 |
| `l L`	| 26 |
| `; :`	| 27 |
| `' "`	| 28 |
| ` ~	| 29 |
| `Left Shift`	| 2A |
| `\ &#124;	| 2B |
| `z Z`	| 2C |
| `x X`	| 2D |
| `c C`	| 2E |
| `v V`	| 2F |
| `b B`	| 30 |
| `n N`	| 31 |
| `m M`	| 32 |
| `, <`	| 33 |
| `. >`	| 34 |
| `/ ?`	| 35 |
| `Right Shift`	| 36 |
| `keypad *` `PrtSc`	| 37 |
| `Alt`	| 38 |
| `Space`	| 39 |
| `Caps Lock`	| 3A |
| `F1`	| 3B |
| `F2`	| 3C |
| `F3`	| 3D |
| `F4`	| 3E |
| `F5`	| 3F |
| `F6`	| 40 |
| `F7`	| 41 |
| `F8`	| 42 |
| `F9`	| 43 |
| `F10`	| 44 |
| `Num Lock`	| 45 |
| `Scroll Lock` `Pause`	| 46 |
| `keypad 7` `Home`	| 47 |
| `keypad 8` `↑`	| 48 |
| `keypad 9` `Pg Up`	| 49 |
| `keypad -`	| 4A |
| `keypad 4` `←`	| 4B |
| `keypad 5`	| 4C |
| `keypad 6` `→`	| 4D |
| `keypad +`	| 4E |
| `keypad 1` `End`	| 4F |
| `keypad 2` `↓`	| 50 |
| `keypad 3` `Pg Dn`	| 51 |
| `keypad 0` `Ins`	| 52 |
| `keypad .` `Del`	| 53 |
| `SysReq`	| 54 |
| `\ |` (Non-US 102-key)	| 56 |
| `F11`	| 57 |
| `F12`	| 58 |
| `Left Logo` (Windows 104-key)	| 5B |
| `Right Logo` (Windows 104-key)	| 5C |
| `Menu` (Windows 104-key)	| 5D |
| `ひらがな/カタカナ Hiragana/Katakana` (Japanese 106-key)	| 70 |
| `\ _` (Japanese 106-key)	| 73 |
| `変換 Henkan` (Japanese 106-key)	| 79 |
| `無変換 Muhenkan` (Japanese 106-key)	| 7B |
| `半角/全角 Hankaku/Zenkaku` (Japanese 106-key)	| 29 |
| `¥ |` (Japanese 106-key)	| 7D |
| `한자 Hanja` (Korean 103-key)	| F1 |
| `한/영 Han/Yeong` (Korean 103-key)	| F2 |
| `\ ? °` (Brazilian ABNT2)	| 73 |
| `keypad .` (Brazilian ABNT2)	| 7E |