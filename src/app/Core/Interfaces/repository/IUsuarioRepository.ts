import { Observable } from 'rxjs';

export interface IUsuarioRepository <S, T> {
    create(params: S): Observable<T>;
    update(params: S, email: string): Observable<T>;
    findOne(params: S): Observable<T>;
    findOneByUuid(params: S): Observable<T>;
    redefinePassword(params: S): Observable<T>;
    sendNewPassowrd(params: S): Observable<T>;
    active(params: S, email:string): Observable<T>;
    notificacoes(uuid: S): Observable<T>;
    delete(uuid: S): Observable<T>;
}