import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/Address/address.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private http = inject(HttpClient);
  url: string;
  controller: string;
  
  constructor() {
    this.url = environment.endPoints.url;
    this.controller = environment.endPoints.controllers.address;
  }

  getAddress(): Observable<Address[]> {
      return this.http.get<Address[]>(
        `${this.url}${this.controller}/Get`
      );
  }

  insertAddress(address: Address): Observable<Address[]> {
      return this.http.post<Address[]>(
        `${this.url}${this.controller}/Insert`,
        address
      );
  }

  updateAddress(address: Address): Observable<Address[]> {
      return this.http.put<Address[]>(
        `${this.url}${this.controller}/Update`,
        address
      );
  }

  deleteAddress(addressId: string): Observable<Address[]> {
      return this.http.delete<Address[]>(
        `${this.url}${this.controller}/Delete?addressId=${addressId}`
      );
  }
}
