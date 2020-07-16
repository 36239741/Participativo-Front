import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../Base/layout/layout.component';
import { PublicacaoComponent } from './publicacao.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, 
  data: {animation: 'Publicacao'},
  children: [
    { path: '', component: PublicacaoComponent }
  ] },
];

export const PublicacaoRoutes = RouterModule.forChild(routes);
