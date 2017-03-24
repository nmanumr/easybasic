import { ConsoleService } from './../../services/console.service';
import { Component, OnInit } from '@angular/core';
declare var electron: any;
declare var fs: any;

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  private dialog = electron.remote.dialog;
  private currentWindow = electron.remote.getCurrentWindow()

  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {
  }

  public addfiles() {
    
  }

  public addfolder() {
    
  }

  public select(type: 'a' | 'i' | 'n') {
    
  }

  public delete() {
    
  }
}
