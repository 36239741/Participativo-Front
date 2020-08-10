import { Observable } from 'rxjs';

export interface IUsuarioRepository <S, T> {
    create(params: S): Observable<T>;
    update(params: S, email: string): Observable<T>;
    findOne(params: S): Observable<T>;
    redefinePassword(params: S): Observable<T>;
    sendNewPassowrd(params: S): Observable<T>
}