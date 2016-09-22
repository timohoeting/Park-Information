import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from './components/start/start.component';
import { SiteComponent } from './components/site/site.component';


const appRoutes: Routes = [
    {path:'', component:StartComponent},
    {path:'site/:id', component: SiteComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
