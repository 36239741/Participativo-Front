import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { LayoutModule } from '../../Base/layout/layout.module';
import { HomeRoutes } from './home.routing';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    LayoutModule,
    HomeRoutes
  ],
})
export class HomeModule { }
