import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioRepositoryService } from '../Repository/usuario-repository.service';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';

@Injectable({
  providedIn: 'root'
})
export class UsuarioFindOneResolve implements Resolve<any> {

constructor(private userarioUseCase: UsuarioUseCase) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usuario = await this.userarioUseCase.findOne().toPromise();
    return usuario;
  }

}
