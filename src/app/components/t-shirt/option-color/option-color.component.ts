import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { optionFontColor } from './../../../util/configuration/option-font-color.configuration.json';

@Component({
  selector: 'app-option-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-color.component.html',
  styleUrls: ['./option-color.component.scss']
})
export class OptionColorComponent {
  @Input() selectedColor: WritableSignal<string>;
  
  optionFontColor = optionFontColor;  

  onSelectFontColor(selectedColor: string): void {
    this.selectedColor.set(selectedColor);
  }
}