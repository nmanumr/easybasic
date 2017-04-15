import { ExpressionParser } from './../ExpressionParser';
import { Statement } from './../Definitions';
import { Console } from './../../../Console';
import { Scanner } from './../Scanner';
import * as Constants from "./../Constants";

export function CLSParser(scanner: Scanner, Console: Console, expressionParser: ExpressionParser): CLSStatement {
    var cls = new CLSStatement();

    var pos = scanner.stream.pos();
    cls.parameters.region = expressionParser.toJsExpression(scanner.scanUntil([",", ":"]));

    // just ignore everything after region
    scanner.scanUntil([]);

    return cls;
}

export class CLSStatement extends Statement {


    constructor() {
        super();
        this.name = "CLS";
        this.parameters = {region: null};
    }
}