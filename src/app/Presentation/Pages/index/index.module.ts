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
import { ReactiveFormsModule } from '@angular/forms';
import { NgxModule } from '../../Shared/ngxMask/ngx-mask/ngx-mask.module';
import { RulesComponent } from './Form/rules/rules.component';


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    UserActionComponent,
    IndexComponent,
    FormComponent,
    SuccessComponent,
    RulesComponent
  ],
  imports: [
    CommonModule,
    IndexRoutes,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxModule
  ],
})
export class IndexModule { }
