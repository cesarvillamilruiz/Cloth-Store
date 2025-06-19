import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  @ViewChild('accountMenu') accountMenu!: ElementRef<HTMLDivElement>;
  
  whatsAppUrl: string = 'https://wa.me/573118317702';
  isMenuOpen = false;
  showAccountMenu: boolean;

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  constructor(private userService: UserService,
    private msalService: MsalService){}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  login(): void {
    this.msalService.loginPopup().subscribe({
      next: () => {
        this.processSignInSIgnUp();
      },
      error: () => {},
      complete: () => {}
    });
  }

  logout() {
    this.msalService.logout();
  }

  toggleShowAccountMenu(): void {
    if(this.showAccountMenu){
      setTimeout(() =>{
        this.showAccountMenu = false;
      },200);
    }
    else{
      this.showAccountMenu = true;
      setTimeout(() =>{
        this.accountMenu.nativeElement.focus();
      },200);
    }
  }

  private processSignInSIgnUp(): void {
    if(this.userService.isLoggedIn()){
      this.userService.logIn().subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: () => {
          console.log('error');
        },
        complete: () => {
          console.log('complete');
        }
      });
    }
  }
}