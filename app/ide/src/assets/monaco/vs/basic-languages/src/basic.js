/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports"], function(require, exports) {
    'use strict';
    exports.conf = {
        comments: {
            lineComment: '\'',
            blockComment: ['/*', '*/'],
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')'],
            ['<', '>'],
            ['while', 'wend'],
            ['for', 'next']
        ],
        autoClosingPairs: [
            { open: '{', close: '}', notIn: ['string', 'comment'] },
            { open: '[', close: ']', notIn: ['string', 'comment'] },
            { open: '(', close: ')', notIn: ['string', 'comment'] },
            { open: '"', close: '"', notIn: ['string', 'comment'] },
            { open: '<', close: '>', notIn: ['string', 'comment'] },
        ]
    };
    exports.language = {
        defaultToken: '',
        tokenPostfix: '.bas',
        ignoreCase: true,
        brackets: [
            { token: 'delimiter.bracket', open: '{', close: '}' },
            { token: 'delimiter.array', open: '[', close: ']' },
            { token: 'delimiter.parenthesis', open: '(', close: ')' },
            { token: 'delimiter.angle', open: '<', close: '>' },
            // Special bracket statement pairs
            // according to https://msdn.microsoft.com/en-us/library/tsw2a11z.aspx
            // Other pairs
            { token: 'keyword.tag-while', open: 'while', close: 'wend' },
            { token: 'keyword.tag-for', open: 'for', close: 'next' }
        ],
        keywords: [
            'AddHandler', 'AddressOf', 'Alias', 'And', 'AndAlso', 'As', 'Async', 'Boolean', 'ByRef', 'Byte', 'ByVal', 'Call',
            'Case', 'Catch', 'CBool', 'CByte', 'CChar', 'CDate', 'CDbl', 'CDec', 'Char', 'CInt', 'Class', 'CLng',
            'CObj', 'Const', 'Continue', 'CSByte', 'CShort', 'CSng', 'CStr', 'CType', 'CUInt', 'CULng', 'CUShort',
            'Date', 'Decimal', 'Declare', 'Default', 'Delegate', 'Dim', 'DirectCast', 'Do', 'Double', 'Each', 'Else',
            'ElseIf', 'End', 'EndIf', 'Enum', 'Erase', 'Error', 'Event', 'Exit', 'False', 'Finally', 'For', 'Friend',
            'Function', 'Get', 'GetType', 'GetXMLNamespace', 'Global', 'GoSub', 'GoTo', 'Handles', 'If', 'Implements',
            'Imports', 'In', 'Inherits', 'Integer', 'Interface', 'Is', 'IsNot', 'Let', 'Lib', 'Like', 'Long', 'Loop',
            'Me', 'Mod', 'Module', 'MustInherit', 'MustOverride', 'MyBase', 'MyClass', 'NameOf', 'Namespace', 'Narrowing', 'New',
            'Next', 'Not', 'Nothing', 'NotInheritable', 'NotOverridable', 'Object', 'Of', 'On', 'Operator', 'Option',
            'Optional', 'Or', 'OrElse', 'Out', 'Overloads', 'Overridable', 'Overrides', 'ParamArray', 'Partial',
            'Private', 'Property', 'Protected', 'Public', 'RaiseEvent', 'ReadOnly', 'ReDim', 'RemoveHandler', 'Resume',
            'Return', 'SByte', 'Select', 'Set', 'Shadows', 'Shared', 'Short', 'Single', 'Static', 'Step', 'Stop',
            'String', 'Structure', 'Sub', 'SyncLock', 'Then', 'Throw', 'To', 'True', 'Try', 'TryCast', 'TypeOf',
            'UInteger', 'ULong', 'UShort', 'Using', 'Variant', 'Wend', 'When', 'While', 'Widening', 'With', 'WithEvents',
            'WriteOnly', 'Xor'
        ],
        tagwords: [
            'If', 'While', 'For', 'Next', "Wend"
        ],
        // we include these common regular expressions
        symbols: /[=><!~?;\.,:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        integersuffix: /U?[DI%L&S@]?/,
        floatsuffix: /[R#F!]?/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // whitespace
                { include: '@whitespace' },
                // special ending tag-words
                [/next(?!\w)/, { token: 'keyword.tag-for' }],
                [/loop(?!\w)/, { token: 'keyword.tag-do' }],
                // usual ending tags
                [/end\s+(?!for|do)([a-zA-Z_]\w*)/, { token: 'keyword.tag-$1' }],
                // identifiers, tagwords, and keywords
                [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@tagwords': { token: 'keyword.tag-$0' },
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }],
                // Preprocessor directive
                [/^\s*#\w+/, 'keyword'],
                // numbers
                [/\d*\d+e([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
                [/\d*\.\d+(e[\-+]?\d+)?(@floatsuffix)/, 'number.float'],
                [/&H[0-9a-f]+(@integersuffix)/, 'number.hex'],
                [/&o[0-7]+(@integersuffix)/, 'number.octal'],
                [/\d+(@integersuffix)/, 'number'],
                // date literal
                [/#.*#/, 'number'],
                // delimiters and operators
                [/[{}()\[\]]/, '@brackets'],
                [/@symbols/, 'delimiter'],
                // strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],
                [/"/, 'string', '@string'],
            ],
            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/(\'|REM(?!\w)).*$/, 'comment'],
            ],
            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"C?/, 'string', '@pop']
            ],
        },
    };
});