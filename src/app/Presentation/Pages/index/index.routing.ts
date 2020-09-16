import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { IndexComponent } from './index.component';
import { UserActionComponent } from './UserAction/UserAction.component';
import { FormComponent } from './Form/Form.component';
import { SuccessComponent } from './success/success.component';
import { RulesComponent } from '../../Shared/rules/rules.component';
import { ForgotPasswordFormComponent } from './ForgotPassword/forgot-password-form/forgot-password-form.component';
import { ValidateUserComponent } from './validateUser/validateUser.component';
import { TokenGuardService } from 'src/app/Infra/Authentication/token-guard.service';
import { LoginGuardService } from '../../Shared/loginGuard/loginGuard.service';

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [LoginGuardService],
children: [
  { path: '', component: UserActionComponent, data: { animation: 'index' } },
  { path: 'recuperar-senha', component: ForgotPasswordComponent },
  { path: 'registrar', component: FormComponent, data: { animation : 'registrar' }, },
  { path: 'sucesso/:method', component: SuccessComponent, },
  { path: 'registrar/termos-uso', component: RulesComponent, data: { animation: 'rules'}, },
  { path: 'redefinir-senha/:token', component: ForgotPasswordFormComponent },
  { path: 'validate/:token/:email', component: ValidateUserComponent, canActivate: [TokenGuardService] },
]}
];

export const IndexRoutes = RouterModule.forChild(routes);
