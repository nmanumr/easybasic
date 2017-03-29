import { ConsoleService, pos } from './../../services/console.service';
import { row, cell } from './../../services/consoleCell';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
  host: {
    '(document:keypress)': 'handleKeyboardEvents($event)',
    '(document:keydown)': 'moveCaret($event)'
  }
})
export class ConsoleComponent implements OnInit {

  @Input('rows') rowNum: number;
  @Input('cols') colNum: 40 | 80;
  @Input('caretText') caretText: string;
  @ViewChild('copytextarea') copytextarea: any;


  textData: row[];
  shiftPressed: boolean = false;
  selectionStartIndex: pos;


  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.initConsoleData(this.colNum);
    this.textData = this.consoleService.TextData;
    this.consoleService.caret.position;


    this.consoleService.write("   Forecolors   Forecolors Blink   Backcolors")
    this.consoleService.insertLine();
    this.consoleService.write("┌──────┬───────┐┌──────┬───────┐┌──────┬───────┐")
    this.consoleService.insertLine();
    this.consoleService.write("│ Code │ Color ││ Code │ Color ││ Code │ Color │")
    this.consoleService.insertLine();
    this.consoleService.write("├──────┼───────┤├──────┼───────┤├──────┼───────┤")
    this.consoleService.insertLine();

    // forecolors
    for (var i = 0; i < 16; i++) {
      this.consoleService.write(`│  ${(i < 10) ? '0' + i.toString() : i.toString()}  │   `);
      this.consoleService.write("██", i);
      this.consoleService.write("  │");
      this.consoleService.insertLine();
    }
    this.consoleService.write("└──────┴───────┘└──────┴───────┘")

    // blinking forecolors
    for (var i = 16; i < 32; i++) {
      this.consoleService.caret.changeLocation({ row: 4 + i - 16, cell: 16 })
      this.consoleService.write(`│  ${i}  │   `);
      this.consoleService.write("██", i);
      this.consoleService.write("  │");
    }

    // back colors
    for (var i = 0; i < 8; i++) {
      this.consoleService.caret.changeLocation({ row: 4 + i, cell: 32 })
      this.consoleService.write(`│  ${(i < 10) ? '0' + i.toString() : i.toString()}  │   `);
      this.consoleService.write("  ", 15, i);
      this.consoleService.write("  │");
    }
    this.consoleService.caret.changeLocation({ row: 12, cell: 32 })
    this.consoleService.write("└──────┴───────┘");




    //this.consoleService.toggleCaret();
  }

  selectWord(pos: pos) {
    var endPosition = this.consoleService.text.getEndOfWord(pos);
    var startPosition = this.consoleService.text.getStartOfWord(pos);
    this.consoleService.TextData = this.consoleService.selections.selectRange(this.consoleService.TextData, startPosition, endPosition);
  }

  deselectAll(pos: pos, e?) {
    this.consoleService.TextData = this.consoleService.selections.selectNone(this.consoleService.TextData);
  }

  getBackcolor(pos: pos) {
    var isHighlighted = this.consoleService.TextData[pos.row].data[pos.cell].isHighlighted;
    return (isHighlighted) ? this.consoleService.TextData[pos.row].data[pos.cell].forecolor
      : this.consoleService.TextData[pos.row].data[pos.cell].backcolor;
  }

  getForecolor(pos: pos) {
    var isHighlighted = this.consoleService.TextData[pos.row].data[pos.cell].isHighlighted;
    return (isHighlighted) ? this.consoleService.TextData[pos.row].data[pos.cell].backcolor
      : this.consoleService.TextData[pos.row].data[pos.cell].forecolor;
  }

  copySelection() {
    var text = this.consoleService.selections.getSelectedText(this.consoleService.TextData);
    let _copytextarea = this.copytextarea.nativeElement;
    _copytextarea.value = text;
    _copytextarea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  }

  handleKeyboardEvents(event: KeyboardEvent) {
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
      this.consoleService.write(char);
      event.preventDefault();
    }
    else if (charCode == 13) {
      this.consoleService.insertLine();
      event.preventDefault();
    }

  }

  moveCaret(event: KeyboardEvent) {
    var keycode = event.which;

    if ((keycode == 67) && event.ctrlKey) { // Ctrl+C
      this.copySelection();
    }
    else if ((keycode == 88) && event.ctrlKey) { // Ctrl+X
      this.copySelection();
      if (this.consoleService.selections.getSelection(this.consoleService.TextData)[0].start) {
        this.consoleService.deleteSelected();
      }
    }
    else if((keycode == 86) && event.ctrlKey){ // CTRL + V
      let _copytextarea = this.copytextarea.nativeElement;
      _copytextarea.focus();
      _copytextarea.select();
      document.execCommand('Paste');
      this.consoleService.write(_copytextarea.value);
    }
    else if ((keycode == 46 || keycode == 8) && this.consoleService.selections.getSelection(this.consoleService.TextData)[0].start) {
      //delete seletion
      this.consoleService.deleteSelected();
    }

    if (event.shiftKey && !this.shiftPressed) {
      this.shiftPressed = true;
      this.selectionStartIndex = JSON.parse(JSON.stringify(this.consoleService.caret.position));
    }
    else if (!event.shiftKey && this.shiftPressed) {
      this.shiftPressed = false;
    }
    this.consoleService.TextData = this.consoleService.selections.selectNone(this.consoleService.TextData);

    if (!event.ctrlKey && !event.altKey) {
      switch (keycode) {
        case 35: // end
          this.consoleService.moveCaretToEnd();
          if (this.shiftPressed) {
            this.consoleService.TextData = this.consoleService.selections.selectRange(
              this.consoleService.TextData,
              this.selectionStartIndex,
              this.consoleService.caret.position
            );
          }
          event.preventDefault();
          break;

        case 36: // home
          this.consoleService.moveCaretToHome();
          if (this.shiftPressed) {
            this.consoleService.TextData = this.consoleService.selections.selectRange(
              this.consoleService.TextData,
              this.consoleService.caret.position,
              this.selectionStartIndex
            );
          }
          event.preventDefault();
          break;

        case 37: // left
          this.consoleService.caret.moveCaretLeft();
          if (this.shiftPressed) {
            this.consoleService.TextData = this.consoleService.selections.selectRange(
              this.consoleService.TextData,
              this.selectionStartIndex,
              this.consoleService.caret.position
            );
          }
          event.preventDefault();
          break;


        case 38: // up
          this.consoleService.caret.moveCaretUp();
          if (this.shiftPressed) {
            this.consoleService.TextData = this.consoleService.selections.selectRange(
              this.consoleService.TextData,
              this.selectionStartIndex,
              this.consoleService.caret.position
            );
          }
          event.preventDefault();
          break;

        case 39: // right
          this.consoleService.caret.moveCaretRight();
          if (this.shiftPressed) {
            this.consoleService.TextData = this.consoleService.selections.selectRange(
              this.consoleService.TextData,
              this.selectionStartIndex,
              this.consoleService.caret.position
            );
          }
          event.preventDefault();
          break;


        case 40: // down
          this.consoleService.caret.moveCaretDown();
          if (this.shiftPressed) {
            this.consoleService.TextData = this.consoleService.selections.selectRange(
              this.consoleService.TextData,
              this.consoleService.caret.position,
              this.selectionStartIndex
            );
          }
          event.preventDefault();
          break;

        case 8: // backspace
          this.consoleService.deleteLeft();
          if (this.shiftPressed) {
            this.consoleService.TextData = this.consoleService.selections.selectRange(
              this.consoleService.TextData,
              this.selectionStartIndex,
              this.consoleService.caret.position
            );
          }
          event.preventDefault();
          break;

        case 46: // delete
          this.consoleService.deleteRight();
          if (this.shiftPressed) {
            this.consoleService.TextData = this.consoleService.selections.selectRange(
              this.consoleService.TextData,
              this.selectionStartIndex,
              this.consoleService.caret.position
            );
          }
          event.preventDefault();
          break;

        default:
          break;
      }

    }

    else if ((keycode == 67) && event.ctrlKey && event.shiftKey) { // Ctrl+Shift+C
      this.consoleService.clearScreen();
      event.preventDefault();
      return;
    }

    else if ((keycode == 39) && event.ctrlKey) { // Ctrl+Right
      this.consoleService.moveCaretToNextChar();
      event.preventDefault();
      return;
    }
    else if ((keycode == 37) && event.ctrlKey) { // Ctrl+left
      this.consoleService.moveCaretToPreviousChar();
      event.preventDefault();
      return;
    }
  }


}
