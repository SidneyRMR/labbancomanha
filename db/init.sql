-- Arquivo: init.sql
CREATE DATABASE IF NOT EXISTS db_programa_igreja;
-- CREATE DATABASE IF NOT EXISTS db_test;
USE db_programa_igreja;
-- USE db_test;

-- Adicione outras instruções SQL conforme necessário
CREATE TABLE festas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ativa BOOLEAN NOT NULL
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    administrador BOOLEAN NOT NULL,
    ativo BOOLEAN NOT NULL,
    festaId INT NOT NULL,
    FOREIGN KEY (festaId) REFERENCES festas(id)
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    medida VARCHAR(255) NOT NULL,
    estoque INT NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL,
    festaId INT NOT NULL,
    FOREIGN KEY (festaId) REFERENCES festas(id)
);

CREATE TABLE caixas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saldo_dinheiro DECIMAL(10,2) NOT NULL,
    aberto BOOLEAN NOT NULL,
    festaId INT NOT NULL,
    usuarioId INT NOT NULL,
    FOREIGN KEY (festaId) REFERENCES festas(id),
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
);

CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dinheiro DECIMAL(10,2) NOT NULL,
    debito DECIMAL(10,2) NOT NULL,
    credito DECIMAL(10,2) NOT NULL,
    pix DECIMAL(10,2) NOT NULL,
    caixaId INT NOT NULL,
    usuarioId INT NOT NULL,
    festaId INT NOT NULL,
    FOREIGN KEY (caixaId) REFERENCES caixas(id),
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
    FOREIGN KEY (festaId) REFERENCES festas(id)
);

CREATE TABLE venda_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    medida VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    qtde_venda_produtos DECIMAL(10,3) NOT NULL,
    produtoId INT NOT NULL,
    vendaId INT NOT NULL,
    usuarioId INT NOT NULL,
    FOREIGN KEY (produtoId) REFERENCES produtos(id),
    FOREIGN KEY (vendaId) REFERENCES vendas(id),
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
);

INSERT INTO festas (nome, ativa)
VALUES ('festaMaster', 1);

INSERT INTO usuarios (nome, login, senha, administrador, ativo, festaId)
VALUES ('Master User', 'MasterUser', '$2a$10$m16yzUAD9b5stCVoa2NgIu7FAx5duohfS51kkmcg0WngaA4yMJrXq', 1, 1, 1);
