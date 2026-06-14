import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Design } from 'src/app/model/t-shirt/design.model';

@Component({
  selector: 'app-option-designs',
  templateUrl: './option-designs.component.html',
  styleUrl: './option-designs.component.scss'
})
export class OptionDesignsComponent {
  @Input() designs: Design[] = [];

  @Output() closeOptionProduct = new EventEmitter<void>();
  @Output() selectDesign = new EventEmitter<Design>();

  readonly defaultColorName = 'white';

  onSelectDesign(design: Design): void {
    this.selectDesign.emit(design);
  }

  /**
   * Base garment background-image for the design, e.g. url(.../red-front.png).
   * Mirrors OptionProductComponent.getBackGroundImageUrl so the thumbnail shows
   * the t-shirt in its product color (via Design_Product -> Product -> Color).
   */
  getBackGroundImageUrl(design: Design): string {
    const color = (design.colorName ?? this.defaultColorName).toLowerCase();
    const location = design.location ?? 'front';
    return `url(../../../../assets/img/${color}-${location?.toLowerCase()}.png)`;
  }
}
