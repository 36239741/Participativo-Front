import { Injectable } from '@angular/core';
import { IPublicacaoRepository, filter } from 'src/app/Core/Interfaces/repository/IPublicacaoRepository';
import { Publicacao } from '../Entity/IPublicacaoEntity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PublicacaoTimelineContent } from '../Entity/IPublicacaioTimeLineEntity';
import { Comment } from '../Entity/ICommentEntity';


@Injectable({
  providedIn: 'root'
})
export class PublicacaoRepositoryService implements IPublicacaoRepository <any, Publicacao>{

constructor(
  private http: HttpClient,
  ) { }
  desapoiar(usuarioUuid: any, params: any): Observable<any> {
    return this.http.delete(environment.API_URL + 'apoios/' + usuarioUuid + '/' + params, {});
  }

  apoiar(uuidUsuario:any, uuid: any): Observable<any> {
    return this.http.post(environment.API_URL + 'apoios/' + uuidUsuario + '/' + uuid, {});
  }
  comment(params: Comment): Observable<any> {
    return this.http.post(environment.API_URL + 'comentarios', params);
  }
  deleteComment(uuid: any): Observable<any> {
    return this.http.delete(environment.API_URL + 'comentarios/' + uuid);
  }
  editComment(corpo: any, uuid: any): Observable<any> {
    return this.http.put(environment.API_URL + 'comentarios/' + uuid, { corpo: corpo });
  }
  create(params: Publicacao): Observable<Publicacao> {
    throw new Error("Method not implemented.");
  }
  update(params: Publicacao): Observable<Publicacao> {
    throw new Error("Method not implemented.");
  }
  findAll(filter: filter ): Observable<PublicacaoTimelineContent> {
    let params = {
      'page': filter.page,
      'linesPerPage': filter.linesPerPage,
      'orderBy': filter.orderBy,
      'direction': filter.direction
    }
    return this.http.get<PublicacaoTimelineContent>(environment.API_URL + 'publicacoes/timeline', {params: params});
  }
  findOne(params: Publicacao): Observable<Publicacao> {
    throw new Error("Method not implemented.");

  }
  delete(params: Publicacao): Observable<Publicacao> {
    throw new Error("Method not implemented.");
  }

}
