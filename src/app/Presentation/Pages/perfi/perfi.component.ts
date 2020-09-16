import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioRepositoryService } from 'src/app/Data/Repository/usuario-repository.service';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PerfilEditComponent } from './perfil-edit/perfil-edit.component';
import { Unsubscribable } from 'rxjs';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { SnackbarService } from '../../Shared/snackbar/snackbar.service';
import { ImgRepositoryService, EType } from 'src/app/Data/Repository/img-repository.service';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from '../../Shared/delete/delete.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@Component({
  selector: 'participativo-perfi',
  templateUrl: './perfi.component.html',
  styleUrls: ['./perfi.component.css']
})
export class PerfiComponent implements OnInit, OnDestroy {
  user: Usuario;
  unsubscribe: Unsubscribable[] = [];
  showCommentImage: boolean = false;
  userUuid: string;
  usuarioImageUrl = environment.IMG_URL_USER;
  constructor(private usuarioUseCase: UsuarioUseCase,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
    private imgRepository: ImgRepositoryService,
    private route: ActivatedRoute) {
      this.route.data.subscribe(() => {
        this.user = this.route.snapshot.data.myData;
        this.userUuid = this.route.snapshot.data.myData.uuid
      });
      
     }

  ngOnInit() {

  }
  updatePassword() {
    this.dialog.open(UpdatePasswordComponent, {
      width: '40vw',
      disableClose: true,
    })
  }
  openDelete() {
    this.dialog.open(DeleteComponent, {
      width: '40vw',
      disableClose: true,
      data: {option: 'deletePerfil', message: 'Tem certeza que deseja exluir o seu perfil?'}
    })
  }
  /* Funcao abre a caixa de dialog passando o compenent de edicao  */
  openEdit() {
    this.unsubscribe.push(
    this.dialog.open(PerfilEditComponent, {
      data: this.user,
      width: '400px',
      disableClose: true
    }).afterClosed()
    .subscribe(() => {
      this.usuarioUseCase.findOne().subscribe(result => {this.user = result})
    })
    )
  }

  /* Recebe o file vindo do input oculto */
    async handleFileInput(file: FileList) {
      let imgRequired = this.imgRequired(file);
      let imgTypeValidator = this.imgTypeValidator(file);
      if(imgRequired === false && imgTypeValidator === false) {
      this.unsubscribe.push( 
        this.imgRepository.upload(file[0], EType.Usuario, '')
          .subscribe(async () => { this.snackBar.open({ message: 'Imagem alterada com sucesso!' , duration: 5, customClass: 'success' });
               this.user = await this.usuarioUseCase.findOne().toPromise();}
          ,error => {
            this.snackBar.open({ message: error.error.message , duration: 5, customClass: 'error' })
          }))
      }
  }
    /*Funcao procula o elemento com o id 'upload' e faz o evento de click*/
  openFile() {
    document.getElementById('upload').click();
  }
  imageCommentShow() {
    this.showCommentImage = true;
  }
  imageCommentHide() {
    this.showCommentImage = false;
  }

  imgTypeValidator(fileList: FileList) {
    let fileName:string = fileList[0].name
    let type:string[] = fileName.trim().split('.');
    let permitType: string[] = ['png', 'jpg'];
    let result: string[] = permitType.filter(value => { return value === type[type.length -1] });
    let error: boolean = false
    if(result.length === 0) {
      this.snackBar.open({ message: 'Os tipos de imagem permitidos são PNG, JPEG, JPG', duration: 5, customClass: 'error' })
      error = true;
    }
    return error;
  }
  /* Valida se tem alguma imagem */
  imgRequired(fileList: FileList) {
    let error: boolean = false
    if(fileList.length === 0) {
      this.snackBar.open({ message: 'Selecione uma imagem', duration: 5, customClass: 'error' })
      error = true
    }
    return error;
  }
  ngOnDestroy(): void {
    this.unsubscribe.map(result => result.unsubscribe());
  }

}
