import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-small-header',
  templateUrl: './small-header.component.html',
  styleUrls: ['./small-header.component.css']
})
export class SmallHeaderComponent implements OnInit {

  @Input('header-title') title: string;
  @Input('desc') desc: string;

  constructor() { }

  ngOnInit() {
  }

}
