import { AfterViewInit, Component, ComponentRef, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { ProductDataService } from 'src/app/data-service/product-data.service';
import { ColorName } from 'src/app/enum/color.enum';
import { OptionProductComponent } from '../option-product/option-product.component';
import { OptionTextComponent } from '../option-text/option-text.component';
import { OptionWindow } from 'src/app/enum/option.enum';
import { DesignElementComponent } from '../design-element/design-element.component';
import { HiddenOptionValidation } from 'src/app/model/design/hidden-option-validation.model';
import { isHiddenOption } from 'src/app/validation/design/design.validationb';
import { ScreenSize } from 'src/app/enum/size.enum';
import { Position } from 'src/app/enum/position.enum';

@Component({
  selector: 'app-product-designer',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, OptionProductComponent, OptionTextComponent, DesignElementComponent],
  templateUrl: './product-designer.component.html',
  styleUrls: ['./product-designer.component.scss']
})
export class ProductDesignerComponent implements OnInit, AfterViewInit {

  @Input() currentOption: WritableSignal<OptionWindow>;
  @Input() isNewElement: WritableSignal<boolean>;

  private dynamicComponentsArray: ComponentRef<DesignElementComponent>[] = [];

  isFrontTShirt: WritableSignal<boolean>;
  tShirtColor: WritableSignal<ColorName>;
  option = OptionWindow;
  currenElementIndex: WritableSignal<number>;

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('workArea') workArea: ElementRef;
  @ViewChild('baseComponent', { read: ViewContainerRef }) baseComponent: ViewContainerRef;

  constructor(private productDataService: ProductDataService){}

  ngOnInit(): void {
      this.subscribeToEventTShirtColor();         
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setIsHiddenOptionProduct();
  }

  private setIsHiddenOptionProduct(): void{
    const hiddenOptionValidationModel = new HiddenOptionValidation();
    hiddenOptionValidationModel.baseNumber = window.innerWidth;
    hiddenOptionValidationModel.comparatorNumber = ScreenSize.bisgSize;

    if(isHiddenOption(hiddenOptionValidationModel, this.currentOption)) this.currentOption.set(OptionWindow.product);
  }

  private setInitialValue(): void {
    this.isFrontTShirt = signal(true);
    this.tShirtColor = signal(ColorName.white);
    this.setTShirtSource();
    this.setIsHiddenOptionProduct();
    this.currenElementIndex = signal(0);
  }

  private setTShirtSource(): void {    
    this.canvas.nativeElement.style.backgroundImage  = `url(../../../../assets/img/${this.tShirtColor()}-${ this.isFrontTShirt() ? Position.front: Position.back }.png)`;
  }

  private subscribeToEventTShirtColor(): void {
    this.productDataService.eventTShirtColor$.subscribe(
      (tShirtColor: ColorName) => {
        this.tShirtColor.set(tShirtColor);
        this.setTShirtSource();
      }
    );
  }

  onRotate(): void {
    this.isFrontTShirt.set(!this.isFrontTShirt());    
    this.setTShirtSource();
  } 

  onCloseOptionProduct(): void {
    this.currentOption.set(OptionWindow.empty);
  }

  onTextValue(textValue: string): void {
    if(this.isNewElement()){
      if(this.dynamicComponentsArray.length > 0) this.currenElementIndex.set( this.currenElementIndex() + 1);
      const newDesignElementComponent = this.baseComponent.createComponent(DesignElementComponent);
      newDesignElementComponent.instance.text = signal(textValue);
      newDesignElementComponent.instance.id = signal(this.currenElementIndex());
      newDesignElementComponent.instance.currentElement.subscribe(() => {
        this.currenElementIndex.set(newDesignElementComponent.instance.id());
        newDesignElementComponent.instance.text.set(newDesignElementComponent.instance.text());
      })
      
      this.dynamicComponentsArray.push(newDesignElementComponent);
      this.isNewElement.set(false);      
    }
    else{
      const componentRef = this.dynamicComponentsArray[this.currenElementIndex()];
      const component = (componentRef) as ComponentRef<DesignElementComponent>;
      component.instance.text.set(textValue);
    }
  }

  testaa(){

  }
}

