import { Console } from './../../Console';
import { Scanner, TokenType, IToken } from './Scanner';
import * as Constants from "./Constants";


/**
 * No expression parsing at all
 * instead just convert BASIC expression to js expression
 */
export class ExpressionParser {
    private scanner: Scanner;
    private console: Console;
    private lastToken: IToken;

    private altOperators = {
        "not": "~",
        "or": "|",
        "and": "&",
        "mod": "%",
        "xor": "^",
        "<>": "!=",
        "><": "!=",
        "=<": "<=",
        "=>": ">=",
        "\\": "/",
        "=": "==",
    }

    private altFunctions ={
        "chr$": "String.fromCharCode",
        "val": "parseFloat"
    }

    private operators = [
        "+", "-", "|", "&", "/", "~", "*", "=", "<=", ">="
    ]

    constructor(console: Console) {
        this.console = console;
        this.scanner = new Scanner(console);
    }

    public toJsExpression(expression: string) {
        if (!this.validateBarackets(expression)) {
            this.console.text.error("Syntax Error: Number of opening bracket not equal to closing brackets");
            return;
        }

        expression = expression.replace(/\s+/g, "");

        // replce ^ with Math.pow(x,y)
        expression = this.Replace(expression, "^", ",", "Math.pow(", /(\w*)\^(\w*)/);

        // replace \ with Math.int(x/y) 
        expression = this.Replace(expression, "\\", "/", "Math.int(", /(\w*)\\(\w*)/);

        this.scanner.setSource(" " + expression);
        var token: IToken, output = ""
        while (true) {
            token = this.scanner.scan();
            if (token.type == TokenType.EOL || token.type == TokenType.EOF) {
                break;
            }


            // Numbers
            else if (token.type == TokenType.Number) {

                // octal number
                if (token.text.substr(0, 2).toLowerCase() == "&o" && token.text != "&o") {
                    output += "0" + token.text.slice(2);
                }

                // hexa number
                else if (token.text.substr(0, 2).toLowerCase() == "&h" && token.text != "&h") {
                    output += "0x" + token.text.slice(2)
                }

                // normal number
                else {
                    token.text = token.text.replace(/d/gi, "e").toLowerCase();
                    token.text = token.text.replace("#", "").replace("%", "").replace("!", "");
                    output += token.text;
                }
            }

            // operators
            else if (token.type == TokenType.Operator) {
                if (this.altOperators.hasOwnProperty(token.text)) {
                    output += this.altOperators[token.text];
                }
                else if (this.operators.indexOf(token.text) > -1) {
                    output += token.text
                }
            }

            else if(token.type == TokenType.Ident){
                if(this.altFunctions.hasOwnProperty(token.text.toLowerCase())){
                    output += this.altFunctions[token.text.toLowerCase()];
                }
                else{
                    output += token.text;
                }
            }

            else if (token.text == ")") {
                output += ")";
            }
            else if (token.text == "(") {
                output += "(";
            }
            else{
                output += token.text;
            }
            this.lastToken = token;
        }
        return output
    }

    private validateBarackets(expr: string) {
        var leftParan = (expr.match(/\(/g) || []).length,
            rightParan = (expr.match(/\)/g) || []).length;
        return leftParan == rightParan;
    }

    private Replace(expr: string, operator, newOperator, functionName = "", regex): string {
        if (expr.indexOf(operator) > -1) {
            var tab = [];
            var joker = "___joker___";
            while (expr.indexOf("(") > -1) {
                expr = expr.replace(/(\([^\(\)]*\))/g, function (m, t) {
                    tab.push(t);
                    return (joker + (tab.length - 1));
                });
            }

            tab.push(expr);
            expr = joker + (tab.length - 1);
            while (expr.indexOf(joker) > -1) {
                expr = expr.replace(new RegExp(joker + "(\\d+)", "g"), function (m, d) {
                    return tab[d].replace(new RegExp(regex, "g"), functionName + "$1" + newOperator + "$2)");
                });
            }
        }
        return expr;
    }
}