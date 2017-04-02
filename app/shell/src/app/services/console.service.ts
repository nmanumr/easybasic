import { selection } from './consoleServices/selection';
import { caret } from './consoleServices/Caret';
import { Drawings } from './consoleServices/drawing';
import { text } from './consoleServices/text';
import { basicColors } from './consoleServices/colors';
import { row, cell } from './consoleCell';
import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ConsoleService {

    // null: \u2007
    // /s : \u00A0
    // /r : \u2000

    private _colors: basicColors;
    public text: text;
    public caret: caret;
    public selections: selection;
    public drawing: Drawings;

    TextData: row[] = [];
    rowNum: number;
    colNum: 40 | 80;

    constructor() { }

    initConsoleData(colNum: 40 | 80, canvas: ElementRef): void {
        this._colors = new basicColors('text');
        this.caret = new caret('block', colNum);
        this.selections = new selection(colNum);
        this.drawing = new Drawings(canvas, colNum, 'cga')

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
        this.text = new text(this.TextData, this.colNum)
    }



    getConsoleData(): row[] {
        return this.TextData;
    }


    write(text, forecolor: number = 15, backcolor: number = 0) {
        var foreground = this._colors.getForecolor(forecolor);
        var background = this._colors.getBackcolor(backcolor);
        var pos = this.text.write(text, this.caret.position, foreground.color, background, foreground.isBlinking);
        this.caret.position = pos;
    }

    clearScreen() {
        this.text.clearText();
        this.caret.position = { cell: 0, row: 0 };
    }

    deleteLeft() {
        this.caret.position = this.text.deleteLeft(this.caret.position);
    }

    deleteRight() {
        this.caret.position = this.text.deleteRight(this.caret.position);
    }

    insertLine() {
        var start = this.text.getStartofLine(this.caret.position.row);
        var end = this.text.getEndofLine(this.caret.position.row);
        var text = this.text.getTextFromRange(start, end);
        //console.log(text);

        this.caret.position = this.text.BreakLine(this.caret.position);
    }



    moveCaretToHome(): pos {
        this.caret.position = this.text.getStartofLine(this.caret.position.row);
        return this.caret.position;
    }
    moveCaretToEnd(): pos {
        this.caret.position = this.text.getEndofLine(this.caret.position.row);
        return this.caret.position;
    }
    moveCaretToNextChar(): pos {
        var letters = /[a-z0-9]/i;
        var charEnded = false, i, j;

        for (i = this.caret.position.row; i < this.rowNum; i++) {
            var found = false
            for (j = (i == this.caret.position.row) ? this.caret.position.cell : 0; j < this.colNum; j++) {
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
            this.caret.position.cell = j;
            this.caret.position.row = i;
        }
        return this.caret.position;
    }
    moveCaretToPreviousChar(): pos {
        var x = this.caret.position.cell - 1, y, charEnded, found;
        for (y = this.caret.position.row; y > -1; y--) {
            for (x; x > 0; x--) {
                var text: string = this.TextData[y].data[x].text;
                var previousChar = this.TextData[y].data[x - 1].text;
                if (text == '\u00A0' || text == '\u2000' || text == '\u2007') {
                    charEnded = true;
                    continue;
                }
                if (previousChar == '\u00A0' && charEnded && text.match(/^[a-z0-9]+/i)) {
                    found = true;
                    break;
                }
            }
            if (found)
                break;
            else
                x = this.colNum - 1;
        }
        this.caret.position.cell = x;
        this.caret.position.row = y;
        return this.caret.position;
    }

    deleteSelected() {
        var selectedRange = this.selections.getSelection(this.TextData),
            startRow = selectedRange[0].start.row,
            endRow= selectedRange[0].end.row;
        
         if(startRow != endRow){
            selectedRange = this.selections.splitRange(selectedRange[0].start, selectedRange[0].end);
        }

        for(var line of selectedRange){
            var i = line.start.cell;
            while(i != line.end.cell+1){
                this.text.deleteLeft({cell: line.start.cell, row: line.start.row});
                i++;
            }
        }
    }

}

export class pos {
    cell: number;
    row: number;
}