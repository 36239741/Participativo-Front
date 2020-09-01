import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../Base/layout/layout.component';
import { PublicacaoComponent } from './publicacao.component';
import { RulesComponent } from '../../Shared/rules/rules.component';
import { BairroResolveService } from 'src/app/Data/Resolve/bairro-resolve.service';

const routes: Routes = [
  { path: '', component: LayoutComponent, 
  data: {animation: 'Publicacao'},
  resolve: { data : BairroResolveService },
  children: [
    { path: '', component: PublicacaoComponent },
    { path: 'rules/:link', component: RulesComponent }
  ] },
];

export const PublicacaoRoutes = RouterModule.forChild(routes);
