import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from 'src/app/services/google/google-auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent implements AfterViewInit {
  
  @ViewChild('googleBtn', { static: true }) googleBtn!: ElementRef;

  constructor (private googleLoginService: GoogleAuthService) {}

  ngAfterViewInit() {
    // Wait for the script to be loaded
    const interval = setInterval(() => {
      if ((window as any).google && (window as any).google.accounts?.id) {
        (window as any).google.accounts.id.initialize({
          client_id: '229119906435-p1ngq3rogcl8rnu6okkbekqbm3829p9r.apps.googleusercontent.com',
          callback: this.handleCredentialResponse
        });

        (window as any).google.accounts.id.renderButton(this.googleBtn.nativeElement, {
          theme: 'outline',
          size: 'large'
        });

        clearInterval(interval);
      }
    }, 500);
  }

  handleCredentialResponse = (response: any) =>  {
    this.googleLoginService.getIdToken(response.credential)
    .subscribe({
      next: response => {
        console.log('Backend login result:', response);
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        console.log('Complete')
      }
    });
  }
}