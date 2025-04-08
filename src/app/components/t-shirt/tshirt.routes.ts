import { Routes } from '@angular/router';

export const tshirtRoutes: Routes = [
    {path: '', loadComponent: () => import('./designer/designer.component').then(x => x.DesignerComponent)}
];