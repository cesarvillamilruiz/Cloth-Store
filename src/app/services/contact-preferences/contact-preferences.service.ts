import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactPreference } from 'src/app/model/contact-preference/contact-preference.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactPreferencesService {

  private http = inject(HttpClient);
  url: string;
  controller: string;
  
  constructor() {
    this.url = environment.endPoints.url;
    this.controller = environment.endPoints.controllers.contactPreference;
  }

  getContactPreference(): Observable<any> {
      return this.http.get<any>(
        `${this.url}${this.controller}/Get`
      );
  }

  insertContactPreference(contactPreference: ContactPreference): Observable<any> {
      return this.http.post<any>(
        `${this.url}${this.controller}/Insert`,
        contactPreference
      );
  }

  updateContactPreference(contactPreference: ContactPreference): Observable<any> {
      return this.http.put<any>(
        `${this.url}${this.controller}/Update`,
        contactPreference
      );
  }
}
