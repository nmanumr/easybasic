import { Parser } from './Parser/Parser';
import * as defininitions from './Parser/Definitions';
export class Program {

    public program: defininitions.ProgramDef;
    private parser: Parser;
    private console: Console;

    constructor(console) {
        this.console = console;
        this.parser = new Parser(this.console);

        this.program = {
            lines: null
        }
    }

    public addLine(line: string) {
        this.parser.parseLine(line);
        //this.program.lines.push(line)
    }

    public removeLineByNumber(lineNumber: number) {
        var lines: number[] = [], i = 0;
        for (var line of this.program.lines) {
            if (line.lineNum == lineNumber) {
                lines.push(i);
            }
            i++;
        }
        for (var index of lines) {
            this.program.lines = this.program.lines.splice(i, 1);
        }
    }

    public removeLineByIndex(index: number) {
        this.program.lines = this.program.lines.splice(index, 1);
    }
}