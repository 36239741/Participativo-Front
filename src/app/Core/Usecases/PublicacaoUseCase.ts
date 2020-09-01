import { Injectable } from '@angular/core';
import { IPublicacaoUserCase } from '../Interfaces/usecase/IPublicacaoUserCase'
import { Publicacao } from '../Domain/PublicacaoModel';
import { PublicacaoRepositoryService } from 'src/app/Data/Repository/publicacao-repository.service';
import { filter } from '../Interfaces/repository/IPublicacaoRepository';
import { PublicacaoTimelineContent } from 'src/app/Data/Entity/IPublicacaioTimeLineEntity';
import { Comment } from '../../Data/Entity/ICommentEntity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioRepositoryService } from 'src/app/Data/Repository/usuario-repository.service';
import { Usuario } from 'src/app/Data/Entity/IUsuarioEntity';
import { HttpParams } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
  })
export class PublicacaoUseCase implements IPublicacaoUserCase<any, any>  {
    timeline: PublicacaoTimelineContent;
    jwtHelper = new JwtHelperService();
    constructor(private publicacaoRepository: PublicacaoRepositoryService,
                private usuarioRepository: UsuarioRepositoryService) {
    
    
    }
    findByParams(descricao: any, categorias: any[]) {
        let categoria = categorias.reduce((a,b) => { return a += ',' + b })
        let httpParams = new HttpParams();
        httpParams = httpParams.append('descricao', descricao)
        httpParams = httpParams.append('categorias', categoria);
        return this.publicacaoRepository.findByParams(httpParams);
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
    async create(params: Publicacao) {
    let { sub } = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    let usuario: Usuario = await this.usuarioRepository.findOne({ value: sub }).toPromise();
    let publicacao: Publicacao = { 
        bairroId: params.bairroId, 
        categoriaId: params.categoriaId,
        cep: params.cep,
        complemento: params.complemento,
        descricao: params.descricao,
        logradouro: params.logradouro,
        numero: params.numero,
        usuarioUuid: usuario.uuid};

    return this.publicacaoRepository.create(publicacao);
    }
    update(params: Publicacao, uuid: string) {
        let publicacaoDto: any = {
            bairroId: params.bairroId,
            cep: params.cep,
            complemento: params.complemento,
            descricao: params.descricao,
            logradouro: params.logradouro,
            numero: params.numero
        }
        return this.publicacaoRepository.update(publicacaoDto, uuid);
    }
    findAll(filter?: filter) {
        return this.publicacaoRepository.findAll(filter);
    }

    findOne(uuid: any) {
        return this.publicacaoRepository.findOne(uuid);
    }
    delete(uuid: any) {
       return this.publicacaoRepository.delete(uuid);
    }
    


}