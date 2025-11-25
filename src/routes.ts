import { Router } from "express"; // Importa o módulo Router do express
import type { Request, Response } from "express"; // Importa os módulos de requisição e resposta
import AlunoController from "./controller/AlunoController.js";
import LivroController from "./controller/LivroController.js";
import EmprestimoController from "./controller/EmprestimoController.js";

const router = Router(); // cria uma instância de Router

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

/**
 * Endpoints (rotas) para Clientes
 */
// Retorna a lista com todos os clientes
router.get("/api/alunos", AlunoController.todos);
// Cadastra um novo cliente
router.post("/api/alunos", AlunoController.novo);

router.get("/api/livro", LivroController.livro);
router.post("/api/livros", LivroController.todos);

router.get("/api/emprestimos", EmprestimoController.todos);
router.post("/api/emprestimos", EmprestimoController.novo);

export {router};