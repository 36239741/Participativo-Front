import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarCustomComponent } from './snackbar-custom.component';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [SnackbarCustomComponent],
  exports: [SnackbarCustomComponent]
})
export class SnackbarCustomModule { }
