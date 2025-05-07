import { Component, OnInit } from '@angular/core';
import { CustomerOption } from 'src/app/enum/customer-option.enum';
import { CustomerContactPreferencesComponent } from '../customer-contact-preferences/customer-contact-preferences.component';
import { CommonModule } from '@angular/common';
import { CustomerAddressesComponent } from '../customer-addresses/customer-addresses.component';

@Component({
  selector: 'app-customer-options',
  standalone: true,
  imports: [CommonModule, CustomerContactPreferencesComponent, CustomerAddressesComponent],
  templateUrl: './customer-options.component.html',
  styleUrl: './customer-options.component.scss'
})
export class CustomerOptionsComponent implements OnInit {

  customerOptions = CustomerOption;
  selectedCustomerOption: CustomerOption;

  ngOnInit(): void {
    this.selectedCustomerOption = this.customerOptions.contactPreferences;
  }

  test():void{
    alert('ppas')
  }
}
