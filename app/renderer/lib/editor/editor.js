var editorNum =1;
var path = require('path');
function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, '/');
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
        pathName = '/' + pathName;
    }
    return encodeURI('file://' + pathName);
}
amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, './lib/monaco-editor/min'))
});

var Monaco;
amdRequire(['vs/editor/editor.main'], function() {
    Monaco = monaco;
    
    Monaco.languages.register({ id: 'gb' });

    Monaco.languages.setMonarchTokensProvider('gb', {
        defaultToken: "",
        tokenPostfix: ".gb",
        ignoreCase: !0,
        brackets: [{
            token: "delimiter.array",
            open: "[",
            close: "]"
        }, {
            token: "delimiter.parenthesis",
            open: "(",
            close: ")"
        }, {
            token: "delimiter.unknown",
            open: "{",
            close: "}"
        }
        ],
        operatorsKeywords:[
            "OR", "AND", "NOT", "XOR", "EQV", "IMP", "MOD"
        ],

        functions:
        ["ABS", "ASC", "ATN", "CDBL", "CHR", "CINT", "COS", "CSNG", "CVI", "CVS", "CVD", "DATE",
            "ENVIRON", "EOF", "EXP", "EXTERR", "FIX", "FRE", "HEX", "INP", "INPUT", "INSTR", "INT",
            "LEFT", "LEN", "LOC", "LOF", "LOG", "LPOS", "MID", "MKI", "MKS", "MKD", "OCT", "PEEK", "PEN",
            "PLAY", "PMAP", "POINT", "POS", "RIGHT", "RND", "SGN", "SIN", "SPACE", "SPC", "SQR", "STICK", "STRIG",
            "STRING", "STR", "TAB", "TAN", "TIMER", "USR", "VAL", "VARPTR", "VARPTR"
        ],
        IDEKeywords:[
            "AUTO", "CHAIN", "COMMON", "DELETE", "EDIT", "LIST", "LLIST", "LOAD", "MERGE", "NEW", "RENUM",
            "RUN", "SAVE", "TRON", "TROFF", "SYSTEM"
        ],
        keywords:
        ["BEEP", "CALL", "CIRCLE", "CLOSE", "CLS", "COLOR", "COM", "DATA", "DEF FN", "DATE",
            "DEFDBL", "DEFSTR", "DEFINT", "DEFSNG", "DEF SEG", "DEF USR", "DIM", "DRAW", "END", "ENVIRON",
            "ERASE", "ERROR", "FIELD", "GET", "GOSUB", "GOTO", "IF", "THEN", "ELSE",
            "INPUT", "IOCTL", "KEY", "LCOPY", "LET", "LINE", "LOCATE", "LOCK", "USING",
            "LPRINT", "RSET", "LSET", "MID", "OPEN", "OPTION BASE", "OUT", "PAINT", "PALETTE",
            "PALETTE USING", "PEN", "PLAY", "POKE", "PRESET", "PSET", "PRINT", "PRINT",
            "PRINT USING", "PUT", "RANDOMIZE", "READ", "REM", "to", "step", "RESTORE", "RESUME", "RETURN", "SHELL", "SOUND",
            "STRIG", "SWAP", "TIME", "OPEN \"COM(", "UNLOCK", "VIEW", "VIEW PRINT", "WAIT", "WIDTH", "WINDOW",
            "WRITE", "WRITE", "FOR", "NEXT", "ElSE", "WHILE", "WEND", "IF", "THEN", "SCREEN",

            "CLEAR", "CONT", "CHDIR", "BLOAD", "FILES", "KILL", "MKDIR", "NAME", "PCOPY", "RESET", "RMDIR",

            "CSRLIN", "DATE", "ERDEV", "ERDEV", "ERL", "ERR", "INKEY", "TIME",

            "ON TIMER", "ON STRIG", "ON PLAY", "ON PEN", "ON KEY", "ON COM", "ON ERROR GOTO "
        ],
        tagwords: [],
        TypeKeywords:/[%]|[$]|[#]|[!]/,
        operators:/[\^]|[\*]|[/]|[\\]|[+]|[-]|[=]|[<>]|[><]|[<]|[>]|[<=]|[=<]|[>=]|[=>]/,
        symbols: /[=><!~?;\.,:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        integersuffix: /U?[DI%L&S@]?/,
        floatsuffix: /[R#F!]?/,
        tokenizer: {
            root: [
                {
                    include: "@whitespace"
                },
                [/^(| )+[0-9]+/, "LineNums"],
                [/next(?!\w)/, {
                    token: "keyword.tag-for",
                    bracket: "@close"
                }],
                [/loop(?!\w)/, {
                    token: "keyword.tag-do",
                    bracket: "@close"
                }],
                [/end\s+(?!for)([a-zA-Z_]\w*)/, {
                    token: "keyword.tag-$1",
                    bracket: "@close"
                }],
                [/[a-zA-Z_]\w*/, {
                    cases: {
                        "@tagwords": {
                            token: "keyword.tag-$0",
                            bracket: "@open"
                        },
                        "@keywords": {
                            token: "keyword.$0"
                        },
                        "@operatorsKeywords": "operators",
                        "@functions": "functions",
                        "@IDEKeywords": "error-token",
                        "@default": "identifier"
                    }
                }],
                [/^\s*#\w+/, "keyword"],
                [/@TypeKeywords/, "TypeKeywords" ],
                [/@operators/, "operators" ],
                [/\d*\d+e([\-+]?\d+)?(@floatsuffix)/, "number.float"],
                [/\d*\.\d+(e[\-+]?\d+)?(@floatsuffix)/, "number.float"],
                [/&H[0-9a-f]+(@integersuffix)/, "number.hex"],
                [/&o[0-7]+(@integersuffix)/, "number.octal"],
                [/\d+(@integersuffix)/, "number"],
                [/#.*#/, "number"],
                [/[{}()\[\]]/, "@brackets"],
                [/@symbols/, "delimiter"],
                [/"([^"\\]|\\.)*$/, "string.invalid"],
                [/"/, "string", "@string"],
            ],
            whitespace: [
                [/[ \t\r\n]+/, ""],
                [/(\'|REM(?!\w)).*$/, "comment"]
            ],
            string: [
                [/[^\\"]+/, "string"],
                [/@escapes/, "string.escape"],
                [/\\./, "string.escape.invalid"],
                [/"C?/, "string", "@pop"]
            ]
        }
    })
})

function InitializeEditor(id, grammer = 'gb'){
    var editor = Monaco.editor.create(document.getElementById(id), {
        language: grammer,
        theme: 'vs',
        automaticLayout: true
    });
}

function addEditorTab(id, text=""){
    main_tabber.addTab(id, text)
    main_tabber.tabs(id).setActive();
    main_tabber.tabs(id).attachHTMLString(`<div id="${id}"></div>`)
    InitializeEditor(id);
}