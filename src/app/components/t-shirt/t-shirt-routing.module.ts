import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { DesignerComponent } from './designer/designer.component';

const routes: Routes = [
    {
        path: '',
        component: DesignerComponent,
        canActivate: [MsalGuard]
    }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TShirtRoutingModule { }
