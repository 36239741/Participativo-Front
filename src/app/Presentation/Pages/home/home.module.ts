import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { LayoutModule } from '../../Base/layout/layout.module';
import { MaterialModule } from '../../Shared/material/material.module';
import { HomePublicacaoComponent } from './home-publicacao/home-publicacao.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HomeComponent,
    HomePublicacaoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutes,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule
  ],
})
export class HomeModule { }
