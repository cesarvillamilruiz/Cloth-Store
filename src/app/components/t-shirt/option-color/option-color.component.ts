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
  @Input() selectedIndex: WritableSignal<number>;

  @Output() hideOption = new EventEmitter<void>();  

  optionFontColor = optionFontColor;
  preSelectedColor: string;
  preSelectedIndex: number;

  ngOnInit(): void{
    this.preSelectedIndex = this.selectedIndex();
  }

  onSelectFontColor(selectedColor: string, index: number): void {    
    this.selectedIndex.set(index);
    this.selectedColor.set(selectedColor);
  }
    
  onHideOption(): void{
      this.hideOption.emit();
  }

  setPreviewColor(selectedColor: string, index: number): void {
    this.preSelectedIndex = index;
    this.preSelectedColor = selectedColor; 
  }

  setBackPreviewColor(): void {
    this.preSelectedIndex = this.selectedIndex();
    this.preSelectedColor = this.selectedColor();
  }
}