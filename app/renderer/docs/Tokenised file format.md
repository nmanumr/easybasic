# Tokenised file format

A tokenised program file on a disk device has the following format.

## Magic byte
`FF`
##Program lines
Each line is stored as follows:

| Bytes | Format | Meaning |
|:-----:|:-------|:--------|
| 2	       | Unsigned 16-bit little-endian integer.	| Memory location of the line following the current one. This is used internally by GW-BASIC but ignored when a program is loaded.|
| 2	       | Unsigned 16-bit little-endian integer. | The line number.|
| Variable | Tokenised BASIC, see below. | The contents of the line.|
| 1	       | 00 (NUL byte) | End of line marker.|

## End of file marker
An `1A` is written to mark the end of file. This is optional; the file will be read without problems if it is omitted.