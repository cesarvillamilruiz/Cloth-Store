import { Component, EventEmitter, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-option-upload',
  templateUrl: './option-upload.component.html',
  styleUrls: ['./option-upload.component.scss']
})
export class OptionUploadComponent {
  @Output() fileUpload = new EventEmitter<File>();
  @Output() closeOptionProduct = new EventEmitter<void>();

  onFileSelected(event: NgxDropzoneChangeEvent): void {    
    this.fileUpload.emit(event.addedFiles[0]);
  }
}
