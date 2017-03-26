import { pos } from 'app/services/console.service';
import { row, cell } from './../consoleCell';
export class selection {

    private _colNum: number;
    public selectionStartIndex: pos;

    constructor(colNum: number) {
        this._colNum = colNum;
    }

    public selectAll(text: row[]): row[] {
        for (var row of text) {
            for (var cell of row.data) {
                cell.isHighlighted = true;
            }
        }
        return text;
    }

    public selectNone(text: row[]): row[] {
        for (var row of text) {
            for (var cell of row.data) {
                cell.isHighlighted = false;
            }
        }
        return text;
    }

    public selectInverse(text: row[]): row[] {
        for (var row of text) {
            for (var cell of row.data) {
                cell.isHighlighted = !cell.isHighlighted;
            }
        }
        return text;
    }

    public selectRange(text: row[], start: pos, end: pos): row[] {
        var cellStart = (start.cell < end.cell) ? start.cell : end.cell,
            cellEnd = (start.cell > end.cell) ? start.cell : end.cell,
            rowStart = (start.row < end.row) ? start.row : end.row,
            rowEnd = (start.row > end.row) ? start.row : end.row;

        var ranges = this.splitRange({ cell: cellStart, row: rowStart }, { cell: cellEnd, row: rowEnd });

        for (var range of ranges) {
            for (var y = range.start.row; y <= range.end.row; y++) {
                for (var x = range.start.cell; x <= range.end.cell; x++) {
                    text[y].data[x].isHighlighted = true;
                }
                cellStart = 0; cellEnd = 0;
            }
        }
        return text;
    }

    private splitRange(start: pos, end: pos): range[] {
        var ranges = [],
            rowStart = (start.row < end.row) ? start.row : end.row,
            rowEnd = (start.row > end.row) ? start.row : end.row;

        ranges.push({ start: start, end: { cell: this._colNum - 1, row: rowStart } });
        for (var y = rowStart + 1; y <= rowEnd - 1; y++) {
            ranges.push({ start: { cell: 0, row: y }, end: { cell: this._colNum - 1, row: y } })
        }
        ranges.push({ start: { cell: 0, row: rowEnd }, end: end });
        return ranges;
    }

    public selectWord() {

    }

    public selectLine() {

    }

    public getSelectionText() {

    }
}

export class range {
    start: pos;
    end: pos;
}