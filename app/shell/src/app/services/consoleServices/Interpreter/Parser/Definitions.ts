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