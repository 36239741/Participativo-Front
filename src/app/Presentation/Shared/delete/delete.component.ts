import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  funcao: string = ''
  constructor(public dialog: MatDialog,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: SnackbarService,
              private usuarioUseCase: UsuarioUseCase,
              private publicacaoUseCase: PublicacaoUseCase) { }

  ngOnInit() {
  }
  option(option) {
    switch(option) {
      case 'deletePublicacao' :
        this.deletePublicacao()
        break
      case 'deletePerfil' :
        this.delete()
        break
    default:
      break
    }
  }
  close() {
    this.dialog.closeAll();
  }
  async deletePublicacao() {
    await this.publicacaoUseCase.delete(this.data.uuid).toPromise();
    this.dialog.closeAll();
    this.snackBar.open({message: 'Publicação deletada com sucesso!', duration: 5, customClass: 'success'})
  }
  async delete() {
    let usuario:Usuario = await this.usuarioUseCase.findOne().toPromise();
    await this.usuarioUseCase.delete(usuario.uuid).toPromise();
    this.router.navigate(['/'])
    this.snackBar.open({message: 'Perfil deletado com sucesso!', duration: 5, customClass: 'success'})
  }
}
