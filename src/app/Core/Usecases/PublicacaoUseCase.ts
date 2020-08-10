import { Injectable } from '@angular/core';
import { IPublicacaoUserCase } from '../Interfaces/usecase/IPublicacaoUserCase'
import { Publicacao } from '../Domain/PublicacaoModel';
import { PublicacaoRepositoryService } from 'src/app/Data/Repository/publicacao-repository.service';
import { filter } from '../Interfaces/repository/IPublicacaoRepository';
import { SnackbarService } from 'src/app/Presentation/Shared/snackbar/snackbar.service';
import { PublicacaoTimelineContent } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
import { Comment } from '../../Data/Entity/ICommentEntity';



@Injectable({
    providedIn: 'root'
  })
export class PublicacaoUseCase implements IPublicacaoUserCase<any, any>  {
    timeline: PublicacaoTimelineContent;

    constructor(private publicacaoRepository: PublicacaoRepositoryService) {
    
    
    }
    desapoiar(usuarioUuid: any, params: any) {
        return this.publicacaoRepository.desapoiar(usuarioUuid, params);
    }
    deleteComment(params: any) {
        return this.publicacaoRepository.deleteComment(params);
    }
    editComment(params: any, uuid: any) {
       return this.publicacaoRepository.editComment(params, uuid);
    }
    comment(params: Comment) {
    return this.publicacaoRepository.comment(params);
    }
    apoiar(usuarioUuid:any, params: any) {
    return this.publicacaoRepository.apoiar(usuarioUuid,params);
    }
    create(params: Publicacao) {
        throw new Error("Method not implemented.");
    }
    update(params: Publicacao) {
        throw new Error("Method not implemented.");
    }
    findAll(filter?: filter) {
        return this.publicacaoRepository.findAll(filter);
    }

    findOne(params: Publicacao) {
        throw new Error("Method not implemented.");
    }
    delete(params: Publicacao) {
        throw new Error("Method not implemented.");
    }
    


}