import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  whatsAppUrl: string = 'https://wa.me/573118317702';
  isMenuOpen = false;

  constructor(private dialogService: DialogService){}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openDialog(): void {
    this.dialogService.openBasicDialog(LoginDialogComponent);
  }
}