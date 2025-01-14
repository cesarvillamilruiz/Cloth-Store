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
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DefaultTypeValue } from 'src/app/enum/type.enum';
import { OptionFontComponent } from '../option-font/option-font.component';
import { OptionColorComponent } from '../option-color/option-color.component';
import { ButtonOneComponent } from '../../generic/button-one/button-one.component';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-option-text',
  standalone: true,
  imports: [CommonModule,
    NgOptimizedImage,
    OptionFontComponent,
    ButtonOneComponent,
    OptionColorComponent,
    MatSliderModule,
    FormsModule],
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
  slideMax: number;
  slideMin: number;
  slideShowTicks: boolean;
  slideStep: number;
  slideThumbLabel: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['invputValue'] && !changes['invputValue'].isFirstChange()){
      this.setInitialValue();
    }
  }

  ngOnInit(): void {
    this.setInitialValue();
  }

  ngAfterViewInit(): void {
    this.setTextInputFocus();
  }

  private setInitialValue(): void {    
    this.labelFont = 'Font';
    this.labelColor = 'Color';
    this.labelOutlineColor = 'Borde'
    this.slideDisabled = false;
    this.slideMax = 200;
    this.slideMin = DefaultTypeValue.zeroNumber;
    this.slideShowTicks = false;
    this.slideStep = 1;
    this.slideThumbLabel = false;
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