import { DownloadsComponent } from './downloads/downloads/downloads.component';
import { BlogComponent } from './blog/blog/blog.component';
import { ServicesIndexComponent } from './services/services-index/services-index.component';
import { homeRoutes } from './home/home.routes';
import { IndexComponent } from './home/index/index.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
    path: 'services',
    component: ServicesIndexComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'downloads',
    component: DownloadsComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
