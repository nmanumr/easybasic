import { basicColors } from './colors';
import { ElementRef } from '@angular/core';
import { Selection } from './selection';
import { Caret } from './Caret';
import { Drawings, Color } from './drawing';
import { Text } from './text';

export class Console {

    public text: Text;
    public graphics: Drawings;
    public caret: Caret;
    public selection: Selection;
    public colors: basicColors;

    constructor(consoleWidth: 40| 80, Canvas: ElementRef){
        this.colors = new basicColors("text");
        this.caret = new Caret("block", consoleWidth);
        this.selection = new Selection(consoleWidth);
        this.text = new Text(consoleWidth, this.colors, this.caret, this.selection);
        this.graphics = new Drawings(Canvas, consoleWidth, "cga");
    }

}