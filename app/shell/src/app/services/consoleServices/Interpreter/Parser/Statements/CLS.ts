import { Statement } from './../Definitions';
import { Console } from './../../../Console';
import { Scanner } from './../Scanner';
import * as Constants from "./../Constants";

export function CLSParser(scanner: Scanner, Console: Console): CLSStatement {
    var cls = new CLSStatement();

    var pos = scanner.stream.pos();
    var region = scanner.scan().text;

    if (Constants.decimalDigits.indexOf(region.charCodeAt(0)) > -1) {
        switch (region) {
            case "0":
                cls.parameters.region = "whole";
                break;
            case "1":
                cls.parameters.region = "graphics";
                break;
            case "2":
                cls.parameters.region = "text";
                break;
            default:
                Console.text.error("Illegal function call: cls only acpect value in between 0-2")
                break;
        }
    }
    else if(region[0] == '"'){

    }
    else {
        scanner.stream.pos(pos);
    }
    scanner.scanTilEndofStatement();
    console.log(cls);
    return cls;
}

export class CLSStatement extends Statement {

    parameters: clsParameter = { region: "whole" };

    constructor() {
        super();
        this.name = "CLS";
    }

    public region(region: "whole" | "graphics" | "text" = this.parameters.region) {
        this.parameters.region = region;
        return this.parameters.region;
    }
}

class clsParameter {
    region: "whole" | "graphics" | "text";
}