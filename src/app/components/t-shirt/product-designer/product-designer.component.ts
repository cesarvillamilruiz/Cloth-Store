import {
  Component,
  ComponentRef,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
  model,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductDataService } from 'src/app/data-service/product-data.service';
import { ColorName } from 'src/app/enum/color.enum';
import { ElementComponent, OptionEdit, OptionWindow } from 'src/app/enum/option.enum';
import { DesignElementComponent } from '../design-element/design-element.component';
import { HiddenOptionValidation } from 'src/app/model/Utility/hidden-option-validation.model';
import { isHiddenOption } from 'src/app/validation/design/design.validationb';
import { ScreenSize } from 'src/app/enum/screen-size.enum';
import { Location } from 'src/app/enum/location.enum';
import { DefaultTypeValue } from 'src/app/enum/type.enum';
import { isGreaterThan, isSameValue } from 'src/app/validation/generic/generic.validation';
import { Design } from 'src/app/model/t-shirt/design.model';
import { ApplicationDataService } from 'src/app/data-service/application-data.service';
import { Customization } from 'src/app/model/t-shirt/customization.model';
import { OptionSize } from 'src/app/model/option/option-size.model';
import { OptionColor } from 'src/app/model/option/option-color.model';
import { forkJoin } from 'rxjs';
import { OptionService } from 'src/app/services/option/option.service';
import { LoadingService } from 'src/app/services/shared/loading/loading.service';
import { OptionProduct } from 'src/app/model/option/product.model';
import { Configuration } from 'src/app/core/core-configuration';
import { OptionFont } from 'src/app/model/option/option-font.model';
import { OptionPreDesign } from 'src/app/model/option/option-pre-design.model';
import { BlobService } from 'src/app/services/blob/blob.service';

@Component({
  selector: 'app-product-designer',
  templateUrl: './product-designer.component.html',
  styleUrls: ['./product-designer.component.scss'],
})
export class ProductDesignerComponent implements OnInit {
  currentOption = model<OptionWindow>(OptionWindow.empty);
  isNewElement = model<boolean>(true);

  public dynamicComponentsArray: ComponentRef<DesignElementComponent>[] = [];

  optionProduct: OptionProduct[];
  tShirtColor: OptionColor[];
  fontColor: OptionColor[];
  outLineFontColor: OptionColor[];
  optionSize: OptionSize[];
  optionFont: OptionFont[];
  optionPreDesign: OptionPreDesign[];
  tShirtColorSelected: string;
  option = OptionWindow;
  currenElementIndex = 0;
  inputValue = '';
  isCloseOptionAllowed = true;
  currentEditOption: string;
  optionEditEnum = OptionEdit;
  defaultTypeValueEnum = DefaultTypeValue;
  selectedIndexFontColor = 0;
  selectedIndexOutlineFontColor = 0;

  selectedFont: OptionFont;
  selectedFontColor: OptionColor;
  selectedOutlineFontColor: OptionColor;
  design: Design;
  selectedIndexProduct: number;
  selectedArch: number;

  get selectedSizeValue(): number {
    return this.dynamicComponentsArray[this.currenElementIndex]?.instance.width?.() ?? 0;
  }

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('workArea') workArea: ElementRef;
  @ViewChild('baseComponent', { read: ViewContainerRef }) baseComponent: ViewContainerRef;

  private readonly destroyRef = inject(DestroyRef);

  constructor(private productDataService: ProductDataService,
    private applicationDataService: ApplicationDataService,
    private readonly optionService: OptionService,
    private readonly loadingService: LoadingService,
    private readonly configuration: Configuration,
    private readonly blobService: BlobService) {}

