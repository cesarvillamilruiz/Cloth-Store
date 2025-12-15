import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Output() closed = new EventEmitter<boolean>();

  confirm() {
    this.closed.emit(true);
  }

  cancel() {
    this.closed.emit(false);
  }
}