import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacaoComponent } from './publicacao.component';
import { LayoutModule } from '../../Base/layout/layout.module';
import { PublicacaoRoutes } from './publicacao.routing';
import { PublicacaoFormComponent } from './publicacao-form/publicacao-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../Shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RulesModule } from '../../Shared/rules/rules.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    PublicacaoRoutes,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RulesModule
  ],
  declarations: [PublicacaoComponent, PublicacaoFormComponent]
})
export class PublicacaoModule { }
