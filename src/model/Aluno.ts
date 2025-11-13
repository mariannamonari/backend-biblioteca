import type { AlunoDTO } from "../interface/AlunoDTO.js"; // Importa a interface do DTO
import { DatabaseModel } from "./DataBaseModel.js"; // Importa a classe DatabaseModel para realizar a conexão com o banco de dados

const database = new DataBaseModel().pool;

class Aluno {
  private idAluno?: number;
  private ra: string;
  private nome: string;
  private sobrenome: string;
  private data_nascimento: Date;
  private endereco: string;
  private email: string;
  private celular: string;


  constructor(
    _idAluno: number,
    _ra: string,
    _nome: string,
    _sobrenome: string,
    _data_nascimento: Date,
    _endereco: string,
    _email: string,
    _celular: string

  ){
     
     this.ra = _ra;
     this.nome = _nome;
     this.sobrenome = _sobrenome;
     this.data_nascimento = _data_nascimento;
     this.endereco = _endereco;
     this.email = _email;
     this.celular = _celular;
  }
  

  
  public getIdAluno(): number | undefined {
    return this.idAluno;
  }
  public setIdAluno(_idAluno: number): void {
    this.idAluno = _idAluno;
  }

  public getRa(): string {
    return this.ra;

  }
  public setRa(_ra: string): void {
    this.ra = _ra;
  }
   public getNome(): string {
    return this.nome;
  }
    public setNome(_nome: string): void {   
    this.nome = _nome;
  }
    public getSobrenome(): string { 
    return this.sobrenome;
  }
    public setSobrenome(_sobrenome: string): void {
    this.sobrenome = _sobrenome;
  }
    public getDataNascimento(): Date {
    return this.data_nascimento;
  }
    public setDataNascimento(_data_nascimento: Date): void {
    this.data_nascimento = _data_nascimento;
  }
    public getEndereco(): string {
    return this.endereco;
  }
    public setEndereco(_endereco: string): void {
    this.endereco = _endereco;
  }
    public getEmail(): string {
    return this.email;
  }
    public setEmail(_email: string): void {
    this.email = _email;
  }
    public getCelular(): string {
    return this.celular;
  }
    public setCelular(_celular: string): void {
    this.celular = _celular;
  }
    /**
     * Retorna os clientes cadastrados no banco de dados
     * @returns Lista com clientes cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarAluno(): Promise<Array<Aluno> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
            let listaAluno: Array<Aluno> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectAluno = `SELECT * FROM aluno WHERE situacao=TRUE;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectAluno);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((alunoBD) => {
                // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
                const novoAluno: Aluno = new Aluno(
                    alunoBD.id_aluno,
                    alunoBD.ra,
                    alunoBD.nome,
                    alunoBD.sobrenome,
                    alunoBD.data_nascimento,
                    alunoBD.endereco,
                    alunoBD.email,
                    alunoBD.celular
                );

                // Define o ID do cliente usando o valor retornado do banco
                novoAluno.setIdAluno(alunoBD.id_aluno);

                // Adiciona o novo cliente à lista de clientes
                listaAluno.push(novoAluno);
            });

            // Retorna a lista completa de clientes
            return listaAluno;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }
}

export default Aluno;