import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarCustomComponent } from './snackbar-custom/snackbar-custom.component';

export interface SnackBar {
  message?: string;
  duration: number;
  customClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

constructor(private snackBar: MatSnackBar) { }

  open(config: SnackBar) {
    this.snackBar.open(config.message, '' , {
      duration: config.duration * 1000,
      panelClass: [config.customClass],
    })
  }

  openCustomSnackBar(data: any, config: SnackBar ) {
    this.snackBar.openFromComponent(SnackbarCustomComponent, {
      data: data,
      duration: config.duration * 1000,
      panelClass: [config.customClass]
    })
  }

}
