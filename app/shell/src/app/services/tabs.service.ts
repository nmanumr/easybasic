import { tab } from './tabs';
import { Injectable } from '@angular/core';

@Injectable()
export class TabsService {

  

  constructor() { }

  getTabs(): Promise<tab[]> {
    return Promise.resolve(this.tabs);
  }

  getActive(): tab {
    return this.tabs.filter(function (obj) {
      return obj.active === true;
    })[0];
  }

  setActive(tab: tab): void {
    var activeObject = this.getActive();
    if(activeObject){

        this.lastActive = activeObject;

      activeObject['active'] = false;
    }
    var object = this.tabs[this.tabs.indexOf(tab)];
    object['active'] = true;
    
  }

  removeTab(tab: tab): void {
    if(this.lastActive)
      this.setActive(this.lastActive);
    else
      this.setActive(this.tabs[0]);
    var index = this.tabs.indexOf(tab);
    if (index > -1)
      this.tabs.splice(index, 1);
  }

  addTab(tab: tab): void {
    this.tabs.push(tab);
  }

  changeTabTitle(text, tab){
    var index = this.tabs.indexOf(tab);
    if(index >-1){
      var object = this.tabs[index];
      object['title'] = text;

    }
  }

  tabs: tab[] = [
    { title: 'Console', isCloseable: true, data: null, active: true }
  ];

  lastActive: tab = this.tabs[0];
}