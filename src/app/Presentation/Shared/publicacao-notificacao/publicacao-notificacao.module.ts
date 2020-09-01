import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacaoNotificacaoComponent } from './publicacao-notificacao.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImgModule } from '../pipes/img/img.module';
import { NotificationsTypeModule } from '../pipes/notifications-type/notifications-type.module'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PublicacaoNotificacaoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ImgModule,
    RouterModule,
    NotificationsTypeModule
  ],
  exports: [PublicacaoNotificacaoComponent]
})
export class PublicacaoNotificacaoModule { }
