import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openBasicDialog(component : any): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      width: '400px'
    });

    return dialogRef.afterClosed();
  }
}
