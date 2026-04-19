import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  readonly eventSaveDesign$ = new Subject<void>();
  readonly eventDeleteCurrentDesign$ = new Subject<void>();

  hasDesigns: boolean;

  saveDesign(): void {
    this.eventSaveDesign$.next();
  }

  deleteCurrentDesign(): void {
    this.eventDeleteCurrentDesign$.next();
  }
}
