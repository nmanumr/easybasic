import { row, cell } from './consoleCell';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsoleService {

    // null: \u2007
    // /s : \u00A0
    // /r : \u2000

    constructor() { }

    consoleData: row[] = [];
    currentPos: pos;
    rowNum: number;
    colNum: number;

    getConsoleData(): row[] {
        return this.consoleData;
    }

    initConsoleData(rowNum: number, colNum: number, backcolor: string, forecolor: string): void {
        this.currentPos = { cell: 0, row: 0 };
        for (var y = 0; y < rowNum; y++) {

            var row: row = { id: y, data: [] };
            for (var x = 0; x < colNum; x++) {

                var Cell: cell = {
                    id: x,
                    text: "\u2007",
                    backcolor: backcolor,
                    forecolor: forecolor,
                    isHighlighted: false
                };
                row.data.push(Cell);

            }
            this.consoleData.push(row);
        }

        this.colNum = colNum;
        this.rowNum = rowNum;

    }

    writeChar(char: string, pos: pos): void {
        var endPos = this.getEndofLine(pos.row);
        if (endPos.cell < pos.cell) {
            this.convertFromNullToSpace(endPos, pos);
        }
        if (char == ' ')
            char = '\u00A0';
        this.consoleData[pos.row].data[pos.cell].text = char;
    }

    //TODO: check for enpty region between text
    write(text, pos: pos = this.currentPos) {

        for (var i = 0, len = text.length; i < len; i++) {

            this.writeChar(text[i], pos);
            if (pos.cell < this.colNum - 1) {
                pos.cell++;
            } else {
                pos.cell = 0;
                pos.row++;
                this.writeChar('\u2000', pos);
                pos.cell++;
            }

        }
    }

    clearScreen() {
        for (var y = 0; y < this.rowNum; y++) {
            for (var x = 0; x < this.colNum; x++) {
                this.consoleData[y].data[x].text = '\u2007';
            }
        }
        this.currentPos = { cell: 0, row: 0 };
    }

    deleteLeft() {
        if (this.currentPos.cell - 1 < 0) {
            if (!(this.consoleData[this.currentPos.row].data[this.currentPos.cell].text == '\u2000'))
                this.moveLineLeft(this.currentPos);
            else {
                this.currentPos = { cell: this.colNum - 1, row: this.currentPos.row - 1 };
                this.moveLineLeft(this.currentPos);
            }
        } else if (this.currentPos.cell == 1) {
            if (this.consoleData[this.currentPos.row].data[0].text == '\u2000') {
                this.currentPos = { cell: this.colNum - 1, row: this.currentPos.row - 1 };
                this.moveLineLeft(this.currentPos);
            }
            else {
                this.currentPos.cell--;
                this.moveLineLeft(this.currentPos)
            }
        }
        else {
            this.currentPos.cell--;
            this.moveLineLeft(this.currentPos)
        }
    }
    deleteRight() {
        if (this.currentPos.cell == 0 && this.consoleData[this.currentPos.row].data[0].text == '\u2000') {
            this.currentPos.cell++;
        }
        this.moveLineLeft(this.currentPos);
    }

    moveLineLeft(pos: pos) {
        for (var i = pos.cell; i < this.colNum - 1; i++) {
            this.consoleData[pos.row].data[i].text = this.consoleData[pos.row].data[i + 1].text;
        }
        if (this.consoleData[pos.row + 1].data[0].text == '\u2000') {
            this.consoleData[pos.row].data[this.colNum - 1].text = this.consoleData[pos.row + 1].data[1].text;
            this.moveLineLeft({ cell: 1, row: pos.row + 1 });
            if (this.consoleData[pos.row + 1].data[1].text == '\u2007') {
                this.consoleData[pos.row + 1].data[0].text = '\u2007';
            }
        }
        else {
            this.consoleData[pos.row].data[this.colNum - 1].text = '\u2007';
        }
        var lastSpace = this.getLastSpace(pos.row);
        if (pos.cell > lastSpace.cell) {
            this.convertFromSpaceToNull(lastSpace, pos);
        }
    }

    getLastSpace(row: number): pos {
        for (var i = this.colNum - 1; i > 0; i--) {
            if (this.consoleData[row].data[i].text == '\u2007' || this.consoleData[row].data[i].text == '\u00A0') {
                continue;
            }
            else {
                break;
            }
        }
        return { row: row, cell: i + 1 };
    }

    //TODO: send text to parser for execution
    pushLine() {
        var start = this.getStartofLine(this.currentPos.row);
        var end = this.getEndofLine(this.currentPos.row);
        var text = this.getTextFromRange(start, end);
        console.log(text);
        this.insertLine();
    }

    insertLine() {
        if (this.currentPos.row + 1 < this.rowNum) {
            this.currentPos = { cell: 0, row: this.currentPos.row + 1 }
        }
        else {
            this.scrollUp();
            this.currentPos = { cell: 0, row: this.currentPos.row + 1 }
        }
    }

    getTextFromRange(start: pos, end: pos): string {
        var text = '';
        for (var y = start.row; y <= end.row; y++) {
            for (var x = start.cell; x <= end.cell; x++) {
                text += this.consoleData[y].data[x].text;
            }
            text += '\n';
        }
        return text;
    }

    /**
     * Replace \u2007 to \u00A0
     * Useful when written text after long spaces
     */
    convertFromNullToSpace(start: pos, end: pos) {
        for (var y = start.row; y <= end.row; y++) {
            for (var x = start.cell; x <= end.cell; x++) {
                var text = this.consoleData[y].data[x].text;
                if (text == '\u2007' || text == '\u2000')
                    this.consoleData[y].data[x].text = '\u00A0'
            }
        }
    }

    /**
     * Replace \u00A0 to \u2007
     * Useful when deleted text after long spaces
     */
    convertFromSpaceToNull(start: pos, end: pos) {
        for (var y = start.row; y <= end.row; y++) {
            for (var x = start.cell; x <= end.cell; x++) {
                var text = this.consoleData[y].data[x].text;
                if (text = '\u00A0')
                    this.consoleData[y].data[x].text = '\u2007'
            }
        }
    }

    getStartofLine(row): pos {
        var i;
        for (i = row; i > -1; i--) {
            if (this.consoleData[i].data[0].text != '\u2000') {
                break;
            }
        }
        return { cell: 0, row: i };
    }
    getEndofLine(row): pos {
        var i;
        for (i = 0; i < this.colNum; i++) {
            if (this.consoleData[row].data[i].text == '\u2007') {
                break;
            }
            else if (i + 1 == this.colNum) {
                if (this.consoleData[row + 1].data[0].text == '\u2000') {
                    var pos = this.getEndofLine(row + 1);
                    i = pos.cell;
                    row = pos.row;
                    break;
                }
            }
        }
        return { cell: i, row: row };
    }

    moveCaretUp(): pos {
        if (this.currentPos.row > 0)
            this.currentPos.row--;
        return this.currentPos;
    }
    moveCaretDown(): pos {
        if (this.currentPos.row + 1 < this.rowNum)
            this.currentPos.row++;
        return this.currentPos;
    }
    moveCaretRight(): pos {
        if (this.currentPos.cell + 1 < this.colNum)
            this.currentPos.cell++;
        else
            this.currentPos = { row: this.currentPos.row + 1, cell: 0 }
        return this.currentPos;
    }
    moveCaretLeft(): pos {
        if (this.currentPos.cell > 0)
            this.currentPos.cell--;
        else
            this.currentPos = { row: this.currentPos.row - 1, cell: this.colNum - 1 }
        return this.currentPos;
    }
    moveCaretToHome(): pos {
        this.currentPos = this.getStartofLine(this.currentPos.row);
        return this.currentPos;
    }
    moveCaretToEnd(): pos {
        this.currentPos = this.getEndofLine(this.currentPos.row);
        return this.currentPos;
    }
    moveCaretToEndOfChar(): pos {
        var letters = /[a-z0-9]/i;
        var charEnded = false, i, j;

        for (i = this.currentPos.row; i < this.rowNum; i++) {
            var found = false
            for (j = (i == this.currentPos.row) ? this.currentPos.cell : 0; j < this.colNum; j++) {
                var matchedPos = this.consoleData[i].data[j].text.search(letters);
                if ((matchedPos != -1) && charEnded) {
                    found = true;
                    break;
                }
                else if ((matchedPos == -1) && !charEnded) {
                    charEnded = true;
                }
            }
            if (found) {
                break;
            }
        }
        if (i == this.rowNum && j == this.colNum) {

        }
        else {
            this.currentPos.cell = j;
            this.currentPos.row = i;
        }
        return this.currentPos;
    }
    //TODO: Fix it
    moveCaretToStartOfChar(): pos {
        var x, y, found;
        for (y = this.currentPos.row; y > -1; y--) {
            for (x = this.currentPos.cell - 1; x > -1; x--) {
                var text: string = this.consoleData[y].data[x].text;
                console.log(text.match(/^[a-z0-9]+$/i), text);
                if (text.match(/^[a-z0-9]+$/i) && text != '\u00A0')
                    continue;
                else {
                    found = true;
                    break;
                }
            }
            if (found)
                break;
        }
        console.log(y, x);
        if (y == 0 && x == 0) {

        }
        else {
            this.currentPos.cell = x;
            this.currentPos.row = y;
        }
        return this.currentPos;
    }

    cloneLine(row: number) {
        var Line = [];
        for (var x = 0; x < this.colNum - 1; x++) {
            var text = this.consoleData[row].data[x].text;
            Line.push(text);
        }
        return Line;
    }

    writeAtLine(line, num) {
        for (var i = 0; i < this.colNum - 1; i++) {
            this.consoleData[num].data[i].text = line[i];
        }
    }

    scrollUp(): void {
        var nextLine = [];
        for (var i = 0; i < this.rowNum - 1; i++) {
            nextLine = this.cloneLine(i + 1);
            this.writeAtLine(nextLine, i);
        }
        this.currentPos.row--;
    }

    highlightRange(start:pos, end: pos){
        for (var y = start.row; y <= end.row; y++) {
            for (var x = start.cell; x <= end.cell; x++) {
                this.consoleData[y].data[x].isHighlighted = true;
            }
        }
    }

    dehighlightAll(){
        for (var y = 0; y <= this.rowNum-1; y++) {
            for (var x = 0; x <= this.colNum-1; x++) {
                this.consoleData[y].data[x].isHighlighted = false;
            }
        }
    }
}

export class pos {
    cell: number;
    row: number;
}