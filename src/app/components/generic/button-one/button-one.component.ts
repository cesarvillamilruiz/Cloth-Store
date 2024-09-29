import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { isEmptyString } from 'src/app/validation/generic/generic.validation';

@Component({
  selector: 'app-button-one',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './button-one.component.html',
  styleUrls: ['./button-one.component.scss']
})
export class ButtonOneComponent implements AfterViewInit {
  @Input() label: string;
  @Input() font: string;
  @Input() class: string;
  @Input() imageUrl: string;
  @Input() disabled?: boolean;

  @ViewChild('buttonElement') buttonElement: ElementRef;  

  ngAfterViewInit(): void{
    if(!isEmptyString(this.font)){
      this.buttonElement.nativeElement.style.fontFamily = this.font;
    }    
  }
}