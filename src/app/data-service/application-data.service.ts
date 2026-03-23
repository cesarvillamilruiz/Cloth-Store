import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  eventSaveCartItem$: EventEmitter<void> = new EventEmitter();
  eventDeleteCurrentDesign$: EventEmitter<void> = new EventEmitter();
  
  hasDesigns: boolean;

  saveCartItem(): void {
    this.eventSaveCartItem$.emit();
  }

  deleteCurrentDesign(): void {
    this.eventDeleteCurrentDesign$.emit();
  }
}
