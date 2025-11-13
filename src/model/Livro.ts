import type { LivroDTO } from "../interface/LivroDTO.js"; // Importa a interface do DTO
import { DatabaseModel } from "./DataBaseModel.js"; // Importa a classe DatabaseModel para realizar a conexão com o banco de dados

const database = new DatabaseModel().pool; //Inicializa o pool de conexões com o banco de dados

class Livro {
  private idLivro: string;
  private titulo: string;
  private autor: string;
  private editora: string;
  private ano_publicacao: string;
  private isbn: string;
  private quant_total: number;
  private quant_disponivel: number;
  private valor_aplicacao: number;
  private status_livro_emprestado:string;
 

  constructor(
    _idLivro: string,
    _titulo: string,
    _autor: string,
    _editora: string,
    _ano_publicacao: string,
    _isbn: string,
    _quant_total: number,
    _quant_disponivel: number,
    _valor_aplicacao: number,
    _status_livro_emprestado: string

  ){
    this.idLivro = _idLivro;
    this.titulo = _titulo;
     this.autor = _autor;
     this.editora = _editora;
     this.ano_publicacao = _ano_publicacao;
     this.isbn = _isbn;
     this.quant_total = _quant_total;
     this.quant_disponivel = _quant_disponivel;
     this.valor_aplicacao = _valor_aplicacao;
     this.status_livro_emprestado = _status_livro_emprestado
  }
  

  
public getIdLivro(): string {
    return this.idLivro;
    }
    public setIdLivro(_idLivro: string): void {
    this.idLivro = _idLivro;
    }

  public getTitulo(): string {
    return this.titulo;
    }
    public setTitulo(_titulo: string): void {
    this.titulo = _titulo;
    }
    public getAutor(): string {
    return this.autor;
    }
    public setAutor(_autor: string): void {
    this.autor = _autor;
    }
    public getEditora(): string {
    return this.editora;
    }
    public setEditora(_editora: string): void {
    this.editora = _editora;
    }
    public getAnoPublicacao(): string {
    return this.ano_publicacao;
    }
    public setAnoPublicacao(_ano_publicacao: string): void {
    this.ano_publicacao = _ano_publicacao;
    }
    public getIsbn(): string {
    return this.isbn;
    }
    public setIsbn(_isbn: string): void {
    this.isbn = _isbn;
    }
    public getQuantTotal(): number {
    return this.quant_total;
    }
    public setQuantTotal(_quant_total: number): void {
    this.quant_total = _quant_total;
    }
    public getQuantDisponivel(): number {
    return this.quant_disponivel;
    }
    public setQuantDisponivel(_quant_disponivel: number): void {
    this.quant_disponivel = _quant_disponivel;
    }
    public getValorAplicacao(): number {
    return this.valor_aplicacao;
    }
    public setValorAplicacao(_valor_aplicacao: number): void {
    this.valor_aplicacao = _valor_aplicacao;
    }
    public getStatusLivroEmprestado(): string {
    return this.status_livro_emprestado;
    }
    public setStatusLivroEmprestado(_status_livro_emprestado: string): void {
    this.status_livro_emprestado = _status_livro_emprestado;
    }
    /**
     * Retorna os clientes cadastrados no banco de dados
     * @returns Lista com clientes cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listaLivro(): Promise<Array<Livro> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
            let listaLivro: Array<Livro> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectLivro = `SELECT * FROM livro WHERE situacao=TRUE;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectLivro);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((livroBD) => {
                // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
                const novoLivro: Livro = new Livro(
                    livroBD.id_livro,
                    livroBD.titulo,
                    livroBD.autor,
                    livroBD.editora,
                    livroBD.ano_publicacao,
                    livroBD.isbn,
                    livroBD.quant_total,
                    livroBD.quant_disponivel,
                    livroBD.valor_aplicacao,
                    livroBD.status_livro_emprestado
                );

                // Define o ID do cliente usando o valor retornado do banco
                novoLivro.setIdLivro(livroBD.id_livro);

                // Adiciona o novo cliente à lista de clientes
                listaLivro.push(novoLivro);
            });

            // Retorna a lista completa de clientes
            return listaLivro;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }
}

export default Livro;

