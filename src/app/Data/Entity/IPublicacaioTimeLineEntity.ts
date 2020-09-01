import { Usuario } from './IUsuarioEntity';

export interface PublicacaoTimelineContent {
    content: PublicacaoTimeline[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
export interface PublicacaoTimeline {
    descricao: string;
    createdAt: string;
    deletedAt: string;
    image: string;
    totalApoios: number;
    totalComentarios: number;
    updatedAt: string;
    uuid: string;
    usuario: Usuario;
    apoios: Apoios[];
    categoria: Categoria;
    comentarios: Comentario[];
    statuses: Statuses[];
    endereco: Endereco;
}
export interface Apoios {
    createdAt: string;
    usuario: Usuario
}
export interface Categoria {
    descricao: string;
    id: number;
    nome: string;
}
export interface Comentario {
    uuid?: string;
    corpo: string;
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
    usuario: Usuario;
}
export interface Statuses {
    createdAt: string;
    id: number;
    tipo: string;
}
export interface Endereco {
    uuid: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cep: number;
    bairro: Bairro;
}
export interface Bairro {
    id?: number;
    nome: string;
    cidade: Cidade;
}
export interface Cidade {
    nome: string;
    estado: Estado;
}
export interface Estado {
    nome: string;
}