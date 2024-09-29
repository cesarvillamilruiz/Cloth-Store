import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { OptionWindow } from 'src/app/enum/option.enum';
import { GenericModule } from '../../generic/generic.module';
import { ButtonOneComponent } from '../../generic/button-one/button-one.component';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, GenericModule, ButtonOneComponent],
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent{

  @Input() currentOption: WritableSignal<OptionWindow>;
  @Input() isNewElement: WritableSignal<boolean>;

  option = OptionWindow;

  getButtoClass(option: OptionWindow): string {
    return this.currentOption() === option ? 'sideBar sideBar__selected my-1 col-12' : 'sideBar my-1 col-12';
  }

  onSetCurrentOption(option: OptionWindow): void{
    this.currentOption.set(option);
    this.isNewElement.set(true);
  }
}
