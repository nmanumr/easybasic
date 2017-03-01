import { Injectable } from '@angular/core';

@Injectable()
export class MiniPaneService {

  miniPaneItems: [miniPaneItem];


  constructor() {
    this.miniPaneItems = [
      { id: 'home', icon: "home", text: "Home" },
      { id: 'editor', icon: "note", text: "Editor", isActive: true }
    ]
  }

  getCurrentActive(): miniPaneItem {
    var active;
    for (var i = 0; i < this.miniPaneItems.length; i++) {
      if (this.miniPaneItems[i].isActive) {
        active = this.miniPaneItems[i];
        break;
      }
    }
    return active;
  }

  setUnactive(item: miniPaneItem): void {
    item.isActive = false;
  }

  setActive(item: miniPaneItem): void {
    var index = this.miniPaneItems.indexOf(item);
    this.setUnactive(this.getCurrentActive());
    this.miniPaneItems[index].isActive = true;
  }

}
class miniPaneItem {
  id: string;
  icon: string;
  text: string;
  isActive?: boolean;
  isVisible?: boolean;
  notification?: string;
}