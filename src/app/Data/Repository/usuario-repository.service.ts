import { Injectable } from '@angular/core';
import { IUsuarioRepository } from 'src/app/Core/Interfaces/repository/IUsuarioRepository';
import { Usuario } from '../Entity/IUsuarioEntity';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioUpdateEntity } from '../Entity/IUsuarioUpdateEntity';


@Injectable({
  providedIn: 'root'
})
export class UsuarioRepositoryService implements IUsuarioRepository<Usuario, Usuario>{
  


constructor(
  private http: HttpClient,
) { }

  sendNewPassowrd(password: any): Observable<any> {
    return this.http.post(environment.API_URL + 'auth/redefinirsenha', 
    { senha: password, token: localStorage.getItem('token')  });
  }

  findOne(param: any): Observable<Usuario> {
    return this.http.get<Usuario>(environment.API_URL + 'usuarios/email', {params: param});
  }
  create(params: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(environment.API_URL + 'usuarios', params);
  }
  update(params: UsuarioUpdateEntity, uuid: string): Observable<Usuario> {
    return this.http.put<Usuario>(environment.API_URL + 'usuarios/' + uuid, params);
  }
  redefinePassword(email: any): Observable<any> {
    return this.http.post(environment.API_URL + 'auth/esquecisenha', { email: email });
  }


}
