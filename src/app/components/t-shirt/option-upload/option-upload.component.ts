import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-upload.component.html',
  styleUrls: ['./option-upload.component.scss']
})
export class OptionUploadComponent {

  @Output() fileUpload = new EventEmitter<File>();

  fileName: string;

  onFileSelected(event: any): void {    
    this.fileUpload.emit(event);
  }
}
