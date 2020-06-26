import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { UserActionComponent } from './UserAction/UserAction.component';
import { IndexComponent } from './index.component';
import { IndexRoutes } from './index.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../Shared/material/material.module';
import { FormComponent } from './Form/Form.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    UserActionComponent,
    IndexComponent,
    FormComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    IndexRoutes,
    FlexLayoutModule,
    MaterialModule,
    
  ],
})
export class IndexModule { }
