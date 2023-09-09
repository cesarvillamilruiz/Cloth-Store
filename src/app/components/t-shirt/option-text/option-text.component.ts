import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-text.component.html',
  styleUrls: ['./option-text.component.scss']
})
export class OptionTextComponent {

  @Output() closeOptionProduct = new EventEmitter<void>();
  @Output() textValue = new EventEmitter<string>();
  
  onTextInput(event: any): void {
    this.textValue.emit(event.target.value);
  }

  onCloseOptionProduct(): void {
    this.closeOptionProduct.emit();
  }
}
