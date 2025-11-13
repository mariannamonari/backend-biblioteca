/**
 * Interface para Cliente
 * 
 * DTO => Data Transfer Object
 * 
 * É um padrão de design de software que consiste em criar um objeto para transportar dados entre as diferentes camadas de uma aplicação
 */
export interface LivroDTO {
   



    idLivro?: number;     // ID do cliente (? indica um parâmetro opcional)
    titulo: string;           // Nome do cliente
    autor: string;            // CPF do cliente
    editora: string;
    ano_publicacao: string;
    isbn: string;
    quant_total: number;
    quant_disponivel: number;
    valor_aplicacao: number;
    status_livro_emprestado: string;
    situacao?: boolean;     // Situaçào do objeto
}