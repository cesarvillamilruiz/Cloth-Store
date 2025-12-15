import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  eventSaveCurrentDesign$: EventEmitter<void> = new EventEmitter();
  eventDeleteCurrentDesign$: EventEmitter<void> = new EventEmitter();
  
  hasDesigns: boolean;

  saveCurrentDesign(): void {
    this.eventSaveCurrentDesign$.emit();
  }

  deleteCurrentDesign(): void {
    this.eventDeleteCurrentDesign$.emit();
  }
}
