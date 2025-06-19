import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private url = 'https://localhost:7217';
    
  constructor(private http: HttpClient) {}

  getIdToken(idToken: string): Observable<any> {
    return this.http.post<any>(this.url + '/googleLogin', { idToken });
  }
}
