import { row } from './../consoleCell';
import { pos } from "app/services/console.service";

export class text {

    private _data: row[]
    private _colNum: 40 | 80;

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
                this._data[y].data[x].text = '\u2007';
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
            if (!(this._data[pos.row].data[pos.cell].text == '\u2000'))
                this._moveLineLeft(pos);
            else {
                pos = { cell: this._colNum - 1, row: pos.row - 1 };
                this._moveLineLeft(pos);
            }
        } else if (pos.cell == 1) {
            if (this._data[pos.row].data[0].text == '\u2000') {
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
        if (pos.cell == 0 && this._data[pos.row].data[0].text == '\u2000') {
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
        if (this._data[pos.row + 1].data[0].text == '\u2000') {
            this._data[pos.row].data[this._colNum - 1].text = this._data[pos.row + 1].data[1].text;
            this._moveLineLeft({ cell: 1, row: pos.row + 1 });
            if (this._data[pos.row + 1].data[1].text == '\u2007') {
                this._data[pos.row + 1].data[0].text = '\u2007';
            }
        }
        else {
            this._data[pos.row].data[this._colNum - 1].text = '\u2007';
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
            if (this._data[row].data[i].text == '\u2007' || this._data[row].data[i].text == '\u00A0') {
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
            this._writeChar(text[i], pos, forecolor, backcolor, isBlinking);
            if (pos.cell < this._colNum - 1) {
                pos.cell++;
            } else {
                pos.cell = 0;
                pos.row++;
                this._writeChar('\u2000', pos, forecolor, backcolor);
                pos.cell++;
            }
        }
        return pos;
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
            char = '\u00A0';
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
                if (text == '\u2007' || text == '\u2000')
                    this._data[y].data[x].text = '\u00A0'
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
                if (text = '\u00A0')
                    this._data[y].data[x].text = '\u2007'
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
            if (this._data[i].data[0].text != '\u2000') {
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
            if (this._data[row].data[i].text == '\u2007') {
                break;
            }
            else if (i + 1 == this._colNum) {
                if (this._data[row + 1].data[0].text == '\u2000') {
                    var pos = this.getEndofLine(row + 1);
                    i = pos.cell;
                    row = pos.row;
                    break;
                }
            }
        }
        return { cell: i, row: row };
    }
}