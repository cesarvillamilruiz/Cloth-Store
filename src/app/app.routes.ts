import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./components/home/home.routes').then(x => x.homeRoutes)},
    {path: 'customizer', loadChildren: () => import('./components/t-shirt/tshirt.routes').then(x => x.tshirtRoutes)},
    {path: 'customer-options', loadChildren: () => import('./components/customer/customerOptions.routes').then(x => x.customerOptionsRoutes)}
];
