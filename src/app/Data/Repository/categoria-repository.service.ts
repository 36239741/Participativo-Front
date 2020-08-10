import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../Entity/ICategoriaEntity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaRepositoryService {

constructor(private http: HttpClient) { }

  findAll(): Observable<Categoria> {
    return this.http.get<Categoria>(environment.API_URL + 'categorias');
  }
  findOne(categoriaId: number): Observable<Categoria> {
    return this.http.get<Categoria>(environment.API_URL + 'categorias/' + categoriaId);
  }

}
