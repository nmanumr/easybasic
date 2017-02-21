import { TabsService } from './../../services/tabs.service';
import { tab } from '../../services/tabs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  count: number = 1;
  tabs: tab[];

  constructor( private tabsService : TabsService ) { }

  getTabs(): void {
    this.tabsService.getTabs().then(tabs => this.tabs = tabs);
  }

  ngOnInit() {
    this.getTabs()
  }

  removeTab(tab:tab){
    this.tabsService.removeTab(tab);
  }

  changeTab(tab:tab){
    this.tabsService.setActive(tab);
  }

  newTab(){
    this.count ++;
    var newTab = new tab;
    newTab.active = false;
    newTab.data = null;
    newTab.isCloseable = true;
    newTab.title = "Console "+ this.count;
    this.tabsService.addTab(newTab);
    this.tabsService.setActive(newTab);
  }

  changeTabTitle(text, tab){
    console.log(text);

  }

}

