# Tokenised BASIC
The printable ASCII characters in the range `20`—`7E` are used for string literals, comments, variable names, and elements of statement syntax that are not reserved words. Reserved words are represented by their reserved word tokens and numeric literals are represented by numeric token sequences.

## Numeric token sequences
Numeric literals are stored in tokenised programs according to the following representation. All numbers are positive; negative numbers are stored simply by preceding the number with `EA`, the token for `-`.

| Class | Bytes | Format |
|:------|:-----:|:-------|
| Indirect line numbers | 3 | 0E followed by an unsigned 16-bit little-endian integer. |
| Octal integers | 3 | 0B followed by an unsigned 16-bit little-endian integer.|
| Hexadecimal integers| 3 | 0C followed by an unsigned 16-bit  little-endian integer.|
| Positive decimal integers less than 11 | 1 | Tokens 11—1B represent 0—10. |
| Positive decimal integers less than 256 | 2 | 0F followed by an unsigned 8-bit integer.|
|Other decimal integers| 3 | 1C followed by a two's complement signed 16-bit little-endian integer. GW-BASIC will recognise a negative number encountered this way but it will not store negative numbers itself using the two's complement, but rather by preceding the positive number with EA.|
| Single precision floating-point number| 5| 1D followed by a four-byte single in Microsoft Binary Format.|
| Double precision floating-point number| 9| 1F followed by an eight-byte double in Microsoft Binary Format.|

## Keyword tokens
Most keywords in PC-BASIC are *reserved words*. Reserved words are represented in a tokenised program by a single- or double-byte token. The complete list is below.

All function names and operators are reserved words and all statements start with a reserved word (which in the case of `LET` is optional). However, the converse is not true: not all reserved words are statements, functions, or operators. For example, `TO` and `SPC(` only occur as part of a statement syntax. Furthermore, some keywords that form part of statement syntax are not reserved words: examples are `AS`, `BASE`, and `ACCESS`.

Keywords that are not reserved words are spelt out in full text in the tokenised source.

A variable or user-defined function name must not be identical to a reserved word. The list below is an exhaustive list of reserved words that can be used to determine whether a name is legal.

81 END 82 FOR 83 NEXT 84 DATA 85 INPUT 86 DIM 87 READ 88 LET 89 GOTO 8A RUN 8B IF 8C RESTORE 8D GOSUB 8E RETURN 8F REM 90 STOP 91 PRINT 92 CLEAR 93 LIST 94 NEW 95 ON 96 WAIT 97 DEF 98 POKE 99 CONT 9C OUT 9D LPRINT 9E LLIST A0 WIDTH A1 ELSE A2 TRON A3 TROFF A4 SWAP A5 ERASE A6 EDIT A7 ERROR A8 RESUME A9 DELETE AA AUTO AB RENUM AC DEFSTR AD DEFINT AE DEFSNG AF DEFDBL B0 LINE B1 WHILE B2 WEND B3 CALL B7 WRITE B8 OPTION B9 RANDOMIZE BA OPEN BB CLOSE BC LOAD BD MERGE BE SAVE BF COLOR C0 CLS C1 MOTOR C2 BSAVE C3 BLOAD C4 SOUND C5 BEEP C6 PSET C7 PRESET C8 SCREEN C9 KEY CA LOCATE CC TO CD THEN CE TAB( CF STEP D0 USR D1 FN D2 SPC( D3 NOT D4 ERL D5 ERR D6 STRING$ D7 USING D8 INSTR D9 ' DA VARPTR DB CSRLIN DC POINT DD OFF DE INKEY$ E6 > E7 = E8 < E9 + EA - EB * EC / ED ^ EE AND EF OR F0 XOR F1 EQV F2 IMP F3 MOD F4 \ FD81 CVI FD82 CVS FD83 CVD FD84 MKI$ FD85 MKS$ FD86 MKD$ FD8B EXTERR FE81 FILES FE82 FIELD FE83 SYSTEM FE84 NAME FE85 LSET FE86 RSET FE87 KILL FE88 PUT FE89 GET FE8A RESET FE8B COMMON FE8C CHAIN FE8D DATE$ FE8E TIME$ FE8F PAINT FE90 COM FE91 CIRCLE FE92 DRAW FE93 PLAY FE94 TIMER FE95 ERDEV FE96 IOCTL FE97 CHDIR FE98 MKDIR FE99 RMDIR FE9A SHELL FE9B ENVIRON FE9C VIEW FE9D WINDOW FE9E PMAP FE9F PALETTE FEA0 LCOPY FEA1 CALLS FEA5 PCOPY FEA7 LOCK FEA8 UNLOCK FF81 LEFT$ FF82 RIGHT$ FF83 MID$ FF84 SGN FF85 INT FF86 ABS FF87 SQR FF88 RND FF89 SIN FF8A LOG FF8B EXP FF8C COS FF8D TAN FF8E ATN FF8F FRE FF90 INP FF91 POS FF92 LEN FF93 STR$ FF94 VAL FF95 ASC FF96 CHR$ FF97 PEEK FF98 SPACE$ FF99 OCT$ FF9A HEX$ FF9B LPOS FF9C CINT FF9D CSNG FF9E CDBL FF9F FIX FFA0 PEN FFA1 STICK FFA2 STRIG FFA3 EOF FFA4 LOC FFA5 LOF

The following additional reserved words are activated by the option `syntax={pcjr|tandy}.`

`FEA4` `NOISE` `FEA6` `TERM`

The following additional reserved word is activated by the `debug` option. It is specific to PC-BASIC and not present in GW-BASIC.

`FFFF` `DEBUG`
## Internal use tokens
The tokens `10`, `1E` and `0D` are known to be used internally by GW-BASIC. They should not appear in a correctly stored tokenised program file.