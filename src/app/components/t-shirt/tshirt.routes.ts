import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const tshirtRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./designer/designer.component').then(x => x.DesignerComponent),
        canActivate: [MsalGuard]
    }
];