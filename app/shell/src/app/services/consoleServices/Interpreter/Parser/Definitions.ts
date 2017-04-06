export class ProgramDef {
    lines: Line[]
}

export class Line {
    lineNum: number;
    statments: Statement[]
}

export class Statement {
    name: string;
    parameters;
}

export class LetStatement extends Statement {

    parameters: letParameter={varName:null, value: null};

    constructor() {
        super();
        this.name = "LET";
    }

    public varName(name: string= this.parameters.varName) {
        this.parameters.varName = name;
        return this.parameters.varName;
    }

    public value(value = this.parameters.value){
        this.parameters.value = value;
        return this.parameters.value;
    }

}

class letParameter {
    varName: string;
    value: any;
}