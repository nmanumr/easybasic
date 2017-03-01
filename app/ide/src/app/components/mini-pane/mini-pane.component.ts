import { MiniPaneService } from './../../services/mini-pane.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mini-pane',
  templateUrl: './mini-pane.component.html',
  styleUrls: ['./mini-pane.component.css']
})
export class MiniPaneComponent implements OnInit {

  miniPaneItems:any;
  constructor(private miniPaneService: MiniPaneService) { }

  ngOnInit() {
    this.miniPaneItems = this.miniPaneService.miniPaneItems;
  }

  setActive(item){
    this.miniPaneService.setActive(item);
  }
}
