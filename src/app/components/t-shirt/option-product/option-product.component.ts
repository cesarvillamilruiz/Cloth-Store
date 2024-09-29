import { Component, ElementRef, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { ProductDataService } from 'src/app/data-service/product-data.service';
import { ColorName } from 'src/app/enum/color.enum';
import { ButtonOneComponent } from '../../generic/button-one/button-one.component';
import { Product } from 'src/app/model/t-shirt/product.model';
import { Position } from 'src/app/enum/position.enum';
import { TShirtSize } from 'src/app/enum/tshirt-size.enum';
import { ProdutSize } from 'src/app/model/t-shirt/product-size.model';

@Component({
  selector: 'app-option-product',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonOneComponent],
  templateUrl: './option-product.component.html',
  styleUrls: ['./option-product.component.scss']
})
export class OptionProductComponent implements OnInit {

  @Input() products: WritableSignal<Product[]>;
  @Input() selectedIndexProduct: WritableSignal<number>;
  @Output() closeOptionProduct = new EventEmitter<void>();

  color = ColorName;
  tShirtSize = TShirtSize;

  constructor(private productDataService: ProductDataService) {}

  ngOnInit(): void {
      this.onAddProduct();
  }

  setTShirtColor(TShirtColor: ColorName): void {
    if(this.products()?.length > 0){
      this.products()[this.selectedIndexProduct()].color = TShirtColor;
      this.productDataService.setTShirtColor(TShirtColor);
    }
  }

  onValidateSizeAmount(event: KeyboardEvent): void {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  onAddSize(event: Event, tShirtSize: TShirtSize): void {
    const inputElement = event.target as HTMLInputElement;
    if(this.products()[this.selectedIndexProduct()].produtSize.some(x => x.size === tShirtSize)){
      (this.products()[this.selectedIndexProduct()].produtSize.find(x => x.size === tShirtSize) as any).amount = +inputElement.value;
      return;
    }

    this.products()[this.selectedIndexProduct()].produtSize.push(new ProdutSize(tShirtSize, +inputElement.value));
  }

  onAddProduct(): void{
    this.products().push(new Product(ColorName.white, Position.front));
    this.selectedIndexProduct.set(this.products().length - 1);
  }

  getBackGroundImageUrl(product: Product): string{
    return `url(../../../../assets/img/${product.color}-${product.position}.png)`;
  }

  onSelectProduct(index: number): void {
    this.selectedIndexProduct.set(index);
    this.productDataService.setTShirtColor(this.products()[this.selectedIndexProduct()].color);
  }

  onRemoveProduct(index: number): void{
    this.products().splice(index, 1);
  }
}