import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { IndexComponent } from './index.component';
import { UserActionComponent } from './UserAction/UserAction.component';
import { FormComponent } from './Form/Form.component';
import { SuccessComponent } from './success/success.component';
import { AuthGuardService } from 'src/app/Infra/Authentication/auth-guard.service';
import { RulesComponent } from './Form/rules/rules.component';

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [ AuthGuardService ],
children: [
  { path: '', component: UserActionComponent, data: { animation: 'index' } },
  { path: 'recuperar-senha', component: ForgotPasswordComponent,  },
  { path: 'registrar', component: FormComponent, data: { animation : 'registrar' },  },
  { path: 'sucesso/:method', component: SuccessComponent, },
  { path: 'registrar/termos-uso', component: RulesComponent, data: { animation: 'rules'} },
]}
];

export const IndexRoutes = RouterModule.forChild(routes);
