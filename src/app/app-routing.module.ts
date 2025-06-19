import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: () => import('./components/home/home.module').then(x => x.HomeModule)},
    {path: 'customizer', loadChildren: () => import('./components/t-shirt/t-shirt.module').then(x => x.TShirtModule)},
    {path: 'customer-options', loadChildren: () => import('./components/customer/customer.module').then(x => x.CustomerModule)}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 120], // optional: offset from top (e.g., header height)
      scrollPositionRestoration: 'enabled',
    })
  ]
})
export class AppRoutingModule { }
