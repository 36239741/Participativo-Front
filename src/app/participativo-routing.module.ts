import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '',
  loadChildren: () => import('./Presentation/Pages/index/index.module').then(m => m.IndexModule)},
  {path: 'home', 
  loadChildren: () => import('./Presentation/Pages/home/home.module').then(m => m.HomeModule)},
  {path: 'notificacao',
  loadChildren: () => import('./Presentation/Pages/notificacao/notificacao.module').then(m => m.NotificacaoModule)},
  {path: 'perfil',
  loadChildren: () => import('./Presentation/Pages/perfi/perfi.module').then(m => m.PerfiModule)},
  {path: 'publicar',
  loadChildren: () => import('./Presentation/Pages/publicacao/publicacao.module').then(m => m.PublicacaoModule)}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
