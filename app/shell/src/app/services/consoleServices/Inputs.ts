import { Program } from './Interpreter/Program';
import { ElementRef } from '@angular/core';
import { Selection } from './selection';
import { Caret } from './Caret';
import { Text } from './text';

export class Inputs {

    public text: Text;
    public caret: Caret;
    public selections: Selection;
    private _copytextarea;
    private shiftPressed: boolean;
    private selectionStartIndex;
    private program: Program;

    constructor(text: Text, caret: Caret, selection: Selection, copyarea: ElementRef, program: Program) {
        this.text = text;
        this.caret = caret;
        this.selections = selection;
        this._copytextarea = copyarea.nativeElement;
        this.program = program;
    }

    private copySelection() {
        var text = this.selections.getSelectedText(this.text.data);
        this._copytextarea.value = text;
        this._copytextarea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
            console.error('Oops, unable to copy');
        }
    }

    public handleKeyboardEvents(event: KeyboardEvent) {
        var keycode = event.keyCode;
        var charCode = event.charCode;

        if ((charCode >= 48 && charCode <= 57) || // 0-9
            (charCode >= 65 && charCode <= 90) || // A-Z
            (charCode >= 97 && charCode <= 122) || // a-z
            (charCode >= 123 && charCode <= 126) || // {|}~
            (charCode >= 91 && charCode <= 96) || //[\]^_`
            (charCode >= 58 && charCode <= 64) || // :;<=>?@
            (charCode >= 32 && charCode <= 47) //
        ) {
            var char = String.fromCharCode(charCode);
            this.text.write(char);
            event.preventDefault();
        }
        else if (charCode == 13) {
            var lineText = this.text.insertLine();
            this.program.addLine(lineText);
            event.preventDefault();
        }

    }

    public moveCaret(event: KeyboardEvent) {
        var keycode = event.which;

        if ((keycode == 67) && event.ctrlKey && !event.shiftKey) { // Ctrl+C
            this.copySelection();
        }
        else if ((keycode == 88) && event.ctrlKey && !event.shiftKey) { // Ctrl+X
            this.copySelection();
            if (this.selections.getSelection(this.text.data)[0].start) {
                this.text.deleteSelected();
            }
        }
        else if ((keycode == 86) && event.ctrlKey && !event.shiftKey) { // CTRL + V
            this._copytextarea.focus();
            this._copytextarea.select();
            document.execCommand('Paste');
            this.text.write(this._copytextarea.value);
        }
        else if ((keycode == 46 || keycode == 8) && this.selections.getSelection(this.text.data)[0].start) {
            //delete seletion
            this.text.deleteSelected();
        }

        if (event.shiftKey && !this.shiftPressed) {
            this.shiftPressed = true;
            this.selectionStartIndex = JSON.parse(JSON.stringify(this.caret.position));
        }
        else if (!event.shiftKey && this.shiftPressed) {
            this.shiftPressed = false;
        }
        this.text.data = this.selections.selectNone(this.text.data);

        if (!event.ctrlKey && !event.altKey) {
            switch (keycode) {
                case 35: // end
                    this.caret.moveCaretToEnd(this.text);
                    if (this.shiftPressed) {
                        this.text.data = this.selections.selectRange(
                            this.text.data,
                            this.selectionStartIndex,
                            this.caret.position
                        );
                    }
                    event.preventDefault();
                    break;

                case 36: // home
                    this.caret.moveCaretToHome(this.text);
                    if (this.shiftPressed) {
                        this.text.data = this.selections.selectRange(
                            this.text.data,
                            this.caret.position,
                            this.selectionStartIndex
                        );
                    }
                    event.preventDefault();
                    break;

                case 37: // left
                    this.caret.moveCaretLeft();
                    if (this.shiftPressed) {
                        this.text.data = this.selections.selectRange(
                            this.text.data,
                            this.selectionStartIndex,
                            this.caret.position
                        );
                    }
                    event.preventDefault();
                    break;


                case 38: // up
                    this.caret.moveCaretUp();
                    if (this.shiftPressed) {
                        this.text.data = this.selections.selectRange(
                            this.text.data,
                            this.selectionStartIndex,
                            this.caret.position
                        );
                    }
                    event.preventDefault();
                    break;

                case 39: // right
                    this.caret.moveCaretRight();
                    if (this.shiftPressed) {
                        this.text.data = this.selections.selectRange(
                            this.text.data,
                            this.selectionStartIndex,
                            this.caret.position
                        );
                    }
                    event.preventDefault();
                    break;


                case 40: // down
                    this.caret.moveCaretDown();
                    if (this.shiftPressed) {
                        this.text.data = this.selections.selectRange(
                            this.text.data,
                            this.caret.position,
                            this.selectionStartIndex
                        );
                    }
                    event.preventDefault();
                    break;

                case 8: // backspace
                    this.text.deleteLeft(this.caret.position);
                    if (this.shiftPressed) {
                        this.text.data = this.selections.selectRange(
                            this.text.data,
                            this.selectionStartIndex,
                            this.caret.position
                        );
                    }
                    event.preventDefault();
                    break;

                case 46: // delete
                    this.text.deleteRight(this.caret.position);
                    if (this.shiftPressed) {
                        this.text.data = this.selections.selectRange(
                            this.text.data,
                            this.selectionStartIndex,
                            this.caret.position
                        );
                    }
                    event.preventDefault();
                    break;

                default:
                    break;
            }

        }

        else if ((keycode == 39) && event.ctrlKey) { // Ctrl+Right
            this.caret.moveCaretToNextChar(this.text);
            event.preventDefault();
            return;
        }
        else if ((keycode == 37) && event.ctrlKey) { // Ctrl+left
            this.caret.moveCaretToPreviousChar(this.text);
            event.preventDefault();
            return;
        }
    }
}