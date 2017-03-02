/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports"], function (require, exports) {
    'use strict';
    exports.conf = {
        wordPattern: /(#?-?\d*\.\d\w*%?)|((::|[@#.!:])?[\w-?]+%?)|::|[@#.!:]/g,
        comments: {
            blockComment: ['/*', '*/']
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"', notIn: ['string'] },
            { open: '\'', close: '\'', notIn: ['string'] }
        ]
    };
    var TOKEN_SELECTOR = 'tag';
    var TOKEN_SELECTOR_TAG = 'tag';
    var TOKEN_PROPERTY = 'attribute.name';
    var TOKEN_VALUE = 'attribute.value';
    var TOKEN_AT_KEYWORD = 'keyword';
    exports.language = {
        defaultToken: '',
        tokenPostfix: '.css',
        ws: '[ \t\n\r\f]*',
        identifier: '-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
        brackets: [
            { open: '{', close: '}', token: 'delimiter.bracket' },
            { open: '[', close: ']', token: 'delimiter.bracket' },
            { open: '(', close: ')', token: 'delimiter.parenthesis' },
            { open: '<', close: '>', token: 'delimiter.angle' }
        ],
        tokenizer: {
            root: [
                { include: '@selector' },
            ],
            selector: [
                { include: '@comments' },
                { include: '@import' },
                { include: '@strings' },
                ['[@](keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes)', { token: TOKEN_AT_KEYWORD, next: '@keyframedeclaration' }],
                ['[@](page|content|font-face|-moz-document)', { token: TOKEN_AT_KEYWORD }],
                ['[@](charset|namespace)', { token: TOKEN_AT_KEYWORD, next: '@declarationbody' }],
                ['(url-prefix)(\\()', ['attribute.value', { token: 'delimiter.parenthesis', next: '@urldeclaration' }]],
                ['(url)(\\()', ['attribute.value', { token: 'delimiter.parenthesis', next: '@urldeclaration' }]],
                { include: '@selectorname' },
                ['[\\*]', TOKEN_SELECTOR_TAG],
                ['[>\\+,]', 'delimiter'],
                ['\\[', { token: 'delimiter.bracket', next: '@selectorattribute' }],
                ['{', { token: 'delimiter.bracket', next: '@selectorbody' }]
            ],
            selectorbody: [
                { include: '@comments' },
                ['[*_]?@identifier@ws:(?=(\\s|\\d|[^{;}]*[;}]))', TOKEN_PROPERTY, '@rulevalue'],
                ['}', { token: 'delimiter.bracket', next: '@pop' }]
            ],
            selectorname: [
                ['(\\.|#(?=[^{])|%|(@identifier)|:)+', TOKEN_SELECTOR],
            ],
            selectorattribute: [
                { include: '@term' },
                [']', { token: 'delimiter.bracket', next: '@pop' }],
            ],
            term: [
                { include: '@comments' },
                ['(url-prefix)(\\()', ['attribute.value', { token: 'delimiter.parenthesis', next: '@urldeclaration' }]],
                ['(url)(\\()', ['attribute.value', { token: 'delimiter.parenthesis', next: '@urldeclaration' }]],
                { include: '@functioninvocation' },
                { include: '@numbers' },
                { include: '@name' },
                ['([<>=\\+\\-\\*\\/\\^\\|\\~,])', 'delimiter'],
                [',', 'delimiter']
            ],
            rulevalue: [
                { include: '@comments' },
                { include: '@strings' },
                { include: '@term' },
                ['!important', 'keyword'],
                [';', 'delimiter', '@pop'],
                ['(?=})', { token: '', next: '@pop' }] // missing semicolon
            ],
            warndebug: [
                ['[@](warn|debug)', { token: TOKEN_AT_KEYWORD, next: '@declarationbody' }]
            ],
            import: [
                ['[@](import)', { token: TOKEN_AT_KEYWORD, next: '@declarationbody' }]
            ],
            urldeclaration: [
                { include: '@strings' },
                ['[^)\r\n]+', 'string'],
                ['\\)', { token: 'delimiter.parenthesis', next: '@pop' }]
            ],
            parenthizedterm: [
                { include: '@term' },
                ['\\)', { token: 'delimiter.parenthesis', next: '@pop' }]
            ],
            declarationbody: [
                { include: '@term' },
                [';', 'delimiter', '@pop'],
                ['(?=})', { token: '', next: '@pop' }] // missing semicolon
            ],
            comments: [
                ['\\/\\*', 'comment', '@comment'],
                ['\\/\\/+.*', 'comment']
            ],
            comment: [
                ['\\*\\/', 'comment', '@pop'],
                [/[^*/]+/, 'comment'],
                [/./, 'comment'],
            ],
            name: [
                ['@identifier', TOKEN_VALUE]
            ],
            numbers: [
                ['-?(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?', { token: 'attribute.value.number', next: '@units' }],
                ['#[0-9a-fA-F_]+(?!\\w)', 'attribute.value.hex']
            ],
            units: [
                ['(em|ex|ch|rem|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?', 'attribute.value.unit', '@pop']
            ],
            keyframedeclaration: [
                ['@identifier', 'attribute.value'],
                ['{', { token: 'delimiter.bracket', switchTo: '@keyframebody' }],
            ],
            keyframebody: [
                { include: '@term' },
                ['{', { token: 'delimiter.bracket', next: '@selectorbody' }],
                ['}', { token: 'delimiter.bracket', next: '@pop' }],
            ],
            functioninvocation: [
                ['@identifier\\(', { token: 'attribute.value', next: '@functionarguments' }],
            ],
            functionarguments: [
                ['\\$@identifier@ws:', TOKEN_PROPERTY],
                ['[,]', 'delimiter'],
                { include: '@term' },
                ['\\)', { token: 'attribute.value', next: '@pop' }],
            ],
            strings: [
                ['~?"', { token: 'string', next: '@stringenddoublequote' }],
                ['~?\'', { token: 'string', next: '@stringendquote' }]
            ],
            stringenddoublequote: [
                ['\\\\.', 'string'],
                ['"', { token: 'string', next: '@pop' }],
                [/[^\\"]+/, 'string'],
                ['.', 'string']
            ],
            stringendquote: [
                ['\\\\.', 'string'],
                ['\'', { token: 'string', next: '@pop' }],
                [/[^\\']+/, 'string'],
                ['.', 'string']
            ]
        }
    };
});
