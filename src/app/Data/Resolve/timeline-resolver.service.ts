import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PublicacaoTimeline } from '../Entity/IPublicacaioTimeLineEntity';
import { PublicacaoUseCase } from 'src/app/Core/Usecases/PublicacaoUseCase';

@Injectable({
  providedIn: 'root'
})
export class TimelineResolverService implements Resolve<any>{

constructor(private publicacaoUseCase: PublicacaoUseCase) { }


  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.publicacaoUseCase.findAll({ page: '0', linesPerPage: '2',orderBy: 'createdAt', direction:'DESC' }).toPromise();
  }

}
