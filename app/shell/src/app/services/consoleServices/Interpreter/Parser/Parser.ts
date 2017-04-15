import { ExpressionParser } from './ExpressionParser';
import { Console } from './../../Console';
import * as Tokens from './Tokens';
import * as Definitions from './Definitions';
import { TokenType, Scanner, IToken } from './Scanner';
import { StatementParser } from "app/services/consoleServices/Interpreter/Parser/Statements/Parser";
import { parseLet } from "app/services/consoleServices/Interpreter/Parser/Statements/LET";


export class Parser {
    public scanner: Scanner;
    private console: Console;
    public token: IToken;
    public prevToken: IToken;
    private lastErrorToken: IToken;
    private expressionParser: ExpressionParser;

    constructor(console) {
        this.console = console;
        this.scanner = new Scanner(this.console);
        this.token = null;
        this.prevToken = null;
        this.expressionParser = new ExpressionParser(console);
    }



    public parseLine(lineText: string): Definitions.Line {
        var line: Definitions.Line = { lineNum: null, statments: [] };
        this.scanner.setSource(lineText);

        while (true) {
            var token = this.scanner.scan();

            if (token.type == TokenType.LineNum && !line.lineNum) {
                line.lineNum = parseInt(token.text);
                continue;
            }

            else if (token.type == TokenType.Ident) {

                line.statments.push(this.parseIdentifier(token));
            }

            if (token.type == TokenType.EOF || token.type == TokenType.EOL) {
                break;
            }
        }
            console.log(line);
        return line;
    }

    private parseIdentifier(token: IToken): any {
        if (Tokens.statements.indexOf(token.text.toUpperCase()) > -1) {
            return this.parseStatement(token)
        }
        else {
            return parseLet(this.scanner, this.expressionParser, token);
        }
    }

    private parseStatement(token: IToken) {
        return StatementParser(token, this.scanner, this.console, this.expressionParser)
    }
}
