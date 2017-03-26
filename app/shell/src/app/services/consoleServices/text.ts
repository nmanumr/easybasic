import { row } from './../consoleCell';
import { pos } from "app/services/console.service";

export class text {

    private _data: row[]
    private _colNum: 40 | 80;
    private lineWrapChar: string = '\u2000';
    private spaceChar: string = '\u00A0';
    private nullChar: string = '\u2007';
    public isLast: boolean;

    constructor(text: row[], colNum: 40 | 80) {
        this._data = text;
        this._colNum = colNum;
    };

    /**
     * clear all the text of console
     */
    public clearText() {
        for (var y = 0; y < 25; y++) {
            for (var x = 0; x < this._colNum; x++) {
                this._data[y].data[x].text = this.nullChar;
                this._data[y].data[x].backcolor = '#000'
                this._data[y].data[x].forecolor = '#fff'
                this._data[y].data[x].isHighlighted = false
                this._data[y].data[x].isBlinkingColor = false
            }
        }
    }

    /**
     * Change text of console
     * @param text new text array
     */
    public changeText(text: row[]): void {
        this._data = text;
    }

    /**
     * Delete a char to left
     * @param pos position to delete
     */
    public deleteLeft(pos: pos): pos {
        if (pos.cell - 1 < 0) {
            if (!(this._data[pos.row].data[pos.cell].text == this.lineWrapChar))
                this._moveLineLeft(pos);
            else {
                pos = { cell: this._colNum - 1, row: pos.row - 1 };
                this._moveLineLeft(pos);
            }
        } else if (pos.cell == 1) {
            if (this._data[pos.row].data[0].text == this.lineWrapChar) {
                pos = { cell: this._colNum - 1, row: pos.row - 1 };
                this._moveLineLeft(pos);
            }
            else {
                pos.cell--;
                this._moveLineLeft(pos)
            }
        }
        else {
            pos.cell--;
            this._moveLineLeft(pos)
        }
        return pos;
    }

    /**
     * Delete a char to right
     * @param pos position to delete
     */
    public deleteRight(pos: pos): pos {
        if (pos.cell == 0 && this._data[pos.row].data[0].text == this.lineWrapChar) {
            pos.cell++;
        }
        this._moveLineLeft(pos);
        return pos;
    }

    /**
     * Move all the characters of line to left
     * @param pos position to move
     */
    private _moveLineLeft(pos: pos) {
        for (var i = pos.cell; i < this._colNum - 1; i++) {
            this._data[pos.row].data[i].text = this._data[pos.row].data[i + 1].text;
        }
        if (this._data[pos.row + 1].data[0].text == this.lineWrapChar) {
            this._data[pos.row].data[this._colNum - 1].text = this._data[pos.row + 1].data[1].text;
            this._moveLineLeft({ cell: 1, row: pos.row + 1 });
            if (this._data[pos.row + 1].data[1].text == this.nullChar) {
                this._data[pos.row + 1].data[0].text = this.nullChar;
            }
        }
        else {
            this._data[pos.row].data[this._colNum - 1].text = this.nullChar;
        }
        var lastSpace = this._getLastSpace(pos.row);
        if (pos.cell > lastSpace.cell) {
            this._convertFromSpaceToNull(lastSpace, pos);
        }
    }

    /**
     * Search for last line space in line
     * @param row line index to check
     */
    private _getLastSpace(row: number): pos {
        for (var i = this._colNum - 1; i > 0; i--) {
            if (this._data[row].data[i].text == this.nullChar || this._data[row].data[i].text == this.spaceChar) {
                continue;
            }
            else {
                break;
            }
        }
        return { row: row, cell: i + 1 };
    }

