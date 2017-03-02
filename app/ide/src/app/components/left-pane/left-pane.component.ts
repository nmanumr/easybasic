import { MiniPaneService } from './../../services/mini-pane.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'left-pane',
  templateUrl: './left-pane.component.html',
  styleUrls: ['./left-pane.component.css']
})
export class LeftPaneComponent implements OnInit {

  Tabs;

  constructor(private miniPaneService: MiniPaneService) { }

  ngOnInit() {
    this.Tabs = this.miniPaneService.miniPaneItems;
  }

  ngDoCheck(){
    if(this.Tabs != this.miniPaneService.miniPaneItems){
      this.Tabs = this.miniPaneService.miniPaneItems;
    }

  }

}
