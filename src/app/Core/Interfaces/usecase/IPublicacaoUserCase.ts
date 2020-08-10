
export interface IPublicacaoUserCase <S, T>{
     create(params: S): T;
     update(params: S): T;
     findAll(params: S): T;
     findOne(params: S): T;
     delete(params: S): T;
     comment(params: S): T;
     apoiar(usuarioUuid: S, params: S): T;
     desapoiar(usuarioUuid: S, params: S): T;
     deleteComment(params: S): T;
     editComment(params: S, uuid: S): T;
}