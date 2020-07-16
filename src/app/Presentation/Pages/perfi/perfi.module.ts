import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfiComponent } from './perfi.component';
import { LayoutModule } from '../../Base/layout/layout.module';
import { PerfilRoutes } from './perfil.routing';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    PerfilRoutes
  ],
  declarations: [PerfiComponent]
})
export class PerfiModule { }
