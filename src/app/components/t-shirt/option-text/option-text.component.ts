import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  effect,
  model,
} from '@angular/core';
import { DefaultTypeValue } from 'src/app/enum/type.enum';
import { OptionColor } from 'src/app/model/option/option-color.model';
import { OptionFont } from 'src/app/model/option/option-font.model';

@Component({
  selector: 'app-option-text',
  templateUrl: './option-text.component.html',
  styleUrls: ['./option-text.component.scss'],
})
export class OptionTextComponent implements OnInit, AfterViewInit, OnDestroy {
  invputValue = model<string>('');
  selectedFont = model<OptionFont>();
  selectedFontColor = model<OptionColor>();
  selectedOutlineFontColor = model<OptionColor>();
  selectedIndexOutlineFontColor = model<number>(0);
  selectedIndexFontColor = model<number>(0);
  selectedSize = model<number>(0);
  selectedArch = model<number>(0);

  @Input() fontColor: OptionColor[];
  @Input() outLineFontColor: OptionColor[];
  @Input() optionFont: OptionFont[];

  @Output() closeOptionProduct = new EventEmitter<void>();
  @Output() textValue = new EventEmitter<string>();
  @Output() switchHorizontalDirection = new EventEmitter<void>();
  @Output() switchVerticalDirection = new EventEmitter<void>();
  @Output() moveForward = new EventEmitter<void>();
  @Output() moveBackward = new EventEmitter<void>();
  @Output() duplicate = new EventEmitter<void>();

  @ViewChild('textInput') textInput: ElementRef;

  defaultTypeValueEnum = DefaultTypeValue;
  labelFont: string;
  labelColor: string;
  labelOutlineColor: string;
  showFontOption: boolean;
  showFontColorOption: boolean;
  showOutlineColorOption: boolean;
  slideDisabled: boolean;
  slideSizeMax: number;
  slideSizeMin: number;
  slideShowTicks: boolean;
  slideStep: number;
  slideThumbLabel: boolean;
  slideArcMax: number;
  slideArcMin: number;
  activeButton: string;

  private skipFirstEffect = true;

  constructor() {
    effect(() => {
      this.invputValue();
      if (this.skipFirstEffect) {
        this.skipFirstEffect = false;
        return;
      }
      this.setInitialValue();
    });
  }

  ngOnInit(): void {
    this.setInitialValue();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setTextInputFocus();
    }, 1000);
  }

  private setInitialValue(): void {
    this.labelFont = 'Font';
    this.labelColor = 'Color';
    this.labelOutlineColor = 'Borde';
    this.slideDisabled = false;
    this.slideSizeMax = 200;
    this.slideSizeMin = DefaultTypeValue.zeroNumber;
    this.slideShowTicks = false;
    this.slideStep = 1;
    this.slideThumbLabel = false;
    this.slideArcMax = 100;
    this.slideArcMin = 0;
  }

  private setTextInputFocus(): void {
    this.textInput.nativeElement.focus();
  }

  onTextInput(event: any): void {
    this.invputValue.set(event.target.value);
    this.textValue.emit(event.target.value);
  }

  ngOnDestroy(): void {
    this.invputValue.set(DefaultTypeValue.emptyString);
  }

  onRotateHorizontal(): void {
    this.switchHorizontalDirection.emit();
  }

  onRotateVertical(): void {
    this.switchVerticalDirection.emit();
  }

  onSelectFontOption(showOption: string): void {
    this.onHideOption();
    switch (showOption) {
      case 'showFontColorOption':
        this.showFontColorOption = true;
        break;
      case 'showFontOption':
        this.showFontOption = true;
        break;
      case 'showOutlineColorOption':
        this.showOutlineColorOption = true;
    }
  }

  onHideOption(): void {
    this.showFontColorOption = false;
    this.showFontOption = false;
    this.showOutlineColorOption = false;
  }
}
