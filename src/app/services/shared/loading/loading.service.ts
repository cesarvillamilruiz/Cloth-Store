import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  readonly loading = signal(false);
  readonly message = signal('');

  show(message: string = 'Cargando...') {
    this.message.set(message);
    setTimeout(() => {
      this.loading.set(true);
    });
  }

  hide() {
    this.loading.set(false);
    setTimeout(() => {
      this.message.set('');
    }, 300);
  }
}
