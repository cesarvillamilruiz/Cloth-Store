import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { DefaultTypeValue } from 'src/app/enum/type.enum';

@Component({
  selector: 'app-option-text',
  templateUrl: './option-text.component.html',
  styleUrls: ['./option-text.component.scss'],
})
export class OptionTextComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() invputValue: WritableSignal<string>;
  @Input() selectedFont: WritableSignal<string>;
  @Input() selectedFontColor: WritableSignal<string>;
  @Input() selectedOutlineFontColor: WritableSignal<string>;
  @Input() selectedIndexOutlineFontColor: WritableSignal<number>;
  @Input() selectedIndexFontColor: WritableSignal<number>;
  @Input() selectedSize: WritableSignal<number>;
  @Input() selectedArc: WritableSignal<number>;

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

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['invputValue'] && !changes['invputValue'].isFirstChange()){
      this.setInitialValue();
    }
  }

  ngOnInit(): void {
    this.setInitialValue();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setTextInputFocus();
    }, 1000)
  }

  private setInitialValue(): void {    
    this.labelFont = 'Font';
    this.labelColor = 'Color';
    this.labelOutlineColor = 'Borde'
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

    switch(showOption) {
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