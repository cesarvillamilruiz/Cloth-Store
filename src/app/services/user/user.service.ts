import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  url: string;
  controller: string;

  constructor(private msalService: MsalService) {
    this.url = environment.endPoints.url;
    this.controller = environment.endPoints.controllers.login;
   }

  reviewAndUpdateLoggedUserintoStorage() {
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (
      !activeAccount &&
      this.msalService.instance.getAllAccounts().length > 0
    ) {
      const accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  getUserName(): string {
    let userName = '';
    const givenNameKey = 'given_name';
    const account = this.msalService.instance.getActiveAccount();
  
    if (account && account.idTokenClaims && account.idTokenClaims[givenNameKey]) {
      userName = account.idTokenClaims[givenNameKey]?.toString();
    }
  
    return userName;
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  logIn(): Observable<any> {
    return this.http.get<any>(
      `${this.url}${this.controller}/LogIn`
    );
  }

  logOut(): Observable<string> {
    const redirectUri = encodeURIComponent(environment.baseDomain);
    return this.http.get(
      `${this.url}${this.controller}/LogOut?postLogoutRedirectUri=${redirectUri}`,
      { responseType: 'text' }
    );
  }
}