    /**
     * Write a string on console
     * @param text text to write
     * @param currentPos current position to write
     * @param forecolor forecolor of char
     * @param backcolor backcolor of char
     * @param isBlinking is forecolor is blinking color
     */
    public write(text, pos: pos, forecolor: string, backcolor: string, isBlinking: boolean = false): pos {
        for (var i = 0, len = text.length; i < len; i++) {
            var currentChar = this.getNextChars(pos, 1);
            if (this.isLast) {
                pos = this.getNextPos(pos, forecolor, backcolor)
            }
            this._writeChar(text[i], pos, forecolor, backcolor, isBlinking);
            if (pos.cell == this._colNum - 1) {
                this.isLast = true;
            }
            if (this.isLast && currentChar == this.nullChar) {
                continue;
            }
            pos = this.getNextPos(pos, forecolor, backcolor)
        }
        return pos;
    }


    private getNextPos(pos: pos, forecolor, backcolor): pos {
        if (pos.cell < this._colNum - 1) {
            pos.cell++;
        } else {
            if (pos.row == 24) {
                pos = this.scrollUp(pos);
                pos.cell = 0;
                pos.row++;
                this._writeChar(this.lineWrapChar, pos, forecolor, backcolor);
                pos.cell++;
            }
            else {
                pos.cell = 0;
                pos.row++;
            }
            this._writeChar(this.lineWrapChar, pos, forecolor, backcolor);
            pos.cell++;

            this.isLast = false;
        }
        return pos
    }


    /**
     * Insert new line scroll text if required also check for empty line wraped and remove it
     * @param pos current position
     */
    public BreakLine(pos: pos): pos {
        // check if previous line is wraped but empty
        if (this.getNextChars({ cell: 0, row: pos.row }, 1).charCodeAt(0) == '\u2000'.charCodeAt(0) &&
            this.getNextChars({ cell: 1, row: pos.row }, 1).charCodeAt(0) == '\u2007'.charCodeAt(0)) {
            pos.row--;
        }
        if (pos.row + 1 < 25) {
            pos = { cell: 0, row: pos.row + 1 }
        }
        else {
            this.scrollUp(pos);
            pos = { cell: 0, row: pos.row + 1 }
        }
        return pos
    }


    /**
     * write a char at given position
     * @param char char to write
     * @param pos location to write
     * @param forecolor forecolor of char
     * @param backcolor backcolor of char
     * @param isBlinking is forecolor is blinking color
     */
    private _writeChar(char: string, pos: pos, forecolor: string, backcolor: string, isBlinking: boolean = false): void {
        var endPos = this.getEndofLine(pos.row);
        if (endPos.cell < pos.cell) {
            this._convertFromNullToSpace(endPos, pos);
        }
        if (char == ' ')
            char = this.spaceChar;
        this._data[pos.row].data[pos.cell].text = char;
        // set text color
        this._data[pos.row].data[pos.cell].backcolor = backcolor;
        this._data[pos.row].data[pos.cell].forecolor = forecolor;
        this._data[pos.row].data[pos.cell].isBlinkingColor = isBlinking;
    }




    /**
     * Replace \u2007 to \u00A0
     * Useful when written text after long spaces
     */
    private _convertFromNullToSpace(start: pos, end: pos) {
        for (var y = start.row; y <= end.row; y++) {
            for (var x = start.cell; x <= end.cell; x++) {
                var text = this._data[y].data[x].text;
                if (text == this.nullChar || text == this.lineWrapChar)
                    this._data[y].data[x].text = this.spaceChar
            }
        }
    }

    /**
     * Replace \u00A0 to \u2007
     * Useful when deleted text after long spaces
     */
    private _convertFromSpaceToNull(start: pos, end: pos) {
        for (var y = start.row; y <= end.row; y++) {
            for (var x = start.cell; x <= end.cell; x++) {
                var text = this._data[y].data[x].text;
                if (text = this.spaceChar)
                    this._data[y].data[x].text = this.nullChar
            }
        }
    }


    /**
     * Return start of line also consider line wraps
     * @param row index of line between [0-24]
     */
    public getStartofLine(row): pos {
        var i;
        for (i = row; i > -1; i--) {
            if (this._data[i].data[0].text != this.lineWrapChar) {
                break;
            }
        }
        return { cell: 0, row: i };
    }

