

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);


CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();



CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);



CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);



INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020'),
('Igor', 'Fernandes', '2002-08-14', 'Rua Dezenove, 185' 'IgorAraujoFernandes@gmail.com', '1648747985'),
('Mateus', 'Santos', '2001-02-01', 'Rua Campenorte, 92', 'Mateus.Santos@gmail.com', '1665419541'),
('Evelyn', 'Dias', '2000-10-12', 'Rua Perdizinha, 1173', 'EvelynDias@gmail.com','1645184492'),
('Victor', 'Almeida', '2005-03-28', 'Rua Renê Bittencourt, 163', 'Victor_Almeida@gmail.com', '1678862916'),
('Ana', 'Costa', '2007-12-10', 'Rua Ayrton Senna, 1992', 'Ana_Costa@gmail.com', '1629286830'),
('Bruna', 'Carvalho', '2001-04-05', 'Alameda das Andorinhas, 589', 'BrunaCarvalho@gmail.com', '167964281'),
('Eduardo', 'Santos', '2006-12-16', 'Rua Boa Esperança, 156', 'EduardoSantos@gmail.com', '1641866010'),
('Lavinia', 'Alves', '2005-09-12', 'Rua Onze, 532', 'LaviniaCardoso@gmail.com', '1648593008'),
('Júlia', 'Gomes', '1999-06-03', 'Rua Itu, 1390', 'JuliaGomes@gmail.com', '1681078780'),
('Isabela', 'Barbosa', '2003-11-20', 'Rua Olavo Bilac, 647', 'Isabela.Barbosa@gmail.com');



INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível'),
('Chame Por Andrea', 'Noelle West Ihli', 'DarkSide', '2025', '9786555985658', 10, 10, 69.90, 'Disponivel'), 
('É Assim Que Acaba', 'Colleen Hoover', 'Galera', '2016', '8501112518', 240, 240, 36,90, 'Disponivel'),
('Corte de Espinhos e Rosas', 'Sarah J. Maas', 'Grupo Eitorial Presenca', '2014''8501105872', 123, 123, 62.00, 'Disponivel'),
('Quarta Asa', 'Rebecca Yarros', 'Planeta Minotauro','2024', '8542225856', 125, 125, 230,00, 'Disponivel'),
('Despertar da Lua Caida', 'Sarah A. Parker', 'Harlequin Books', '2024', '6559704157', 300, 300, 56.89, 'Disponivel'),
('As cinzas e o rei maldito pelas estrelas', 'Carissa Broadbent ', 'Suma', '2025', '8556512399', 268, 268, 128.90, 'Disponivel'),
('Duas coroas retorcidas', 'Rachel Gillig','Alt', '2024', '6552260121', 340, 340, 89.90, 44.89, 'Disponivel'),
('Bruxa rebelde', 'Kristen Ciccarelli ','Editora Arqueiro', '2025', '6555657812', 110, 110, 354.00, 78.00, 'Disponivel'),
('Caçador sem coração', 'Kristen Ciccarelli ','Editora Arqueiro', '2025', '6555656379', 150, 150, 52.90, 'Disponivel'),
('A ponte entre reinos ', 'Danielle L. Jensen ','Seguinte', '2024', '8555341957', 52, 52, 67.00, 'Disponivel');






INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(11, 12, '2024-09-10', '2024-09-24', 'Em andamento'),
(13, 14, '2024-09-11', '2024-09-25', 'Em andamento'),
(15, 16, '2024-09-11', '2024-09-25', 'Em andamento'),
(17, 18, '2024-09-11', '2024-09-25', 'Em andamento'),
(18, 19, '2024-09-11', '2024-09-25', 'Em andamento'),
(12, 13, '2025-10-05', '2025-10-15', 'Em andamento'),
(14, 15, '2024-12-02', '2025-12-10', 'Em andamento'),
(16, 18, '2024-11-04', '2024-09-25', 'Em andamento'),
(19, 20, '2024-10-25', '2024-11-05', 'Em andamento'),
(20, 15, '2024-04-12', '2024-04-22', 'Em andamento'),
(11, 16, '2024-03-23', '2024-04-13', 'Em andamento')
(16, 19, '2024-06-10', '2024-06-20', 'Em andamento'),
(13, 14, '2024-07-05', '2024-07-15', 'Em andamento'),
(15, 17, '2024-08-04', '2024-08-14', 'Em andamento'),
(17, 12, '2024-02-06', '2024-02-16', 'Em andamento');





