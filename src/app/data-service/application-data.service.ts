import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  readonly eventSaveDesign$ = new Subject<string>();
  readonly eventDeleteCurrentDesign$ = new Subject<void>();

  hasDesigns: boolean;

  saveDesign(name: string): void {
    this.eventSaveDesign$.next(name);
  }

  deleteCurrentDesign(): void {
    this.eventDeleteCurrentDesign$.next();
  }
}
