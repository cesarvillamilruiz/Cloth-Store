import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionColor } from 'src/app/model/option/option-color.model';
import { OptionFont } from 'src/app/model/option/option-font.model';
import { OptionSize } from 'src/app/model/option/option-size.model';
import { OptionProduct } from 'src/app/model/option/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private http = inject(HttpClient);
  url: string;
  controller: string;
  
  constructor() {
    this.url = environment.endPoints.url;
    this.controller = environment.endPoints.controllers.option;
  }

  getAllSizes(): Observable<OptionSize[]> {
      return this.http.get<OptionSize[]>(
        `${this.url}${this.controller}/GetAllSizes`
      );
  }

  getAllColors(): Observable<OptionColor[]> {
      return this.http.get<OptionColor[]>(
        `${this.url}${this.controller}/GetAllColors`
      );
  }

  getProductsByCategoryName(categoryName: string): Observable<OptionProduct[]> {
      return this.http.get<OptionProduct[]>(
        `${this.url}${this.controller}/GetProductsByCategoryName?categoryName=${categoryName}`
      );
  }

  getFonts(): Observable<OptionFont[]> {
      return this.http.get<OptionFont[]>(
        `${this.url}${this.controller}/GetFonts`
      );
  }
}
