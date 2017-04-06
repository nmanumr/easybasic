import { Console } from './../../Console';
import * as Tokens from './Tokens';
import * as Definitions from './Definitions';
import { TokenType, Scanner, IToken } from './Scanner';
import { StatementParser } from "app/services/consoleServices/Interpreter/Parser/Statements/Parser";


export class Parser {
    public scanner: Scanner;
    private console: Console;
    public token: IToken;
    public prevToken: IToken;

    private lastErrorToken: IToken;

    constructor(console) {
        this.console = console;
        this.scanner = new Scanner(this.console);
        this.token = null;
        this.prevToken = null;
    }



    public parseLine(lineText: string): Definitions.Line {
        var line: Definitions.Line = { lineNum: null, statments: null };
        this.scanner.setSource(lineText);
        while (true) {
            var token = this.scanner.scan();
            console.log(token.type, token.text);

            if (token.type == TokenType.LineNum && !line.lineNum) {
                line.lineNum = parseInt(token.text);
                continue;
            }
            else if (token.type == TokenType.Ident) {

                this.parseIdentifier(token);
            }

            if (token.type == TokenType.EOF || token.type == TokenType.EOL) {
                break;
            }
        }
        return line;
    }

    private parseIdentifier(token: IToken) {
        if (Tokens.statements.indexOf(token.text.toUpperCase()) > -1) {
            this.parseStatement(token)
        }
        else if (Tokens.functions.indexOf(token.text.toUpperCase()) > -1) {
            this.parseFunction(token);
        }
        else {
            this.parseLet(token);
        }
    }

    private parseStatement(token: IToken) {
        StatementParser(token, this.scanner, this.console)
    }

    private parseFunction(token: IToken) {

    }

    private parseLet(token: IToken) {
        var statement: Definitions.LetStatement = new Definitions.LetStatement();

        statement.parameters.varName = token.text;

        if (this.scanner.scan().text != "=") {
            this.console.text.error("Syntax Error: variable must be initialized with seed value");
            this.console.text.BreakLine();
        }

        statement.parameters.value = this.scanner.scan().text;

    }
}
