export interface Publicacao {
    uuid?: string;
    descricao: string;
    logradouro: string;
    numero: number;
    complemento: string;
    cep: string;
    bairroId: number;
    categoriaId: number;
    usuarioUuid: string;
}