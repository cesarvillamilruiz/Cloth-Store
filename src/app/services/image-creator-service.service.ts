import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageCreatorServiceService {

  private apiUrl = 'https://api.microsoft.com/image-creator'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  generateImage(prompt: string): Observable<any> {
    const body = { prompt };
    return this.http.post<any>(`${this.apiUrl}/generate`, body);
  }
}
