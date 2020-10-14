import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Comentario } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
import { FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { Unsubscribable } from 'rxjs';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'participativo-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment: Comentario[] = [];
  @Output() emitComment: EventEmitter<any> = new EventEmitter();
  @Output() editComment: EventEmitter<any> = new EventEmitter();
  @Output() deleteComment: EventEmitter<any> = new EventEmitter();
  usuarioImageUrl = environment.IMG_URL_USER;
  commentInput = new FormControl('');
  show: {[key: number]: boolean} = {};
  jwtHelper = new JwtHelperService();
  unsubscribe: Unsubscribable;
  usuario:Usuario;
  editCommentControl: FormControl = new FormControl('', Validators.required);
  constructor(private usuarioUsecase: UsuarioUseCase) { 
  }

  ngOnInit() {
    this.comment.sort((a, b) => {
      let dateA = moment(a.createdAt, 'DD-MM-YYYY H:mm:ss');
      let dateB = moment(b.createdAt, 'DD-MM-YYYY H:mm:ss');
      if (dateA.isAfter(dateB)) return -1;
      if (dateB.isAfter(dateA)) return 1;
      return 0
    })
    console.log(this.comment)

    this.unsubscribe = this.usuarioUsecase.findOne().subscribe(result => { this.usuario = result })
  }
  /* funcao abre o campo da edicao */
  openEdit(index: number, comment: Comentario) {
    let { sub } = this.jwtHelper.decodeToken(localStorage.getItem('token'))
    if(comment.usuario.email === sub) {
    this.show[index] ? this.show[index] = false : this.show[index] = true;
  }
  }

  /* Funcao recebe o corpo do comentario para ser editado */
  receiveComment(comment: Comentario) {
    this.editCommentControl.setValue(comment.corpo);
  }
  /* Funcao emit o uuid de uma publicacao */
  deleteCommenEmit(comment: Comentario) {
    let { sub } = this.jwtHelper.decodeToken(localStorage.getItem('token'))
    if(comment.usuario.email === sub) {
    this.deleteComment.emit(comment.uuid);
    }
  }

  /* Funcao emit o valor digitado no input */
  editCommentEmit(comment: Comentario) {
    if(this.editCommentControl.valid) {
      comment.corpo = this.editCommentControl.value
      this.editComment.emit(comment);
    }
  }
  /*Funco emit o comentario vindo do input*/
  commentEmit() {
    this.emitComment.emit(this.commentInput.value);
    this.commentInput.reset('');
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

}
