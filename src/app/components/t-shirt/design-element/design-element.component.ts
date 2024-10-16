import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Signal,
  ViewChild,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragStatus } from 'src/app/enum/drag-status.enum';
import { isGreaterThan, isSameValue } from 'src/app/validation/generic/generic.validation';
import { DefaultTypeValue } from 'src/app/enum/type.enum';
import { OptionWindow } from 'src/app/enum/option.enum';

@Component({
  selector: 'app-design-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design-element.component.html',
  styleUrls: ['./design-element.component.scss'],
})
export class DesignElementComponent implements OnInit {
  @Input() text: WritableSignal<string>;
  @Input() id: WritableSignal<number>;
  @Input() zIndex: WritableSignal<number>;
  @Input() isHorizontalInverted: boolean;
  @Input() isVerticalInverted: boolean;
  @Input() selectedFont: WritableSignal<string>;
  @Input() selectedFontColor: WritableSignal<string>;
  @Input() selectedOutlineFontColor: WritableSignal<string>;
  @Input() showText: boolean;
  @Input() imagePath: string;

  @Output() currentElement = new EventEmitter<void>();

  @ViewChild('mainElement') mainElement: ElementRef;
  @ViewChild('dragElement') dragElement: ElementRef;

  imgHeight: Signal<string>;
  imgWidth: Signal<string>;
  x: WritableSignal<number>;
  y: WritableSignal<number>;
  px: WritableSignal<number>;
  py: WritableSignal<number>;
  width: WritableSignal<number>;
  height: WritableSignal<number>;
  isDraggingCorner: WritableSignal<boolean>;
  resizer: any | Function;
  status: DragStatus;
  optionType: OptionWindow;

  ngOnInit(): void {
    this.setInitialValue();
  }

  setInitialValue(): void {    
    this.x = signal(+DefaultTypeValue.zeroNumber);
    this.y = signal(+DefaultTypeValue.zeroNumber);
    this.px = signal(+DefaultTypeValue.zeroNumber);
    this.py = signal(+DefaultTypeValue.zeroNumber);
    this.width = signal(50);
    this.height = signal(90);
    this.imgWidth = computed(() => { return `${isGreaterThan(+DefaultTypeValue.zeroNumber, this.width()) ? +DefaultTypeValue.zeroNumber : this.width()}px`; });
    this.imgHeight = computed(() => { return `${isGreaterThan(+DefaultTypeValue.zeroNumber, this.height()) ? +DefaultTypeValue.zeroNumber : this.height()}px`; });
    this.isDraggingCorner = signal(false);
    this.mainElement?.nativeElement?.classList.add("elementContainer");
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

    this.currentElement.emit();
  }

  R2D = 180 / Math.PI
  startAngle = +DefaultTypeValue.zeroNumber;
  angle = +DefaultTypeValue.zeroNumber;
  rotateDegree: number = 0;

  center = {
    x: +DefaultTypeValue.zeroNumber,
    y: +DefaultTypeValue.zeroNumber
  }  

  onDrag(x: any, y: any) {
    this.x.set(this.x() + x);
    this.y.set(this.y() + y);
  }

  setRotate(event: any, value: boolean): void {   
    if (value){      
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
    }
    else{
      this.angle += this.rotateDegree ;
      this.isDraggingCorner.set(false);
    }
  }  

  onDragRotate(event: any): void {
    if(isSameValue(event.clientX, DefaultTypeValue.zeroNumber) && isSameValue(event.clientY, DefaultTypeValue.zeroNumber)) return;
    let x2 = event.clientX - this.center.x;
    let y2 = event.clientY - this.center.y;
    let d = this.R2D * Math.atan2(y2, x2);
    this.rotateDegree = d - this.startAngle;    
    this.rotateDegree = (this.angle + this.rotateDegree);
  }  
}
