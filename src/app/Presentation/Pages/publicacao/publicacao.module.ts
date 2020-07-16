import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacaoComponent } from './publicacao.component';
import { LayoutModule } from '../../Base/layout/layout.module';
import { PublicacaoRoutes } from './publicacao.routing';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    PublicacaoRoutes
  ],
  declarations: [PublicacaoComponent]
})
export class PublicacaoModule { }
