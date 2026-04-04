import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  eventSaveDesign$: EventEmitter<void> = new EventEmitter();
  eventDeleteCurrentDesign$: EventEmitter<void> = new EventEmitter();
  
  hasDesigns: boolean;

  saveDesign(): void {
    this.eventSaveDesign$.emit();
  }

  deleteCurrentDesign(): void {
    this.eventDeleteCurrentDesign$.emit();
  }
}
