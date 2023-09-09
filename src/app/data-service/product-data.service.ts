import { EventEmitter, Injectable } from '@angular/core';
import { ColorName } from '../enum/color.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  eventTShirtColor$: EventEmitter<string> = new EventEmitter();

  setTShirtColor(TShirtColor: ColorName): void {
    this.eventTShirtColor$.emit(TShirtColor);
  }
}
