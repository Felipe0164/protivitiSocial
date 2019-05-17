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

CREATE TABLE mentor (
  id_mentor INT NOT NULL AUTO_INCREMENT,
  nome_mentor VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_mentor),
  INDEX mentor_nome_mentor_IX (nome_mentor ASC)
);

CREATE TABLE mentorado (
  id_mentorado INT NOT NULL AUTO_INCREMENT,
  nome_mentorado VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_mentorado),
  INDEX mentorado_nome_mentorado_IX (nome_mentorado ASC)	
);

CREATE TABLE mentoring (
  id_mentoring INT NOT NULL AUTO_INCREMENT,
  id_mentor INT NOT NULL,
  id_mentorado INT NOT NULL,
  PRIMARY KEY (id_mentoring)
);

ALTER TABLE mentoring ADD CONSTRAINT fk_mentoring_id_mentor FOREIGN KEY (id_mentor) REFERENCES mentor (id_mentor);
ALTER TABLE mentoring ADD CONSTRAINT fk_mentoring_id_mentorado FOREIGN KEY (id_mentorado) REFERENCES mentorado (id_mentorado);


CREATE TABLE pursuit_team (
  id_pursuit_team INT NOT NULL AUTO_INCREMENT,
  nome_pursuit_team VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_pursuit_team),
  INDEX pursuit_team_nome_pursuit_team_IX (nome_pursuit_team ASC)
);

CREATE TABLE segmento (
  id_segmento INT NOT NULL AUTO_INCREMENT,
  nome_segmento VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_segmento ),
  INDEX segmento_nome_segmento_IX (nome_segmento ASC)
);

CREATE TABLE cliente (
  id_cliente INT NOT NULL AUTO_INCREMENT,
  nome_cliente VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_cliente),
  INDEX cliente_nome_cliente_IX (nome_cliente ASC)
);

CREATE TABLE empresa (
  id_empresa INT NOT NULL AUTO_INCREMENT,
  nome_empresa VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_empresa),
  INDEX empresa_nome_empresa_IX (nome_empresa ASC)
);

CREATE TABLE solucao (
  id_solucao INT NOT NULL AUTO_INCREMENT,
  nome_solucao VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_solucao),
  INDEX Solucao_nome_solucao_IX (nome_solucao ASC)
);

CREATE TABLE responsavel_proposta (
  id_responsavel_proposta INT NOT NULL AUTO_INCREMENT,
  nome_responsavel_proposta VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_responsavel_proposta),
  INDEX responsavel_proposta_nome_responsavel_proposta_IX (nome_responsavel_proposta ASC)
);

CREATE TABLE escritorio_lider (
  id_escritorio_lider INT NOT NULL AUTO_INCREMENT,
  nome_escritorio_lider VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_escritorio_lider),
  INDEX escritorio_nome_escritorio_lider_IX (nome_escritorio_lider ASC)
);

CREATE TABLE cc_lider (
  id_cc_lider INT NOT NULL AUTO_INCREMENT,
  nome_cc_lider VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_cc_lider),
  INDEX cc_lider_nome_cc_lider_IX (nome_cc_lider ASC)
);

CREATE TABLE matriz_servico (
  id_matriz_servico INT NOT NULL AUTO_INCREMENT,
  nome_matriz_servico VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_matriz_servico),
  INDEX matriz_servico_nome_matriz_servico_IX (nome_matriz_servico ASC)
);

CREATE TABLE origem_lead (
  id_origem_lead INT NOT NULL AUTO_INCREMENT,
  nome_origem_lead VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_origem_lead),
  INDEX origem_lead_origem_lead_servico_IX (nome_origem_lead ASC)
);


CREATE TABLE oportunidade (
  id_oportunidade INT NOT NULL AUTO_INCREMENT,
  empresa_oportunidade VARCHAR(150) NOT NULL,
  contato_oportunidade VARCHAR(100) NULL,
  tel_oportunidade VARCHAR(30) NULL,
  email_oportunidade VARCHAR(100) NULL,	
  id_solucao INT NOT NULL,
  descricao_oportunidade VARCHAR(250) NULL,
  PRIMARY KEY (id_oportunidade)
);

