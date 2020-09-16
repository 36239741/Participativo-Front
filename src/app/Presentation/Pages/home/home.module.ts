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
import { DateSeparationModule } from '../../Shared/pipes/date-separation/date-separation.module';
import { PublicacaoEditComponent } from './home-publicacao/publicacao-edit/publicacao-edit.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { ImgModule } from '../../Shared/pipes/img/img.module';
import { OrderArrayModule } from '../../Shared/pipes/order-array/order-array.module';
import { PublicationFindComponent } from './publication-find/publication-find.component';
import { MapModule } from '../../Shared/map/map.module';
import { MapComponent } from '../../Shared/map/map.component';
import { AvatarModule } from '../../Shared/avatar/avatar.module';
import { ShowApoiadoresComponent } from './home-publicacao/show-apoiadores/show-apoiadores.component';
import { DeleteModule } from '../../Shared/delete/delete.module';


@NgModule({
  declarations: [
    HomeComponent,
    HomePublicacaoComponent,
    StatusHistoryComponent,
    CommentComponent,
    PublicacaoEditComponent,
    PublicationFindComponent,
    ShowApoiadoresComponent
  ],
  imports: [
    CommonModule,
    HomeRoutes,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule,
    LastPositionPipeModule,
    ReactiveFormsModule,
    DateSeparationModule,
    NgxViacepModule,
    ImgModule,
    OrderArrayModule,
    MapModule,
    AvatarModule,
    DeleteModule
  ],
  entryComponents: [
    StatusHistoryComponent,
    PublicacaoEditComponent,
    MapComponent,
    ShowApoiadoresComponent
  ]
})
export class HomeModule { }
