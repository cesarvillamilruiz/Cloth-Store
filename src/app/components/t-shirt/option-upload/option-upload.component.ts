import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonOneComponent } from '../../generic/button-one/button-one.component';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-option-upload',
  standalone: true,
  imports: [CommonModule, ButtonOneComponent, NgxDropzoneModule],
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
