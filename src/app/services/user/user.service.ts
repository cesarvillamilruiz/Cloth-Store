import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private msalService: MsalService) { }

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
}