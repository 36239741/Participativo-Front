import { Observable } from 'rxjs';

export interface IUsuarioRepository <S, T> {
    register(params: S): Observable<T>;
    update(params: S): Observable<T>;
    redefinePassword(params: S): Observable<T>;
}