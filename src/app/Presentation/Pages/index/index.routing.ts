import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { IndexComponent } from './index.component';
import { UserActionComponent } from './UserAction/UserAction.component';
import { FormComponent } from './Form/Form.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: IndexComponent,
children: [
  { path: '', component: UserActionComponent, data: { animation: 'index' } },
  { path: 'recuperar-senha', component: ForgotPasswordComponent},
  { path: 'registrar', component: FormComponent, data: {animation : 'registrar'} },
  { path: 'sucesso/:method', component: SuccessComponent}
]}
];

export const IndexRoutes = RouterModule.forChild(routes);
