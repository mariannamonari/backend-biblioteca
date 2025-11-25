
/**
 * Interface para Cliente
 * 
 * DTO => Data Transfer Object
 * 
 * É um padrão de design de software que consiste em criar um objeto para transportar dados entre as diferentes camadas de uma aplicação
 */
export interface AlunoDTO {
    idAluno?: number; 
    ra: string;
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    endereco: string;
    email: string;
    celular: string;
    situacao?: boolean;     // Situaçào do objeto
}