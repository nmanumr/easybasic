import { Component, OnInit } from '@angular/core';
declare var location: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public isActive(path) {
    return location.pathname == path;
  }

}
