import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js"; // Importa a interface do DTO
import { DataBaseModel } from "./DataBaseModel.js"; // Importa a classe DatabaseModel para realizar a conexão com o banco de dados

const database = new DataBaseModel().pool;  //Inicializa o pool de conexões com o banco de dados

/*
* Classe PedidoVenda representa um modelo de pedido de venda com seus atributos principais (ID cliente, ID carro, Data do Pedido, Valor do Pedido e ID).
* Permite criar objetos de pedido de vendas, acessar e modificar seus dados, e consultar informações no banco de dados.
* Inclui métodos estáticos para listar todos os pedidos de venda ou buscar um pedido específico pelo ID.
*/
class Emprestimo {

    /* Atributos */
    private idEmprestimo?: number = 0;
     private nome: string;           
     private cpf: string;            
    private telefone: string;     
    private situacao?: boolean; 

    /**
     * Construtor da classe PedidoVenda
     * @param _idEmprestimo ID do cliente relacionado ao pedido
     * @param _nome ID do carro vendido
     * @param _cpf Data do pedido
     * @param _telefone Valor total do pedido
     * @param _situacao Situação do pedido (ativo/inativo)
     */
    constructor(_idEmprestimo: number, _nome: string, _cpf: string, _telefone: string) {
        this.idEmprestimo = _idEmprestimo;
        this.nome = _nome;
        this.cpf = _cpf;
        this.telefone = _telefone;
    }

    /**
     * Retorna o ID do pedido
     * @returns ID do pedido
     */
    public getIdEmprestimo(): number | undefined {
        return this.idEmprestimo;
    }
    public setIdEmprestimo(_idEmprestimo: number): void {
        this.idEmprestimo = _idEmprestimo;
    }   
    public getNome(): string {
        return this.nome;
    }
    public setNome(_nome: string): void {
        this.nome = _nome;
    }
    public getCpf(): string {
        return this.cpf;
    }
    public setCpf(_cpf: string): void {
        this.cpf = _cpf;
    }
    public getTelefone(): string {
        return this.telefone;
    }
    public setTelefone(_telefone: string): void {
        this.telefone = _telefone;
    }
    public getSituacao(): boolean | undefined {
        return this.situacao;
    }
    public setSituacao(_situacao: boolean): void {
        this.situacao = _situacao;
    }


    /**
     * Retorna os pedidos de venda cadastrados no banco de dados
     * @returns Lista com pedidos de venda cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarEmprestimos(): Promise<Array<EmprestimoDTO> | null> {
        try {
            // Inicializa uma lista vazia que irá armazenar os objetos do tipo PedidoVendaDTO
            let listaDeEmprestimos: Array<EmprestimoDTO> = [];

            // Define a query SQL que busca os pedidos de venda ativos (situacao = TRUE)
            // A consulta junta dados das tabelas pedidos_venda, clientes e carros
            const querySelectEmprestimos = `
                SELECT
                    pv.id_emprestimo,
                    pv.nome,
                    pv.cpf,
                    pv.telefone,
                    pv.situacao
                FROM pedidos_venda pv
                JOIN alunos c ON pv.id_aluno = c.id_aluno
                JOIN livros ca ON pv.id_livro = ca.id_livro
                WHERE pv.situacao = TRUE;
            `;

            // Executa a query no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectEmprestimos);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((emprestimoBD) => {
                // Cria um objeto DTO (Data Transfer Object) com os dados do pedido
                const dto: EmprestimoDTO = {
                    idEmprestimo: emprestimoBD.id_emprestimo,     // ID do pedido
                    nome: emprestimoBD.nome,                       // ID do cliente
                    cpf: emprestimoBD.cpf,                         // ID do carro
                    telefone: emprestimoBD.telefone,               // Data do pedido
                    situacao: emprestimoBD.situacao               // Situação do pedido
                };

                // Adiciona o objeto DTO à lista de pedidos
                listaDeEmprestimos.push(dto);
            });

            // Retorna a lista completa de pedidos ativos
            return listaDeEmprestimos;
        } catch (error) {
            // Em caso de erro na execução da query, exibe uma mensagem de erro no console
            console.error(`Erro na consulta com o banco de dados.`, error);

            // Retorna null indicando que houve uma falha na operação
            return null;
        }
    }

    /**
     * Retorna informações de um pedido com base no ID
     * @param idEmprestimo ID do pedido a ser buscado
     * @returns Pedido selecionado
     */
 
    static async cadastrarEmprestimo(emprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            // Define a query SQL para inserir um novo pedido na tabela 'pedidos_venda'
            // Os valores serão passados como parâmetros ($1, $2, $3, $4)
            // O comando RETURNING retorna o id_pedido gerado automaticamente pelo banco
            const queryInsertEmprestimo = `INSERT INTO pedidos_venda (id_emprestimo, nome, cpf, telefone)
                                VALUES
                                ($1, $2, $3, $4)
                                RETURNING id_emprestimo;`;

            // Executa a query no banco de dados, passando os dados do pedido como parâmetros
            // Os valores são extraídos do objeto 'pedido' recebido pela aplicação
            const respostaBD = await database.query(queryInsertEmprestimo, [
                emprestimo.idEmprestimo,                        // ID do carro relacionado ao pedido
                emprestimo.nome, 
                emprestimo.cpf,
                emprestimo.telefone,                    // ID do cliente que está fazendo o pedido
                        
            ]);

            // Verifica se a resposta do banco contém pelo menos uma linha
            // Isso indica que o pedido foi inserido com sucesso
            if (respostaBD.rows.length > 0) {
                // Exibe no console uma mensagem de sucesso com o ID do pedido gerado
                console.info(`Emprestimo cadastrado com sucesso. ID: ${respostaBD.rows[0].id_emprestimo}`);

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

 

export default Emprestimo;