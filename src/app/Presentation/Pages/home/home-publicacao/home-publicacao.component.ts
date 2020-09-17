import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter} from '@angular/core';
import { PublicacaoTimelineContent, PublicacaoTimeline, Comentario } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { BehaviorSubject, Unsubscribable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StatusHistoryComponent } from './status-history/status-history.component';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { Comment } from '../../../../Data/Entity/ICommentEntity';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PublicacaoEditComponent } from './publicacao-edit/publicacao-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MapComponent } from 'src/app/Presentation/Shared/map/map.component';
import * as moment from 'moment';
import { trigger, transition, style, animate } from '@angular/animations';
import { DeleteComponent } from 'src/app/Presentation/Shared/delete/delete.component';


@Component({
  selector: 'participativo-home-publicacao',
  templateUrl: './home-publicacao.component.html',
  styleUrls: ['./home-publicacao.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(150, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(150, style({opacity:0})) 
      ])
    ])
  ]
})
export class HomePublicacaoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() behavior: BehaviorSubject<any>;
  @Output() lastPage: EventEmitter<any> = new EventEmitter();
  @Output() timeLineContent: EventEmitter<any> = new EventEmitter();
  publicacaoTimeLine: PublicacaoTimelineContent;
  publicacaoContent: any[] = [];
  unsubscribe: Unsubscribable[] = [];
  show: {[key: string]: boolean} = {};
  apoio: {[key: number]: boolean} = {};
  showApoiador: {[key: number]: boolean} = {};
  imgError: {[key: number]: boolean} = {};
  comment: string;
  usuario: Usuario;
  items = [1,2,3];
  publicacaoImageUrl = environment.IMG_URL_PUBLICATION;
  usuarioImageUrl = environment.IMG_URL_USER;
  jwtHelperService = new JwtHelperService();
  constructor(private publicacaoUseCase: PublicacaoUseCase,
               private dialogRef: MatDialog,
               private route: ActivatedRoute,
               private router: Router,
               private usuarioUseCase: UsuarioUseCase,
               private snackBar: SnackbarService ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
    this.behavior.subscribe(result => {this.publicacaoContent = result.content})
    this.publicacaoContent.sort((a, b) => {
      let dateA = moment(a.createdAt, 'DD-MM-YYYY H:m');
      let dateB = moment(b.createdAt, 'DD-MM-YYYY H:m');
      if (dateA.isAfter(dateB)) return -1;
      if (dateB.isAfter(dateA)) return 1;
      return 0
    })
    this.publicationApoiada();
    this.route.data.subscribe(() => {
      this.usuario = this.route.snapshot.data.user
    });
  }
  showAndHidden(index) {
    this.show[index] ? this.show[index] = false : this.show[index] = true
  }
  showApoiadores(index) {
    this.showApoiador[index] ? this.showApoiador[index] = false : this.showApoiador[index] = true
  }
  edit(publicacao: any) {
    this.dialogRef.open(PublicacaoEditComponent, {
      width: '35vw',
      height: '80vh',
      data: publicacao,
      disableClose: true
    }).afterClosed().subscribe(() => {this.refreshPage()})
  }
  async delete(uuid: string) {
    this.dialogRef.open(DeleteComponent, {
      width: '600px',
      height: '240px',
      data: {option: 'deletePublicacao', message: 'Tem certeza que deseja exluir a publicação?', uuid: uuid},
      disableClose: true
    }).afterClosed().subscribe(() => {this.refreshPage()})
  }
  
  openMap(endereco) {
    this.dialogRef.open(MapComponent, {
      data: endereco,
      panelClass: ['dialog-reset'],
      disableClose: true
    })
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
        this.refreshPage()
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
      this.refreshPage()
      this.apoio[publicacao.uuid] = true
    } catch (error) {
      this.snackBar.open({ message: error.message, duration: 5, customClass: 'error' })

    }
  }
  /* Faz uma requisicao nova e popula a timeline com os dados atualizados */
  async refreshPage() {
    if(this.router.url === '/home') {
      this.publicacaoTimeLine =  await this.publicacaoUseCase.findAll({ page: '0', linesPerPage: '5',orderBy: 'createdAt', direction:'DESC' }).toPromise();
      this.publicacaoContent = this.publicacaoTimeLine.content;
      this.lastPage.emit(this.publicacaoTimeLine['last']);
      this.timeLineContent.emit(this.publicacaoTimeLine);
    }else {
      let publicacao = await this.publicacaoUseCase.findOne(this.route.snapshot.params.uuid).toPromise();
      this.publicacaoContent = [];
      this.publicacaoContent.push(publicacao);
    }

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
      let comment: Comment = {
        corpo: this.comment,
        publicacao: publicacao.uuid,
        usuario: usuario.uuid
      }
      try {
        await this.publicacaoUseCase.comment(comment).toPromise();
        this.refreshPage();
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
