import { Injectable } from '@angular/core';
import { IUsuarioRepository } from 'src/app/Core/Interfaces/repository/IUsuarioRepository';
import { Usuario } from '../Entity/IUsuarioEntity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioUpdateEntity } from '../Entity/IUsuarioUpdateEntity';


@Injectable({
  providedIn: 'root'
})
export class UsuarioRepositoryService implements IUsuarioRepository<Usuario, Usuario>{
  
constructor(
  private http: HttpClient,
) { }
  updatePassword(params: any): Observable<Usuario> {
    return this.http.post<any>(environment.API_URL + 'auth/trocarsenha', {senha: params});
  }
  delete(uuid: any): Observable<Usuario> {
    return this.http.put<any>(environment.API_URL + 'usuarios/deleteLogico/' + uuid, {});
  }
  findOneByUuid(uuid: any): Observable<Usuario> {
    return this.http.get<Usuario>(environment.API_URL + 'usuarios/' + uuid);
  }
  notificacoes(uuid: any): Observable<any> {
    return this.http.get(environment.API_URL + 'notificacoes/list/' + uuid);
  }
  active(params: any, email: string): Observable<any> {
    return this.http.get(environment.API_URL + 'usuarios/validate/' + params + '/' + email);

  }
  sendNewPassowrd(password: any, token: string): Observable<any> {
    return this.http.post(environment.API_URL + 'auth/redefinirsenha', { senha: password, token: token  });
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
