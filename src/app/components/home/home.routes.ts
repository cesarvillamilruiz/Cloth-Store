import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {path: '', loadComponent: () => import('./landing/landing.component').then(x => x.LandingComponent)}
];