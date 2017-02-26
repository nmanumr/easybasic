import { OnInit, Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var electron: any;

@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css'],

  animations: [
     trigger('titleState', [
       state('shown', style({
          'font-size': '14px'
       })),
       state('hidden', style({
          'font-size': '0px'
       })),
       transition('void => shown', animate('300ms cubic-bezier(0.39, 0.575, 0.565, 1)')),
       transition('hidden => shown', animate('300ms cubic-bezier(0.47, 0, 0.745, 0.715)'))
     ])
   ]
})
export class TitleBarComponent implements OnInit {

  
  constructor(private titleService: Title) {

  }

  ngOnInit() {
    
  }

  public closeWindow(){
    var window =electron.remote.getCurrentWindow();
    window.close();
  }

  public minimizeWindow(){
    var window =electron.remote.getCurrentWindow();
    window.minimize();
  }

  public maximizeWindow(){
    var window =electron.remote.getCurrentWindow();
    var maximized = window.isMaximized();
    (maximized)? window.unmaximize(): window.maximize(); 
  }

}
