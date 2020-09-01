import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LayoutComponent } from '../../Base/layout/layout.component';
import { AuthGuardService } from 'src/app/Infra/Authentication/auth-guard.service';
import { TimelineResolverService } from '../../../Data/Resolve/timeline-resolver.service';
import { UsuarioFindOneResolve } from 'src/app/Data/Resolve/usuario-resolve.service';
import { FindPublicationResolveService } from 'src/app/Data/Resolve/find-publication-resolve.service';
import { PublicationFindComponent } from './publication-find/publication-find.component';
import { ViewPublicationResolveService } from 'src/app/Data/Resolve/view-publication-resolve.service';

const routes: Routes = [
  { path: '', component: LayoutComponent,canActivate: [ AuthGuardService ], data: {animation: 'Home'},
  resolve: { data : TimelineResolverService,
            user: UsuarioFindOneResolve },
  children: [
      {path: '', component: HomeComponent},
      {path: 'buscar', component: PublicationFindComponent, resolve: {publicacao: FindPublicationResolveService}},
      {path: 'ver-publicacao/:uuid', component: HomeComponent, resolve: { data: ViewPublicationResolveService,  user: UsuarioFindOneResolve  }}
  ]},
];

export const HomeRoutes = RouterModule.forChild(routes);
