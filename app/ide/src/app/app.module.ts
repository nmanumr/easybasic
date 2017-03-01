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
import { MenuService } from './services/menu.service';
import { MiniPaneService } from './services/mini-pane.service';
import { DocBarComponent } from './layout/doc-bar/doc-bar.component';
import { LeftPaneComponent } from './components/left-pane/left-pane.component';
import { MiniPaneComponent } from './components/mini-pane/mini-pane.component';
import { EditorPaneComponent } from './components/editor-pane/editor-pane.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    StatusbarComponent,
    SplitComponent,
    DocBarComponent,
    LeftPaneComponent,
    MiniPaneComponent,
    EditorPaneComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [MiniPaneService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
