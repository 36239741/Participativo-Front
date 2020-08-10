export interface Publicacao {
    uuid: string;
    descricao: string;
    logadouro: string;
    numero: number;
    complemento: string;
    cep: string;
    bairroId: number;
    categoriaId: number;
    usuarioUuid: string;
}