import { Injectable } from '@angular/core';
import { BairroRepositoryService } from '../Repository/bairro-repository.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BairroResolveService implements Resolve<any> {

constructor(private bairroRepository: BairroRepositoryService) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.bairroRepository.findAll(1).toPromise();
  }

}
