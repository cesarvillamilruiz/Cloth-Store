import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { ProductDataService } from 'src/app/data-service/product-data.service';
import { ColorName } from 'src/app/enum/color.enum';
import { ButtonOneComponent } from '../../generic/button-one/button-one.component';
import { Product } from 'src/app/model/t-shirt/product.model';
import { Position } from 'src/app/enum/position.enum';
import { TShirtSize } from 'src/app/enum/tshirt-size.enum';
import { ProdutSize } from 'src/app/model/t-shirt/product-size.model';
import { DefaultTypeValue } from 'src/app/enum/type.enum';

@Component({
  selector: 'app-option-product',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonOneComponent],
  templateUrl: './option-product.component.html',
  styleUrls: ['./option-product.component.scss']
})
export class OptionProductComponent implements OnInit, OnDestroy {

  @Input() products: WritableSignal<Product[]>;
  @Input() selectedIndexProduct: WritableSignal<number>;
  @Output() closeOptionProduct = new EventEmitter<void>();

  showColorTooltip: boolean;
  hoverIndex: number;
  color = ColorName;
  selectedColor: ColorName;
  previewColor: ColorName;
  tShirtSize = TShirtSize;
  colorChange: boolean;

  private unsubscribe: () => void;

  constructor(
    private productDataService: ProductDataService,
    private renderer: Renderer2) {
      this.unsubscribe = this.renderer.listen('document', 'click', (event) => {
        this.showColorTooltip = this.colorChange && !this.showColorTooltip;
        this.colorChange = false;
      });
    }

  ngOnInit(): void {
      this.setInitialValues();
  }

  ngOnDestroy(): void{
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setInitialValues(): void {
    this.showColorTooltip = false;
    this.colorChange = false;
    this.selectedColor = this.color.white;
    this.previewColor = this.color.white;
    if(!this.products().length) this.onAddProduct();
  }

  setTShirtColor(TShirtColor: ColorName): void {
    if(this.products()?.length > 0){
      this.products()[this.selectedIndexProduct()].color = TShirtColor;
      this.productDataService.setTShirtColor(TShirtColor);
      this.selectedColor = TShirtColor;
    }
  }

  setPreviewColor(TShirtColor: ColorName): void {
    this.previewColor = this.selectedColor;
    this.setTShirtColor(TShirtColor);
  }

  setBackPreviewColor(): void {
    this.setTShirtColor(this.previewColor);
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
    this.selectedColor = this.products()[this.selectedIndexProduct()].color;
    this.productDataService.setTShirtColor(this.selectedColor);
  }

  onRemoveProduct(index: number): void{
    if(this.products().length > 1){
      this.products().splice(index, 1);
      if((this.selectedIndexProduct() > DefaultTypeValue.zeroNumber && this.selectedIndexProduct() === index)|| index < this.selectedIndexProduct()){
        this.onSelectProduct(this.selectedIndexProduct() -1);
      }
      else if(this.selectedIndexProduct() === DefaultTypeValue.zeroNumber && this.selectedIndexProduct() === index){
        this.onSelectProduct(DefaultTypeValue.zeroNumber);
      }
    }    
  }

  toggleShowColorTooltip(): void{
    this.colorChange = !this.colorChange;
  }

  onShowColorTooltip(): void{
    this.colorChange = !this.colorChange;;
    this.showColorTooltip= false;
  }
}