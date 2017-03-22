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
  @Input('cols') colNum: number;
  @Input('backcolor') backcolor: string;
  @Input('forecolor') forecolor: string;
  @Input('caretText') caretText: string;


  consoleData: row[];


  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.initConsoleData(this.rowNum, this.colNum, this.backcolor, this.forecolor);
    this.consoleData = this.consoleService.consoleData;
    this.consoleService.currentPos;

    // top bar
    this.consoleService.write('┌' + '─'.repeat(25) + '┬' + '─'.repeat(23) + '┬' + '─'.repeat(28) + '┐');
    this.consoleService.insertLine();

    // body
    for (var i = 1; i < 24; i++) {
      this.consoleService.write('│ ' + '█'.repeat(23) + ' │' + ' '.repeat(23) + '│ ' + '█'.repeat(26) + ' │');
      this.consoleService.insertLine();
    }

    // last line
    this.consoleService.write('└' + '─'.repeat(25) + '┴' + '─'.repeat(23) + '┴' + '─'.repeat(27) + '┘');

    // draw road lines
    for (var i = 1; i < 24; i++) {
      if (Math.floor(i / 3) != i / 3) {
        this.consoleService.changeLocation({ cell: 27 + 11, row: i });
        this.consoleService.write('│');
      }
    }

    // write text
    this.consoleService.changeLocation({ cell: 9, row: 3 });
    this.consoleService.write(' Driver ');
    this.consoleService.changeLocation({ cell: 50 + 11, row: 3 });
    this.consoleService.write(' Donkey ');

    this.consoleService.changeLocation({ cell: 11, row: 5 });
    this.consoleService.write(' 4 ');
    this.consoleService.changeLocation({ cell: 50 + 13, row: 5 });
    this.consoleService.write(' 0 ');

    this.consoleService.changeLocation({ cell: 50 + 4, row: 19 });
    this.consoleService.write(' Press Space bar     ');
    this.consoleService.changeLocation({ cell: 50 + 4, row: 20 });
    this.consoleService.write(' to switch lane      ');

    this.consoleService.changeLocation({ cell: 50 + 4, row: 22 });
    this.consoleService.write(' Press ESC to exit   ');

    // draw car
    var carData = ['    ▄    ', '   ███   ', '▐█■███■█▌', '   ███   ', '██■◘█◘■██', '   ███   ', '    ▀    '],
      i = 25 -1 - carData.length;
    for (var car of carData) {
      this.consoleService.changeLocation({ cell: 28, row: i });
      this.consoleService.write(car);
      i++;
    }

    // draw donkey
    var donkeyData = ['      ▄ ▄','▄█████◘█◘','▌█████▀█▀',' ▐▐ ▐▐   '],
    i =3;
    for (var donkey of donkeyData) {
      this.consoleService.changeLocation({ cell: 28+12, row: i });
      this.consoleService.write(donkey);
      i++;
    }

    this.consoleService.toggleCaret();

  }

  getBackcolor(pos: pos) {
    var isHighlighted = this.consoleService.consoleData[pos.row].data[pos.cell].isHighlighted;
    return (isHighlighted) ? this.consoleService.consoleData[pos.row].data[pos.cell].forecolor
      : this.consoleService.consoleData[pos.row].data[pos.cell].backcolor;
  }

  getForecolor(pos: pos) {
    var isHighlighted = this.consoleService.consoleData[pos.row].data[pos.cell].isHighlighted;
    return (isHighlighted) ? this.consoleService.consoleData[pos.row].data[pos.cell].backcolor
      : this.consoleService.consoleData[pos.row].data[pos.cell].forecolor;
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

    // if ((keycode > 47 && keycode < 58) || // 0-9
    //   (keycode > 64 && keycode < 91) || // A-Z
    //   (keycode > 95 && keycode < 112) || // NUMPAD 0-9 *+/.-
    //   (keycode > 185 && keycode < 193) || // ;=,-./
    //   (keycode > 218 && keycode < 223) || keycode == 32) {
    //   var char = String.fromCharCode(event.charCode);
    //   this.consoleService.write(char);
    //   event.preventDefault();
    // }
    // else if (keycode == 13) {
    //   this.consoleService.insertLine();
    //   event.preventDefault();
    // }



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
          this.consoleService.moveCaretLeft();
          event.preventDefault();
          break;


        case 38: // up
          this.consoleService.moveCaretUp();
          event.preventDefault();
          break;

        case 39: // right
          this.consoleService.moveCaretRight();
          event.preventDefault();
          break;


        case 40: // down
          this.consoleService.moveCaretDown();
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
          var start = this.consoleService.currentPos;
          var end = this.consoleService.moveCaretToEnd();
          this.consoleService.highlightRange(start, end);
          event.preventDefault();
          break;

        case 36: // home
          var end = this.consoleService.currentPos;
          var start = this.consoleService.moveCaretToHome();
          this.consoleService.highlightRange(start, end);
          event.preventDefault();
          break;

        case 37: // left
          var end = this.consoleService.currentPos;
          var start = this.consoleService.moveCaretLeft();
          this.consoleService.highlightRange(start, end);
          event.preventDefault();
          break;

        case 39: // right
          var start = this.consoleService.currentPos;
          var end = this.consoleService.moveCaretRight();;
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
