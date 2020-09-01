import { Observable } from 'rxjs';
import { PublicacaoTimelineContent } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';

export interface filter {
  page?: string;
  linesPerPage?: string;
  orderBy?:string;
  direction?: string;
}

export interface IPublicacaoRepository <S, T>{
     create(params: S): T;
     update(params: S, uuid: S): Observable<T>;
     findAll(params: filter): Observable<PublicacaoTimelineContent>;
     findByParams(params: S): Observable<T>;
     findOne(params: S): Observable<T>;
     delete(params: S): Observable<T>;
     desapoiar(usuarioUuid:S, params: S): Observable<T>;
     apoiar(usuarioUuid:S, params: S): Observable<T>;
     comment(params: S): Observable<T>;
     editComment(params: S, uuid: S): Observable<T>;
     deleteComment(params: S): Observable<T>;

}