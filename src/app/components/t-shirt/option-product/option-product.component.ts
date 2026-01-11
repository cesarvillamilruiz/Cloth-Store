import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, WritableSignal } from '@angular/core';
import { ProductDataService } from 'src/app/data-service/product-data.service';
import { ColorName } from 'src/app/enum/color.enum';
import { CartItem } from 'src/app/model/t-shirt/cart-item.model';
import { TShirtSize } from 'src/app/enum/tshirt-size.enum';
import { DefaultTypeValue } from 'src/app/enum/type.enum';
import { OptionSize } from 'src/app/model/option/option-size.model';
import { OptionColor } from 'src/app/model/option/option-color.model';
import { OptionProduct } from 'src/app/model/option/product.model';
import { Location } from 'src/app/enum/location.enum';
import { InventorySet } from 'src/app/model/t-shirt/Inventory-set.model';
import { Configuration } from 'src/app/core/core-configuration';

@Component({
  selector: 'app-option-product',
  templateUrl: './option-product.component.html',
  styleUrls: ['./option-product.component.scss'],
})
export class OptionProductComponent implements OnInit, OnDestroy {
  @Input() products: WritableSignal<CartItem[]>;
  @Input() selectedIndexProduct: WritableSignal<number>;
  @Input() optionSize: OptionSize[];
  @Input() tShirtColor: OptionColor[];
  @Input() optionProduct: OptionProduct[];
  @Input() isFrontLocation: boolean;

  @Output() closeOptionProduct = new EventEmitter<void>();
  @Output() onAddProduct = new EventEmitter<void>();

  showColorTooltip: boolean;
  hoverIndex: number;
  selectedColorId: string;
  previewColorId: string;
  tShirtSize = TShirtSize;
  colorChange: boolean;

  get currentProduct(): CartItem {
    return this.products()[this.selectedIndexProduct()];
  }

  private unsubscribe: () => void;

  constructor(
    private productDataService: ProductDataService,
    private renderer: Renderer2,
    private readonly configuration: Configuration) {
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
    this.selectedColorId = this.tShirtColor.find(x => x.name.toLowerCase() === ColorName.white)?.optionColorId ?? '';  
  }

  confirmTShirtColor(colorId: string): void {
    this.previewColorId = this.selectedColorId;
    this.setTShirtColor(colorId);
  }

  setTShirtColor(colorId: string): void {
    if(this.products()?.length > 0){
      this.currentProduct.productId = this.optionProduct.find(x => x.colorId === colorId)?.optionProductId ?? this.configuration.emptyGuid;
      this.productDataService.setTShirtColor(colorId);
      this.selectedColorId = colorId;
    }
  }

  setPreviewColor(colorId: string): void {
    this.previewColorId = this.selectedColorId;
    this.setTShirtColor(colorId);
  }

  setBackPreviewColor(): void {
    this.setTShirtColor(this.previewColorId);
  }

  onValidateSizeAmount(event: KeyboardEvent): void {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  onAddSize(event: Event, size: OptionSize): void {
    const inputElement = event.target as HTMLInputElement;

    const inventorySet = new InventorySet();
    inventorySet.sizeId = size.optionSizeId;
    inventorySet.amount = +inputElement.value;

    const index = this.currentProduct.inventorySet?.findIndex(x => x.sizeId === size.optionSizeId);

    if(!index || index === DefaultTypeValue.firstNegativeNumber){
      this.currentProduct.inventorySet.push(inventorySet);
    }
    else{
      this.currentProduct.inventorySet[index].amount = +inputElement.value;
    }
  }

  getSizeAmount(size: OptionSize): number {
    let amount = DefaultTypeValue.zeroNumber;
    const index = this.currentProduct.inventorySet?.findIndex(x => x.sizeId === size.optionSizeId);
    if(index > DefaultTypeValue.firstNegativeNumber){
      amount = this.currentProduct.inventorySet[index]?.amount;
    }

    return amount;
  }

  getBackGroundImageUrl(product: CartItem): string{
    const colorId = this.optionProduct.find(x => x.optionProductId === product.productId)?.colorId ?? this.configuration.emptyGuid;
    return  `url(../../../../assets/img/${this.getColorName(colorId)}-${product.isFrontLocation ? Location.front : Location.back}.png)`;
  }

  getChangeOptionBackGroundClass(product: CartItem): string{
    const colorId = this.optionProduct.find(x => x.optionProductId === product.productId)?.colorId ?? this.configuration.emptyGuid;
    return `color ${this.getColorName(colorId)}`;
  }

  onSelectProduct(index: number): void {
    this.selectedIndexProduct.set(index);
    this.selectedColorId = this.optionProduct.find(x => x.optionProductId === 
      this.currentProduct.productId)?.colorId ?? this.configuration.emptyGuid;
    this.productDataService.setTShirtColor(this.selectedColorId);
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

  getColorName(colorId: string): string {
    return colorId ? `${this.tShirtColor.find(x => x.optionColorId === colorId)?.name.toLowerCase() ?? ''}` : '';
  }

  getColorClass(colorId: string): string {
    return `color ${this.getColorName(colorId)}`;
  }
}