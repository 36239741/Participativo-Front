import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { MaterialModule } from '../../Shared/material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