  ngOnInit(): void {
    this.subscribeToEvents();
    this.setOptions();
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
    this.selectedIndexProduct = +DefaultTypeValue.zeroNumber;
    const initialColor = this.tShirtColor.find(x => x.name.toLowerCase() === ColorName.white);
    this.tShirtColorSelected = initialColor?.name ?? '';
    const initialDesign = new Design();
    initialDesign.location = Location.front;
    this.design = initialDesign;
    this.onAddProduct();
    this.setTShirtSource();
    this.setIsHiddenOptionProduct();
    this.currenElementIndex = +DefaultTypeValue.zeroNumber;
    this.inputValue = DefaultTypeValue.emptyString.toString();
    this.isCloseOptionAllowed = true;
    this.selectedFont = this.optionFont[0];
    this.selectedFontColor = this.fontColor[0];
    this.selectedOutlineFontColor = this.outLineFontColor[0];
    this.selectedIndexFontColor = +DefaultTypeValue.zeroNumber;
    this.selectedIndexOutlineFontColor = +DefaultTypeValue.zeroNumber;
    this.selectedArch = +DefaultTypeValue.zeroNumber;
  }

  private setTShirtSource(): void {
    this.canvas.nativeElement.style.backgroundImage = `url(../../../../assets/img/${this.tShirtColorSelected.toLowerCase()}-${this.design?.location}.png)`;
  }

  private subscribeToEvents(): void {
    this.subscribeToEventTShirtColor();
    this.subscribeToApplicationData();
  }

  private subscribeToEventTShirtColor(): void {
    this.productDataService.eventTShirtColorId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((colorId: string) => {
        this.tShirtColorSelected = this.tShirtColor.find(x => x.optionColorId === colorId)?.name ?? '';
        this.setTShirtSource();
      });
  }

