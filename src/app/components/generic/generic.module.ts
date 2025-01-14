import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule    
  ]
})
export class GenericModule { }
