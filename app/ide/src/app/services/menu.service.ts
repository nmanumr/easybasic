import { Injectable } from '@angular/core';
declare var electron: any;

@Injectable()
export class MenuService {
  menu: [menu];

  constructor() {

    this.menu = [
      {
        id: "file", text: "File", items: [
          { id: "newfile", text: "New File", hotkey: "CTRL + N" },
          { id: "newWindow", text: "New Window", hotkey: "CTRL + SHIFT + N" },
          { id: "s1", type: 'separator'},
          { id: "openfile", text: "Open File"},
          { id: "openfolder", text: "Open Folder"},
          { id: "openfolder", text: "Open Recent"},
          { id: "s2", type: 'separator'},
          { id: "savefile", text: "Save", hotkey: "CTRL + S" },
          { id: "saveas", text: "Save as...", hotkey: "CTRL + SHIFT + S" },
          { id: "saveall", text: "Save All"},
          { id: "s3", type: 'separator'},
          { id: "closefile", text: "Close File", hotkey: "CTRL + F4" },
          { id: "closeWindow", text: "Close Window"},
          { id: "exit", text: "Exit", hotkey: "ALT + F4" },

          { id: "n1ewfile", text: "New File", hotkey: "CTRL + N" },
          { id: "n1ewWindow", text: "New Window", hotkey: "CTRL + SHIFT + N" },
          { id: "s11", type: 'separator'},
          { id: "o1penfile", text: "Open File"},
          { id: "o1penfolder", text: "Open Folder"},
          { id: "o1penfolder", text: "Open Recent"},
          { id: "s12", type: 'separator'},
          { id: "s1avefile", text: "Save", hotkey: "CTRL + S" },
          { id: "s1aveas", text: "Save as...", hotkey: "CTRL + SHIFT + S" },
          { id: "s1aveall", text: "Save All"},
          { id: "s13", type: 'separator'},
          { id: "c1losefile", text: "Close File", hotkey: "CTRL + F4" },
          { id: "c1loseWindow", text: "Close Window"},
          { id: "e1xit", text: "Exit", hotkey: "ALT + F4" },

          { id: "s2aveas", text: "Save as...", hotkey: "CTRL + SHIFT + S" },
          { id: "s2aveall", text: "Save All"},
          { id: "s23", type: 'separator'},
          { id: "c2losefile", text: "Close File", hotkey: "CTRL + F4" },
          { id: "c2loseWindow", text: "Close Window"},
          { id: "e2xit", text: "Exit", hotkey: "ALT + F4" }
        ]
      },
      {
        id: "edit", text: "Edit", items: [
          { id: "", text: "New File" }
        ]
      },
      {
        id: "selection", text: "Selection", items: [
          { id: "", text: "New File" }
        ]
      },
      {
        id: "view", text: "View", items: [
          { id: "", text: "New File" }
        ]
      },
      {
        id: "go", text: "Go", items: [
          { id: "", text: "New File" }
        ]
      },
      {
        id: "help", text: "Help", items: [
          { id: "", text: "New File" }
        ]
      }
    ]

  }

  getMenuJson() {
    console.log(this.menu)
    return this.menu;
  }

  execute(id: string) {
    console.log(id);
  }

}
class menuItem {
  id: string;
  text?: string;
  img?: string;
  imgdis?: string;
  enabled?: boolean;
  hotkey?: string;
  userdata?: Object;
  items?: [menuItem];

  type?: string;
}
class menu {
  id: string;
  text: string;
  items: [menuItem];
}