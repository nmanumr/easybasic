import { Selection } from './consoleServices/selection';
import { Caret } from './consoleServices/Caret';
import { Drawings } from './consoleServices/drawing';
import { Text } from './consoleServices/text';
import { basicColors } from './consoleServices/colors';
import { row, cell } from './consoleCell';
import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ConsoleService {

    // null: \u2007
    // /s : \u00A0
    // /r : \u2000

    private _colors: basicColors;
    public text: Text;
    public caret: Caret;
    public selections: Selection;
    public drawing: Drawings;

    TextData: row[] = [];
    rowNum: number;
    colNum: 40 | 80;

    constructor() { }

    


    clearScreen() {
        this.text.clearText();
        this.caret.position = { cell: 0, row: 0 };
    }

    

}

export class pos {
    cell: number;
    row: number;
}