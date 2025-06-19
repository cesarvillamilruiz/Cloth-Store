import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerContactPreferencesComponent } from './customer-contact-preferences/customer-contact-preferences.component';
import { CustomerOptionsComponent } from './customer-options/customer-options.component';
import { CustomerAddressesComponent } from './customer-addresses/customer-addresses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';

const components = [
  CustomerOptionsComponent,
  CustomerContactPreferencesComponent,
  CustomerAddressesComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
