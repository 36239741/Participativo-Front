import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../Base/layout/layout.component';
import { PerfiComponent } from './perfi.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, 
  data: {animation: 'Perfil'},
  children: [
    { path: '', component: PerfiComponent }
  ] },
];

export const PerfilRoutes = RouterModule.forChild(routes);