ALTER TABLE oportunidade ADD CONSTRAINT fk_oportunidade_id_solucao FOREIGN KEY (id_solucao) REFERENCES solucao (id_solucao);

CREATE TABLE projeto (
  id_projeto INT NOT NULL AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  id_segmento INT NULL,
  id_matriz_servico INT NULL,
  id_origem_lead INT NULL,
  id_responsavel_proposta INT NULL,
  id_pursuit_team INT NULL,
  id_escritorio_lider INT NULL,
  id_cc_lider INT NULL,
  valor_projeto FLOAT NULL,
  descricao_projeto VARCHAR(250) NULL,
  PRIMARY KEY (id_projeto)
);

ALTER TABLE projeto ADD CONSTRAINT fk_projeto_id_cliente FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente);
ALTER TABLE projeto ADD CONSTRAINT fk_projeto_id_segmento FOREIGN KEY (id_segmento) REFERENCES segmento (id_segmento);
ALTER TABLE projeto ADD CONSTRAINT fk_projeto_id_matriz_servico FOREIGN KEY (id_matriz_servico) REFERENCES matriz_servico (id_matriz_servico);
ALTER TABLE projeto ADD CONSTRAINT fk_projeto_id_origem_lead FOREIGN KEY (id_origem_lead) REFERENCES origem_lead (id_origem_lead);
ALTER TABLE projeto ADD CONSTRAINT fk_projeto_id_responsavel_proposta FOREIGN KEY (id_responsavel_proposta) REFERENCES responsavel_proposta (id_responsavel_proposta);
ALTER TABLE projeto ADD CONSTRAINT fk_projeto_id_pursuit_team FOREIGN KEY (id_pursuit_team) REFERENCES pursuit_team (id_pursuit_team);
ALTER TABLE projeto ADD CONSTRAINT fk_projeto_escritorio_lider FOREIGN KEY (id_escritorio_lider) REFERENCES escritorio_lider (id_escritorio_lider);
ALTER TABLE projeto ADD CONSTRAINT fk_projeto_cc_lider FOREIGN KEY (id_cc_lider) REFERENCES cc_lider (id_cc_lider);


CREATE TABLE parceria (
  id_parceria INT NOT NULL AUTO_INCREMENT,
  id_empresa INT NOT NULL,
  id_solucao INT NOT NULL,
  id_pursuit_team INT NULL,
  valor_agregado_parceria VARCHAR(250) NULL,
  PRIMARY KEY (id_parceria)
);

ALTER TABLE parceria ADD CONSTRAINT fk_parceria_id_empresa FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa);
ALTER TABLE parceria ADD CONSTRAINT fk_parceria_id_solucao FOREIGN KEY (id_solucao) REFERENCES solucao (id_solucao);
ALTER TABLE parceria ADD CONSTRAINT fk_parceria_id_pursuit_team FOREIGN KEY (id_pursuit_team) REFERENCES pursuit_team (id_pursuit_team);


CREATE TABLE tipo_local (
  id_tipo_local INT NOT NULL AUTO_INCREMENT,
  nome_tipo_local VARCHAR(250) NULL,
  PRIMARY KEY (id_tipo_local)
);

CREATE TABLE localizacao (
  id_localizacao INT NOT NULL AUTO_INCREMENT,
  nome_localizacao VARCHAR(250) NOT NULL,
  id_tipo_local INT NULL,
  dia_semana_localizacao INT NULL,
  horario_abertura_localizacao TIME(0) NULL,
  horario_fechamento_localizacao TIME(0) NULL,
  preco_localizacao FLOAT NOT NULL,
  ambiente_localizacao FLOAT NOT NULL,
  atendimento_localizacao FLOAT NOT NULL,
  bebida_localizacao FLOAT NOT NULL,
  tira_gosto_localizacao FLOAT NOT NULL,
  comentario_localizacao VARCHAR(250) NULL,
  latitude_localizacao DOUBLE NOT NULL,
  longitude_localizacao DOUBLE NOT NULL,
  PRIMARY KEY (id_localizacao)
);


ALTER TABLE localizacao ADD CONSTRAINT fk_localizacao_id_tipo_local FOREIGN KEY (id_tipo_local) REFERENCES tipo_local (id_tipo_local);