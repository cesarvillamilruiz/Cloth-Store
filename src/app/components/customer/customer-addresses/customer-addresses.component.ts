import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressType } from 'src/app/enum/address-type.enum';
import { Address } from 'src/app/model/Address/Address.model';
import { AddressService } from 'src/app/services/address/address.service';
import { LoadingService } from 'src/app/services/shared/loading/loading.service';

@Component({
  selector: 'app-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrl: './customer-addresses.component.scss'
})
export class CustomerAddressesComponent implements OnInit {
  
  form: FormGroup;
  addresses: Address[] = [];
  selectedAddress: Address;
  addressType = AddressType;
  showAddressForm: boolean;
    
  constructor(private fb: FormBuilder,
    private addressService: AddressService,
    private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.getAddresses();
  }

  onSubmit() {
    const address = this.form.value as Address;
    if(!address?.addressId || address.addressId === '00000000-0000-0000-0000-000000000000'){
      this.insert(address);
    }
    else{      
      this.update(address);
    }
  }

  insert(address: Address): void{
    this.loadingService.show();
    this.addressService.insertAddress(address).subscribe({
      next: (addresses: Address[]) => {
        this.showAddressForm = false;
        this.selectedAddress = new Address();

        this.addresses = addresses;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      },
      complete: () => {
        this.loadingService.hide();
      }
    });
  }

  update(address: Address): void{
    this.loadingService.show();
    this.addressService.updateAddress(address).subscribe({
      next: (addresses: Address[]) => {
        this.showAddressForm = false;
        this.selectedAddress = new Address();

        this.addresses = addresses;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      },
      complete: () => {
        this.loadingService.hide();
      }
    });
  }

  createAddress(): void{
    this.selectedAddress = new Address();
    this.selectedAddress.type = this.addresses.length ? AddressType.shipping : AddressType.billing;
    this.setForm();
    this.showAddressForm = true;    
  }

  editAddress(address: Address): void{
    this.selectedAddress = address;
    this.setForm();
    this.showAddressForm = true;
  }

  deleteAddress(addressId: string): void{
    this.loadingService.show();
    this.addressService.deleteAddress(addressId).subscribe(
      {
        next: (addresses: Address[]) => {
          this.addresses = addresses;
          this.loadingService.hide();
        },
        error: (error) => {
          console.log(error);
          this.loadingService.hide();
        },
        complete: () => {
          this.loadingService.hide();
        }
      }
    );
  }

  private setForm(): void {
    this.form = this.fb.group({
      addressId: [this.selectedAddress.addressId],
      name: [this.selectedAddress.name, Validators.required],
      type: [this.selectedAddress.type, Validators.required],
      roadType: [this.selectedAddress.roadType, Validators.required],
      lineOne: [this.selectedAddress.lineOne, Validators.required],
      particleOne: [this.selectedAddress.particleOne],
      lineTwo: [this.selectedAddress.lineTwo],
      particleTwo: [this.selectedAddress.particleTwo],
      lineThree: [this.selectedAddress.lineThree],
      particleThree: [this.selectedAddress.particleThree],
      complement: [this.selectedAddress.complement],

      city: [this.selectedAddress.city, Validators.required],
      department: [this.selectedAddress.department, Validators.required],
      country: ['CO'],

      phone: [this.selectedAddress.phone, Validators.required]
    });
  }

  private getAddresses(): void {
    this.loadingService.show();
    
    this.addressService.getAddress().subscribe(
      {
        next: (address: Address[]) => {
          this.addresses = address;
          this.loadingService.hide();
        },
        error: (error) => {
          console.log(error);
          this.loadingService.hide();
        },
        complete: () => {
          console.log('getAddress complete');
          this.loadingService.hide();
        }
      }
    );
  }
}
