import { IUsuarioUserCase } from '../Interfaces/usecase/IUsuarioUserCase';
import { UsuarioModel } from '../Domain/UsuarioModel';
import { Observable } from 'rxjs';
import { UsuarioRepositoryService } from 'src/app/Data/Repository/usuario-repository.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioUseCase implements IUsuarioUserCase<Usuario, any> {
    constructor(private UsuarioRepository: UsuarioRepositoryService,
                private snackBar: SnackbarService, 
                private router: Router) {

    }
    create(params: Usuario): UsuarioModel {
        params.tipo = 1;
        let usuario: UsuarioModel;
        if(params != null) {
            this.UsuarioRepository.register(params).subscribe( (response) => {
                usuario = response;
                this.router.navigate(['/sucesso/registro'])
            }, err => {
                let errors = Array(err.error.errors);
                if(errors[0].length > 0) {
                   this.snackBar.openCustomSnackBar(errors[0], { duration: 5, customClass: 'error' });
                }
                else {
                    this.snackBar.open({ message: err.error.message, duration: 5, customClass: 'error' })
                }
            })
        return usuario;
        }
    }
    update(params: Usuario): Observable<any> {
        throw new Error("Method not implemented.");
    }
    redefinePassword(params: Usuario): Observable<any> {
        throw new Error("Method not implemented.");
    }
}