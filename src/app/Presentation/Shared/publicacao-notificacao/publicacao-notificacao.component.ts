import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';
import { environment } from 'src/environments/environment';
import { NotificacoesService } from 'src/app/Data/Repository/notificacoes.service';
import { HttpParams } from '@angular/common/http';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import * as moment from 'moment';

@Component({
  selector: 'participativo-publicacao-notificacao',
  templateUrl: './publicacao-notificacao.component.html',
  styleUrls: ['./publicacao-notificacao.component.css']
})
export class PublicacaoNotificacaoComponent implements OnInit {
  publicacoes: any[] = [];
  publicacaoImageUrl = environment.IMG_URL_PUBLICATION;
  usuarioImageUrl = environment.IMG_URL_USER;
  constructor(private notificacoes: NotificacoesService,
              private publicacaoUseCase: PublicacaoUseCase,
              private usuarioUseCase: UsuarioUseCase,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any[]) { }

   ngOnInit() {
    if(this.data.length > 0) {
      this.findPublications();
    }
    this.data.sort((a, b) => {
      let dateA = moment(a.createdAt, 'DD-MM-YYYY H:m');
      let dateB = moment(b.createdAt, 'DD-MM-YYYY H:m');
      if (dateA.isAfter(dateB)) return -1;
      if (dateB.isAfter(dateA)) return 1;
      return 0
    })
  }

  async readNotifications(uuid: string, readAt: string) {
    if(readAt === null) {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set('uuid', uuid);
    await this.notificacoes.readNotifications(httpParams).toPromise();
    let usuario = await this.usuarioUseCase.findOne().toPromise();
    let notificacoes = await this.usuarioUseCase.notificacoes(usuario.uuid).toPromise();
    this.data = [];
    this.publicacoes = [];
    this.data = notificacoes;
    this.matDialog.closeAll();
    this.findPublications();
  }else {
    this.matDialog.closeAll();
  }
  }

  findPublications() {
    this.data.map(result => {
      this.publicacaoUseCase.findOne(result.publicacao).subscribe(publicacao => {this.publicacoes.push(publicacao)})
    })
  }
}
