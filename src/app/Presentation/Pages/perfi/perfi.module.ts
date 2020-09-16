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
import { DeleteModule } from '../../Shared/delete/delete.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';

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
    AvatarModule,
    DeleteModule
  ],
  declarations: [PerfiComponent, PerfilEditComponent, UpdatePasswordComponent],
  entryComponents: [PerfilEditComponent, UpdatePasswordComponent]
})
export class PerfiModule { }
