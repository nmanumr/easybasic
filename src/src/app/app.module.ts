import { DownloadComponent } from './home/download/download.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './home/index/index.component';
import { HeaderComponent } from './header/header.component';
import { IntroComponent } from './home/intro/intro.component';
import { AppsComponent } from './home/apps/apps.component';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { NewsletterComponent } from './home/newsletter/newsletter.component';
import { TestimonialComponent } from './home/testimonial/testimonial.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './home/contact/contact.component';
import { TryComponent } from './home/try/try.component';
import { ServicesIndexComponent } from './services/services-index/services-index.component';
import { SmallHeaderComponent } from './small-header/small-header.component';
import { BlogComponent } from './blog/blog/blog.component';
import { DownloadsComponent } from './downloads/downloads/downloads.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    IntroComponent,
    AppsComponent,
    NewsletterComponent,
    DownloadComponent,
    TestimonialComponent,
    FooterComponent,
    ContactComponent,
    TryComponent,
    ServicesIndexComponent,
    SmallHeaderComponent,
    BlogComponent,
    DownloadsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
