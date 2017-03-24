import { ConsoleService, pos } from './../../services/console.service';
import { row, cell } from './../../services/consoleCell';
import { Component, OnInit, Input } from '@angular/core';

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


  textData: row[];


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
    if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
      switch (keycode) {
        case 35: // end
          this.consoleService.moveCaretToEnd();
          event.preventDefault();
          break;

        case 36: // home
          this.consoleService.moveCaretToHome();
          event.preventDefault();
          break;

        case 37: // left
          this.consoleService.caret.moveCaretLeft();
          event.preventDefault();
          break;


        case 38: // up
          this.consoleService.caret.moveCaretUp();
          event.preventDefault();
          break;

        case 39: // right
          this.consoleService.caret.moveCaretRight();
          event.preventDefault();
          break;


        case 40: // down
          this.consoleService.caret.moveCaretDown();
          event.preventDefault();
          break;

        case 8: // backspace
          this.consoleService.deleteLeft();
          event.preventDefault();
          break;

        case 46: // delete
          this.consoleService.deleteRight();
          event.preventDefault();
          break;

        default:
          break;
      }
      this.consoleService.dehighlightAll();

    }

    else if ((keycode == 67) && event.ctrlKey && event.shiftKey) { // Ctrl+Shift+C
      this.consoleService.clearScreen();
      event.preventDefault();
      return;
    }

    else if (event.shiftKey) {
      switch (keycode) {
        case 35: // end
          var start = this.consoleService.caret.position;;
          var end = this.consoleService.moveCaretToEnd();
          this.consoleService.highlightRange(start, end);
          event.preventDefault();
          break;

        case 36: // home
          var end = this.consoleService.caret.position;;
          var start = this.consoleService.moveCaretToHome();
          this.consoleService.highlightRange(start, end);
          event.preventDefault();
          break;

        case 37: // left
          var end = this.consoleService.caret.position;;
          var start = this.consoleService.caret.moveCaretLeft();
          this.consoleService.highlightRange(start, end);
          event.preventDefault();
          break;

        case 39: // right
          var start = this.consoleService.caret.position;;
          var end = this.consoleService.caret.moveCaretRight();;
          this.consoleService.highlightRange(start, end);
          event.preventDefault();
          break;

        default:
          break;
      }
    }

    else if ((keycode == 39) && event.ctrlKey) { // Ctrl+Right
      this.consoleService.moveCaretToEndOfChar();
      event.preventDefault();
      return;
    }
    else if ((keycode == 37) && event.ctrlKey) { // Ctrl+left
      this.consoleService.moveCaretToStartOfChar();
      event.preventDefault();
      return;
    }
  }


}
