import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { OptionWindow } from 'src/app/enum/option.enum';
import { OptionColor } from 'src/app/model/option/option-color.model';
import { OptionSize } from 'src/app/model/option/option-size.model';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
})
export class DesignerComponent implements OnInit{

  currentOption: WritableSignal<OptionWindow>;
  isNewElement: WritableSignal<boolean>;
  optionSize: OptionSize[];
  tShirtColor: OptionColor[];

  ngOnInit(): void {
    this.setInitialValue();
  }

  private setInitialValue(): void {
    this.currentOption = signal(OptionWindow.empty);
    this.isNewElement = signal(true);
  }
}
