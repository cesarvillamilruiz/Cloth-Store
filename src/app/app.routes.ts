import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./components/home/home.routes').then(x => x.homeRoutes)},
    {path: 'customizer', loadChildren: () => import('./components/t-shirt/tshirt.routes').then(x => x.tshirtRoutes)}
];
