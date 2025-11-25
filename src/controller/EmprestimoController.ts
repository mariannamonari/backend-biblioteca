import type { Request, Response } from "express";
import Emprestimo from "../model/Emprestimo.js";
import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";

/**
 * Classe responsável por receber a requisição do cliente, processar essa requisição e devolver a resposta ao cliente
 * 
 * Trata apenas de requisições relacionadas ao recurso PedidoVenda
 */
class EmprestimoController extends Emprestimo {

    /**
     * Faz a chamada ao modelo para obter a lista de pedidos de venda e devolve ao cliente
     * 
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os pedidos
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarPedidosVenda da classe PedidoVenda para buscar os pedidos no banco de dados
            // Se o método retornar null ou undefined, usa um array vazio como valor padrão
            const listarEmprestimos: Array<EmprestimoDTO> = await Emprestimo.listarEmprestimos() ?? [];

            // Retorna uma resposta HTTP com status 200 (OK)
            // Envia a lista de pedidos em formato JSON para o cliente
            return res.status(200).json(listarEmprestimos);
        } catch (error) {
            // Em caso de erro na execução do método, exibe uma mensagem de erro no console
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de emprestimo." });
        }
    }

    /**
     * Faz a chamada ao modelo para obter a um pedidos de venda e devolve ao cliente
     * 
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Informações do pedido
     * @returns (500) Erro na consulta
     */


    /**
     * Faz a chamada ao modelo para inserir um novo pedido
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Objeto do pedido inserido
     * @returns (400) Erro ao inserir pedido
     * @returns (500) Erro na consulta
     */



    static async novo(req: Request, res: Response): Promise<Response> {
        try {

            // Extrai os dados enviados pelo cliente na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface PedidoVendaDTO
            const dadosRecebidosEmprestimo: EmprestimoDTO = req.body;

            // Define um array com os nomes dos campos obrigatórios (idPedido fica de fora)
            // 'as const' transforma o array em uma tupla de literais, útil para inferência de tipo
            const camposObrigatorios = ["idEmprestimo", "nome", "cpf", "telefone"] as const;

            // Cria uma lista com os campos que estão inválidos (undefined, null ou string vazia)
            const camposInvalidos = camposObrigatorios.filter(campo => {
                // Pega o valor do campo específico do DTO dinamicamente
                const valor = dadosRecebidosEmprestimo[campo];
            });
            return res.status(200).json({ mensagem: "Empréstimo cadastrado com sucesso." });

        } catch (error) {
            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            return res.status(500).json({ mensagem: "Não foi possível cadastrar o empréstimo." });
            // Em caso de erro na execução do método, exibe uma mensagem de erro no console
            console.error(`Erro ao inserir empréstimo. ${Error}`);

        }
        return res.status(400).json({ mensagem: "Erro ao cadastrar o empréstimo." });
    }
}



export default EmprestimoController;