import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MsalService } from '@azure/msal-angular';
import { ApplicationDataService } from 'src/app/data-service/application-data.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  showSaveDesignDialog: boolean;
  fragment: string;

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  constructor(private userService: UserService,
    private msalService: MsalService,
    private applicationDataService: ApplicationDataService,
    private router: Router){}

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

  logout(): void {
    this.userService.logOut().subscribe({
      next: (logoutUrl: string) => {
        this.msalService.logout({ postLogoutRedirectUri: environment.baseDomain });
        window.location.href = logoutUrl;
      },
      error: () => {
        this.msalService.logout();
      }
    });
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

  navigateToFragment(fragment: string) {
    if (!this.applicationDataService.hasDesigns) {
      this.router.navigate(['/'], { fragment: fragment });
    } else {      
      this.fragment = fragment;
      this.showSaveDesignDialog = true;
    }
  }

  onCloseDialog(name: string | null): void {
    if (name !== null) {
      this.applicationDataService.saveDesign(name);
    } else {
      this.applicationDataService.deleteCurrentDesign();
    }

    this.showSaveDesignDialog = false;
    this.navigateToFragment(this.fragment);
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