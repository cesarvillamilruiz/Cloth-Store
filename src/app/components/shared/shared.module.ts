import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonOneComponent } from './button-one/button-one.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ButtonOneComponent, LoadingComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
        // MatIconModule,
        // MatDividerModule,
        // MatButtonModule,
        NgOptimizedImage
  ],
  exports: [
      CommonModule,
      // MatIconModule,
      // MatDividerModule,
      // MatButtonModule,
      ButtonOneComponent,
      LoadingComponent,
      ConfirmDialogComponent
    ]
})
export class SharedModule { }