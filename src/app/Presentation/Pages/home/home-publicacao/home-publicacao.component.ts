import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PublicacaoTimelineContent, PublicacaoTimeline, Comentario } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { Unsubscribable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StatusHistoryComponent } from './status-history/status-history.component';
import { PageEndService } from 'src/app/Presentation/Base/layout/page-end.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { Comment } from '../../../../Data/Entity/ICommentEntity';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'participativo-home-publicacao',
  templateUrl: './home-publicacao.component.html',
  styleUrls: ['./home-publicacao.component.css']
})
export class HomePublicacaoComponent implements OnInit, OnChanges, OnDestroy {

  publicacaoTimeLine: PublicacaoTimelineContent;
  publicacaoContent: PublicacaoTimeline[] = [];
  unsubscribe: Unsubscribable[] = [];
  last: boolean = false;
  pageEndd: boolean = false;
  show: {[key: string]: boolean} = {};
  apoio: {[key: number]: boolean} = {};
  comment: string;
  items = [1,2,3];
  jwtHelperService = new JwtHelperService();
  constructor(private publicacaoUseCase: PublicacaoUseCase,
              private route: ActivatedRoute,
               private dialogRef: MatDialog,
               private usuarioUseCase: UsuarioUseCase,
               private behavior: PageEndService,
               private snackBar: SnackbarService ) {
                this.route.data.subscribe(() => {
                  this.publicacaoTimeLine = this.route.snapshot.data.data;
                  this.publicacaoContent = this.publicacaoTimeLine.content;
                  this.last = this.publicacaoTimeLine['last'];
                });
                }

  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
    this.pageEnd();
    this.publicationApoiada();
  }
  /* Funcao verifica as publicacao apoiadas */
  publicationApoiada() {
    let { sub } = this.jwtHelperService.decodeToken(localStorage.getItem('token'))
    let uuid: string;
    this.publicacaoContent.forEach(publicacao => {
      uuid = publicacao.uuid;
      publicacao.apoios.forEach(apoios => {
        if(apoios.usuario.email === sub) {
          this.apoio[uuid] = true;   
        }
      })
    })
  }
  /* Verifica se a publicacao ja esta apoiada */
  apoiarOrDesapoiar(publicacao: PublicacaoTimeline) {
      this.apoio[publicacao.uuid] ? this.desapoiar(publicacao) : this.apoiar(publicacao);
  }
    /* Funcao Desapoia Uma Publicacao */
  async desapoiar(publicacao: PublicacaoTimeline) {
      try {
        let usuario: Usuario = await this.usuarioUseCase.findOne().toPromise();
        await this.publicacaoUseCase.desapoiar(usuario.uuid, publicacao.uuid).toPromise();
        this.apoio[publicacao.uuid] = false
  
      } catch (error) {
        this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' })
  
      }
    }
  /* Funcao Apoia Uma Publicacao */
  async apoiar(publicacao: PublicacaoTimeline) {
    try {
      let usuario: Usuario = await this.usuarioUseCase.findOne().toPromise();
      await this.publicacaoUseCase.apoiar(usuario.uuid, publicacao.uuid).toPromise();
      this.apoio[publicacao.uuid] = true
    } catch (error) {
      this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' })

    }
  }
  /* Faz uma requisicao nova e popula a timeline com os dados atualizados */
  async refreshPage() {
    this.publicacaoTimeLine =  await this.publicacaoUseCase.findAll({ page: '0', linesPerPage: '2',orderBy: 'createdAt', direction:'DESC' }).toPromise();
    this.publicacaoContent = this.publicacaoTimeLine.content;
    this.last = this.publicacaoTimeLine['last'];
  }
  /* Funcao faz a edicao do comentario */
  async editComment(comment: Comentario) {
      try {
        await this.publicacaoUseCase.editComment(comment.corpo, comment.uuid).toPromise();
        this.refreshPage();

      } catch (error) {
        this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' })

      }
  }
  /* Funcao faz o delete do comentario */
  async deleteComment(uuid: String) {
    try {
      await this.publicacaoUseCase.deleteComment(uuid).toPromise();
      this.refreshPage();
    } catch (error) {
      this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' })

    }
  }
  /* Funcao abre um modal e passa como parametro os comentarios da publicacao */
  openDialog(data: any) {
    this.dialogRef.open(StatusHistoryComponent, {
      disableClose: true,
      data: data,
      width: '400px',
      panelClass: 'dialog-reset',
    })
  }
  /* Cria um comentario na publicacao */
  async createComment(publicacao: PublicacaoTimeline) {
    if(this.comment.trim() || this.comment.length != 0 ) {
      let usuario: Usuario;
      try {
        usuario = await this.usuarioUseCase.findOne().toPromise();
      } catch (error) {
        this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' })
      }
      let data = new Date().toLocaleDateString();
      let provisionalComment: Comentario = {
        corpo: this.comment,
        createdAt:  data,
        deletedAt: null,
        updatedAt: null,
        usuario: usuario
      }
      let comment: Comment = {
        corpo: this.comment,
        publicacao: publicacao.uuid,
        usuario: usuario.uuid
      }
      try {
        await this.publicacaoUseCase.comment(comment).toPromise();
        publicacao.comentarios.push(provisionalComment);
      } catch (error) {
        this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' })
      }
    } else {
      this.snackBar.open({ message: 'Insira um texto no comentário', duration: 5, customClass: 'error' })
    }
  }
  /*Funcao recebe o valor do input do commentario*/
  receiveComment(comment: string) {
    this.comment = comment;
  }

  /* Funcao verifica se esta no fim da pagina e nao e a ultima pagina do pageable e faz um nova requisicao para pagina seguinte */
 pageEnd() {
    this.behavior.getBehavior().subscribe(result => {
      this.pageEndd = result;
      if(result === true && this.publicacaoTimeLine['last'] === false) {
        const page: number = this.publicacaoTimeLine.number;
        let nextPage = page + 1
        this.publicacaoUseCase.findAll({ page: String(nextPage), linesPerPage: '2',orderBy: 'createdAt', direction:'DESC' }).subscribe(timeline => {
          this.publicacaoTimeLine = timeline
          this.publicacaoTimeLine.content.map(publicacao => { this.publicacaoContent.push(publicacao) })
          this.last = timeline['last']
        })
      }
    })
  }

  /*
  Funcao abre e fecha a area de comentario
  */
  openSelect(index: number) {
    this.show[index] ? this.show[index] = false : this.show[index] = true;
  }
  
  ngOnDestroy(): void {
    this.unsubscribe.forEach(value => {
      value.unsubscribe();
    })
  }


}
