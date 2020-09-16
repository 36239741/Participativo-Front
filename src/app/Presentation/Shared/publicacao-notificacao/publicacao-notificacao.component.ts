import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';
import { environment } from 'src/environments/environment';
import { NotificacoesService } from 'src/app/Data/Repository/notificacoes.service';
import { HttpParams } from '@angular/common/http';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'participativo-publicacao-notificacao',
  templateUrl: './publicacao-notificacao.component.html',
  styleUrls: ['./publicacao-notificacao.component.css']
})
export class PublicacaoNotificacaoComponent implements OnInit {
  publicacoes: any[] = [];
  spinner: boolean = false
  publicacaoImageUrl = environment.IMG_URL_PUBLICATION;
  usuarioImageUrl = environment.IMG_URL_USER;
  constructor(private notificacoes: NotificacoesService,
              private router: Router,
              private publicacaoUseCase: PublicacaoUseCase,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any[]) { 
                
                if(this.data.length > 0) {
                  this.data.sort((a, b) => {
                    let dateA = moment(a.createdAt, 'DD-MM-YYYY H:m');
                    let dateB = moment(b.createdAt, 'DD-MM-YYYY H:m');
                    if (dateA.isAfter(dateB)) return -1;
                    if (dateB.isAfter(dateA)) return 1;
                    return 0
                  })
                  this.findNotificationsPublicacao()
                }
              }

   ngOnInit() {
  }
  findNotificationsPublicacao() {
    this.spinner = true
    let promise = this.data.map(result => {
      let publicacaoSearch = this.publicacaoUseCase.findOne(result.publicacao).toPromise()
      return publicacaoSearch
    })
    Promise.all(promise).then(result => 
      {this.publicacoes = result
        this.spinner = false
      })
  }
  async readNotifications(uuid: string, readAt: string, publicacaoUuid: string) {
    this.router.navigate(['/home/ver-publicacao/' + publicacaoUuid])
    if(readAt === null) {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set('uuid', uuid);
    await this.notificacoes.readNotifications(httpParams).toPromise();
    this.matDialog.closeAll();
  }else {
    this.matDialog.closeAll();
  }
  }
}
