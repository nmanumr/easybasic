import { MenuService } from './../../services/menu.service';
import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
declare var dhtmlXMenuObject: any;

@Component({
  selector: 'doc-bar',
  templateUrl: './doc-bar.component.html',
  styleUrls: ['./doc-bar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        width: "50px"
      })),
      state('out', style({
        width: "100px"
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class DocBarComponent implements OnInit {
  myMenu: any;
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.myMenu = new dhtmlXMenuObject({
      parent: "menuObj",
      json: this.menuService.getMenuJson(),
      onload: function () {

      },
      overflow: "auto",
				visible_area: {
					x1: 0,
					x2: (window.screen.width),
					y1: 30,
					y2: (window.screen.height - 100)
				}
    });

    this.myMenu.attachEvent("onClick", function (id, zoneId, cas) {
      MenuService.prototype.execute(id);
    });
  }



  menuState: string = 'in';

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
