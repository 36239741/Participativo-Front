
export interface IUsuarioUserCase <S, T> {
    create(params: S): T; 
    update(params: S): T;
    redefinePassword(params: S): T; 
    sendNewPassword(params: S): T;
    findOne(params: S): T;
}