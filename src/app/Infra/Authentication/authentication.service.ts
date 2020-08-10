import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

constructor(private http: HttpClient) { }
  
  jwtHelper = new JwtHelperService();

  login(login) {
    return this.http.post(environment.API_URL+ 'login', login, { observe: 'response' })
    .pipe(
      map(response => {
        const token = response.headers.get('authorization');
        localStorage.setItem('token', token);
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
  }  

  isLogged() {
    let token = localStorage.getItem('token');
    let validToken = false; 
    if (token != null) {
      validToken = this.jwtHelper.isTokenExpired(token);
      validToken ? validToken = false : validToken = true;
    } 
    return validToken;
  }

}
