import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { ProductDataService } from 'src/app/data-service/product-data.service';
import { ColorName } from 'src/app/enum/color.enum';

@Component({
  selector: 'app-option-product',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './option-product.component.html',
  styleUrls: ['./option-product.component.scss']
})
export class OptionProductComponent {

  @Output() closeOptionProduct = new EventEmitter<void>();

  color = ColorName;

  constructor(private productDataService: ProductDataService) {}

  setTShirtColor(TShirtColor: ColorName): void {
    this.productDataService.setTShirtColor(TShirtColor);
  }

  onCloseOptionProduct(): void {
    this.closeOptionProduct.emit();
  }
}
