import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';

@Injectable({
  providedIn: 'root'
})
export class FindPublicationResolveService implements Resolve<any> {

constructor(private publicacaoUseCase: PublicacaoUseCase) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   let descricao = route.queryParams.descricao;
    return await this.publicacaoUseCase.findByParams(descricao, ['1','2','3']).toPromise();
  }

}
