# Literals

## String literals
String literals are of the following form:
```
"[characters]{NUL|CR|EOF|"}
```
where `characters` is a string of characters. Any character from the current code page can be used, with the following exceptions, all of which terminate the string literal (aside from other effects they may have):

* `NUL` (`CHR$(&h00)`)
* `CR` (`CHR$(&h0D)`)
* `EOF` (`CHR$(&h1A)`)
* `"` (`CHR$(&h22)`)

Strings are also legally terminated by the end of the file in the absence of an `EOF` character.

Apart from these, string literals should not contain any of the characters in the ASCII range `&h0D`—`&h1F`, which lead to unpredictable results. There is no escaping mechanism. To include one of the above characters in a string, use string concatenation and the `CHR$` function.

## Numeric literal
Numeric literals have one of the following forms:
```
[+|-] [0|1|2|3|4|5|6|7|8|9]... [.][0|1|2|3|4|5|6|7|8|9]... [{E|e|D|d}[+|-][0|1|2|3|4|5|6|7|8|9]...] |#|!|%]
```
```
&{H|h}[0|1|2|3|4|5|6|7|8|9|A|B|C|D|E|F|a|b|c|d|e|f]...
```
```
&[O|o] [0|1|2|3|4|5|6|7]...
```
Hexadecimal literals must not contain spaces, but decimal and octal literals may. The `o` character in octal literals is optional: they can be specified equally as `&o777` or `&777`.

Hexadecimal and octal literals denote integers and do not include a sign. They must range between [`&h0`—`&hFFFF`], of which the range [`&h8000`—`&hFFFF`] is interpreted as a two's complement negative integer; for example, `&hFFFF = -1`. Signs can appear left of the `&` but these form an expression and are not part of the literal itself.

Floating-point literals must be specified in decimal notation. The decimal separator is the point. A base-10 exponent may be specified after `E` in single-precision floats, or after `D` in double-precision floats. Trailing `%` is ignored and does not indicate an integer literal. Trailing `!` or `#` mark the literal as single- or double-precision, respectively.

Examples of valid numeric literals are `-1` `42` `42!` `42#` `1.3523523` `.235435` `-.3` `3.` `.` `.e` `.D` `1.1e+7` `1.1d+7` `1e2` `1e-2` `&7` `&hffff` `&O20` `&h` `&` `65537%` `1.1%`

Note that expressions such as `&o-77` are legal; these are however not negative octals but rather the expression `&o` (empty octal; zero) less `77` (decimal 77).