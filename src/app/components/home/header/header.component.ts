import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  
  @ViewChild('accountMenu') accountMenu!: ElementRef<HTMLDivElement>;
  
  whatsAppUrl: string = 'https://wa.me/573118317702';
  isMenuOpen = false;
  showAccountMenu: boolean;

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  constructor(private userService: UserService,
    private msalService: MsalService){}

  ngAfterViewInit(): void {
    
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  login(): void {
    this.msalService.loginPopup();
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
}