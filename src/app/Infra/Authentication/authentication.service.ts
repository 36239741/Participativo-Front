import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

constructor(private http: HttpClient) { }
  
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
    return localStorage.getItem('token') != null ? true : false;
  }

}
