import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  readonly eventTShirtColorId$ = new Subject<string>();

  setTShirtColor(colorId: string): void {
    this.eventTShirtColorId$.next(colorId);
  }
}
