import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<string>('');
  
  public loading$ = this.loadingSubject.asObservable();
  public message$ = this.messageSubject.asObservable();
  
  show(message: string = 'Cargando...') {
    this.messageSubject.next(message);
    setTimeout(() => {
      this.loadingSubject.next(true);
    });
  }
  
  hide() {
    this.loadingSubject.next(false);
    setTimeout(() => {
      this.messageSubject.next('');
    }, 300);
  }
}
