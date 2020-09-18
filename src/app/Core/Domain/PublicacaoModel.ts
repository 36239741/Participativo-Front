export class Publicacao {
    constructor() {
        this.descricao = '';
        this.logradouro = '';
        this.numero = 0;
        this.complemento = '';
        this.cep = '';
        this.bairroId = '';
        this.categoriaId = '';
        this.usuarioUuid = '';
    }
    descricao: string;
    logradouro: string;
    numero: number;
    complemento: string;
    cep: string;
    bairroId: string;
    categoriaId: string;
    usuarioUuid: string;
}