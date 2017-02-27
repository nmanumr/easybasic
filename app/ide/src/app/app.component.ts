import { LinksServiceService } from './services/links-service.service';
import { Component, OnInit } from '@angular/core';
declare var electron: any;


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private linksService: LinksServiceService) { }

  startLinks = this.linksService.startLinks;
  recentLinks = this.linksService.recentLinks;
  webLinks = this.linksService.webLinks;
  quickLinks = this.linksService.quickLinks;
  //ipc: any = electron.ipcRenderer;
  ipc:any;
  ngOnInit() {

  }

  openLink(url: string) {
    if (!electron) {
      console.warn("Unable to find electron.");
      return;
    }
    var uri = this.getLocation(url);
    var app = uri.hostname;
    var path = uri.pathname;

    this.ipc.send('open-app', app, uri);
  }

  public getLocation(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
  };

}