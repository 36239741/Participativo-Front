import { Component, OnInit, Input, AfterViewChecked, AfterContentInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Comentario } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
import { FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'participativo-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comentario[] = [];
  @Output() emitComment: EventEmitter<any> = new EventEmitter();
  @Output() editComment: EventEmitter<any> = new EventEmitter();
  @Output() deleteComment: EventEmitter<any> = new EventEmitter();

  commentInput = new FormControl('');
  show: {[key: number]: boolean} = {};
  jwtHelper = new JwtHelperService();

  editCommentControl: FormControl = new FormControl('', Validators.required);
  constructor() { }
  ngOnInit() {
    
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

}
