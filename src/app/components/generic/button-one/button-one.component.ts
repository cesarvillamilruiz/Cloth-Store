import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isEmptyString } from 'src/app/validation/generic/generic.validation';

@Component({
  selector: 'app-button-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-one.component.html',
  styleUrls: ['./button-one.component.scss']
})
export class ButtonOneComponent implements AfterViewInit {
  @Input() label: string;
  @Input() font: string;

  @ViewChild('buttonElement') buttonElement: ElementRef;  

  ngAfterViewInit(): void{
    if(!isEmptyString(this.font)){
      this.buttonElement.nativeElement.style.fontFamily = this.font;
    }    
  }
}
