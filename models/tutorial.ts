﻿import TipoTutorial = require("./enums/tipoTutorial");
import Sql = require("../infra/sql");
import FS = require("../infra/fs");
import Upload = require("../infra/upload");

abstract class Tutorial {
	public static readonly tamanhoMaximoArquivoEmMiB = 10;
	public static readonly tamanhoMaximoArquivoEmBytes = Tutorial.tamanhoMaximoArquivoEmMiB * 1024 * 1024;

	public id: number;
	public nome: string;
	public link: string;
	public descricao: string;

	protected static caminhoRelativoPastaPorTipo(tipo: TipoTutorial): string {
		return `public/app_data/tutoriais/${tipo}`;
	}

	protected static caminhoAbsolutoPastaExternoPorTipo(tipo: TipoTutorial): string {
		return `/app_data/tutoriais/${tipo}`;
	}

	protected static caminhoRelativoArquivoPorTipo(tipo: TipoTutorial, id: number, extensaoArquivo: string): string {
		return `public/app_data/tutoriais/${tipo}/${id}.${extensaoArquivo}`;
	}

	protected static caminhoAbsolutoArquivoExternoPorTipo(tipo: TipoTutorial, id: number, extensaoArquivo: string): string {
		return `/app_data/tutoriais/${tipo}/${id}.${extensaoArquivo}`;
	}

	protected static validarPorTipo(t: Tutorial): string {
		t.nome = (t.nome || "").trim();
		if (t.nome.length < 3 || t.nome.length > 50)
			return "Nome inválido";

		t.link = (t.link || "").trim();
		let l = t.link.toLowerCase();
		if ((!l.startsWith("http://") && !l.startsWith("https://")) || t.link.length > 100)
			return "Link inválido";

		t.descricao = (t.descricao || "").trim();
		if (t.descricao.length > 150)
			return "Link inválido";

		return null;
	}

	protected static async listarPorTipo(tabela: string): Promise<Tutorial[]> {
		let lista: Tutorial[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query(`select id, nome, link, descricao from ${tabela} order by nome asc`) as Tutorial[];
		});

		return (lista || []);
	}

	protected static async obterPorTipo(tabela: string, id: number): Promise<Tutorial> {
		let lista: Tutorial[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query(`select id, nome, link, descricao from ${tabela} where id = ?`, [id]) as Tutorial[];
		});

		return ((lista && lista[0]) || null);
	}

	protected static async criarPorTipo(tabela: string, tipo: TipoTutorial, t: Tutorial, arquivo: any, extensaoArquivo: string): Promise<string> {
		let res: string;
		if ((res = Tutorial.validarPorTipo(t)))
			return res;

		t.id = 0;

		await Sql.conectar(async (sql: Sql) => {
			await sql.beginTransaction();

			await sql.query(`insert into ${tabela} (nome, link, descricao) values (?, ?, ?)`, [t.nome, t.link, t.descricao]);
			t.id = await sql.scalar("select last_insert_id()") as number;

			// Chegando aqui, significa que a inclusão foi bem sucedida.
			// Logo, podemos tentar criar o arquivo físico. Se a criação do
			// arquivo não funcionar, uma exceção ocorrerá, e a transação será
			// desfeita, já que o método commit() não executará, e nossa classe
			// Sql já executa um rollback() por nós nesses casos.
			await Upload.gravarArquivo(arquivo, Tutorial.caminhoRelativoPastaPorTipo(tipo), t.id + "." + extensaoArquivo);

			await sql.commit();
		});

		return res;
	}

	protected static async alterarPorTipo(tabela: string, t: Tutorial): Promise<string> {
		let res: string;
		if ((res = Tutorial.validarPorTipo(t)))
			return res;

		await Sql.conectar(async (sql: Sql) => {
			await sql.query(`update ${tabela} set nome = ?, link = ?, descricao = ? where id = ?`, [t.nome, t.link, t.descricao, t.id]);
			res = sql.linhasAfetadas.toString();
		});

		return res;
	}

	protected static async excluirPorTipo(tabela: string, tipo: TipoTutorial, id: number, extensaoArquivo: string): Promise<string> {
		let res: string = null;

		await Sql.conectar(async (sql: Sql) => {
			await sql.beginTransaction();

			await sql.query(`delete from ${tabela} where id = ?`, [id]);
			res = sql.linhasAfetadas.toString();

			// Chegando aqui, significa que a exclusão foi bem sucedida.
			// Logo, podemos tentar excluir o arquivo físico. Se a exclusão do
			// arquivo não funcionar, uma exceção ocorrerá, e a transação será
			// desfeita, já que o método commit() não executará, e nossa classe
			// Sql já executa um rollback() por nós nesses casos.
			let caminho = Tutorial.caminhoRelativoArquivoPorTipo(tipo, id, extensaoArquivo);
			if (await FS.existeArquivo(caminho))
				await FS.excluirArquivo(caminho);

			await sql.commit();
		});

		return res;
	}
}

export = Tutorial;
