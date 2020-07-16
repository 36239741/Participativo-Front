import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

constructor(private snackBar: MatSnackBar) { }

  open(message: string, duration: number = 5, customClass: string) {
    this.snackBar.open(message, '' , {
      duration: duration * 1000,
      panelClass: [customClass]
    })
  }

}
