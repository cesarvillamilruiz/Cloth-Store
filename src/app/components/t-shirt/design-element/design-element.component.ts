import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  effect,
  model,
  signal,
} from '@angular/core';
import { DragStatus } from 'src/app/enum/drag-status.enum';
import { isSameValue } from 'src/app/validation/generic/generic.validation';
import { DefaultTypeValue } from 'src/app/enum/type.enum';
import { OptionWindow } from 'src/app/enum/option.enum';
import ArcText from 'arc-text';
import { OptionColor } from 'src/app/model/option/option-color.model';
import { OptionFont } from 'src/app/model/option/option-font.model';
import { Location } from 'src/app/enum/location.enum';


@Component({
  selector: 'app-design-element',
  templateUrl: './design-element.component.html',
  styleUrls: ['./design-element.component.scss'],
})
export class DesignElementComponent implements OnInit {
  @Input() id: number;
  @Input() isHorizontalInverted: boolean;
  @Input() isVerticalInverted: boolean;
  @Input() location: Location.front | Location.back;
  @Input() designUrl: string;
  @Input() showText: boolean;
  @Input() isVisible: boolean;
  @Input() customizationId: string;

  zIndex = model<number>(0);
  width = model<number>(50);
  height = model<number>(50);
  fontFamily = model<OptionFont>();
  text = model<string>('');
  fontColor = model<OptionColor>();
  outlineFontColor = model<OptionColor>();
  arch = model<number>(0);
  isSelected = model<boolean>(false);

  @Output() currentElement = new EventEmitter<void>();
  @Output() onDeleteElement = new EventEmitter<number>();
  @Output() onMoveToFront = new EventEmitter<void>();
  @Output() onMoveToBack = new EventEmitter<void>();
  @Output() onMoveForward = new EventEmitter<void>();
  @Output() onMoveBackward = new EventEmitter<void>();

  @ViewChild('mainElement') mainElement: ElementRef;
  @ViewChild('dragElement') dragElement: ElementRef;
  @ViewChild('textElement') textElement: ElementRef;

  x = signal(0);
  y = signal(0);
  px = signal(0);
  py = signal(0);
  isDraggingCorner = signal(false);
  resizer: any | Function;
  status: DragStatus;
  optionType: OptionWindow;
  showLayerOptions: boolean;

  get frameWidth(): number {    
    return this.mainElement?.nativeElement?.offsetWidth;
  }

  get frameHeight(): number {
    return this.mainElement?.nativeElement?.offsetHeight;
  }

  get outlineFontStyle(): string {
    const color = this.outlineFontColor();
    return `${this.height() / 50}px ${color?.hexadecimal ?? 'transparent'}`;
  }

  constructor() {
    effect(() => {
      if (this.textElement) {
        this.textElement.nativeElement.textContent = this.text();
        const arcText = new ArcText(this.textElement.nativeElement);
        const archValue = 1500 - (this.arch() * 20);
        arcText.arc(archValue > 1450 ? 100000 : archValue);
        arcText.forceWidth(true);
        arcText.forceHeight(true);
      }
    });
  }

  ngOnInit(): void {
    this.mainElement?.nativeElement?.classList.add('elementContainer');
  }

  topLeftResize(offsetX: number, offsetY: number) {
    this.x.set(this.x() + offsetX);
    this.y.set(this.y() + offsetY);
    this.width.set(this.width() - offsetX);
    this.height.set(this.height() - offsetY);
  }

  topRightResize(offsetX: number, offsetY: number) {
    this.y.set(this.y() + offsetY);
    this.width.set(this.width() + offsetX);
    this.height.set(this.height() - offsetY);
  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.x.set(this.x() + offsetX);
    this.width.set(this.width() - offsetX);
    this.height.set(this.height() + offsetY);
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.width.set(this.width() + offsetX);
    this.height.set(this.height() + offsetY);
  }

  onCornerClick(event: MouseEvent, resizer?: Function) {
    this.isDraggingCorner.set(true);
    this.px.set(event.clientX);
    this.py.set(event.clientY);
    this.resizer = resizer;
    this.status = DragStatus.resize;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent) {
    if (!this.isDraggingCorner()) {
      return;
    }

    let offsetX = event.clientX - this.px();
    let offsetY = event.clientY - this.py();

    if (isSameValue(this.status, DragStatus.resize))
      this.resizer(offsetX, offsetY);
    else if (isSameValue(this.status, DragStatus.move))
      this.onDrag(offsetX, offsetY);

    this.px.set(event.clientX);
    this.py.set(event.clientY);
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.isDraggingCorner.set(false);
  }

  setStatus(event: MouseEvent, status: number, func?: any) {
    this.onSelecElement();
    if (isSameValue(status, 1)) {
      this.isDraggingCorner.set(true);
      this.px.set(event.clientX);
      this.py.set(event.clientY);
      this.resizer = func;
      this.status = DragStatus.resize;
      event.preventDefault();
      event.stopPropagation();
    } else if (isSameValue(status, 2)) {
      this.isDraggingCorner.set(true);
      this.px.set(event.clientX);
      this.py.set(event.clientY);
      this.status = DragStatus.move;
    }
  }

  R2D = 180 / Math.PI;
  startAngle = +DefaultTypeValue.zeroNumber;
  angle = +DefaultTypeValue.zeroNumber;
  rotateDegree: number = 0;

  center = {
    x: +DefaultTypeValue.zeroNumber,
    y: +DefaultTypeValue.zeroNumber
  };

  onDrag(x: any, y: any) {
    this.x.set(this.x() + x);
    this.y.set(this.y() + y);
  }

  setRotate(event: any, value: boolean): void {
    if (value) {
      this.startAngle = DefaultTypeValue.zeroNumber;
      this.angle = DefaultTypeValue.zeroNumber;
      let element = this.mainElement.nativeElement.getBoundingClientRect(),
        t = element.top,
        l = element.left,
        h = element.height,
        w = element.width,
        x1, y1;
      this.center = {
        x: l + (w / 2),
        y: t + (h / 2)
      };
      x1 = event.clientX - this.center.x;
      y1 = event.clientY - this.center.y;
      this.startAngle = this.R2D * Math.atan2(y1, x1);
    } else {
      this.angle += this.rotateDegree;
      this.isDraggingCorner.set(false);
    }
  }

  onDragRotate(event: any): void {
    if (isSameValue(event.clientX, DefaultTypeValue.zeroNumber) && isSameValue(event.clientY, DefaultTypeValue.zeroNumber)) return;
    let x2 = event.clientX - this.center.x;
    let y2 = event.clientY - this.center.y;
    let d = this.R2D * Math.atan2(y2, x2);
    this.rotateDegree = d - this.startAngle;
    this.rotateDegree = (this.angle + this.rotateDegree);
  }

  onToggleShowLayerOptions(): void {
    this.showLayerOptions = !this.showLayerOptions;
  }

  onSelecElement(): void {
    this.currentElement.emit();
  }
}
