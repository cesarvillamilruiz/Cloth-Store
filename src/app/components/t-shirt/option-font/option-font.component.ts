import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonOneComponent } from '../../generic/button-one/button-one.component';
import { optionFont } from './../../../util/configuration/option-font.configuration.json';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-option-font',
  standalone: true,
  imports: [CommonModule, ButtonOneComponent, MatGridListModule],
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
