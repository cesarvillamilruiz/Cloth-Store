import { Component, Input, WritableSignal } from '@angular/core';
import { optionFont } from './../../../util/configuration/option-font.configuration.json';

@Component({
  selector: 'app-option-font',
  templateUrl: './option-font.component.html',
  styleUrls: ['./option-font.component.scss']
})
export class OptionFontComponent {
  @Input() selectedFont: WritableSignal<string>;

  optionFont = optionFont;

  onSelectFont(value: string): void{
    this.selectedFont.set(value);
  }
}
