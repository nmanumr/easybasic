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


    this.consoleService.write('BASIC console');
    this.consoleService.insertLine();
    this.consoleService.write('Written by: Nauman Umer');
    this.consoleService.insertLine();
    this.consoleService.insertLine();
    this.consoleService.write('abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    this.consoleService.insertLine();
    this.consoleService.write('1234567890.:,;\'"(!?)+-*/=');
    this.consoleService.insertLine();
    this.consoleService.write('The quick brown fox jumps over a lazy dog. 1234567890');
  }

  getBackcolor(pos:pos){
    var isHighlighted= this.consoleService.consoleData[pos.row].data[pos.cell].isHighlighted;
    return (isHighlighted) ? this.consoleService.consoleData[pos.row].data[pos.cell].forecolor
      : this.consoleService.consoleData[pos.row].data[pos.cell].backcolor;
  }

  getForecolor(pos:pos){
    var isHighlighted= this.consoleService.consoleData[pos.row].data[pos.cell].isHighlighted;
    return (isHighlighted) ? this.consoleService.consoleData[pos.row].data[pos.cell].backcolor
      : this.consoleService.consoleData[pos.row].data[pos.cell].forecolor;
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    var keycode = event.keyCode;
    var charCode = event.char;
    if ((keycode > 47 && keycode < 58) ||
      (keycode > 64 && keycode < 91) ||
      (keycode > 95 && keycode < 112) ||
      (keycode > 185 && keycode < 193) ||
      (keycode > 218 && keycode < 223) || keycode == 32) {
      var char = String.fromCharCode(event.charCode);
        console.log(char);
      this.consoleService.write(char);
      event.preventDefault();
    }
    else if (keycode == 13) {
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

    else if(event.shiftKey){
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
