import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { MaterialModule } from '../../Shared/material/material.module'

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
