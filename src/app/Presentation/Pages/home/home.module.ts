import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { LayoutModule } from '../../Base/layout/layout.module';
import { MaterialModule } from '../../Shared/material/material.module';
import { HomePublicacaoComponent } from './home-publicacao/home-publicacao.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatusHistoryComponent } from './home-publicacao/status-history/status-history.component';
import { LastPositionPipeModule } from '../../Shared/pipes/LastPositionPipe/last-position-pipe.module';
import { CommentComponent } from './home-publicacao/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    HomePublicacaoComponent,
    StatusHistoryComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutes,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule,
    LastPositionPipeModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    StatusHistoryComponent
  ]
})
export class HomeModule { }
