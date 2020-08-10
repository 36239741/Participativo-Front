export interface Usuario {
    uuid?: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    nome: string;
    sobrenome: string;
    telefone: string;
    senha:  string;
    tipo?: number;
    avatar?: string;
}