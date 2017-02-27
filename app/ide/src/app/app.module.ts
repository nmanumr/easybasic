import { SplitComponent } from './components/spliter/spliter/split.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { TitleBarComponent } from './layout/title-bar/title-bar.component';
import { StatusbarComponent } from './layout/statusbar/statusbar.component';
import { LinksServiceService } from './services/links-service.service';
import { DocBarComponent } from './layout/doc-bar/doc-bar.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    StatusbarComponent,
    SplitComponent,
    DocBarComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [LinksServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
