import { Injectable } from '@angular/core';
import { IUsuarioRepository } from 'src/app/Core/Interfaces/repository/IUsuarioRepository';
import { Usuario } from '../Entity/IUsuarioEntity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRepositoryService implements IUsuarioRepository<Usuario, Usuario>{

constructor(
  private http: HttpClient,
) { }


  register(params: Usuario): Observable<Usuario> {
     return this.http.post<Usuario>(environment.API_URL + 'usuarios', params);
  }
  update(params: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(environment.API_URL + '/register', params);
  }
  redefinePassword(params: Usuario): Observable<Usuario> {
    throw new Error("Method not implemented.");
  }


}
