import { Component, Input, WritableSignal } from '@angular/core';
import { OptionFont } from 'src/app/model/option/option-font.model';

@Component({
  selector: 'app-option-font',
  templateUrl: './option-font.component.html',
  styleUrls: ['./option-font.component.scss']
})
export class OptionFontComponent {
  @Input() selectedFont: WritableSignal<OptionFont>;
  @Input() optionFont: OptionFont[];

  previewFont: OptionFont;

  onSelectFont(optionFont: OptionFont): void{
    this.previewFont = this.selectedFont();
    this.selectedFont.set(optionFont);
  }

  setPreviewFont(optionFont: OptionFont): void {
    this.previewFont = this.selectedFont();
    this.selectedFont.set(optionFont);
  }

  setBackPreviewFont(): void {
    this.selectedFont.set(this.previewFont);
  }
}
