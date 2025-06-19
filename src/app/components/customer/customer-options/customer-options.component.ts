import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerOption } from 'src/app/enum/customer-option.enum';

@Component({
  selector: 'app-customer-options',
  templateUrl: './customer-options.component.html',
  styleUrl: './customer-options.component.scss'
})
export class CustomerOptionsComponent implements OnInit {

  @ViewChild('box') box: ElementRef; 

  customerOptions = CustomerOption;
  selectedCustomerOption: CustomerOption;

  get selectedOptionTitle(): string {
    let selectedOptionTitle = '';

    if(this.selectedCustomerOption === this.customerOptions.contactPreferences){
      selectedOptionTitle = 'Preferencias de contacto';
    }
    
    return selectedOptionTitle;
  }

  ngOnInit(): void {
    this.selectedCustomerOption = this.customerOptions.contactPreferences;
  }

  isMenuActive: boolean;
  switch(): void {
    this.isMenuActive = !this.isMenuActive;

    if(this.isMenuActive){
      this.box.nativeElement.classList.add('active');
    }
    else{
      this.box.nativeElement.classList.remove('active');
    }
  }
}
