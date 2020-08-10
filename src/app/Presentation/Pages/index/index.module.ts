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
import { RulesModule } from '../../Shared/rules/rules.module';
import { ForgotPasswordFormComponent } from './ForgotPassword/forgot-password-form/forgot-password-form.component';


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    UserActionComponent,
    IndexComponent,
    FormComponent,
    ForgotPasswordFormComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutes,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxModule,
    RulesModule
  ],
})
export class IndexModule { }
