import { Component, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { optionFontColor } from './../../../util/configuration/option-font-color.configuration.json';
import { ButtonOneComponent } from '../../generic/button-one/button-one.component';

@Component({
  selector: 'app-option-color',
  standalone: true,
  imports: [CommonModule, ButtonOneComponent],
  templateUrl: './option-color.component.html',
  styleUrls: ['./option-color.component.scss']
})
export class OptionColorComponent implements OnInit {
  @Input() selectedColor: WritableSignal<string>;
  @Input() selectedIndexFontColor: WritableSignal<number>;

  @Output() hideOption = new EventEmitter<void>();  

  optionFontColor = optionFontColor;
  preSelectedColor: string;
  preSelectedIndexFontColor: number;

  ngOnInit(): void{
    this.preSelectedIndexFontColor = this.selectedIndexFontColor();
  }

  onSelectFontColor(selectedColor: string, index: number): void {
    this.preSelectedIndexFontColor = index;
    this.preSelectedColor = selectedColor;    
  }

  onHideOption(): void{
    if(this.preSelectedIndexFontColor){
      this.selectedIndexFontColor.set(this.preSelectedIndexFontColor);
      this.selectedColor.set(this.preSelectedColor);
      this.hideOption.emit();
    }
  }
}