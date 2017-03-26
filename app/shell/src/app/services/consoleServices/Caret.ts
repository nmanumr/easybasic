import { text } from './text';
import { pos } from 'app/services/console.service';
export class caret {

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
    
}