import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { ProductDataService } from 'src/app/data-service/product-data.service';
import { ColorName } from 'src/app/enum/color.enum';
import { OptionProductComponent } from '../option-product/option-product.component';
import { OptionTextComponent } from '../option-text/option-text.component';
import { OptionEdit, OptionWindow } from 'src/app/enum/option.enum';
import { DesignElementComponent } from '../design-element/design-element.component';
import { HiddenOptionValidation } from 'src/app/model/Utility/hidden-option-validation.model';
import { isHiddenOption } from 'src/app/validation/design/design.validationb';
import { ScreenSize } from 'src/app/enum/screen-size.enum';
import { Position } from 'src/app/enum/position.enum';
import { DefaultTypeValue } from 'src/app/enum/type.enum';
import { isGreaterThan, isSameValue } from 'src/app/validation/generic/generic.validation';
import { OptionDrawComponent } from '../option-draw/option-draw.component';
import { OptionUploadComponent } from "../option-upload/option-upload.component";
import { Product } from 'src/app/model/t-shirt/product.model';
import { optionFontColor } from './../../../util/configuration/option-font-color.configuration.json';

@Component({
  selector: 'app-product-designer',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    OptionProductComponent,
    OptionTextComponent,
    DesignElementComponent,
    OptionDrawComponent,
    OptionUploadComponent
],
  templateUrl: './product-designer.component.html',
  styleUrls: ['./product-designer.component.scss'],
})
export class ProductDesignerComponent
  implements OnInit, AfterViewInit
{
  @Input() currentOption: WritableSignal<OptionWindow>;
  @Input() isNewElement: WritableSignal<boolean>;
  
  public dynamicComponentsArray: ComponentRef<DesignElementComponent>[] = [];
  
  isFrontTShirt: WritableSignal<boolean>;
  tShirtColor: WritableSignal<ColorName>;
  option = OptionWindow;
  currenElementIndex: WritableSignal<number>;
  inputValue: WritableSignal<string>;
  isCloseOptionAllowed: WritableSignal<Boolean>;
  currentEditOption: string;
  optionEditEnum = OptionEdit;
  defaultTypeValueEnum = DefaultTypeValue;
  selectedFont: WritableSignal<string>;
  selectedFontColor: WritableSignal<string>;
  selectedOutlineFontColor: WritableSignal<string>;
  uploadedImageUrl: string | ArrayBuffer | null = null;
  products: WritableSignal<Product[]>;
  selectedIndexProduct: WritableSignal<number>;
  selectedIndexFontColor: WritableSignal<number>;
  selectedIndexOutlineFontColor: WritableSignal<number>;
  optionFontColor = optionFontColor;
  selectedSize: WritableSignal<number>;

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('workArea') workArea: ElementRef;
  @ViewChild('baseComponent', { read: ViewContainerRef }) baseComponent: ViewContainerRef;

  constructor(private productDataService: ProductDataService) {
    effect(() => {
      //TODO Remove
      console.log(this.selectedSize())
      if(this.dynamicComponentsArray[this.currenElementIndex()]){
        this.dynamicComponentsArray[this.currenElementIndex()].instance.height.set(this.selectedSize())
        this.dynamicComponentsArray[this.currenElementIndex()].instance.width.set(this.selectedSize());
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.subscribeToEventTShirtColor();
  }

  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setIsHiddenOptionProduct();
  }

  private setIsHiddenOptionProduct(): void {
    const hiddenOptionValidationModel = new HiddenOptionValidation();
    hiddenOptionValidationModel.baseNumber = window.innerWidth;
    hiddenOptionValidationModel.comparatorNumber = ScreenSize.bisgSize;

    if (isHiddenOption(hiddenOptionValidationModel, this.currentOption))
      this.currentOption.set(OptionWindow.product);
  }

  private setInitialValue(): void {
    this.isFrontTShirt = signal(true);
    this.tShirtColor = signal(ColorName.white);
    this.setTShirtSource();
    this.setIsHiddenOptionProduct();
    this.currenElementIndex = signal(+DefaultTypeValue.zeroNumber);
    this.inputValue = signal(DefaultTypeValue.emptyString.toString());
    this.isCloseOptionAllowed = signal(true);
    this.selectedFont = signal(DefaultTypeValue.emptyString.toString());
    this.selectedFontColor = signal(optionFontColor[DefaultTypeValue.zeroNumber].value);
    this.selectedOutlineFontColor = signal(DefaultTypeValue.emptyString.toString());
    this.products = signal<Product[]>([]);
    this.selectedIndexProduct = signal(+DefaultTypeValue.zeroNumber);
    this.selectedIndexFontColor = signal(+DefaultTypeValue.zeroNumber);
    this.selectedIndexOutlineFontColor = signal(+DefaultTypeValue.zeroNumber);
    this.selectedSize = signal(50);
  }

  private setTShirtSource(): void {
    this.canvas.nativeElement.style.backgroundImage = `url(../../../../assets/img/${this.tShirtColor()}-${
      this.isFrontTShirt() ? Position.front : Position.back
    }.png)`;
  }

  private subscribeToEventTShirtColor(): void {
    this.productDataService.eventTShirtColor$.subscribe(
      (tShirtColor: ColorName) => {
        this.tShirtColor.set(tShirtColor);
        this.setTShirtSource();
      }
    );
  }

  onSelectDesign(selectedDesignName: string): void {    
    this.currenElementIndex.set(this.dynamicComponentsArray.length);
    const newDesignElementComponent = this.baseComponent.createComponent(
      DesignElementComponent
    );
    newDesignElementComponent.instance.id = signal(this.currenElementIndex());
    newDesignElementComponent.instance.zIndex = signal(this.dynamicComponentsArray.length);
    newDesignElementComponent.instance.showText = false;
    newDesignElementComponent.instance.imagePath = `../../../../assets/design/${selectedDesignName}`;
    newDesignElementComponent.instance.optionType = OptionWindow.draw;

    newDesignElementComponent.instance.currentElement.subscribe(() => {        
      this.currenElementIndex.set(newDesignElementComponent.instance.id());
      this.isCloseOptionAllowed.set(false);
      this.isNewElement.set(false);
    });

    this.dynamicComponentsArray.push(newDesignElementComponent);
    this.isNewElement.set(false);
    return;
  }
  
  onFileUpload(file: File): void {
    if (file) {
      
      const reader = new FileReader();
      reader.onload = e => {
        this.uploadedImageUrl = reader.result;
        this.currenElementIndex.set(this.dynamicComponentsArray.length);
        const newDesignElementComponent = this.baseComponent.createComponent(
          DesignElementComponent
        );
        newDesignElementComponent.instance.id = signal(this.currenElementIndex());
        newDesignElementComponent.instance.zIndex = signal(this.dynamicComponentsArray.length);
        newDesignElementComponent.instance.showText = false;
        newDesignElementComponent.instance.imagePath = this.uploadedImageUrl as string;
        newDesignElementComponent.instance.optionType = OptionWindow.upload;

        newDesignElementComponent.instance.currentElement.subscribe(() => {        
          this.currenElementIndex.set(newDesignElementComponent.instance.id());
          this.isCloseOptionAllowed.set(false);
          this.isNewElement.set(false);
        });

        this.dynamicComponentsArray.push(newDesignElementComponent);
        this.isNewElement.set(false);
        return;
      } 
      reader.readAsDataURL(file);      
    }
  }

  onRotate(): void {
    this.isFrontTShirt.set(!this.isFrontTShirt());
    this.setTShirtSource();
  }

  onCloseOptionProduct(): void {
    this.currentOption.set(OptionWindow.empty);
  }

  onTextValue(textValue: string): void {
    if (this.isNewElement()) {
      this.currenElementIndex.set(this.dynamicComponentsArray.length);
      const newDesignElementComponent = this.baseComponent.createComponent(
        DesignElementComponent
      );
      newDesignElementComponent.instance.text = signal(textValue);
      newDesignElementComponent.instance.id = signal(this.currenElementIndex());
      newDesignElementComponent.instance.zIndex = signal(this.dynamicComponentsArray.length);
      newDesignElementComponent.instance.selectedFont = this.selectedFont;
      newDesignElementComponent.instance.selectedFontColor = this.selectedFontColor;
      newDesignElementComponent.instance.selectedOutlineFontColor = this.selectedOutlineFontColor;
      newDesignElementComponent.instance.showText = true;      
      newDesignElementComponent.instance.optionType = OptionWindow.text;

      newDesignElementComponent.instance.currentElement.subscribe(() => {        
        this.currenElementIndex.set(newDesignElementComponent.instance.id());
        this.inputValue.set(newDesignElementComponent.instance.text());
        this.isCloseOptionAllowed.set(false);
        this.isNewElement.set(false);
      });

      this.dynamicComponentsArray.push(newDesignElementComponent);
      this.isNewElement.set(false);
      return;
    }

    const componentRef = this.dynamicComponentsArray[this.currenElementIndex()];
    const component = componentRef as ComponentRef<DesignElementComponent>;
    component.instance.text.set(textValue);
  }

  onSelectWorkArea(): void {
    if (this.isCloseOptionAllowed()) {
      this.setCurrentOption(OptionWindow.product);      
      this.inputValue.set(DefaultTypeValue.emptyString);
      return;
    }

    if(this.dynamicComponentsArray[this.currenElementIndex()].instance.optionType != OptionWindow.upload){
      this.setCurrentOption(this.dynamicComponentsArray[this.currenElementIndex()].instance.optionType);
    }
    
    this.isCloseOptionAllowed.set(true);
  }

  setCurrentOption(optionWindow: OptionWindow): void {
    this.currentOption.set(optionWindow);
  }

  openLayerPicker(): void {
    this.currentEditOption = this.dynamicComponentsArray.length && this.currentEditOption !== OptionEdit.layer ? OptionEdit.layer : '';
  }

  moveToFront(): void {
    if(!isSameValue((this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex() + DefaultTypeValue.firstNumber), this.dynamicComponentsArray.length)){
      this.dynamicComponentsArray.forEach((element) => {
        if(!isSameValue(element.instance.id(), this.currenElementIndex()) && isGreaterThan(element.instance.zIndex(), DefaultTypeValue.zeroNumber)) element.instance.zIndex.set(element.instance.zIndex() - DefaultTypeValue.firstNumber);
      });
  
      this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex.set(this.dynamicComponentsArray.length - DefaultTypeValue.firstNumber);
    }    
  }

  moveToBack(): void {
    if(!isSameValue(this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex(), DefaultTypeValue.zeroNumber)){
      this.dynamicComponentsArray.forEach((element) => {
        if(!isSameValue(element.instance.id(), this.currenElementIndex()) && !isSameValue((element.instance.zIndex() + DefaultTypeValue.firstNumber), this.dynamicComponentsArray.length)) element.instance.zIndex.set(element.instance.zIndex() + DefaultTypeValue.firstNumber);
      });
  
      this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex.set(DefaultTypeValue.zeroNumber);
    }    
  }

  moveForward(): void {
    if(!isSameValue((this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex() + DefaultTypeValue.firstNumber),this.dynamicComponentsArray.length)){
      const nextZIndex = this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex() + DefaultTypeValue.firstNumber;

      this.dynamicComponentsArray.find(x => isSameValue(x.instance.zIndex(), nextZIndex))?.instance.zIndex.set(nextZIndex - DefaultTypeValue.firstNumber);      
      this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex.set(this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex() + DefaultTypeValue.firstNumber);
    }  
  }

  moveBackward(): void {
    if(!isSameValue(this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex(), DefaultTypeValue.zeroNumber)){
      const nextZIndex = this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex() - DefaultTypeValue.firstNumber;
      
      this.dynamicComponentsArray.find(x => isSameValue(x.instance.zIndex(), nextZIndex))?.instance.zIndex.set(nextZIndex + DefaultTypeValue.firstNumber);      
      this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex.set(this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex() - DefaultTypeValue.firstNumber);
    }  
  }

  deleteElement(): void {
    this.dynamicComponentsArray[this.currenElementIndex()].destroy();
    this.dynamicComponentsArray.splice(this.currenElementIndex(), 1);

    let counter = 0;    
    
    this.dynamicComponentsArray.sort(x => x.instance.zIndex()).forEach((element) => {
      element.instance.zIndex.set(counter);
      element.instance.id.set(counter);
      counter++;
    });
  }

  onRotateHorizontal(): void {
    this.dynamicComponentsArray[this.currenElementIndex()].instance.isHorizontalInverted = !this.dynamicComponentsArray[this.currenElementIndex()].instance.isHorizontalInverted;
  }

  onRotateVertical(): void {
    this.dynamicComponentsArray[this.currenElementIndex()].instance.isVerticalInverted = !this.dynamicComponentsArray[this.currenElementIndex()].instance.isVerticalInverted;
  }

  onDuplicate(): void{
    const originalDesignElementComponent = this.dynamicComponentsArray[this.currenElementIndex()];
    this.isNewElement.set(true);
    this.onTextValue(originalDesignElementComponent.instance.text());

    const newDesignElementComponent = this.dynamicComponentsArray[this.dynamicComponentsArray.length - 1];
    newDesignElementComponent.instance.width = originalDesignElementComponent.instance.width;
    newDesignElementComponent.instance.height = originalDesignElementComponent.instance.height;
  }
}