import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/home/header/header.component';
import { MsalService } from '@azure/msal-angular';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cloth-Store';
  
  get isHomePage (): boolean{
    return this.route.url === '/' || this.route.url.includes('/#');
  }

  constructor(private route: Router,
    private msalService: MsalService,
    private userService: UserService){
    this.msalManagement();
  }

  private msalManagement(): void{
    this.msalService.initialize();

    this.msalService.handleRedirectObservable().subscribe({
      next: (tokenResponse) => {
        this.userService.reviewAndUpdateLoggedUserintoStorage();
      },
      error: (error) => {console.log(error);},
      complete: () => {console.log('Completed');}
    });
  }
}