import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LayoutComponent } from '../../Base/layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, 
  data: {animation: 'Home'},
  children: [
      {path: '', component: HomeComponent}
  ]},
];

export const HomeRoutes = RouterModule.forChild(routes);