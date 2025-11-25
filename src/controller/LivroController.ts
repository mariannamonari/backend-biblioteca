import type { Request, Response } from "express";
import Livro from "../model/Livro.js";
import type { LivroDTO } from "../interface/LivroDTO.js";

/**
 * Classe responsável por receber a requisição do cliente, processar essa requisição e devolver a resposta ao cliente
 * 
 * Trata apenas de requisições relacionadas ao recurso Carro
 */
class LivroController extends Livro {

    /**
     * Faz a chamada ao modelo para obter a lista de carros e devolve ao cliente
     * 
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os carros
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarCarros da classe Carro para obter a lista de carros
            // Se o resultado for null, utiliza um array vazio como valor padrão
            const listaLivros: Array<Livro> = await Livro.listarLivro() ?? [];

            // Retorna a resposta HTTP com status 200 (OK) e envia a lista de carros em formato JSON
            return res.status(200).json(listaLivros);
        } catch (error) {
            // Em caso de erro, exibe uma mensagem no console para fins de depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem JSON informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de livros." });
        }
    }

    /**
     * Faz a chamada ao modelo para obter a o carro selecionado e devolve ao cliente
     * 
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Objeto do carro selecionado
     * @returns (400) Erro no ID do carro
     * @returns (500) Erro na consulta
     */
    static async livro(req: Request, res: Response): Promise<Response> {
        try {

            const listarLivro: Array<Livro> | null = await Livro.listarLivro();

            return res.status(200).json(listarLivro)

        } catch (error) {
            // Em caso de erro, exibe uma mensagem no console para fins de depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem JSON informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de livros." });
        }
    }

    /**
     * Faz a chamada ao modelo para inserir um novo carro
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Objeto do carro inserido
     * @returns (400) Erro ao inserir carro
     * @returns (500) Erro na consulta
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Extrai os dados enviados pelo cliente na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface CarroDTO
            const dadosRecebidosLivro: LivroDTO = req.body;

            // Define um array com os nomes dos campos obrigatórios (idCarro fica de fora)
            // 'as const' transforma o array em uma tupla de literais, útil para inferência de tipo
            const camposObrigatorios = ["titulo", "autor", " editora", "ano_publicacao", "isbn", "quant_total", "quant_disponivel", "valor_aplicacao", "status_livro_emprestado"] as const;

            // Cria uma lista com os campos que estão inválidos (undefined, null ou string vazia)
            const camposInvalidos = camposObrigatorios.filter(campo => {
                // Pega o valor do campo específico do DTO dinamicamente
                const valor = dadosRecebidosLivro["titulo" as keyof LivroDTO];


                // Considera inválido quando:
                // - valor === undefined (campo não enviado)
                // - value === null (enviado mas nulo)
                // - valor.toString().trim() === "" (string vazia ou espaços)
                // Usamos toString() para tratar casos onde o valor possa não ser string (ainda que aqui sejam strings)
                return valor === undefined || valor === null || valor.toString().trim() === "";
            });

            // Se encontrou algum campo inválido, retorna status 400 com mensagem indicando quais são
            if (camposInvalidos.length > 0) {
                return res.status(400).json({
                    mensagem: `Os seguintes campos são obrigatórios e não podem estar vazios: ${camposInvalidos.join(", ")}.`
                });
            }

            // Chama o método cadastrarCarro da classe Carro, passando os dados recebidos
            // Esse método deve inserir o carro no banco de dados e retornar true ou false
            const respostaModelo = await Livro.cadastrarLivro(dadosRecebidosLivro);

            // Verifica se o cadastro foi bem-sucedido
            if (respostaModelo) {
                // Se sim, retorna uma resposta HTTP com status 201 (Created)
                // Envia uma mensagem informando que o carro foi cadastrado com sucesso
                return res.status(201).json({ mensagem: "Carro cadastrado com sucesso." });
            } else {
                // Se não, retorna uma resposta HTTP com status 400 (Bad Request)
                // Envia uma mensagem informando que houve erro no cadastro
                return res.status(400).json({ mensagem: "Erro ao cadastrar carro." });
            }
        } catch (error) {
            // Em caso de erro inesperado (como falha de conexão ou erro interno), exibe a mensagem no console
            console.error(`Erro no modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo carro
            return res.status(500).json({ mensagem: "Não foi possível inserir o novo carro." });
        }
    }

}

export default LivroController;