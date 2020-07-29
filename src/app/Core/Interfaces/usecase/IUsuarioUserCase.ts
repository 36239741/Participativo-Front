import { Observable } from 'rxjs';

export interface IUsuarioUserCase <S, T> {
    create(params: S): T; 
    update(params: S): T;
    redefinePassword(params: S): T; 
}