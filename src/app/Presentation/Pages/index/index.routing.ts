import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { IndexComponent } from './index.component';
import { UserActionComponent } from './UserAction/UserAction.component';
import { FormComponent } from './Form/Form.component';
import { SuccessComponent } from './success/success.component';
import { RulesComponent } from '../../Shared/rules/rules.component';
import { ForgotPasswordFormComponent } from './ForgotPassword/forgot-password-form/forgot-password-form.component';

const routes: Routes = [
  { path: '', component: IndexComponent,
children: [
  { path: '', component: UserActionComponent, data: { animation: 'index' } },
  { path: 'recuperar-senha', component: ForgotPasswordComponent },
  { path: 'registrar', component: FormComponent, data: { animation : 'registrar' }, },
  { path: 'sucesso/:method', component: SuccessComponent, },
  { path: 'registrar/termos-uso', component: RulesComponent, data: { animation: 'rules'}, },
  { path: 'redefinir-senha', component: ForgotPasswordFormComponent }
]}
];

export const IndexRoutes = RouterModule.forChild(routes);
