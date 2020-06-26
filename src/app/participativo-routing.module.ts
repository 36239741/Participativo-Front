import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '',
  loadChildren: () => import('./Presentation/Pages/index/index.module').then(m => m.IndexModule)},
  {path: 'home', 
  loadChildren: () => import('./Presentation/Pages/home/home.module').then(m => m.HomeModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
