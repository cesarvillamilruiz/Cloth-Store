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
    this.preSelectedIndex = index;
    this.preSelectedColor = selectedColor;    
  }

  onHideOption(): void{
    if(this.preSelectedIndex){
      this.selectedIndex.set(this.preSelectedIndex);
      this.selectedColor.set(this.preSelectedColor);
      this.hideOption.emit();
    }
  }
}