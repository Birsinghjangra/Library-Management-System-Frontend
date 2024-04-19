import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {}

  openSnackBarError(messages: any[], hPosition?: any, vPosition?: any) {
    this.showMessage('error', messages, hPosition, vPosition);
  }

  openSnackBarSuccess(messages: any, hPosition?: any, vPosition?: any) {
    this.showMessage('success', messages, hPosition, vPosition);
  }
  showMessage(
    panelClass: string,
    messages: any,
    hPosition?: any,
    vPosition?: any
  ) {
    if (messages instanceof Array) {
      messages.forEach((message, index) => {
        setTimeout(() => {
          this.matSnackBar.open(message, 'X', {
            duration: 3000,
            horizontalPosition: hPosition ? hPosition : 'right',
            verticalPosition: vPosition ? vPosition : 'top',
            panelClass,
          });
        }, index * (1500 + 500)); // 500 => timeout between two messages
      });
    }
  }
}
