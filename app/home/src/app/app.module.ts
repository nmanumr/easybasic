import { docbarComponent } from './layout/doc-bar/doc-bar.component';
import { ConsoleService } from './services/console.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularSplitModule } from 'angular-split';
import { AppComponent } from './app.component';
import { ExpansionPanelsModule } from 'ng2-expansion-panels';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { TitleBarComponent } from './layout/title-bar/title-bar.component';
import { TabsService } from './services/tabs.service';
import { ConsoleComponent } from './console/console/console.component';
import { StatusbarComponent } from './layout/statusbar/statusbar.component'

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    docbarComponent,
    ConsoleComponent,
    StatusbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularSplitModule,
    ExpansionPanelsModule
  ],
  providers: [TabsService, ConsoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
