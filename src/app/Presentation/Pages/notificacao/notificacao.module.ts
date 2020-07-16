import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacaoComponent } from './notificacao.component';
import { LayoutModule } from '../../Base/layout/layout.module';
import { NotificacaoRoutes } from './notificacao.routing';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    NotificacaoRoutes
  ],
  declarations: [NotificacaoComponent]
})
export class NotificacaoModule { }
