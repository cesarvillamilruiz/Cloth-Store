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
import { ProductDataService } from 'src/app/data-service/product-data.service';
import { ColorName } from 'src/app/enum/color.enum';
import { OptionEdit, OptionWindow } from 'src/app/enum/option.enum';
import { DesignElementComponent } from '../design-element/design-element.component';
import { HiddenOptionValidation } from 'src/app/model/Utility/hidden-option-validation.model';
import { isHiddenOption } from 'src/app/validation/design/design.validationb';
import { ScreenSize } from 'src/app/enum/screen-size.enum';
import { Location } from 'src/app/enum/location.enum';
import { DefaultTypeValue } from 'src/app/enum/type.enum';
import { isGreaterThan, isSameValue } from 'src/app/validation/generic/generic.validation';
import { Item } from 'src/app/model/t-shirt/item.model';
import { optionFontColor } from './../../../util/configuration/option-font-color.configuration.json';
import { ApplicationDataService } from 'src/app/data-service/application-data.service';
import { Customization } from 'src/app/model/t-shirt/customization.model';
import { ImageToBase64Service } from 'src/app/services/shared/image/image-to-base-64.service';

@Component({
  selector: 'app-product-designer',
  templateUrl: './product-designer.component.html',
  styleUrls: ['./product-designer.component.scss'],
})
export class ProductDesignerComponent
  implements OnInit, AfterViewInit
{
  @Input() currentOption: WritableSignal<OptionWindow>;
  @Input() isNewElement: WritableSignal<boolean>;
  
  public dynamicComponentsArray: ComponentRef<DesignElementComponent>[] = [];
  
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
  products: WritableSignal<Item[]>;
  selectedIndexProduct: WritableSignal<number>;
  selectedIndexFontColor: WritableSignal<number>;
  selectedIndexOutlineFontColor: WritableSignal<number>;
  optionFontColor = optionFontColor;
  selectedSize: WritableSignal<number>;
  selectedArc: WritableSignal<number>;
  isFrontLocation: boolean;

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('workArea') workArea: ElementRef;
  @ViewChild('baseComponent', { read: ViewContainerRef }) baseComponent: ViewContainerRef;

  constructor(private productDataService: ProductDataService,
    private applicationDataService: ApplicationDataService,
    private imageToBase64Service: ImageToBase64Service) {
    effect(() => {
      //TODO Remove
      console.log(this.selectedArc());
      if(this.dynamicComponentsArray[this.currenElementIndex()]){
        this.dynamicComponentsArray[this.currenElementIndex()].instance.height.set(this.selectedSize());
        this.dynamicComponentsArray[this.currenElementIndex()].instance.arch.set(this.selectedArc());
      }
    }, {allowSignalWrites: true});
  }

  ngOnInit(): void {
    this.subscribeToEvents();    
  }

  ngAfterViewInit(): void {
    this.setInitialValue();
    this.validateExistingProduct();
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
    this.tShirtColor = signal(ColorName.white);
    this.products = signal<Item[]>([]);
    this.setTShirtSource();
    this.setIsHiddenOptionProduct();
    this.currenElementIndex = signal(+DefaultTypeValue.zeroNumber);
    this.inputValue = signal(DefaultTypeValue.emptyString.toString());
    this.isCloseOptionAllowed = signal(true);
    this.selectedFont = signal(DefaultTypeValue.emptyString.toString());
    this.selectedFontColor = signal(optionFontColor[DefaultTypeValue.zeroNumber].value);
    this.selectedOutlineFontColor = signal(DefaultTypeValue.emptyString.toString());
    this.selectedIndexProduct = signal(+DefaultTypeValue.zeroNumber);
    this.selectedIndexFontColor = signal(+DefaultTypeValue.zeroNumber);
    this.selectedIndexOutlineFontColor = signal(+DefaultTypeValue.zeroNumber);
    this.selectedSize = signal(50);
    this.selectedArc = signal(+DefaultTypeValue.zeroNumber);
  }

  private setTShirtSource(): void {
    this.isFrontLocation = true;
    if(this.products().length){
      this.products()[this.selectedIndexProduct()].customization[this.currenElementIndex()].isFrontLocation = true;
    }
    this.canvas.nativeElement.style.backgroundImage = `url(../../../../assets/img/${this.tShirtColor()}-${this.isFrontLocation ? Location.front : Location.back}.png)`;    
  }

  private subscribeToEvents(): void{
    this.subscribeToEventTShirtColor();
    this.subscribeToApplicationData();
  }

  private subscribeToEventTShirtColor(): void {
    this.productDataService.eventTShirtColor$.subscribe(
      (tShirtColor: ColorName) => {
        this.tShirtColor.set(tShirtColor);
        this.setTShirtSource();
      }
    );
  }

  private subscribeToApplicationData(): void {
    this.applicationDataService.eventDeleteCurrentDesign$.subscribe(
      () => {
        this.deleteElement(this.currenElementIndex());
      }
    );

    this.applicationDataService.eventSaveCurrentDesign$.subscribe(
      () => {
        
        this.products()[this.selectedIndexProduct()].customization = [];
        this.dynamicComponentsArray.forEach(customization => {
          
          const selectedCustomization = new Customization();
          selectedCustomization.id = customization.instance.id;
          selectedCustomization.zIndex = customization.instance.zIndex();          
          selectedCustomization.designId = customization.instance.designId;
          selectedCustomization.width = customization.instance.width();
          selectedCustomization.height = customization.instance.height();
          // selectedCustomization.imgHeight = customization.instance.imgHeight();
          // selectedCustomization.type = customization.instance.optionType;
          
          if(customization.instance.optionType === OptionWindow.text){
            selectedCustomization.isHorizontalInverted = customization.instance.isHorizontalInverted;
            selectedCustomization.isVerticalInverted = customization.instance.isVerticalInverted;
            selectedCustomization.text = customization.instance?.text();
            selectedCustomization.arch = customization.instance.selectedArc();
            selectedCustomization.arch = customization.instance.arch();
            selectedCustomization.fontFamily = customization.instance.fontFamily();
            selectedCustomization.fontColorId = customization.instance.fontColorId();
            selectedCustomization.outlineFontColorId = customization.instance.outlineFontColorId();            
          }
          
          // this.products()[this.selectedIndexProduct()].design.push(selectedCustomization);
        });

        console.log(JSON.stringify(this.products(), null, 2));
      }
    );
  }

  private validateExistingDesign(): void {
    if(!this.dynamicComponentsArray?.length){
      this.applicationDataService.hasDesigns = false;
      this.products.set([]);      
    }    
  }

  private validateSize(): void {
    if(this.products()[this.currenElementIndex()]?.inventorySet.length < 1 &&
      this.applicationDataService.hasDesigns
    ){
      // this.products()[this.currenElementIndex()].size.s.amount = 1;
    }
  }

  validateExistingProduct(): void {
    if(!this.products()?.length){
      this.onAddProduct();      
    }
  }

  onAddProduct(): void{
    this.products().push(new Item());
    this.selectedIndexProduct.set(this.products().length - 1);

    if(this.dynamicComponentsArray?.length > 0){
      // this.products()[this.selectedIndexProduct()].size.s.amount = 1;
    }    
  }

  onSelectDesign(selectedDesignName: string): void {
    this.validateExistingProduct();
    
    this.currenElementIndex.set(this.dynamicComponentsArray.length);
    const newDesignElementComponent = this.baseComponent.createComponent(
      DesignElementComponent
    );
    newDesignElementComponent.instance.id = this.currenElementIndex();
    newDesignElementComponent.instance.zIndex = signal(this.dynamicComponentsArray.length);
    newDesignElementComponent.instance.showText = false;
    newDesignElementComponent.instance.optionType = OptionWindow.draw;
    newDesignElementComponent.instance.isSelected = signal(true);

    //TODO review (designId = base64;)
    this.imageToBase64Service.getBase64Image(`../../../../assets/design/${selectedDesignName}`)
                              .then(base64 => {
                                newDesignElementComponent.instance.designId = base64;
                              })
                              .catch(error => console.error('Error converting image:', error));

    newDesignElementComponent.instance.currentElement.subscribe(() => {        
      this.currenElementIndex.set(newDesignElementComponent.instance.id);
      this.isCloseOptionAllowed.set(false);
      this.isNewElement.set(false);
    });

    newDesignElementComponent.instance.onDeleteElement.subscribe((id: number) => {         
      this.deleteElement(id);
    });

    this.dynamicComponentsArray.push(newDesignElementComponent);
    this.applicationDataService.hasDesigns = true;
    this.isNewElement.set(false);
    
    this.validateSize();
  }
  
  onFileUpload(file: File): void {
    if (file) {
      this.validateExistingProduct();
      
      const reader = new FileReader();
      reader.onload = e => {
        this.uploadedImageUrl = reader.result;
        this.currenElementIndex.set(this.dynamicComponentsArray.length);
        const newDesignElementComponent = this.baseComponent.createComponent(
          DesignElementComponent
        );
        newDesignElementComponent.instance.id = this.currenElementIndex();
        newDesignElementComponent.instance.zIndex = signal(this.dynamicComponentsArray.length);
        newDesignElementComponent.instance.showText = false;
        newDesignElementComponent.instance.designId = this.uploadedImageUrl as string;
        newDesignElementComponent.instance.optionType = OptionWindow.upload;
        newDesignElementComponent.instance.isSelected = signal(true);

        newDesignElementComponent.instance.currentElement.subscribe(() => {        
          this.currenElementIndex.set(newDesignElementComponent.instance.id);
          this.isCloseOptionAllowed.set(false);
          this.isNewElement.set(false);
        });

        newDesignElementComponent.instance.onDeleteElement.subscribe((id: number) => {         
          this.deleteElement(id);
        });

        newDesignElementComponent.instance.onMoveToFront.subscribe(() => {         
          this.moveToFront();
        });
  
        newDesignElementComponent.instance.onMoveToBack.subscribe(() => {         
          this.moveToBack();
        });
  
        newDesignElementComponent.instance.onMoveForward.subscribe(() => {         
          this.moveForward();
        });
  
        newDesignElementComponent.instance.onMoveBackward.subscribe(() => {         
          this.moveBackward();
        });
        
        this.dynamicComponentsArray.push(newDesignElementComponent);
        this.applicationDataService.hasDesigns = true;
        this.validateSize();
        this.isNewElement.set(false);
        return;
      } 
      reader.readAsDataURL(file);      
    }
  }

  onTextValue(textValue: string): void {
    this.validateExistingProduct();    

    if (this.isNewElement()) {
      this.currenElementIndex.set(this.dynamicComponentsArray.length);
      const newDesignElementComponent = this.baseComponent.createComponent(
        DesignElementComponent
      );
      newDesignElementComponent.instance.text = signal(textValue);
      newDesignElementComponent.instance.id = this.currenElementIndex();
      newDesignElementComponent.instance.zIndex = signal(this.dynamicComponentsArray.length);
      newDesignElementComponent.instance.fontFamily = this.selectedFont;
      newDesignElementComponent.instance.fontColorId = this.selectedFontColor;
      newDesignElementComponent.instance.outlineFontColorId = this.selectedOutlineFontColor;
      newDesignElementComponent.instance.showText = true;      
      newDesignElementComponent.instance.optionType = OptionWindow.text;
      newDesignElementComponent.instance.selectedArc = this.selectedArc;
      newDesignElementComponent.instance.arch = signal(this.selectedArc());
      newDesignElementComponent.instance.isSelected = signal(true);
      newDesignElementComponent.instance.height = this.selectedSize;
      
      newDesignElementComponent.instance.currentElement.subscribe(() => {        
        this.currenElementIndex.set(newDesignElementComponent.instance.id);
        this.inputValue.set(newDesignElementComponent.instance.text());
        this.isCloseOptionAllowed.set(false);
        this.isNewElement.set(false);
        this.dynamicComponentsArray.forEach((element) => {
          element.instance.isSelected.set(false);
          element.instance.showLayerOptions = false;
          if(isSameValue(element.instance.id, this.currenElementIndex()))
            {
              element.instance.isSelected.set(true);
            }
        });
      });
      
      newDesignElementComponent.instance.onDeleteElement.subscribe((id: number) => {         
        this.deleteElement(id);
      });

      newDesignElementComponent.instance.onMoveToFront.subscribe(() => {         
        this.moveToFront();
      });

      newDesignElementComponent.instance.onMoveToBack.subscribe(() => {         
        this.moveToBack();
      });

      newDesignElementComponent.instance.onMoveForward.subscribe(() => {         
        this.moveForward();
      });

      newDesignElementComponent.instance.onMoveBackward.subscribe(() => {         
        this.moveBackward();
      });
      
      this.dynamicComponentsArray.push(newDesignElementComponent);
      this.applicationDataService.hasDesigns = true;
      this.isNewElement.set(false);
      this.validateSize();
      return;
    }

    const componentRef = this.dynamicComponentsArray[this.currenElementIndex()];
    const component = componentRef as ComponentRef<DesignElementComponent>;
    component.instance.text.set(textValue);
  }

  onRotate(): void {
    this.isFrontLocation = !this.isFrontLocation;    
    this.setTShirtSource();
  }

  onCloseOptionProduct(): void {
    this.currentOption.set(OptionWindow.empty);
  }

  onSelectWorkArea(): void {
    if (this.isCloseOptionAllowed()) {
      this.setCurrentOption(OptionWindow.product);      
      this.inputValue.set(DefaultTypeValue.emptyString);
      return;
    }

    if(this.dynamicComponentsArray.length && this.dynamicComponentsArray[this.currenElementIndex()].instance.optionType != OptionWindow.upload){
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
        if(!isSameValue(element.instance.id, this.currenElementIndex()) && isGreaterThan(element.instance.zIndex(), DefaultTypeValue.zeroNumber)) element.instance.zIndex.set(element.instance.zIndex() - DefaultTypeValue.firstNumber);
      });
  
      this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex.set(this.dynamicComponentsArray.length - DefaultTypeValue.firstNumber);
    }    
  }

  moveToBack(): void {
    if(!isSameValue(this.dynamicComponentsArray[this.currenElementIndex()].instance.zIndex(), DefaultTypeValue.zeroNumber)){
      this.dynamicComponentsArray.forEach((element) => {
        if(!isSameValue(element.instance.id, this.currenElementIndex()) && !isSameValue((element.instance.zIndex() + DefaultTypeValue.firstNumber), this.dynamicComponentsArray.length)) element.instance.zIndex.set(element.instance.zIndex() + DefaultTypeValue.firstNumber);
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

  deleteElement(id: number): void {
    this.dynamicComponentsArray[id].destroy();
    this.dynamicComponentsArray.splice(id, 1);

    let counter = 0;    
    
    this.dynamicComponentsArray.sort(x => x.instance.zIndex()).forEach((element) => {
      element.instance.zIndex.set(counter);
      element.instance.id = counter;
      counter++;
    });

    this.validateExistingDesign();
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