import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Usuario } from '../Entity/IUsuarioEntity';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';

@Injectable({
  providedIn: 'root'
})
export class UsuarioFindOneResolve implements Resolve<Usuario> {

constructor(private usuarioUseCase: UsuarioUseCase) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return await this.usuarioUseCase.findOne().toPromise();
  }

}
