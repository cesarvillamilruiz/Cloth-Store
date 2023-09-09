import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragStatus } from 'src/app/enum/drag-status.enum';
import { sameValue } from 'src/app/validation/generic/generic.validation';

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

  @Output() currentElement = new EventEmitter<void>();

  imgHeight: WritableSignal<string>;
  imgWidth: WritableSignal<string>;
  x: WritableSignal<number>;
  y: WritableSignal<number>;
  px: WritableSignal<number>;
  py: WritableSignal<number>;
  width:WritableSignal<number>;
  height:WritableSignal<number>;
  isDraggingCorner: WritableSignal<boolean>;
  resizer: any | Function;
  status: DragStatus;

  @ViewChild('elementContainer') elementContainer: ElementRef;

  ngOnInit(): void {
    this.setInitialValue();
  }

  setInitialValue(): void {
    this.imgWidth = signal(`100px`);
    this.imgHeight = signal(`100px`);
    this.x = signal(50);
    this.y = signal(50);
    this.px = signal(0);
    this.py = signal(0);
    this.width = signal(150);
    this.height = signal(100);
    this.isDraggingCorner = signal(false);
  }

  topLeftResize(offsetX: number, offsetY: number) {
    this.x.set(this.x() + offsetX);
    this.y.set(this.y() + offsetY);
    this.width.set(this.width() - offsetX);
    this.height.set(this.height() - offsetY);
    this.setImgSize();
  }

  topRightResize(offsetX: number, offsetY: number) {
    this.y.set(this.y() + offsetY);
    this.width.set(this.width() + offsetX);
    this.height.set(this.height() - offsetY);
    this.setImgSize();
  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.x.set(this.x() + offsetX);
    this.width.set(this.width() - offsetX);
    this.height.set(this.height() + offsetY);
    this.setImgSize();
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.width.set(this.width() + offsetX);
    this.height.set(this.height() + offsetY);
    this.setImgSize();
  }

  setImgSize(): void {
    this.imgWidth.set(`${this.width()}px`);
    this.imgHeight.set(`${this.height()}px`);
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

    if (sameValue(this.status, DragStatus.resize)) this.resizer(offsetX, offsetY);
    else if (sameValue(this.status, DragStatus.move)) this.onDrag(offsetX, offsetY);

    this.px.set(event.clientX);
    this.py.set(event.clientY);
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.isDraggingCorner.set(false);
  }

  setStatus(event: MouseEvent, status: number, func?: any) {
    if (sameValue(status, 1)) {
      this.isDraggingCorner.set(true);
      this.px.set(event.clientX);
      this.py.set(event.clientY);
      this.resizer = func;
      this.status = DragStatus.resize;
      event.preventDefault();
      event.stopPropagation();
    } else if (sameValue(status, 2)) {
      this.isDraggingCorner.set(true);
      this.px.set(event.clientX);
      this.py.set(event.clientY);
      this.status = DragStatus.move;
    }
  }

  onDrag(x: any, y: any) {
    this.x.set(this.x() + x);    
    this.y.set(this.y() + y);
  }

  onCLick(): void {
    this.currentElement.emit();
  }
}
