function gbFunctions() {
    return [
        {
            label: 'ABS',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'ABS({{x}})',
            detail: "",
            documentation: 'Returns the absolute value of x',
            paramenterHint: "fsdfsd"
        }, {
            label: 'ASC',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'ASC({{char}})',
            detail: "",
            documentation: 'Returns the code point (ASCII value) for the first character of char.'
        }, {
            label: 'ATN',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'ATN({{x}})',
            detail: "",
            documentation: 'Returns the inverse tangent of x.'
        }, {
            label: 'CDBL',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'CDBL({{x}})',
            detail: "",
            documentation: 'Converts the numeric expression x to a double-precision value.'
        }, {
            label: 'CHR$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'CHR$({{x}})',
            detail: "",
            documentation: 'Returns the character with code point x.'
        }, {
            label: 'CINT',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'CINT({{x}})',
            detail: "",
            documentation: 'Converts the numeric expression x to a signed integer.'
        }, {
            label: 'COS',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'CINT({{angle}})',
            detail: "",
            documentation: 'Returns the cosine of angle.'
        }, {
            label: 'CSNG',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'CSNG({{x}})',
            detail: "",
            documentation: 'Converts the numeric expression x to a single-precision value.'
        }, {
            label: 'CSRLIN',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'CSRLIN',
            detail: "",
            documentation: 'Returns the screen row of the cursor on the active page.'
        }, {
            label: 'CVI',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'CVI({{s}})',
            detail: "",
            documentation: 'Converts a two-byte string to a signed integer.'
        }, {
            label: 'CVS',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'CVS({{s}})',
            detail: "",
            documentation: 'Converts a four-byte string to a single-precision floating-point number.'
        }, {
            label: 'CVD',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'CVD({{s}})',
            detail: "",
            documentation: 'Converts a eight-byte string to a single-precision floating-point number.'
        }, {
            label: 'ENVIRON$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'ENVIRON$({{x}})',
            detail: "",
            documentation: 'Returns an environment variable.'
        }, {
            label: 'EOF',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'EOF({{file_num}})',
            detail: "",
            documentation: 'Returns -1 if file with number file_num has reached end-of-file;'
        }, {
            label: 'ERDEV',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'ERDEV',
            detail: "",
            documentation: 'Returns 0'
        }, {
            label: 'ERDEV$',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'ERDEV$',
            detail: "",
            documentation: 'Returns the empty string.'
        }, {
            label: 'ERL',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'ERL',
            detail: "",
            documentation: 'Returns the line number where the last error was raised.'
        }, {
            label: 'ERR',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'ERR',
            detail: "",
            documentation: 'Returns the number of the last error.'
        }, {
            label: 'EXP',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'EXP({{x}})',
            detail: "",
            documentation: 'Returns the exponential of x.'
        }, {
            label: 'EXTERR',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'EXTERR({{x}})',
            detail: "",
            documentation: 'Returns 0.'
        }, {
            label: 'FIX',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'FIX({{num}})',
            detail: "",
            documentation: 'Returns number truncated towards zero.'
        }, {
            label: 'FN',
            kind: monaco.languages.CompletionItemKind.ExtensionMethod,
            insertText: 'FN {{name}} ({{args}})',
            detail: "",
            documentation: 'Evaluates the user-defined function previously defined with DEF FN name.'
        }, {
            label: 'FRE',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'FRE({{x}})',
            detail: "",
            documentation: 'Returns the available BASIC memory.'
        }, {
            label: 'HEX$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'HEX$({{x}})',
            detail: "",
            documentation: 'Returns a string with the hexadecimal representation of x.'
        }, {
            label: 'INKEY$',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'INKEY$',
            detail: "",
            documentation: 'Returns one key-press from the keyboard buffer.'
        }, {
            label: 'IMP',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'INP({{port}})',
            detail: "",
            documentation: 'Returns the value of an emulated machine port.'
        }, {
            label: 'INPUT$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'INPUT$({{num_chars}})',
            detail: "",
            documentation: 'Returns a string of num_chars characters from the keyboard.'
        }, {
            label: 'INSTR',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'INSTR({{start}}, {{parent}}, {{child}})',
            detail: "",
            documentation: 'Returns the location of the first occurrence of the substring child in parent.'
        }, {
            label: 'INT',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'INT({{number}})',
            detail: "",
            documentation: 'Returns number truncated towards negative infinity.'
        }, {
            label: 'IOCTL$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'IOCTL$({{file_num}})',
            detail: "Not supported in PcBasic",
            filterText: "pcbasic unsupported",
            documentation: 'In GW-BASIC, IOCTL$ reads the reply to IOCTL from a device.'
        }, {
            label: 'LEFT$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'LEFT$({{parent}}, {{num_chars}})',
            detail: "",
            documentation: 'Returns the leftmost num_chars characters of parent.'
        }, {
            label: 'LOC',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'LOC({{file_num}})',
            detail: "",
            documentation: 'Returns the current location in the file opened under number file_num.'
        }, {
            label: 'LEN',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'LEN({{string}})',
            detail: "",
            documentation: 'Returns the number of characters in string.'
        }, {
            label: 'LOF',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'LOF({{file_num}})',
            detail: "",
            documentation: 'Returns the number of bytes in the file open under file_num.'
        }, {
            label: 'LOG',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'LOG({{x}})',
            detail: "",
            documentation: 'Returns the natural logarithm of x.'
        }, {
            label: 'LPOS',
            kind: monaco.languages.CompletionItemKind.Function,
            detail: "",
            insertText: 'LPOS({{printer_number}})',
            documentation: 'Returns the column position for a printer.'
        }, {
            label: 'MID$ (function)',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'MID$({{string}}, {{position}}, {{length}})',
            detail: "",
            documentation: 'Returns a substring of string starting at position, counting from 1.'
        }, {
            label: 'MKD$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'MKD$({{double}})',
            detail: "",
            documentation: 'Returns the internal 8-byte Microsoft Binary Format representation of a double- precision number.'
        }, {
            label: 'MKI$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'MKI$({{int}})',
            detail: "",
            documentation: 'Returns the internal 2-byte little-endian representation of an integer.'
        }, {
            label: 'MKS$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'MKS$({{single}})',
            detail: "",
            documentation: 'Returns the internal 8-byte Microsoft Binary Format representation of a single- precision number.'
        }, {
            label: 'OCT$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'OCT$({{x}})',
            detail: "",
            documentation: 'Returns a string with the octal representation of x.'
        }, {
            label: 'PEEK',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'PEEK({{address}})',
            detail: "",
            documentation: 'Returns the value of the memory at segment * 16 + address where segment is the current segment set with DEF SEG.'
        }, {
            label: 'PEN',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'PEN({{mode}})',
            detail: "",
            documentation: 'Reads the light pen.'
        }, {
            label: 'PLAY (function)',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'PLAY({{voice}})',
            detail: "",
            documentation: 'Returns the number of notes in the background music queue.'
        }, {
            label: 'PMAP',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'PMAP({{original_coord}}, {{fn}})',
            detail: "",
            documentation: 'Maps between viewport and logical (WINDOW) coordinates.'
        }, {
            label: 'POINT (current coordinate)',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'POINT({{fn}})',
            detail: "",
            documentation: 'Returns a currently active coordinate of the graphics screen.'
        }, {
            label: 'POINT (pixel attribute)',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'POINT({{x}}, {{y}})',
            detail: "",
            documentation: 'Returns the attribute of the pixel at logical coordinate x,y.'
        }, {
            label: 'POS',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'POS({{dummy}})',
            detail: "",
            documentation: 'Returns the current cursor column position, in the range [1—80].'
        }, {
            label: 'RIGHT$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'RIGHT$({{parent}}, {{num_chars}})',
            detail: "",
            documentation: 'Returns the rightmost num_chars characters of parent.'
        }, {
            label: 'RND',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'RND({{x}})',
            detail: "",
            documentation: 'Returns a pseudorandom number in the interval [0—1].'
        }, {
            label: 'SCREEN (function)',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'SCREEN({{row}}, {{column}}, {{fn}})',
            detail: "",
            documentation: 'Returns the code point or colour attribute for the character at position row, col.'
        }, {
            label: 'SGN',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'SGN({{number}})',
            detail: "",
            documentation: 'Returns the sign of number.'
        }, {
            label: 'SIN',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'SIN({{angle}})',
            detail: "",
            documentation: 'Returns the sine of angle.'
        }, {
            label: 'SPACE$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'SPACE$({{number}})',
            detail: "",
            documentation: 'Returns a string of number spaces.'
        }, {
            label: 'SQR',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'SQR({{number}})',
            detail: "",
            documentation: 'Returns the square root of number.'
        }, {
            label: 'STICK',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'STICK({{axis}})',
            detail: "",
            documentation: 'Returns a coordinate of a joystick axis.'
        }, {
            label: 'STR$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'STR$({{number}})',
            detail: "",
            documentation: 'Returns the string representation of number.'
        }, {
            label: 'STRIG (function)',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'STRIG({{mode}})',
            detail: "",
            documentation: 'Returns the status of the joystick trigger buttons.'
        }, {
            label: 'STRING$',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'STRING$({{lenght}}, {{char}})',
            detail: "",
            documentation: 'Returns a string of length times character char.'
        }, {
            label: 'TAN',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'TAN({{angle}})',
            detail: "",
            documentation: 'Returns the tangent of angle.'
        }, {
            label: 'TIME$',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'TIME$',
            detail: "",
            documentation: 'Returns the current BASIC time in the form "HH:mm:ss".'
        }, {
            label: 'TIMER',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'TIMER',
            detail: "",
            documentation: 'Returns the number of seconds since midnight on the internal BASIC clock.'
        }, {
            label: 'USR',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'USR{{n}}({{expr}})',
            detail: "",
            documentation: 'Returns Zero.'
        }, {
            label: 'VAL',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'VAL({{string}})',
            detail: "",
            documentation: 'Returns the numeric value of the string expression string.'
        }, {
            label: 'VARPTR',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'VARPTR({{name}})',
            detail: "",
            documentation: 'Returns the memory address of variable name or of the File Control Block of file number file_num.'
        }, {
            label: 'VARPTR$',
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: 'VARPTR$({{name}})',
            detail: "",
            documentation: 'Returns the memory address of variable name.'
        }
    ]
}
function beepSwitches() {
    return [
        {
            label: 'ON',
            kind: monaco.languages.CompletionItemKind.Property,
            documentation: 'Turn the Beeps ON.',
            insertText: 'ON'
        }, {
            label: 'OFF',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'OFF',
            documentation: 'Turn the Beeps OFF.'
        }
    ]
}

