// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import  { userRoutes, sessionRoutes, testRoutes } from './_routes/index';


// Route Configuration
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/user',
        pathMatch: 'full'
    },
    // Add dog routes form a different file
    ...userRoutes,
    ...sessionRoutes,
    ...testRoutes
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
