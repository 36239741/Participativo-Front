import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../Base/layout/layout.component';
import { NotificacaoComponent } from './notificacao.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
  data: {animation: 'Notificacao'},
  children: [
    {path: '', component: NotificacaoComponent}
  ]  },
];

export const NotificacaoRoutes = RouterModule.forChild(routes);
