import { EventEmitter, Injectable } from '@angular/core';
import { ColorName } from '../enum/color.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  eventTShirtColorId$: EventEmitter<string> = new EventEmitter();

  setTShirtColor(colorId: string): void {
    this.eventTShirtColorId$.emit(colorId);
  }
}
