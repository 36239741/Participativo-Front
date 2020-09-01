import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

import { Menu } from './menu.interface';
import { Router } from '@angular/router';
import { PageEndService } from './page-end.service';
import { AuthenticationService } from 'src/app/Infra/Authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificacoesDesktopComponent } from './notificacoes-desktop/notificacoes-desktop.component';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { FormControl } from '@angular/forms';
import { FindPublicationBehaviorService } from './find-publication-behavior.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'participativo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
     menu: Menu[] = [
      {title: 'Página inicial', icon: 'home', link: '/home'},
      {title: 'Perfil', icon: 'account_circle', link: '/perfil'},
      {title: 'Notificações', icon: 'notifications', link: '/notificacoes'},
      {title: 'Publicar', icon: 'create', link: '/publicar'},
      {title: 'sair', icon: 'exit_to_app', link: '/sair'},
  ]
  activeLink: string[] = []
  notificacoes: any[] = [];
  usuario: Usuario;
  search: FormControl = new FormControl('');
  badge: number = 0;
  usuarioImageUrl = environment.IMG_URL_USER;
  constructor( 
    public dialog: MatDialog,
    private router: Router,
    private behaviorSerach: FindPublicationBehaviorService,
    private usuarioUseCase: UsuarioUseCase,
    private auth: AuthenticationService,
    private behavior: PageEndService
   ) { 
  }

  ngOnInit() {
    this.findNotifications();
  }
  async findNotifications() {
  this.usuario = await this.usuarioUseCase.findOne().toPromise();
  this.notificacoes = await this.usuarioUseCase.notificacoes(this.usuario.uuid).toPromise();
  this.badge = this.notificacoes.filter(value => {return value.readAt === null}).length
  }
  findPublicationsByParams() {
    let search = this.search.value;
    this.behaviorSerach.set(search);
    this.search.reset('')
    this.router.navigate(['home/buscar'], { queryParams: {descricao: search, categorias: '1,2,3'} })

  }
  async notifications() {
    let btnNotificacao = document.getElementById('notificacao');
    let coordenadas = btnNotificacao.getBoundingClientRect();
    let top = coordenadas.top + 64;
    this.dialog.open(NotificacoesDesktopComponent, {
      position: {left:  coordenadas.left +'px'  , top: top +'px' },
      backdropClass: 'background',
      width: '35vw',
      height: '85vh',
      data: this.notificacoes,
    }).afterClosed().subscribe(() => {this.findNotifications()});
  }

  sair() {
    this.auth.logout();
    this.router.navigate(['/'])
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.behavior.setBehavior(true);
    }
  }



}
