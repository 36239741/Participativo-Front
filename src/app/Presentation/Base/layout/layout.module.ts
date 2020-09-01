import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { MaterialModule } from '../../Shared/material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificacoesDesktopComponent } from './notificacoes-desktop/notificacoes-desktop.component';
import { PublicacaoNotificacaoModule } from '../../Shared/publicacao-notificacao/publicacao-notificacao.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from '../../Shared/avatar/avatar.module';
import { ImgModule } from '../../Shared/pipes/img/img.module';


@NgModule({
  declarations: [LayoutComponent, NotificacoesDesktopComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    PublicacaoNotificacaoModule,
    ReactiveFormsModule,
    AvatarModule,
    ImgModule
  ],
  exports: [LayoutComponent],
  entryComponents: [NotificacoesDesktopComponent]
})
export class LayoutModule { }
