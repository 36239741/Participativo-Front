import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';

@Injectable({
  providedIn: 'root'
})
export class ViewPublicationResolveService implements Resolve<any> {

constructor(private publicacaoUseCase: PublicacaoUseCase) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   let uuid = route.params.uuid;
   return await this.publicacaoUseCase.findOne(uuid).toPromise();
  }

}
