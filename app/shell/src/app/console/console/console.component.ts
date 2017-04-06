import { Text } from './../../services/consoleServices/text';
import { Sessions } from './../../services/consoleServices/session';
import { ConsoleService, pos } from './../../services/console.service';
import { row, cell } from './../../services/consoleCell';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
  host: {
    '(document:keypress)': 'this.sessions.activeSession.inputHandler.handleKeyboardEvents($event)',
    '(document:keydown)': 'this.sessions.activeSession.inputHandler.moveCaret($event)'
  }
})
export class ConsoleComponent implements OnInit {

  @Input('rows') rowNum: number;
  @Input('cols') colNum: 40 | 80;
  @Input('caretText') caretText: string;
  @ViewChild('copytextarea') copytextarea: ElementRef;
  @ViewChild('drawingCanvas') drawingCanvas: ElementRef;
  


  text: Text;
  shiftPressed: boolean = false;
  selectionStartIndex: pos;
  caret;

  sessions: Sessions;


  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {
    let drawingCanvas: ElementRef = this.drawingCanvas;
    // initialize Session
    this.sessions = new Sessions();
    this.sessions.createNew("console1", "Console", drawingCanvas, this.copytextarea);
    



    
    this.text = this.sessions.activeSession.console.text;
    this.caret = this.sessions.activeSession.console.caret;
  }

  // selectWord(pos: pos) {
  //   var endPosition = this.consoleService.text.getEndOfWord(pos);
  //   var startPosition = this.consoleService.text.getStartOfWord(pos);
  //   this.consoleService.TextData = this.consoleService.selections.selectRange(this.consoleService.TextData, startPosition, endPosition);
  // }

  // deselectAll(pos: pos, e?) {
  //   this.consoleService.TextData = this.consoleService.selections.selectNone(this.consoleService.TextData);
  // }

  getBackcolor(pos: pos) {
    var isHighlighted = this.text.data[pos.row].data[pos.cell].isHighlighted;
    return (isHighlighted) ? this.text.data[pos.row].data[pos.cell].forecolor
      : this.text.data[pos.row].data[pos.cell].backcolor;
  }

  getForecolor(pos: pos) {
    var isHighlighted = this.text.data[pos.row].data[pos.cell].isHighlighted;
    return (isHighlighted) ? this.text.data[pos.row].data[pos.cell].backcolor
      : this.text.data[pos.row].data[pos.cell].forecolor;
  }

}
