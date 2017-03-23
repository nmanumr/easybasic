import { text } from './consoleServices/text';
import { basicColors } from './consoleServices/colors';
import { row, cell } from './consoleCell';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsoleService {

    // null: \u2007
    // /s : \u00A0
    // /r : \u2000

    private _colors: basicColors;
    private _text: text;

    TextData: row[] = [];
    currentPos: pos;
    rowNum: number;
    colNum: 40 |80;
    showCaret: boolean = true;

    constructor() {}

    initConsoleData(colNum: 40 |80): void {
        this._colors = new basicColors('text');

        this.currentPos = { cell: 0, row: 0 };
        for (var y = 0; y < 25; y++) {

            var row: row = { id: y, data: [] };
            for (var x = 0; x < colNum; x++) {

                var Cell: cell = {
                    id: x,
                    text: "\u2007",
                    backcolor: this._colors.getBackcolor(0),
                    forecolor: this._colors.getForecolor(15).color,
                    isHighlighted: false,
                    isBlinkingColor: false
                };
                row.data.push(Cell);

            }
            this.TextData.push(row);
        }

        this.colNum = colNum;
        this.rowNum = 25;
        this._text= new text(this.TextData, this.colNum)
    }

    

    getConsoleData(): row[] {
        return this.TextData;
    }

    toggleCaret(){
        this.showCaret = !this.showCaret;
    }

    write(text, forecolor: number = 15, backcolor: number = 0) {
        var foreground = this._colors.getForecolor(forecolor);
        var background = this._colors.getBackcolor(backcolor);
        var pos = this._text.write(text,this.currentPos, foreground.color, background, foreground.isBlinking);
        this.currentPos = pos;
    }

    changeLocation(pos: pos){
        this.currentPos = pos;
    }

    clearScreen() {
        this._text.clearText();
        this.currentPos = { cell: 0, row: 0 };
    }

    deleteLeft() {
        this.currentPos = this._text.deleteLeft(this.currentPos);
    }
    deleteRight() {
        this.currentPos = this._text.deleteRight(this.currentPos);
    }

    //TODO: send text for execution
    pushLine() {
        var start = this._text.getStartofLine(this.currentPos.row);
        var end = this._text.getEndofLine(this.currentPos.row);
        var text = this.getTextFromRange(start, end);
        console.log(text);
        this.insertLine();
    }

    insertLine() {
        // check if previous line is wraped but empty
        if(this.getTextFromRange({cell: 0, row: this.currentPos.row}, {cell: 1, row: this.currentPos.row}).charCodeAt(0) == '\u2000'.charCodeAt(0) &&
            this.getTextFromRange({cell: 1, row: this.currentPos.row}, {cell: 2, row: this.currentPos.row}).charCodeAt(0) == '\u2007'.charCodeAt(0)){
                this.currentPos.row--;
        }
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
                text += this.TextData[y].data[x].text;
            }
            text += '\n';
        }
        return text;
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
        this.currentPos = this._text.getStartofLine(this.currentPos.row);
        return this.currentPos;
    }
    moveCaretToEnd(): pos {
        this.currentPos = this._text.getEndofLine(this.currentPos.row);
        return this.currentPos;
    }
    moveCaretToEndOfChar(): pos {
        var letters = /[a-z0-9]/i;
        var charEnded = false, i, j;

        for (i = this.currentPos.row; i < this.rowNum; i++) {
            var found = false
            for (j = (i == this.currentPos.row) ? this.currentPos.cell : 0; j < this.colNum; j++) {
                var matchedPos = this.TextData[i].data[j].text.search(letters);
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
                var text: string = this.TextData[y].data[x].text;
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
            var text = this.TextData[row].data[x].text;
            Line.push(text);
        }
        return Line;
    }

    writeAtLine(line, num) {
        for (var i = 0; i < this.colNum - 1; i++) {
            this.TextData[num].data[i].text = line[i];
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
                this.TextData[y].data[x].isHighlighted = true;
            }
        }
    }

    dehighlightAll(){
        for (var y = 0; y <= this.rowNum-1; y++) {
            for (var x = 0; x <= this.colNum-1; x++) {
                this.TextData[y].data[x].isHighlighted = false;
            }
        }
    }
}

export class pos {
    cell: number;
    row: number;
}