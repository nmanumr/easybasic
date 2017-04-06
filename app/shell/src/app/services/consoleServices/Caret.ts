import { Text } from './text';
import { pos } from 'app/services/console.service';
export class Caret {

    private _type: 'block' | 'line' | 'underline';
    public position: pos = { cell: 0, row: 0 };
    public isVisible: boolean =true;
    private _colNum;

    constructor(caretType: 'block' | 'line' | 'underline', colNum: 40 | 80) {
        this._type = caretType;
        this._colNum = colNum;
    }

    /**
     * show or hide Caret
     * @param state New state of carete e.g. true(shown) or false (hidden)
     */
    public toggleCaret(state?:boolean){
        this.isVisible = (!this.isVisible) || state;
    }

    /**
     * Change current position of caret
     * @param position new position
     */
    public changeLocation(position: pos){
        this.position = position;
    }

    /**
     * Moves caret to upper line
     */
    public moveCaretUp(): pos {
        if (this.position.row > 0)
            this.position.row--;
        return this.position;
    }

    /**
     * Moves caret to lowwer line
     */
    public moveCaretDown(): pos {
        if (this.position.row + 1 < 25)
            this.position.row++;
        return this.position;
    }

    /**
     * Moves caret to right
     */
    public moveCaretRight(): pos {
        if(this.position.cell ==this._colNum-1 && this.position.row == 24){
            return this.position;
        }
        if (this.position.cell  < this._colNum-1)
            this.position.cell++;
        else
            this.position = { row: this.position.row + 1, cell: 0 }
        return this.position;
    }

    /**
     * Moves caret to left
     */
    public moveCaretLeft(): pos {
        if(this.position.cell ==0 && this.position.row == 0){
            return this.position;
        }
        if (this.position.cell > 0)
            this.position.cell--;
        else
            this.position = { row: this.position.row - 1, cell: this._colNum - 1 }
        return this.position;
    }

    /** Move caret to start of line considering the line wraps */
    moveCaretToHome(text: Text): pos {
        this.position = text.getStartofLine(this.position.row);
        return this.position;
    }
    moveCaretToEnd(text: Text): pos {
        this.position = text.getEndofLine(this.position.row);
        return this.position;
    }
    moveCaretToNextChar(text: Text): pos {
        var letters = /[a-z0-9]/i;
        var charEnded = false, i, j;

        for (i = this.position.row; i < 25; i++) {
            var found = false
            for (j = (i == this.position.row) ? this.position.cell : 0; j < this._colNum; j++) {
                var matchedPos = text.data[i].data[j].text.search(letters);
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
        if (i == 25 && j == this._colNum) {

        }
        else {
            this.position.cell = j;
            this.position.row = i;
        }
        return this.position;
    }
    moveCaretToPreviousChar(text: Text): pos {
        var x = this.position.cell - 1, y, charEnded, found;
        for (y = this.position.row; y > -1; y--) {
            for (x; x > 0; x--) {
                var char: string = text.data[y].data[x].text;
                var previousChar = text.data[y].data[x - 1].text;
                if (char == '\u00A0' || char == '\u2000' || char == '\u2007') {
                    charEnded = true;
                    continue;
                }
                if (previousChar == '\u00A0' && charEnded && char.match(/^[a-z0-9]+/i)) {
                    found = true;
                    break;
                }
            }
            if (found)
                break;
            else
                x = this._colNum - 1;
        }
        this.position.cell = x;
        this.position.row = y;
        return this.position;
    }
    
}