import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bairro } from '../Entity/IBairroEntity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BairroRepositoryService {

constructor(private http: HttpClient) { }

  findAll(cidadeId: number): Observable<Bairro> {
    return this.http.get<Bairro>(environment.API_URL + 'bairros/' + cidadeId);
  }
}
