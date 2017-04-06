export const octalDigits: number[] = [
    "0".charCodeAt(0),
    "1".charCodeAt(0),
    "2".charCodeAt(0),
    "3".charCodeAt(0),
    "4".charCodeAt(0),
    "5".charCodeAt(0),
    "6".charCodeAt(0),
    "7".charCodeAt(0)
]

export const decimalDigits: number[] = [
    "8".charCodeAt(0),
    "9".charCodeAt(0),
].concat(octalDigits)

export const hexaDigits: number[] = [
    "A".charCodeAt(0), "a".charCodeAt(0),
    "B".charCodeAt(0), "b".charCodeAt(0),
    "C".charCodeAt(0), "c".charCodeAt(0),
    "D".charCodeAt(0), "d".charCodeAt(0),
    "E".charCodeAt(0), "e".charCodeAt(0),
    "F".charCodeAt(0), "f".charCodeAt(0)
].concat(decimalDigits)

export const operators: number[] = [
    '+'.charCodeAt(0),
    '-'.charCodeAt(0),
    '='.charCodeAt(0),
    '/'.charCodeAt(0),
    '\\'.charCodeAt(0),
    '^'.charCodeAt(0),
    '*'.charCodeAt(0),
    '<'.charCodeAt(0),
    '>'.charCodeAt(0)
]

export const letters: number[] = [
    'A'.charCodeAt(0), 'a'.charCodeAt(0),
    'B'.charCodeAt(0), 'b'.charCodeAt(0),
    'C'.charCodeAt(0), 'c'.charCodeAt(0),
    'D'.charCodeAt(0), 'd'.charCodeAt(0),
    'E'.charCodeAt(0), 'e'.charCodeAt(0),
    'F'.charCodeAt(0), 'f'.charCodeAt(0),
    'G'.charCodeAt(0), 'g'.charCodeAt(0),
    'H'.charCodeAt(0), 'h'.charCodeAt(0),
    'I'.charCodeAt(0), 'i'.charCodeAt(0),
    'J'.charCodeAt(0), 'j'.charCodeAt(0),
    'K'.charCodeAt(0), 'k'.charCodeAt(0),
    'L'.charCodeAt(0), 'l'.charCodeAt(0),
    'M'.charCodeAt(0), 'm'.charCodeAt(0),
    'N'.charCodeAt(0), 'n'.charCodeAt(0),
    'O'.charCodeAt(0), 'o'.charCodeAt(0),
    'P'.charCodeAt(0), 'p'.charCodeAt(0),
    'Q'.charCodeAt(0), 'q'.charCodeAt(0),
    'R'.charCodeAt(0), 'r'.charCodeAt(0),
    'S'.charCodeAt(0), 's'.charCodeAt(0),
    'T'.charCodeAt(0), 't'.charCodeAt(0),
    'U'.charCodeAt(0), 'u'.charCodeAt(0),
    'V'.charCodeAt(0), 'v'.charCodeAt(0),
    'W'.charCodeAt(0), 'w'.charCodeAt(0),
    'X'.charCodeAt(0), 'x'.charCodeAt(0),
    'Y'.charCodeAt(0), 'y'.charCodeAt(0),
    'Z'.charCodeAt(0), 'z'.charCodeAt(0)
]

export const expressionDelimiter : number[] =[
    "(".charCodeAt(0), ")".charCodeAt(0),
    "{".charCodeAt(0), "}".charCodeAt(0),
    "[".charCodeAt(0), "]".charCodeAt(0),
    ",".charCodeAt(0), ";".charCodeAt(0),
]

export const name: number[] = [
    '.'.charCodeAt(0)
].concat(letters).concat(decimalDigits);

export const lineTerminator: number[] = [
    0, -1
]

export const remarkTerminator: number[] = [
    '\n'.charCodeAt(0), 0
]

export const statementTerminators: number[] = [
    ":".charCodeAt(0), "\n".charCodeAt(0)
].concat(lineTerminator);

export const expressionTerminator: number[] = [
    ')'.charCodeAt(0),
    ']'.charCodeAt(0),
    ','.charCodeAt(0),
    ';'.charCodeAt(0)
].concat(lineTerminator)

export const wordTerminator: number[]=[
    " ".charCodeAt(0),
    "!".charCodeAt(0),
    "#".charCodeAt(0),
    "$".charCodeAt(0),
    "%".charCodeAt(0),
].concat(expressionTerminator).concat(operators).concat(statementTerminators);