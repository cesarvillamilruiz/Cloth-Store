import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  eventIsHomePage$: EventEmitter<boolean> = new EventEmitter();

  setTShirtColor(isHomePage: boolean): void {
    this.eventIsHomePage$.emit(isHomePage);
  }
}
