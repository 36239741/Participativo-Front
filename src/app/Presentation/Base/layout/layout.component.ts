import { Component, OnInit } from '@angular/core';

import { Menu } from './menu.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'participativo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
     menu: Menu[] = [
      {title: 'Página inicial', icon: 'home', link: '/home'},
      {title: 'Perfil', icon: 'account_circle', link: '/perfil'},
      {title: 'Notificações', icon: 'notifications', link: '/notificacao'},
      {title: 'Publicar', icon: 'create', link: '/publicar'},
      {title: 'sair', icon: 'exit_to_app', link: '/sair'},
  ]
  activeLink: string[] = []
  constructor( 
    private router: Router,
   ) { 
  }

  ngOnInit() {
    this.activatedRoute();
  }
  
  activatedRoute() {
    const url = this.router.url;
    const activeLink: Menu[] = this.menu.filter(elemt => {
      return elemt.link === url;
    });
    this.activeLink.push(activeLink[0].link);
  }



}
