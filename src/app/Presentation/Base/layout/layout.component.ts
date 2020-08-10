import { Component, OnInit, HostListener } from '@angular/core';

import { Menu } from './menu.interface';
import { Router } from '@angular/router';
import { PageEndService } from './page-end.service';


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
    private behavior: PageEndService
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

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.behavior.setBehavior(true);
    }
  }



}
