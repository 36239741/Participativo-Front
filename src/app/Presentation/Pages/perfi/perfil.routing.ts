import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../Base/layout/layout.component';
import { PerfiComponent } from './perfi.component';
import { AuthGuardService } from 'src/app/Infra/Authentication/auth-guard.service';
import { UsuarioFindOneResolve } from 'src/app/Data/Resolve/usuario-resolve.service';

const routes: Routes = [
  { path: '', component: LayoutComponent, 
  data: {animation: 'Perfil'},
  canActivate: [ AuthGuardService ],
  resolve: { myData : UsuarioFindOneResolve },
  children: [
    { path: '', component: PerfiComponent }
  ] },
];

export const PerfilRoutes = RouterModule.forChild(routes);