    /**
     * Return end of line also consider line wraps
     * @param row index of line between [0-24]
     */
    public getEndofLine(row): pos {
        var i;
        for (i = 0; i < this._colNum; i++) {
            if (this._data[row].data[i].text == this.nullChar) {
                break;
            }
            else if (i + 1 == this._colNum) {
                if (this._data[row + 1].data[0].text == this.lineWrapChar) {
                    var pos = this.getEndofLine(row + 1);
                    i = pos.cell;
                    row = pos.row;
                    break;
                }
            }
        }
        return { cell: i, row: row };
    }

    public getEndOfWord(pos: pos): pos {
        var letters = /[a-z0-9]/i;
        var found = false, i, j;

        for (i = pos.row; i < 25; i++) {
            for (j = (i == pos.row) ? pos.cell : 0; j < this._colNum; j++) {
                var text = this._data[i].data[j].text;
                if (text == this.lineWrapChar) {
                    continue;
                }
                var matchedPos = text.search(letters);
                if ((matchedPos == -1)) {
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        return { cell: j, row: i };
    }

    public getStartOfWord(pos: pos): pos {
        return null;
    }

    /**
     * Scroll the console text by one line
     * @param pos current position
     */
    public scrollUp(pos: pos): pos {
        var nextLine = [];
        for (var i = 0; i < 25 - 1; i++) {
            nextLine = this._cloneLine(i + 1);
            this._replaceLine(nextLine, i);
        }
        pos.row--;
        this.cleanLine(24);
        return pos;
    }

    private cleanLine(lineNum: number){
        for(var cell of this._data[lineNum].data){
            cell.text = this.nullChar;
            cell.forecolor = '#fff';
            cell.backcolor = '#000';
            cell.isBlinkingColor = false;
            cell.isHighlighted = false;
        }
    }

    /**
     * Replace Line
     * @param line New line text in string array
     * @param lineNum index of line to be replaced
     */
    private _replaceLine(line, lineNum: number) {
        for (var i = 0; i < this._colNum; i++) {
            this._data[lineNum].data[i].text = line[i].text;
            this._data[lineNum].data[i].backcolor = line[i].backcolor;
            this._data[lineNum].data[i].forecolor = line[i].forecolor;
            this._data[lineNum].data[i].isBlinkingColor = line[i].isBlinkingColor;
            this._data[lineNum].data[i].isHighlighted = line[i].isHighlighted;
        }
    }

    /**
     * Copy the txt of given line to a string array
     * @param row index of line to be copied
     */
    private _cloneLine(row: number) {
        var Line = [];
        for (var x = 0; x < this._colNum; x++) {
            Line.push({
                text: this._data[row].data[x].text,
                backcolor: this._data[row].data[x].backcolor,
                forecolor: this._data[row].data[x].forecolor,
                isHighlighted: this._data[row].data[x].isHighlighted,
                isBlinkingColor: this._data[row].data[x].isBlinkingColor
            });
        }
        return Line;
    }

    /**
     * Return text of console by given range
     * @param start start position of range
     * @param end end position of range
     */
    public getTextFromRange(start: pos, end: pos): string {
        var text = '';
        for (var y = start.row; y <= end.row; y++) {
            for (var x = start.cell; x <= end.cell; x++) {
                text += this._data[y].data[x].text;
            }
            text += '\n';
        }
        return text;
    }

    /**
     * Return n chars from given position
     * @param pos position to start lokking for
     * @param length length of chars to get
     */
    public getNextChars(pos: pos, length: number): string {
        var text = '',
            completed = false;

        for (var y = pos.row; y < 25; y++) {
            for (var x = pos.cell; x <= this._colNum - 1; x++) {
                text += this._data[y].data[x].text;
                length--;
                if (length == 0) {
                    completed = true;
                    break;
                }
            }
            if (completed) {
                break;
            }
            text += '\n';
        }
        return text;
    }
}