import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

constructor( private auth: AuthenticationService,
              private route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    let looged = this.auth.isLogged();
    let url = this.route.url;
    console.log(this.route.url)
    if(looged === true) {
      this.route.navigate(['home']);
      return looged
    }
    if(looged === false && url == '/' || looged === false && url == '/recuperar-senha' || looged === false && url == '/registrar' || looged === false && url == '/sucesso') {
      return looged = true;
    }
  }

}
