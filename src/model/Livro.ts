import type { LivroDTO } from "../interface/LivroDTO.js"; // Importa a interface do DTO
import { DataBaseModel } from "./DataBaseModel.js"; // Importa a classe DatabaseModel para realizar a conexão com o banco de dados

const database = new DataBaseModel().pool; //Inicializa o pool de conexões com o banco de dados

class Livro {
   private idLivro?: number= 0;
  private titulo: string;
  private autor: string;
  private editora: string;
  private anoPublicacao: string;
  private isbn: string;
  private quantTotal: number;
  private quantDisponivel: number;
  private valorAplicacao: number;
  private statusLivroEmprestado:string;
 

  constructor(
    _titulo: string,
    _autor: string,
    _editora: string,
    _anoPublicacao: string,
    _isbn: string,
    _quantTotal: number,
    _quantDisponivel: number,
    _valorAplicacao: number,
    _statusLivroEmprestado: string

  ){
    this.titulo = _titulo;
     this.autor = _autor;
     this.editora = _editora;
     this.anoPublicacao = _anoPublicacao;
     this.isbn = _isbn;
     this.quantTotal = _quantTotal;
     this.quantDisponivel = _quantDisponivel;
     this.valorAplicacao = _valorAplicacao;
     this.statusLivroEmprestado = _statusLivroEmprestado
  }
  

  public SetidLivro(_idLivro: number): void {
    this.idLivro = _idLivro;
  }
    public getIdLivro(): number | undefined {
    return this.idLivro;
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
    return this.anoPublicacao;
    }
    public setAnoPublicacao(_anoPublicacao: string): void {
    this.anoPublicacao = _anoPublicacao;
    }
    public getIsbn(): string {
    return this.isbn;
    }
    public setIsbn(_isbn: string): void {
    this.isbn = _isbn;
    }
    public getQuantTotal(): number {
    return this.quantTotal;
    }
    public setQuantTotal(_quantTotal: number): void {
    this.quantTotal = _quantTotal;
    }
    public getQuantDisponivel(): number {
    return this.quantDisponivel;
    }
    public setQuantDisponivel(_quantDisponivel: number): void {
    this.quantDisponivel = _quantDisponivel;
    }
    public getValorAplicacao(): number {
    return this.valorAplicacao;
    }
    public setValorAplicacao(_valorAplicacao: number): void {
    this.valorAplicacao = _valorAplicacao;
    }
    public getStatusLivroEmprestado(): string {
    return this.statusLivroEmprestado;
    }
    public setStatusLivroEmprestado(_statusLivroEmprestado: string): void {
    this.statusLivroEmprestado = _statusLivroEmprestado;
    }
    /**
     * Retorna os clientes cadastrados no banco de dados
     * @returns Lista com clientes cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarLivro(): Promise<Array<Livro> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
            let listarLivro: Array<Livro> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectLivro = `SELECT * FROM livro;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectLivro);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((livroBD) => {
                // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
                const novoLivro: Livro = new Livro(
                    
                    livroBD.titulo,
                    livroBD.autor,
                    livroBD.editora,
                    livroBD.ano_publicacao,
                    livroBD.isbn,
                    livroBD.quantTotal,
                    livroBD.quantDisponivel,
                    livroBD.valorAplicacao,
                    livroBD.statusLivroEmprestado
                );

                // Define o ID do cliente usando o valor retornado do banco
                novoLivro.SetidLivro(livroBD.idLivro);

                // Adiciona o novo cliente à lista de clientes
                listarLivro.push(novoLivro);
            });

            // Retorna a lista completa de clientes
            return listarLivro;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }
     static async cadastrarLivro(livro: LivroDTO): Promise<boolean> {
            try {
                // Define a query SQL para inserir um novo pedido na tabela 'pedidos_venda'
                // Os valores serão passados como parâmetros ($1, $2, $3, $4)
                // O comando RETURNING retorna o id_pedido gerado automaticamente pelo banco
                const queryInsertLivro = `INSERT INTO pedidos_venda (id_livro, titulo, autor, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aplicacao, status_livro_emprestado)
                                    VALUES
                                    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                    RETURNING id_emprestimo;`;
    
                // Executa a query no banco de dados, passando os dados do pedido como parâmetros
                // Os valores são extraídos do objeto 'pedido' recebido pela aplicação
                const respostaBD = await database.query(queryInsertLivro, [
                    livro.idLivro,
                    livro.titulo,
                    livro.autor,
                    livro.ano_publicacao,
                    livro.isbn, 
                    livro.quant_total,
                    livro.quant_disponivel,
                    livro.valor_aplicacao,
                    livro.status_livro_emprestado                   
                            
                ]);
    
                // Verifica se a resposta do banco contém pelo menos uma linha
                // Isso indica que o pedido foi inserido com sucesso
                if (respostaBD.rows.length > 0) {
                    // Exibe no console uma mensagem de sucesso com o ID do pedido gerado
                    console.info(`Livro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_livro}`);
    
                    // Retorna true indicando que o cadastro foi realizado com sucesso
                    return true;
                }
    
                // Se nenhuma linha foi retornada, significa que o cadastro falhou
                // Retorna false indicando falha na operação
                return false;
            } catch (error) {
                // Em caso de erro na execução da query, exibe uma mensagem de erro no console
                console.error(`Erro na consulta ao banco de dados. ${error}`);
    
                // Retorna false indicando que houve uma falha na operação
                return false;
            }
        }
}

export default Livro;

