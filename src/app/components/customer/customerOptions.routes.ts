import { Routes } from '@angular/router';

export const customerOptionsRoutes: Routes = [
    {path: '', loadComponent: () => import('./customer-options/customer-options.component').then(x => x.CustomerOptionsComponent)}
];