  private subscribeToApplicationData(): void {
    this.applicationDataService.eventDeleteCurrentDesign$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.deleteElement(this.currenElementIndex);
      });

    this.applicationDataService.eventSaveDesign$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.dynamicComponentsArray.forEach(customization => {
          const selectedCustomization = new Customization();
          selectedCustomization.id = customization.instance.id;
          selectedCustomization.zIndex = customization.instance.zIndex();
          selectedCustomization.designId = customization.instance.designUrl;
          selectedCustomization.width = customization.instance.width();
          selectedCustomization.height = customization.instance.height();

          if (customization.instance.optionType === OptionWindow.text) {
            selectedCustomization.isHorizontalInverted = customization.instance.isHorizontalInverted;
            selectedCustomization.isVerticalInverted = customization.instance.isVerticalInverted;
            selectedCustomization.text = customization.instance?.text();
            selectedCustomization.arch = customization.instance.arch();
          }
        });

        console.log(JSON.stringify(this.design, null, 2));
      });
  }

  private validateExistingDesign(): void {
    if (!this.dynamicComponentsArray?.length) {
      this.applicationDataService.hasDesigns = false;
      this.design = new Design();
      this.setInitialValue();
    }
  }

  private setOptions(): void {
    this.loadingService.show();

    forkJoin({
      optionSize: this.optionService.getAllSizes(),
      optionColor: this.optionService.getAllColors(),
      optionFont: this.optionService.getFonts(),
      optioProduct: this.optionService.getProductsByCategoryName(ElementComponent.tShirt),
      optioPreDesign: this.optionService.getPreDesigns(),
    }).subscribe({
      next: ({ optionSize, optionColor, optioProduct, optionFont, optioPreDesign }) => {
        this.optionSize = optionSize;
        this.tShirtColor = optionColor.filter(x => x.componentName === ElementComponent.tShirt);
        this.fontColor = optionColor.filter(x => x.componentName === ElementComponent.fontColor);
        this.outLineFontColor = optionColor.filter(x => x.componentName === ElementComponent.outlineFontColor);
        this.optionProduct = optioProduct;
        this.optionFont = optionFont;
        this.optionPreDesign = optioPreDesign;
        this.setInitialValue();
        this.validateExistingProduct();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  validateExistingProduct(): void {
    if (!this.design?.productId.length) {
      this.onAddProduct();
    }
  }

  onAddProduct(): void {
    const initialColor = this.tShirtColor.find(x => x.name.toLowerCase() === ColorName.white);
    this.design.productId.push(this.optionProduct.find(x => x?.colorId === initialColor?.optionColorId)?.optionProductId ?? this.configuration.emptyGuid);
    this.selectedIndexProduct = this.design?.productId.length - DefaultTypeValue.firstNumber;
  }

  onSelectDesign(designUrl: string): void {
    this.validateExistingProduct();

    this.currenElementIndex = this.dynamicComponentsArray.length;
    const newDesignElementComponent = this.baseComponent.createComponent(DesignElementComponent);
    newDesignElementComponent.instance.id = this.currenElementIndex;
    newDesignElementComponent.instance.zIndex.set(this.dynamicComponentsArray.length);
    newDesignElementComponent.instance.showText = false;
    newDesignElementComponent.instance.optionType = OptionWindow.draw;
    newDesignElementComponent.instance.isSelected.set(true);
    newDesignElementComponent.instance.designUrl = designUrl;
    newDesignElementComponent.instance.height.set(50);
    newDesignElementComponent.instance.width.set(50);
    newDesignElementComponent.instance.location = this.design.location;
    newDesignElementComponent.instance.isVisible = true;

    newDesignElementComponent.instance.currentElement.subscribe(() => {
      this.currenElementIndex = newDesignElementComponent.instance.id;
      this.isCloseOptionAllowed = false;
      this.isNewElement.set(false);

      this.dynamicComponentsArray.forEach((element) => {
        element.instance.isSelected.set(false);
        element.instance.showLayerOptions = false;
        if (isSameValue(element.instance.id, this.currenElementIndex)) {
          element.instance.isSelected.set(true);
        }
      });
    });

    newDesignElementComponent.instance.onDeleteElement.subscribe((id: number) => {
      this.deleteElement(id);
    });

    newDesignElementComponent.instance.onMoveToFront.subscribe(() => { this.moveToFront(); });
    newDesignElementComponent.instance.onMoveToBack.subscribe(() => { this.moveToBack(); });
    newDesignElementComponent.instance.onMoveForward.subscribe(() => { this.moveForward(); });
    newDesignElementComponent.instance.onMoveBackward.subscribe(() => { this.moveBackward(); });

    this.dynamicComponentsArray.push(newDesignElementComponent);
    this.applicationDataService.hasDesigns = true;
    this.isNewElement.set(false);
  }

  onFileUpload(file: File): void {
    if (file) {
      this.validateExistingProduct();
      this.setUploadUrl(file);
    }
  }

  private setUploadUrl(file: File): void {
    const formData = new FormData();
    formData.append('Image', file);

    this.blobService.getUploadUrl(formData).subscribe({
      next: (result: any) => {
        this.currenElementIndex = this.dynamicComponentsArray.length;
        const newDesignElementComponent = this.baseComponent.createComponent(DesignElementComponent);
        newDesignElementComponent.instance.id = this.currenElementIndex;
        newDesignElementComponent.instance.zIndex.set(this.dynamicComponentsArray.length);
        newDesignElementComponent.instance.showText = false;
        newDesignElementComponent.instance.designUrl = result;
        newDesignElementComponent.instance.optionType = OptionWindow.upload;
        newDesignElementComponent.instance.isSelected.set(true);
        newDesignElementComponent.instance.height.set(50);
        newDesignElementComponent.instance.width.set(50);
        newDesignElementComponent.instance.location = this.design.location;
        newDesignElementComponent.instance.isVisible = true;

        newDesignElementComponent.instance.currentElement.subscribe(() => {
          this.currenElementIndex = newDesignElementComponent.instance.id;
          this.isCloseOptionAllowed = false;
          this.isNewElement.set(false);
        });

        newDesignElementComponent.instance.onDeleteElement.subscribe((id: number) => {
          this.deleteElement(id);
        });

        newDesignElementComponent.instance.onMoveToFront.subscribe(() => { this.moveToFront(); });
        newDesignElementComponent.instance.onMoveToBack.subscribe(() => { this.moveToBack(); });
        newDesignElementComponent.instance.onMoveForward.subscribe(() => { this.moveForward(); });
        newDesignElementComponent.instance.onMoveBackward.subscribe(() => { this.moveBackward(); });

        this.dynamicComponentsArray.push(newDesignElementComponent);
        this.applicationDataService.hasDesigns = true;
        this.isNewElement.set(false);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onTextValue(textValue: string): void {
    this.validateExistingProduct();

    if (this.isNewElement()) {
      this.currenElementIndex = this.dynamicComponentsArray.length;
      const newDesignElementComponent = this.baseComponent.createComponent(DesignElementComponent);
      newDesignElementComponent.instance.text.set(textValue);
      newDesignElementComponent.instance.id = this.currenElementIndex;
      newDesignElementComponent.instance.zIndex.set(this.dynamicComponentsArray.length);
      newDesignElementComponent.instance.fontFamily.set(this.selectedFont);
      newDesignElementComponent.instance.fontColor.set(this.selectedFontColor);
      newDesignElementComponent.instance.outlineFontColor.set(this.selectedOutlineFontColor);
      newDesignElementComponent.instance.showText = true;
      newDesignElementComponent.instance.optionType = OptionWindow.text;
      newDesignElementComponent.instance.arch.set(this.selectedArch);
      newDesignElementComponent.instance.isSelected.set(true);
      newDesignElementComponent.instance.height.set(50);
      newDesignElementComponent.instance.width.set(50);
      newDesignElementComponent.instance.location = this.design.location;
      newDesignElementComponent.instance.isVisible = true;

      newDesignElementComponent.instance.currentElement.subscribe(() => {
        this.currenElementIndex = newDesignElementComponent.instance.id;
        this.inputValue = newDesignElementComponent.instance.text();
        this.isCloseOptionAllowed = false;
        this.isNewElement.set(false);
        this.dynamicComponentsArray.forEach((element) => {
          element.instance.isSelected.set(false);
          element.instance.showLayerOptions = false;
          if (isSameValue(element.instance.id, this.currenElementIndex)) {
            element.instance.isSelected.set(true);
          }
        });
      });

      newDesignElementComponent.instance.onDeleteElement.subscribe((id: number) => { this.deleteElement(id); });
      newDesignElementComponent.instance.onMoveToFront.subscribe(() => { this.moveToFront(); });
      newDesignElementComponent.instance.onMoveToBack.subscribe(() => { this.moveToBack(); });
      newDesignElementComponent.instance.onMoveForward.subscribe(() => { this.moveForward(); });
      newDesignElementComponent.instance.onMoveBackward.subscribe(() => { this.moveBackward(); });

      this.dynamicComponentsArray.push(newDesignElementComponent);
      this.applicationDataService.hasDesigns = true;
      this.isNewElement.set(false);
      return;
    }

    const component = this.dynamicComponentsArray[this.currenElementIndex] as ComponentRef<DesignElementComponent>;
    component.instance.text.set(textValue);
  }

  onRotate(): void {
    this.design.location = this.design.location === Location.front ? Location.back : Location.front;

    const newLocation = this.design.location;
    this.dynamicComponentsArray.forEach(ref => {
      ref.instance.isVisible = ref.instance.location === newLocation;
    });

    this.setTShirtSource();
  }

  onCloseOptionProduct(): void {
    this.currentOption.set(OptionWindow.empty);
  }

  onSelectWorkArea(): void {
    if (this.isCloseOptionAllowed) {
      this.setCurrentOption(OptionWindow.product);
      this.inputValue = DefaultTypeValue.emptyString;
      return;
    }

    if (this.dynamicComponentsArray.length && this.dynamicComponentsArray[this.currenElementIndex].instance.optionType != OptionWindow.upload) {
      this.setCurrentOption(this.dynamicComponentsArray[this.currenElementIndex].instance.optionType);
    }

    this.isCloseOptionAllowed = true;
  }

  setCurrentOption(optionWindow: OptionWindow): void {
    this.currentOption.set(optionWindow);
  }

  openLayerPicker(): void {
    this.currentEditOption = this.dynamicComponentsArray.length && this.currentEditOption !== OptionEdit.layer ? OptionEdit.layer : '';
  }

  onSelectedFontChange(font: OptionFont | undefined): void {
    if (font) this.selectedFont = font;
    this.syncTextStyleToCurrentElement();
  }

  onSelectedFontColorChange(color: OptionColor | undefined): void {
    if (color) this.selectedFontColor = color;
    this.syncTextStyleToCurrentElement();
  }

  onSelectedOutlineFontColorChange(color: OptionColor | undefined): void {
    if (color) this.selectedOutlineFontColor = color;
    this.syncTextStyleToCurrentElement();
  }

  onSelectedArchChange(arch: number): void {
    this.selectedArch = arch;
    this.syncTextStyleToCurrentElement();
  }

  onSelectedSizeChange(size: number): void {
    const ref = this.dynamicComponentsArray[this.currenElementIndex];
    if (ref) ref.instance.width.set(size);
  }

  private syncTextStyleToCurrentElement(): void {
    const ref = this.dynamicComponentsArray[this.currenElementIndex];
    if (ref?.instance.optionType === OptionWindow.text) {
      ref.instance.fontFamily.set(this.selectedFont);
      ref.instance.fontColor.set(this.selectedFontColor);
      ref.instance.outlineFontColor.set(this.selectedOutlineFontColor);
      ref.instance.arch.set(this.selectedArch);
    }
  }

  moveToFront(): void {
    if (!isSameValue((this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex() + DefaultTypeValue.firstNumber), this.dynamicComponentsArray.length)) {
      this.dynamicComponentsArray.forEach((element) => {
        if (!isSameValue(element.instance.id, this.currenElementIndex) && isGreaterThan(element.instance.zIndex(), DefaultTypeValue.zeroNumber))
          element.instance.zIndex.set(element.instance.zIndex() - DefaultTypeValue.firstNumber);
      });
      this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex.set(this.dynamicComponentsArray.length - DefaultTypeValue.firstNumber);
    }
  }

  moveToBack(): void {
    if (!isSameValue(this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex(), DefaultTypeValue.zeroNumber)) {
      this.dynamicComponentsArray.forEach((element) => {
        if (!isSameValue(element.instance.id, this.currenElementIndex) && !isSameValue((element.instance.zIndex() + DefaultTypeValue.firstNumber), this.dynamicComponentsArray.length))
          element.instance.zIndex.set(element.instance.zIndex() + DefaultTypeValue.firstNumber);
      });
      this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex.set(DefaultTypeValue.zeroNumber);
    }
  }

  moveForward(): void {
    if (!isSameValue((this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex() + DefaultTypeValue.firstNumber), this.dynamicComponentsArray.length)) {
      const nextZIndex = this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex() + DefaultTypeValue.firstNumber;
      this.dynamicComponentsArray.find(x => isSameValue(x.instance.zIndex(), nextZIndex))?.instance.zIndex.set(nextZIndex - DefaultTypeValue.firstNumber);
      this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex.set(this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex() + DefaultTypeValue.firstNumber);
    }
  }

  moveBackward(): void {
    if (!isSameValue(this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex(), DefaultTypeValue.zeroNumber)) {
      const nextZIndex = this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex() - DefaultTypeValue.firstNumber;
      this.dynamicComponentsArray.find(x => isSameValue(x.instance.zIndex(), nextZIndex))?.instance.zIndex.set(nextZIndex + DefaultTypeValue.firstNumber);
      this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex.set(this.dynamicComponentsArray[this.currenElementIndex].instance.zIndex() - DefaultTypeValue.firstNumber);
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
    this.dynamicComponentsArray[this.currenElementIndex].instance.isHorizontalInverted =
      !this.dynamicComponentsArray[this.currenElementIndex].instance.isHorizontalInverted;
  }

  onRotateVertical(): void {
    this.dynamicComponentsArray[this.currenElementIndex].instance.isVerticalInverted =
      !this.dynamicComponentsArray[this.currenElementIndex].instance.isVerticalInverted;
  }

  onDuplicate(): void {
    const originalDesignElementComponent = this.dynamicComponentsArray[this.currenElementIndex];
    this.isNewElement.set(true);
    this.onTextValue(originalDesignElementComponent.instance.text());

    const newDesignElementComponent = this.dynamicComponentsArray[this.dynamicComponentsArray.length - 1];
    newDesignElementComponent.instance.width.set(originalDesignElementComponent.instance.width());
    newDesignElementComponent.instance.height.set(originalDesignElementComponent.instance.height());
  }
}
