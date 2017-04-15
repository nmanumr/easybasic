import { ExpressionParser } from './../ExpressionParser';
import { Statement } from './../Definitions';
import { IToken, Scanner } from './../Scanner';

export function parseLet(scanner: Scanner, expressionParser: ExpressionParser, token: IToken) {
    var statement: LetStatement = new LetStatement();

    statement.parameters.varName = token.text;

    if (scanner.scan().text != "=") {
        this.console.text.error("Syntax Error: variable must be initialized with seed value");
        this.console.text.BreakLine();
        throw "= expected"
    }

    statement.parameters.value = parseExpression(scanner.scanUntil([]), expressionParser);

    return statement;
}

function parseExpression(expr: string, expressionParser: ExpressionParser) {
    return expressionParser.toJsExpression(expr);
}

class LetStatement extends Statement {

    parameters: letParameter = { varName: null, value: null };

    constructor() {
        super();
        this.name = "LET";
    }

    public varName(name: string = this.parameters.varName) {
        this.parameters.varName = name;
        return this.parameters.varName;
    }

    public value(value = this.parameters.value) {
        this.parameters.value = value;
        return this.parameters.value;
    }

}

class letParameter {
    varName: string;
    value: any;
}