import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { UserService } from './services/user/user.service';
import { LoadingService } from './services/shared/loading/loading.service';

@Component({
  selector: 'app-root',
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
    private userService: UserService,
    public loadingService: LoadingService){
    this.msalManagement();
  }

  private msalManagement(): void{
    this.msalService.initialize();

    this.msalService.handleRedirectObservable().subscribe({
      next: () => {        
        this.userService.reviewAndUpdateLoggedUserintoStorage();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }  
}