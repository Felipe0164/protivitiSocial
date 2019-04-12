CREATE DATABASE IF NOT EXISTS protivitiSocial;
USE protivitiSocial;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'

-- DROP TABLE IF EXISTS perfil;
CREATE TABLE perfil (
	id int NOT NULL AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY nome_UNIQUE (nome)
);

INSERT INTO perfil (nome) VALUES ('ADMINISTRADOR');

-- DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
	id int NOT NULL AUTO_INCREMENT,
	login varchar(50) NOT NULL,
	nome varchar(100) NOT NULL,
	perfil int NOT NULL,
	senha varchar(100) NOT NULL,
	token char(32) DEFAULT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY login_UNIQUE (login),
	CONSTRAINT perfil_FK FOREIGN KEY (perfil) REFERENCES perfil (id) ON DELETE CASCADE
);

INSERT INTO usuario (login, nome, perfil, senha) VALUES
('ADMIN','ADMINISTRADOR',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('CARLOS.NEVES','CARLOS RAFAEL',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('FELIPE.ALVINO','FELIPE ALVINO',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('DANIEL.SHIMODA','DANIEL SHIMODA',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('CAIO.CATARINO','CAIO CATARINO',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('ANDRE.AGUIAR','ANDRÉ AGUIAR',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('VINICIUS.JUNQUEIRA','VINÍCIUS JUNQUEIRA',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('LUCAS.ZILLIG','LUCAS ZILLIG',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('BRUNA.RODRIGUES','BRUNA RODRIGUES',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('RAFAEL.PIGNATARO','RAFAEL PIGNATARO',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN'),
('GUILHERME.LARREA','GUILHERME LARREA',1,'peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN');

CREATE TABLE administrativo (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  link VARCHAR(100) NOT NULL,
  descricao VARCHAR(150) NOT NULL,
  PRIMARY KEY (id),
  INDEX administrativo_nome_IX (nome ASC)
);

CREATE TABLE alocacao (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  link VARCHAR(100) NOT NULL,
  descricao VARCHAR(150) NOT NULL,
  PRIMARY KEY (id),
  INDEX alocacao_nome_IX (nome ASC)
);

CREATE TABLE inovacao (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  link VARCHAR(100) NOT NULL,
  descricao VARCHAR(150) NOT NULL,
  PRIMARY KEY (id),
  INDEX inovacao_nome_IX (nome ASC)
);

CREATE TABLE pec (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  link VARCHAR(100) NOT NULL,
  descricao VARCHAR(150) NOT NULL,
  PRIMARY KEY (id),
  INDEX pec_nome_IX (nome ASC)
);

CREATE TABLE carreira_curriculo (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  link VARCHAR(100) NOT NULL,
  descricao VARCHAR(150) NOT NULL,
  PRIMARY KEY (id),
  INDEX carreira_curriculo_nome_IX (nome ASC)
);

CREATE TABLE carreira_capacitacao_treinamentos (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  link VARCHAR(100) NOT NULL,
  descricao VARCHAR(150) NOT NULL,
  PRIMARY KEY (id),
  INDEX carreira_capacitacao_treinamentos_nome_IX (nome ASC)
);

CREATE TABLE Mentor (
  idMentor INT NOT NULL AUTO_INCREMENT,
  nomeMentor VARCHAR(255) NOT NULL,
  PRIMARY KEY (idMentor),
  INDEX Mentor_nomeMentor_IX (nomeMentor ASC)
);

CREATE TABLE Mentorado (
  idMentorado INT NOT NULL AUTO_INCREMENT,
  nomeMentorado VARCHAR(255) NOT NULL,
  PRIMARY KEY (idMentorado),
  INDEX Mentorado_nomeMentorado_IX (nomeMentorado ASC)	
);

CREATE TABLE Mentoring (
  idMentoring INT NOT NULL AUTO_INCREMENT,
  idMentor INT NOT NULL,
  idMentorado INT NOT NULL,
  PRIMARY KEY (idMentoring)
);

CREATE TABLE PursuitTeam (
  idPursuitTeam INT NOT NULL AUTO_INCREMENT,
  nomePursuitTeam VARCHAR(255) NOT NULL,
  PRIMARY KEY (idPursuitTeam),
  INDEX PursuitTeam_nomePursuitTeam_IX (nomePursuitTeam ASC)
);

CREATE TABLE Industria (
  idIndustria INT NOT NULL AUTO_INCREMENT,
  nomeIndustria VARCHAR(255) NOT NULL,
  PRIMARY KEY (idIndustria),
  INDEX Industria_nomeIndustria_IX (nomeIndustria ASC)
);

CREATE TABLE Cliente (
  idCliente INT NOT NULL AUTO_INCREMENT,
  nomeCliente VARCHAR(255) NOT NULL,
  PRIMARY KEY (idCliente),
  INDEX Cliente_nomeCliente_IX (nomeCliente ASC)
);

CREATE TABLE Empresa (
  idEmpresa INT NOT NULL AUTO_INCREMENT,
  nomeEmpresa VARCHAR(255) NOT NULL,
  PRIMARY KEY (idEmpresa),
  INDEX Empresa_nomeEmpresa_IX (nomeEmpresa ASC)
);

CREATE TABLE Solucao (
  idSolucao INT NOT NULL AUTO_INCREMENT,
  nomeSolucao VARCHAR(255) NOT NULL,
  PRIMARY KEY (idSolucao),
  INDEX Solucao_nomeSolucao_IX (nomeSolucao ASC)
);

CREATE TABLE Oportunidade (
  idOportunidade INT NOT NULL AUTO_INCREMENT,
  empresaOportunidade VARCHAR(150) NOT NULL,
  contatoOportunidade VARCHAR(100) NULL,
  telOportunidade VARCHAR(30) NULL,
  emailOportunidade VARCHAR(100) NULL,	
  idSolucao INT NOT NULL,
  descricaoOportunidade VARCHAR(250) NULL,
  PRIMARY KEY (idOportunidade)
);

ALTER TABLE Oportunidade ADD CONSTRAINT fk_oportunidade_idSolucao FOREIGN KEY (idSolucao) REFERENCES Solucao (idSolucao);

CREATE TABLE Projeto (
  idProjeto INT NOT NULL AUTO_INCREMENT,
  idCliente INT NOT NULL,
  idIndustria INT NULL,
  idSolucao INT NULL,
  idPursuitTeam INT NULL,
  problemaProjeto VARCHAR(250) NULL,
  vencemosProjeto VARCHAR(250) NULL,
  PRIMARY KEY (idProjeto)
);

ALTER TABLE Projeto ADD CONSTRAINT fk_projeto_idCliente FOREIGN KEY (idCliente) REFERENCES cliente (idCliente);
ALTER TABLE Projeto ADD CONSTRAINT fk_projeto_idIndustria FOREIGN KEY (idIndustria) REFERENCES Industria (idIndustria);
ALTER TABLE Projeto ADD CONSTRAINT fk_projeto_idSolucao FOREIGN KEY (idSolucao) REFERENCES Solucao (idSolucao);
ALTER TABLE Projeto ADD CONSTRAINT fk_projeto_idPursuitTeam FOREIGN KEY (idPursuitTeam) REFERENCES PursuitTeam (idPursuitTeam);

CREATE TABLE Parceria (
  idParceria INT NOT NULL AUTO_INCREMENT,
  idEmpresa INT NOT NULL,
  idPursuitTeam INT NULL,
  valorAgregadoParceria VARCHAR(250) NULL,
  PRIMARY KEY (idParceria)
);

ALTER TABLE Parceria ADD CONSTRAINT fk_parceria_idEmpresa FOREIGN KEY (idEmpresa) REFERENCES Empresa (idEmpresa);
ALTER TABLE Parceria ADD CONSTRAINT fk_parceria_idPursuitTeam FOREIGN KEY (idPursuitTeam) REFERENCES PursuitTeam (idPursuitTeam);

CREATE TABLE Localizacao (
  idLocalizacao INT NOT NULL AUTO_INCREMENT,
  precoLocalizacao FLOAT NOT NULL,
  ambienteLocalizacao FLOAT NOT NULL,
  bebidaLocalizacao FLOAT NOT NULL,
  tiraGostoLocalizacao FLOAT NOT NULL,
  comentarioLocalizacao VARCHAR(250) NULL,
  PRIMARY KEY (idLocalizacao)
);
