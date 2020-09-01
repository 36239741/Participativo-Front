export class Publicacao {
    constructor() {
        this.descricao = '';
        this.logradouro = '';
        this.numero = 0;
        this.complemento = '';
        this.cep = '';
        this.bairroId = 0;
        this.categoriaId = 0;
        this.usuarioUuid = '';
    }
    descricao: string;
    logradouro: string;
    numero: number;
    complemento: string;
    cep: string;
    bairroId: number;
    categoriaId: number;
    usuarioUuid: string;
}