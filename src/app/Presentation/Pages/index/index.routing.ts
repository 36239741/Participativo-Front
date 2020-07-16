import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { IndexComponent } from './index.component';
import { UserActionComponent } from './UserAction/UserAction.component';
import { FormComponent } from './Form/Form.component';
import { SuccessComponent } from './success/success.component';
import { AuthGuardService } from 'src/app/Infra/Authentication/auth-guard.service';

const routes: Routes = [
  { path: '', component: IndexComponent,
children: [
  { path: '', component: UserActionComponent, data: { animation: 'index' } },
  { path: 'recuperar-senha', component: ForgotPasswordComponent, canActivate: [ AuthGuardService ]},
  { path: 'registrar', component: FormComponent, data: {animation : 'registrar'}, canActivate: [ AuthGuardService ] },
  { path: 'sucesso/:method', component: SuccessComponent, canActivate: [ AuthGuardService ]}
]}
];

export const IndexRoutes = RouterModule.forChild(routes);
