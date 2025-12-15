import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageToBase64Service {

  constructor(private http: HttpClient) {}

  // path: relative to the `src` folder or `assets`
  public getBase64Image(path: string): Promise<string> {
    return this.http.get(path, { responseType: 'blob' }).toPromise().then(blob => {
      return this.convertBlobToBase64(blob as Blob);
    });
  }

  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
