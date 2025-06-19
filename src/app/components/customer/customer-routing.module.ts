import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOptionsComponent } from './customer-options/customer-options.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
    {path: '', component: CustomerOptionsComponent, canActivate: [MsalGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerRoutingModule { }
