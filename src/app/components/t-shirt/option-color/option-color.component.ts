import { Component, EventEmitter, Input, OnInit, Output, model } from '@angular/core';
import { OptionColor } from 'src/app/model/option/option-color.model';

@Component({
  selector: 'app-option-color',
  templateUrl: './option-color.component.html',
  styleUrls: ['./option-color.component.scss']
})
export class OptionColorComponent implements OnInit {
  selectedColor = model<OptionColor>();

  @Input() optionColor: OptionColor[];
  @Output() hideOption = new EventEmitter<void>();

  preSelectedColor: OptionColor | undefined;

  ngOnInit(): void {
    this.preSelectedColor = this.selectedColor();
  }

  onSelectFontColor(selectedColor: OptionColor): void {
    this.selectedColor.set(selectedColor);
    this.preSelectedColor = this.selectedColor();
  }

  onHideOption(): void {
    this.hideOption.emit();
  }

  setPreviewColor(selectedColor: OptionColor): void {
    this.preSelectedColor = this.selectedColor();
    this.selectedColor.set(selectedColor);
  }

  setBackPreviewColor(): void {
    this.selectedColor.set(this.preSelectedColor);
  }
}
