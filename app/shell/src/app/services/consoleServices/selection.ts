import { pos } from 'app/services/console.service';
import { row, cell } from './../consoleCell';
export class Selection {

    private _colNum: number;
    public selectionStartIndex: pos;

    constructor(colNum: number) {
        this._colNum = colNum;
    }

    /**
     * Return Text data with all the cells marked as selected
     * @param text Text data of console
     */
    public selectAll(text: row[]): row[] {
        for (var row of text) {
            for (var cell of row.data) {
                cell.isHighlighted = true;
            }
        }
        return text;
    }

    /**
     * Return Text data with all the cells marked as deselected
     * @param text Text data of console
     */
    public selectNone(text: row[]): row[] {
        for (var row of text) {
            for (var cell of row.data) {
                cell.isHighlighted = false;
            }
        }
        return text;
    }

    /**
     * Return Text data with inversed selection
     * @param text Text data of console
     */
    public selectInverse(text: row[]): row[] {
        for (var row of text) {
            for (var cell of row.data) {
                cell.isHighlighted = !cell.isHighlighted;
            }
        }
        return text;
    }

    /**
     * Return Text data with selected a specific range
     * @param text Text data of console
     * @param start Start position of selection
     * @param end Ending position of selection
     */
    public selectRange(text: row[], start: pos, end: pos): row[] {
        var cellStart = (start.cell < end.cell) ? start.cell : end.cell,
            cellEnd = (start.cell > end.cell) ? start.cell : end.cell,
            rowStart = (start.row < end.row) ? start.row : end.row,
            rowEnd = (start.row > end.row) ? start.row : end.row,
            ranges = [{ start: { cell: cellStart, row: rowStart }, end: { cell: cellEnd, row: rowEnd } }];

        if (rowStart != rowEnd) {
            ranges = this.splitRange({ cell: cellStart, row: rowStart }, { cell: cellEnd, row: rowEnd });
        }

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

    /**
     * Break range from new line and return new ranges
     * @param start start of range
     * @param end end of range
     */
    public splitRange(start: pos, end: pos): range[] {
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

    /**
     * Return selected text of text
     * @param text console text data
     */
    public getSelectedText(text:row[]){
        var selectedRange = this.getSelection(text),
            startRow = selectedRange[0].start.row,
            endRow= selectedRange[0].end.row,
            outString = "";
        
        if(startRow != endRow){
            selectedRange = this.splitRange(selectedRange[0].start, selectedRange[0].end);
        }
        for (var line of selectedRange) {
            for (var y = line.start.cell; y < line.end.cell; y++) {
                outString +=text[line.start.row].data[y].text
            }
            outString += "\n";
        }
        return outString;
    }

    /**
     * Return a range of selections
     * @param text Console Text data
     */
    public getSelection(text: row[]): range[]{
        var start: pos, end: pos, started: boolean =false, found=false;

        for (var row of text) {
            for (var cell of row.data) {
                if(cell.isHighlighted && !started){
                    started = true;
                    start = {cell: cell.id, row: row.id}
                }
                else if(!cell.isHighlighted && started){
                    end = {cell: cell.id, row: row.id}
                    found = true;
                    break;
                }
            }
            if(found){
                break;
            }
        }
        return [{start: start, end: end}]
    }
}

export class range {
    start: pos;
    end: pos;
}
