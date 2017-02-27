import { Component, OnInit } from '@angular/core';
declare var dhtmlXMenuObject: any;

@Component({
  selector: 'doc-bar',
  templateUrl: './doc-bar.component.html',
  styleUrls: ['./doc-bar.component.css']
})
export class DocBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var myMenu = new dhtmlXMenuObject({
      parent: "menuObj",
      json: [{
        id: "a", text: "Open", hotkey: "Ctrl+O", items: [
          { id: "a1", text: "Open", hotkey: "Ctrl+O" },
          { id: "a2", text: "Open", hotkey: "Ctrl+O" },
          { id: "a3", text: "Open", hotkey: "Ctrl+O" }
        ]
      }],
      onload: function () {
        // callback
      }
    });
  }

}
