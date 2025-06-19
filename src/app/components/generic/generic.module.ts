import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ButtonOneComponent } from './button-one/button-one.component';

@NgModule({
  declarations: [ButtonOneComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    NgOptimizedImage
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ButtonOneComponent 
  ]
})
export class GenericModule { }
