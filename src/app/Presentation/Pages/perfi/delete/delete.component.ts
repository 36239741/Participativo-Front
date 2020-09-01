import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private router: Router,
              private snackBar: SnackbarService,
              private usuarioUseCase: UsuarioUseCase) { }

  ngOnInit() {
  }

  close() {
    this.dialog.closeAll();
  }
  async delete() {
    let usuario:Usuario = await this.usuarioUseCase.findOne().toPromise();
    await this.usuarioUseCase.delete(usuario.uuid).toPromise();
    this.router.navigate(['/'])
    this.snackBar.open({message: 'Perfil deletado com sucesso!', duration: 5, customClass: 'success'})
  }
}
