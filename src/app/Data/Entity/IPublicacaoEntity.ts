export interface Publicacao {
    uuid?: string;
    descricao: string;
    logradouro: string;
    numero: number;
    complemento: string;
    cep: string;
    bairroId: string;
    categoriaId: string;
    usuarioUuid: string;
}