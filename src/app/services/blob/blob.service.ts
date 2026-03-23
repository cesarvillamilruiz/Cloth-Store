import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlobUrlRequest } from 'src/app/model/blob/blob-url-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  private http = inject(HttpClient);
  url: string;
  controller: string;
    
  constructor() {
    this.url = environment.endPoints.url;
    this.controller = environment.endPoints.controllers.blob;
  }

  getUploadUrl(formData: FormData): Observable<any> {
      return this.http.post<any>(
        `${this.url}${this.controller}/GetUploadUrl`,
        formData
      );
  }
}
