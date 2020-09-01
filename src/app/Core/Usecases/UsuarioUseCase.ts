import { IUsuarioUserCase } from '../Interfaces/usecase/IUsuarioUserCase';
import { UsuarioModel } from '../Domain/UsuarioModel';
import { Observable } from 'rxjs';
import { UsuarioRepositoryService } from 'src/app/Data/Repository/usuario-repository.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioUseCase implements IUsuarioUserCase<Usuario, any> {
    jwtHelper = new JwtHelperService();
    constructor(private UsuarioRepository: UsuarioRepositoryService,
                private snackBar: SnackbarService, 
                private router: Router) {

    }
    delete(uuid: any) {
        return this.UsuarioRepository.delete(uuid);
    }
    findOneByUuid(uuid: any) {
        return this.UsuarioRepository.findOneByUuid(uuid);
    }
    notificacoes(uuid: any) {
        return this.UsuarioRepository.notificacoes(uuid);
    }
    active(params: any, email: string) {
        return this.UsuarioRepository.active(params, email);
    }
    findOne() {
        let { sub } = this.jwtHelper.decodeToken(localStorage.getItem('token'))
        let param = {
          'value': sub
        }
        return this.UsuarioRepository.findOne(param);
    }
    sendNewPassword(password: any) {
        return this.UsuarioRepository.sendNewPassowrd(password);
    }
    create(params: Usuario): UsuarioModel {
        params.tipo = 1;
        let usuario: UsuarioModel;
        if(params != null) {
            this.UsuarioRepository.create(params).subscribe( (response) => {
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
    redefinePassword(email: any): Observable<any> {
        return this.UsuarioRepository.redefinePassword(email);
    }
}