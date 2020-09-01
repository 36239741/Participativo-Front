import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenGuardService implements CanActivate{
jwtService: JwtHelperService;
constructor(private snackBar: SnackbarService,
            private route: Router) { 
              this.jwtService = new JwtHelperService();
            }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
   let token = route.paramMap.get('token')
   const valid = this.isUUID(token);
   console.log(valid)
    if(valid === false) {
      this.snackBar.open({ message: 'Token inválido', duration: 5, customClass: 'error' })
      this.route.navigate(['/'])
      return false;
    }
      return true; 
  }

  isUUID (uuid) {
    let s = "" + uuid;
    let result;
    result = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (result === null) {
      return false;
    }
    return true;
}

}
