import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacaoComponent } from './notificacao.component';
import { LayoutModule } from '../../Base/layout/layout.module';
import { NotificacaoRoutes } from './notificacao.routing';
import { PublicacaoNotificacaoModule } from '../../Shared/publicacao-notificacao/publicacao-notificacao.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    NotificacaoRoutes,
    PublicacaoNotificacaoModule
  ],
  declarations: [NotificacaoComponent]
})
export class NotificacaoModule { }
