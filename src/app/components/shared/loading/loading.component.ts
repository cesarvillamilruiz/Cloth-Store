import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = '';
  @Input() type: 'ring' | 'dots' | 'pulse' | 'bars' = 'ring';
  @Input() fullscreen: boolean = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
