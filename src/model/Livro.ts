class Livro {
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
     this.titulo = _autor;
     this.editora = _editora;
     this.ano_publicacao = _ano_publicacao;
     this.isbn = _isbn;
     this.quant_total = _quant_total;
     this.quant_disponivel = _quant_disponivel;
     this.valor_aplicacao = _valor_aplicacao;
     this.status_livro_emprestado = _status_livro_emprestado
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
    public getAnoPublicacao(): Date {
    return this.ano_publicacao;
    }
    public setAnoPublicacao(_ano_publicacao: Date): void {
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
}
