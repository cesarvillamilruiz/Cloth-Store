import { Component, model } from '@angular/core';
import { OptionWindow } from 'src/app/enum/option.enum';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {

  currentOption = model<OptionWindow>(OptionWindow.empty);
  isNewElement = model<boolean>(true);

  option = OptionWindow;

  getButtoClass(option: OptionWindow): string {
    return this.currentOption() === option
      ? 'sideBar sideBar__selected my-md-1 col-12 h-100'
      : 'sideBar my-md-1 col-12 h-100';
  }

  onSetCurrentOption(option: OptionWindow): void {
    this.currentOption.set(option);
    this.isNewElement.set(true);
  }
}
