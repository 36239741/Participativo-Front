import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfiComponent } from './perfi.component';
import { LayoutModule } from '../../Base/layout/layout.module';
import { PerfilRoutes } from './perfil.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../Shared/material/material.module';
import { NgxModule } from '../../Shared/ngxMask/ngx-mask/ngx-mask.module';
import { PerfilEditComponent } from './perfil-edit/perfil-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImgModule } from '../../Shared/pipes/img/img.module';
import { AvatarModule } from '../../Shared/avatar/avatar.module';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    PerfilRoutes,
    MaterialModule,
    FlexLayoutModule,
    NgxModule,
    ReactiveFormsModule,
    ImgModule,
    AvatarModule
  ],
  declarations: [PerfiComponent, PerfilEditComponent, DeleteComponent],
  entryComponents: [PerfilEditComponent, DeleteComponent]
})
export class PerfiModule { }
