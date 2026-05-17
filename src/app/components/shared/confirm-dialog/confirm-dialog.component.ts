import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Output() closed = new EventEmitter<string | null>();

  designName = '';

  confirm() {
    this.closed.emit(this.designName.trim() || null);
  }

  cancel() {
    this.closed.emit(null);
  }
}