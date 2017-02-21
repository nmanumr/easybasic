import { ConsoleService } from './services/console.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { TitleBarComponent } from './layout/title-bar/title-bar.component';
import { TabsComponent } from './layout/tabs/tabs.component';
import { InlineEdit } from './components/inline-edit.component';
import { TabsService } from './services/tabs.service';
import { ConsoleComponent } from './console/console/console.component';
import { StatusbarComponent } from './layout/statusbar/statusbar.component'

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    TabsComponent,
    InlineEdit,
    ConsoleComponent,
    StatusbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [TabsService, ConsoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
