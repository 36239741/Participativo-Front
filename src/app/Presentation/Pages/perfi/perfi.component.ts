import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioRepositoryService } from 'src/app/Data/Repository/usuario-repository.service';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PerfilEditComponent } from './perfil-edit/perfil-edit.component';
import { Unsubscribable } from 'rxjs';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';

@Component({
  selector: 'participativo-perfi',
  templateUrl: './perfi.component.html',
  styleUrls: ['./perfi.component.css']
})
export class PerfiComponent implements OnInit, OnDestroy {
  user: Usuario;
  unsubscribe: Unsubscribable[] = [];
  constructor(private usuarioUseCase: UsuarioUseCase,
    public dialog: MatDialog,
    private route: ActivatedRoute) {
      this.route.data.subscribe(() => {
        this.user = this.route.snapshot.data.myData;
      });
     }

  ngOnInit() {
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

  ngOnDestroy(): void {
    this.unsubscribe.map(result => result.unsubscribe());
  }

}
