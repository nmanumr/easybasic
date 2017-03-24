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

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    StatusbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  providers: [LinksServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }