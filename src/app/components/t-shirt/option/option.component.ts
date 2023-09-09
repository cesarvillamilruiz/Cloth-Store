import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { OptionWindow } from 'src/app/enum/option.enum';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent{

  @Output() currentOption = new EventEmitter<OptionWindow>();  

  option = OptionWindow;  
  
  onSelectCurrentOption(currentOption: OptionWindow): void {
    this.currentOption.emit(currentOption);
  }
}
