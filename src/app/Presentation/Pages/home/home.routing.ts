import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LayoutComponent } from '../../Base/layout/layout.component';
import { AuthGuardService } from 'src/app/Infra/Authentication/auth-guard.service';
import { TimelineResolverService } from '../../../Data/Resolve/timeline-resolver.service';

const routes: Routes = [
  { path: '', component: LayoutComponent,canActivate: [ AuthGuardService ], data: {animation: 'Home'},
  resolve: { data : TimelineResolverService },
  children: [
      {path: '', component: HomeComponent}
  ]},
];

export const HomeRoutes = RouterModule.forChild(routes);
