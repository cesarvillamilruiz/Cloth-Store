import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customization } from 'src/app/model/t-shirt/customization.model';
import { Design } from 'src/app/model/t-shirt/design.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  private http = inject(HttpClient);
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = `${environment.endPoints.url}${environment.endPoints.controllers.design}`;
  }

  insert(design: Design): Observable<Design> {
    return this.http.post<Design>(`${this.baseUrl}/Insert`, design);
  }

  update(design: Design): Observable<Design> {
    return this.http.put<Design>(`${this.baseUrl}/Update`, design);
  }

  delete(designId: string): Observable<Design[]> {
    return this.http.delete<Design[]>(`${this.baseUrl}/Delete?designId=${designId}`);
  }

  getById(designId: string): Observable<Design> {
    return this.http.get<Design>(`${this.baseUrl}/GetDesignById?designId=${designId}`);
  }

  getListByUser(): Observable<Design[]> {
    return this.http.get<Design[]>(`${this.baseUrl}/GetDesignListByUserId`);
  }

  getCustomizations(designId: string): Observable<Customization[]> {
    return this.http.get<Customization[]>(`${this.baseUrl}/GetCustomizationsByDesignId?designId=${designId}`);
  }
}
