import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-two.component.html',
  styleUrls: ['./button-two.component.scss']
})
export class ButtonTwoComponent {
  @Input() label: string;

  @Output() clickEvent = new EventEmitter<void>();

  onClick(): void{
    this.clickEvent.emit();
  }
}
