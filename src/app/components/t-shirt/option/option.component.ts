import { Component, Input, WritableSignal } from '@angular/core';
import { OptionWindow } from 'src/app/enum/option.enum';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent{

  @Input() currentOption: WritableSignal<OptionWindow>;
  @Input() isNewElement: WritableSignal<boolean>;

  option = OptionWindow;

  getButtoClass(option: OptionWindow): string {
    return this.currentOption() === option ? 'sideBar sideBar__selected my-md-1 col-12 h-100' : 'sideBar my-md-1 col-12 h-100';
  }

  onSetCurrentOption(option: OptionWindow): void{
    this.currentOption.set(option);
    this.isNewElement.set(true);
  }
}
