import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent implements OnInit{

  activeUser: AccountInfo | null;

  constructor(private msalService: MsalService) {}

  ngOnInit(): void{    
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
      console.log('User is logged in:', accounts[0]);
    } else {
      console.log('No user is logged in');
    }

    this.activeUser = this.msalService.instance.getActiveAccount();
  }

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logout();
  }
}