function gbAutoCompletion() {
    return [
        //Statement
        {
            label: 'BEEP',
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: 'Beep the speaker at 800Hz for 0.25s',
            detail: "",
            insertText: 'BEEP '
        }, {
            label: 'BEEP (switch)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'BEEP {{ON_OFF}}',
            detail: "",
            documentation: 'This statement has no effect.\n Only legal with the syntax={pcjr|tandy} option'
        }, {
            label: 'BLOAD',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'BLOAD {{file_spec}}, {{offset}}',
            detail: "",
            documentation: 'Loads a memory image file into memory.'
        }, {
            label: 'BSAVE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'BSAVE {{file_spec}}, {{offset}}, {{lenght}}',
            detail: "",
            documentation: 'Saves a region of memory to an image file.'
        }, {
            label: 'CALL',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CALL {{address_var}} [( {{ps}} )]',
            detail: "Not supported in PcBasic",
            filterText: "pcbasic unsupported",
            documentation: 'In GW-BASIC, CALL executes a machine language subroutine. This statement is not implemented in PC-BASIC.'
        }, {
            label: 'CALLS',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CALLS {{address_var}} [( {{ps}} )]',
            detail: "Not supported in PcBasic",
            filterText: "pcbasic unsupported",
            documentation: 'In GW-BASIC, CALLS executes a FORTRAN subroutine. This statement is not implemented in PC-BASIC.'
        }, {
            label: 'CHAIN',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CHAIN',
            detail: "",
            documentation: 'Loads a program from file into memory and runs it, optionally transferring variables.'
        }, {
            label: 'CHDIR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CHDIR {{dir_spec}}',
            detail: "",
            documentation: 'Change the current directory on a disk device to dir_spec.'
        }, {
            label: 'CIRCLE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CIRCLE {{step}} ({{x}}, {{y}}), {{radius}}, {{colour}}, {{start}}, {{end}}, {{aspect}}',
            detail: "",
            documentation: 'Draw an ellipse or ellipse sector.'
        }, {
            label: 'CLEAR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CLEAR {{expr}}, {{mem_limit}}, {{stack_size}}, {{video_memory}}',
            detail: "",
            documentation: 'Draw an ellipse or ellipse sector.'
        }, {
            label: 'CLOSE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CLOSE {{#}} {{file_0}}',
            detail: "",
            documentation: 'Closes files. If no file numbers are specified, all open files are closed. The hash (#) is optional and has no effect.'
        }, {
            label: 'CLS',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CLS {{x}}',
            detail: "",
            documentation: 'Clears the screen or part of it.'
        }, {
            label: 'COLOR (text mode)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'COLOR {{foreground}}, {{background}}, {{border}}',
            detail: "",
            documentation: 'Changes the current foreground and background attributes.'
        }, {
            label: 'COLOR (SCREEN 1)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'COLOR {{palette_0}}, {{palette}}, {{override}}',
            detail: "",
            documentation: 'Assigns new colours to the palette of attributes.'
        }, {
            label: 'COLOR (SCREEN 3-9)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'COLOR {{foreground}}, {{palette_0}}, {{dummy}}',
            detail: "",
            documentation: 'Changes the current foreground attribute and the colour for attribute 0.'
        }, {
            label: 'COMMON',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'COMMON {{var_0}}',
            detail: "",
            documentation: 'Specifies variables to be passed as common variables to the program called with CHAIN.'
        }, {
            label: 'COM',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'COM({{port}}) {{ON|OFF|STOP}}',
            detail: "",
            documentation: 'Enable or disable trapping of communications activity to the specified communications adapter.'
        }, {
            label: 'CONT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'CONT',
            detail: "",
            documentation: 'Resumes execution of a program.'
        }, {
            label: 'DATA',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DATA {{const_0}}',
            detail: "",
            documentation: 'Specifies data that can be read by a READ statement.'
        }, {
            label: 'DATE$ (statement)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DATE$ = {{date}}',
            detail: "",
            documentation: 'Sets the system date.'
        }, {
            label: 'DEF FN',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DEF FN {{name}} {{args}} = {{expression}}',
            detail: "",
            documentation: 'Defines a function.'
        }, {
            label: 'DATE$ (function)',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'DATE$',
            detail: "",
            documentation: 'Returns the system date as a string in the format "mm-dd-yyyy".'
        }, {
            label: 'DEFDBL',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DEFDBL{{first_0}} - {{last_0}}',
            detail: "",
            documentation: 'Sets the type that is assumed if no sigil is specified when a variable name is used. The statement sets the default type for variables starting with a letter from the ranges specified.'
        }, {
            label: 'DEFINT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DEFINT {{first_0}} - {{last_0}}',
            detail: "",
            documentation: 'Sets the type that is assumed if no sigil is specified when a variable name is used. The statement sets the default type for variables starting with a letter from the ranges specified.'
        }, {
            label: 'DEFSTR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DEFSTR {{first_0}} - {{last_0}}',
            detail: "",
            documentation: 'Sets the type that is assumed if no sigil is specified when a variable name is used. The statement sets the default type for variables starting with a letter from the ranges specified.'
        }, {
            label: 'DEFSNG',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DEFSNG {{first_0}} - {{last_0}}',
            detail: "",
            documentation: 'Sets the type that is assumed if no sigil is specified when a variable name is used. The statement sets the default type for variables starting with a letter from the ranges specified.'
        }, {
            label: 'DEF SEG',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DEF SEG = {{address}}',
            detail: "",
            documentation: 'Sets the memory segment to be used by BLOAD, BSAVE, CALL, PEEK, POKE, and USR.'
        }, {
            label: 'DEF USR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DEF USR[n] = {{address}}',
            detail: "Not supported in PcBasic",
            filterText: "pcbasic unsupported",
            documentation: 'In GW-BASIC, this statement sets the starting address of an assembly-language function. This statement is not implemented in PC-BASIC.'
        }, {
            label: 'DIM',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DIM {{name}} ({{limits}})',
            detail: "",
            documentation: 'Allocates memory for arrays.'
        }, {
            label: 'DRAW',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'DRAW "{{gml_string}}"',
            detail: "",
            documentation: 'Draws the shape specified by gml_string, a string expression in Graphics Macro Language (GML).'
        }, {
            label: 'END',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'END',
            detail: "",
            documentation: 'Closes all files, stops program execution and returns control to the user.'
        }, {
            label: 'ELSE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'ELSE',
            detail: "",
            documentation: ''
        }, {
            label: 'ENVIRON',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'ENVIRON "{{command_string}}"',
            detail: "",
            documentation: 'Sets a shell environment variable.'
        }, {
            label: 'ERASE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'ERASE {{arrays}}',
            detail: "",
            documentation: 'De-allocates arrays.'
        }, {
            label: 'ERROR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'ERROR {{error_number}}',
            detail: "",
            documentation: 'Raises the error with number error_number'
        }, {
            label: 'FIELD',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'FIELD # {{file_number}}, {{width_0}} AS {{name_0}}',
            detail: "",
            documentation: 'Assigns variables to the random-access record buffer.'
        }, {
            label: 'FILES',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'FILES {{filter_spec}}',
            detail: "",
            documentation: 'Displays the files fitting the specified filter in the specified directory on a disk device.'
        }, {
            label: 'FOR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'FOR {{loop_var}} = {{start}} TO {{stop}} STEP {{step}}',
            detail: "",
            documentation: 'Displays the files fitting the specified filter in the specified directory on a disk device.'
        }, {
            label: 'GET (files)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'GET # {{file_number}}, {{record_number}}',
            detail: "",
            documentation: 'Read a record from the random-access file file_number at position record_number.'
        }, {
            label: 'GET (communications)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'GET # {{com_file_number}}, {{number_bytes}}',
            detail: "",
            documentation: 'Read number_bytes bytes from the communications buffer opened under file number com_file_number'
        }, {
            label: 'GET (graphics)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'GET ({{x0}}, {{y0}}) - {{STEP}} ({{x1}}, {{y1}}), {{array_name}}',
            detail: "",
            documentation: 'Stores a rectangular area of the graphics screen in an array.'
        }, {
            label: 'GOSUB',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'GOSUB {{line_number}}',
            detail: "",
            documentation: 'Jumps to a subroutine at line_number'
        }, {
            label: 'GOTO',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'GOTO {{line_number}}',
            detail: "",
            documentation: 'Jumps to line_number.'
        }, {
            label: 'IF-THEN-ELSE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'IF {{truth_value}}, THEN {{compound_statement_true}} ELSE {{compound_statement_false}}',
        }, {
            label: 'IF-GOTO-ELSE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'IF {{truth_value}}, GOTO {{line_num_true}} ELSE {{line_num_false}}',
        }, {
            label: 'INPUT (console)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'INPUT {{prompt}}; {{vars}}',
            detail: "",
            documentation: 'Prints prompt to the screen and waits for the user to input values for the specified variables.'
        }, {
            label: 'INPUT (files)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'INPUT # {{file_num}}, {{vars}}',
            detail: "",
            documentation: 'Reads string or numeric variables from a text file or the FIELD buffer of a random access file.'
        }, {
            label: 'IOCTL',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'IOCTL # {{file_num}}, {{control_string}}',
            detail: "Not supported in PcBasic",
            filterText: "pcbasic unsupported",
            documentation: 'In GW-BASIC, IOCTL sends a control string to a device. This statement is not implemented in PC-BASIC.'
        }, {
            label: 'KEY (macro list)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'KEY {{ON|OFF|LIST}}',
            detail: "",
            documentation: 'Turns the list of function-key macros on the bottom of the screen ON or OFF'
        }, {
            label: 'KEY (macro definition)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'KEY {{key_id}}, {{string_value}}',
            detail: "",
            documentation: 'Defines the string macro for function key key_id.'
        }, {
            label: 'KEY (event switch)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'KEY ({{key_id}}) {{ON|OFF|STOP}}',
            detail: "",
            documentation: 'Controls event trapping of the key with identifier key_id.'
        }, {
            label: 'KEY (event definition)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'KEY {{key_id}}, {{two_char_string}}',
            detail: "",
            documentation: 'Defines the key to trap for key_id.'
        }, {
            label: 'KILL',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'KILL {{file_spec}}',
            detail: "",
            documentation: 'Deletes a file on a disk device.'
        }, {
            label: 'LCOPY',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'LCOPY {{num}}',
            detail: "Not supported in PcBasic",
            filterText: "pcbasic unsupported",
            documentation: 'This statement does nothing in GW-BASIC.'
        }, {
            label: 'LET',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'LET {{name}} = {{expression}}',
            detail: "",
            documentation: 'Assigns the value of expression to the variable or array element name.'
        }, {
            label: 'LINE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'LINE {{STEP}} ({{x0}}, {{y0}}) - {{STEP}} ({{x1}}, {{y1}}), {{attr}}, {{B}} {{F}}, {{pattern}}',
            documentation: 'Draws a line or a box in graphics mode.'
        }, {
            label: 'LINE INPUT (console)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'LINE INPUT {{prompt_literal}}, {{string_name}}',
            documentation: 'Displays the prompt given in prompt_literal and reads user input from the keyboard, storing it into the variable string_name.'
        }, {
            label: 'LINE INPUT (files)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'LINE INPUT # {{file_num}}, {{string_name}}',
            documentation: 'Reads string or numeric variables from a text file or the FIELD buffer of a random access file.'
        }, {
            label: 'LOCATE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'LOCATE {{row}}, {{col}}, {{cursor_visible}}, {{start_line}}, {{stop_line}}',
            documentation: 'Positions the cursor at row, col on the screen.'
        }, {
            label: 'LOCK',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'LOCK # {{file_number}}, {{record_0}}',
            documentation: 'Locks a file or part of a file against access by other users.'
        }, {
            label: 'LOCK-TO',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'LOCK # {{file_number}}, {{record_0}} TO {{record_1}}',
            documentation: 'Locks a file or part of a file against access by other users.'
        }, {
            label: 'LPRINT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'LPRINT {{expression}}',
            documentation: 'Print data at the line printer.'
        }, {
            label: 'LPRINT USING',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'LPRINT {{expression}} USING {{format}}',
            documentation: 'Print data at the line printer.'
        }, {
            label: 'LSET',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'LSET {{string_name}} = {{expression}}',
            detail: "",
            documentation: 'Copies a string value into an existing string variable or array element.'
        }, {
            label: 'RSET',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'RSET {{string_name}} = {{expression}}',
            documentation: 'Copies a string value into an existing string variable or array element.'
        }, {
            label: 'MID$ (statement)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'MID$ ({{string_name}}, {{position}}, {{length}}) = {{substring}}',
            documentation: 'Copies a string value into an existing string variable or array element.'
        }, {
            label: 'MKDIR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'MKDIR {{dir_spec}}',
            documentation: 'Creates a new directory on a disk device.'
        }, {
            label: 'MOTOR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "Not supported in PcBasic",
            insertText: 'MOTOR {{num}}',
            filterText: "pcbasic unsupported",
            documentation: 'In GW-BASIC, this statement turns on the cassette motor if num is nonzero or omitted, and turns it off if num is zero. This is not implemented in PC-BASIC.'
        }, {
            label: 'NAME',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'NAME {{old_name}} AS {{new_name}}',
            documentation: 'Renames the disk file old_name into new_name.'
        }, {
            label: 'NEXT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'NEXT {{vars}}',
            documentation: 'Iterates a FOR—NEXT loop'
        }, {
            label: 'NOISE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'NOISE {{source}}, {{volume}}, {{duration}}',
            documentation: 'Generates various kinds of noise.'
        }, {
            label: 'ON-GOTO',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON {{n}} GOTO {{line_numbers}}',
            documentation: 'Jumps to the nth line number specified in the list.'
        }, {
            label: 'ON-GOSUB',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON {{n}} GOSUB {{line_numbers}}',
            documentation: 'Jumps to the nth line number specified in the list.'
        }, {
            label: 'ON-COM',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON COM({{n}}) GOSUB {{line_numbers}}',
            documentation: 'Defines an event trapping subroutine.'
        }, {
            label: 'ON-KEY',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON KEY({{n}}) GOSUB {{line_numbers}}',
            documentation: 'Defines an event trapping subroutine.'
        }, {
            label: 'ON-STRIG',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON STRIG({{n}}) GOSUB {{line_numbers}}',
            documentation: 'Defines an event trapping subroutine.'
        }, {
            label: 'ON-PEN',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON PEN GOSUB {{line_numbers}}',
            documentation: 'Defines an event trapping subroutine.'
        }, {
            label: 'ON-PLAY',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON PLAY({{n}}) GOSUB {{line_numbers}}',
            documentation: 'Defines an event trapping subroutine.'
        }, {
            label: 'ON-TIMER',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON TIMER({{n}}) GOSUB {{line_numbers}}',
            documentation: 'Defines an event trapping subroutine.'
        }, {
            label: 'ON-ERROR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'ON ERROR GOTO {{line_numbers}}',
            documentation: 'Turns error trapping on or off'
        }, {
            label: 'OPEN',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'OPEN {{mode_char}}, # {{file_num}}, {{file_spec}}, {{rec_len}}',
            documentation: 'Opens a data file on a device.'
        }, {
            label: 'OPTION BASE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'OPTION BASE {{n}}',
            documentation: 'Sets the starting index of all arrays to n.'
        }, {
            label: 'OUT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'OUT {{port}}, {{value}}',
            documentation: 'Sends a byte to an emulated machine port.'
        }, {
            label: 'PAINT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PAINT {{STEP}} ({{x}}, {{y}}), {{attrib}}, {{border}}, {{background}}',
            documentation: 'Flood-fills the screen with a colour or pattern, starting from the given seed point.'
        }, {
            label: 'PALETTE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'PALETTE {{attrib}}, {{colour}}',
            detail: "",
            documentation: 'Assigns a colour to an attribute.'
        }, {
            label: 'PALETTE USING',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PALETTE USING {{int_array_name}} [ {{start_index}} ]',
            documentation: 'Assigns new colours to all attributes.'
        }, {
            label: 'PCOPY',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PCOPY {{src}}, {{dst}}',
            documentation: 'Copies the screen page src to dst.'
        }, {
            label: 'PEN',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PEN {{on,off_or_stop}}',
            documentation: 'Controls event trapping and read access of the light pen'
        }, {
            label: 'PLAY (event switch)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PLAY {{on,off_or_stop}}',
            documentation: 'Controls event trapping of the music queue.'
        }, {
            label: 'PLAY (music statement)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PLAY {{mml_string_0}}, {{mml_string_1}}, {{mml_string_2}}',
            documentation: 'Plays the tune defined by the Music Macro Language strings'
        }, {
            label: 'POKE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'POKE {{address}}, {{value}}',
            documentation: 'Sets the value of the memory byte at segment * 16 + address to value.'
        }, {
            label: 'PSET',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PSET {{STEP}} ({{x}}, {{y}}), {{attrib}}',
            documentation: 'Change the attribute of a pixel on the screen at position (x, y).'
        }, {
            label: 'PRESET',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PRESET {{STEP}} ({{x}}, {{y}}), {{attrib}}',
            documentation: 'Change the attribute of a pixel on the screen at position (x, y).'
        }, {
            label: 'PRINT (console)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PRINT {{expression}}',
            documentation: 'Writes expressions to the screen'
        }, {
            label: 'PRINT USING (console)',
            detail: "",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'PRINT {{expression}} USING {{formate}}',
            documentation: 'Writes expressions to the screen'
        }, {
            label: 'PRINT (file)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PRINT # {{file_num}}, {{expression}}',
            documentation: 'Writes expressions to the screen'
        }, {
            label: 'PRINT USING (file)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PRINT # {{file_num}}, {{expression}} USING {{formate}}',
            documentation: 'Writes expressions to the screen'
        }, {
            label: 'PUT (files)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PUT # {{file_number}}, {{record_number}}',
            documentation: 'Writes a record to the random-access file file_number at position record_number.'
        }, {
            label: 'PUT (communications)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PUT # {{com_file_number}}, {{number_bytes}}',
            documentation: 'Writes number_bytes bytes to the communications buffer opened under file number com_file_number.'
        }, {
            label: 'PUT (graphics)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'PUT ({{x0}}, {{y0}}), {{array_name}}, {{PSET,PRESET,AND,OR_or_XOR}}',
            documentation: 'Displays an array to a rectangular area of the graphics screen.'
        }, {
            label: 'RANDOMIZE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'RANDOMIZE {{expression}}',
            documentation: 'Seeds the random number generator with expr.'
        }, {
            label: 'READ',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'READ {{vars}}',
            documentation: 'Assigns data from a DATA statement to variables.'
        }, {
            label: 'REM',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'REM {{comment}}',
            documentation: 'gnores everything until the end of the line.'
        }, {
            label: 'RESET',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'RESET',
            documentation: 'Closes all open files.'
        }, {
            label: 'RESTORE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'RESTORE {{line}}',
            documentation: 'Resets the DATA pointer.'
        }, {
            label: 'RESUME',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'RESUME {{0_NEXT_line}}',
            documentation: 'Continues normal execution after an error handling routine.'
        }, {
            label: 'RETURN',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'RETURN',
            documentation: 'Returns from a GOSUB subroutine.'
        }, {
            label: 'RMDIR',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'RMDIR {{dir_spec}}',
            documentation: 'Removes an empty directory on a disk device.'
        }, {
            label: 'SCREEN (statement)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'SCREEN {{mode}}, {{colorburst}}, {{apage}}, {{vpage}}, {{erase}}',
            documentation: 'Change the video mode, composite colorburst, active page and visible page.'
        }, {
            label: 'SHELL',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'SHELL {{command}}',
            documentation: 'Starts a subshell on the console.'
        }, {
            label: 'SOUND (tone)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'SOUND {{frequency}}, {{duration}}, {{volume}}, {{voice}}',
            documentation: 'Produces a sound at frequency Hz for duration/18.2 seconds.'
        }, {
            label: 'SOUND (switch)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'SOUND {{ON_OFF}}',
            documentation: 'Toggles the availability of advanced sound capabilities on PCjr and Tandy.'
        }, {
            label: 'STOP',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'STOP',
            documentation: 'Breaks program execution.'
        }, {
            label: 'STRIG (switch)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'STRIG {{ON_OFF}}',
            documentation: 'Has no effect.'
        }, {
            label: 'STRIG (event switch)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'STRIG({{button}}) {{ON_OFF_STOP}',
            documentation: 'Has no effect.'
        }, {
            label: 'SWAP',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'SWAP {{var_0}}, {{var_1}}',
            documentation: 'Exchanges variables var_0 and var_1.'
        }, {
            label: 'TERM',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'TERM',
            documentation: 'Load and run the program defined by the pcjr-term option.'
        }, {
            label: 'TIME$ (statement)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'TIME$ = {{time}}',
            documentation: 'Sets the current BASIC time to time.'
        }, {
            label: 'TIMER (statement)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'TIMER {{ON_OFF_STOP}}',
            documentation: 'Event trapping of the timer clock.'
        }, {
            label: 'UNLOCK',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'UNLOCK # {{file_number}}, {{record_0}}',
            documentation: 'Unlocks a file or part of it that has previously been locked with LOCK.'
        }, {
            label: 'UNLOCK-TO',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'UNLOCK # {{file_number}}, {{record_0}} TO {{record_1}}',
            documentation: 'Unlocks a file or part of it that has previously been locked with LOCK.'
        }, {
            label: 'VIEW',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'VIEW {{SCREEN}} ({{x0}}, {{y0}})-({{x1}}, {{y1}}), {{fill}}, {{border}}',
            documentation: 'Defines a graphics viewport.'
        }, {
            label: 'VIEW PRINT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'VIEW PRINT {{top_row}} TO {{bottom_row}}',
            documentation: 'Defines the text scrolling area of the screen.'
        }, {
            label: 'WAIT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'WAIT {{port}}, {{and_mask}}, {{xor_mask}}',
            documentation: 'Waits for the value of (INP(port) XOR xor_mask) AND and_mask to become nonzero.'
        }, {
            label: 'WEND',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'WEND',
            documentation: 'Iterates a WHILE—WEND loop.'
        }, {
            label: 'WHILE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'WHILE {{expr}}',
            documentation: 'Initiates a WHILE—WEND loop.'
        }, {
            label: 'WIDTH (console)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'WIDTH {{num_columns}}, {{num_rows}}',
            documentation: 'Sets the screen width to 20, 40 or 80 columns.'
        }, {
            label: 'WIDTH (devices and files)',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'WIDTH # {{file_num}} {{num_columns}}',
            documentation: 'Sets the line width for a file or a device.'
        }, {
            label: 'WINDOW',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'WINDOW {{SCREEN}} ({{x0}}, {{y0}})-({{x1}}, {{y1}})]',
            documentation: 'Define logical coordinates for the viewport.'
        }, {
            label: 'WRITE',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "",
            insertText: 'WRITE # {{file_num}}, {{exprs}}',
            documentation: 'Writes values to a file or the screen in machine-readable form.'
        }
    ]
}

const fs = window.top.require('fs');
if(fs){
    path = './json/Detail.json';
    fs.stat(path, function (err, stats) {
        if (err) {
            alert(err);
        }
    })
    json = fs.readFileSync(path, "utf8");
    obj = JSON.parse(json);
}
function getHoverInfo(word) {
    if (obj[word]) {
        return {
            range: new monaco.Range(1, 1, 1, 1),
            contents: [
                '**' + (obj[word])[3].type + ':**',
                { language: '', value: "  " + (obj[word])[0].documentation },
                '**Syntax:**',
                { language: 'gb', value: "  " + (obj[word])[1].Syntax },
                '**Parameters:**',
                { language: '', value: "  " + (obj[word])[2].Parameters },
            ]
        }
    }
    else {
        return null;
    }
}
