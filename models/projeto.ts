import Sql = require("../infra/sql");

export = class Projeto {
	public id_projeto: number;
	public id_cliente: number;
	public id_industria: number;
	public id_solucao: number;
	public id_pursuit_team: number;
	public problema_projeto: string;
	public vencemos_projeto: string;
	

	private static validar(p: Projeto): string {
		p.problema_projeto = (p.problema_projeto || "").trim().toUpperCase();
		if (p.problema_projeto.length < 1 || p.problema_projeto.length > 50)
			return "Nome inválido";
		

		p.vencemos_projeto = (p.vencemos_projeto || "").trim().toUpperCase();
		if (p.vencemos_projeto.length < 1 || p.vencemos_projeto.length > 50)
			return "Nome inválido";
		return null;
	}

	public static async listar(): Promise<Projeto[]> {
		let lista: Projeto[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query("select id_projeto, id_cliente, id_industria, id_solucao, id_pursuit_team, problema_projeto, vencemos_projeto from projeto") as Projeto[];
		});

		return (lista || []);
	}

	public static async obter(id_projeto: number): Promise<Projeto> {
		let lista: Projeto[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query("id_projeto, id_cliente, id_industria, id_solucao, id_pursuit_team, problema_projeto, vencemos_projeto from projeto where id_projeto = " + id_projeto) as Projeto[];
		});

		return ((lista && lista[0]) || null);
	}

	public static async criar(p: Projeto): Promise<string> {
		let res: string;
		if ((res = Projeto.validar(p)))
			return res;

		await Sql.conectar(async (sql: Sql) => {
			try {
				await sql.query("insert into projeto (problema_projeto,vencemos_projeeto) values (?,?)", [p.problema_projeto,p.vencemos_projeto]);
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					res = "O projeto \"" + p.id_projeto + "\" já existe";
				else
					throw e;
			}
		});

		return res;
	}

	public static async alterar(p: Projeto): Promise<string> {
		let res: string;
		if ((res = Projeto.validar(p)))
			return res;

		await Sql.conectar(async (sql: Sql) => {
			try {
				await sql.query("update projeto set problema_projeto = ?, vencemos_projeto where id_projeto = " + p.id_projeto, [p.problema_projeto,p.vencemos_projeto]);
				res = sql.linhasAfetadas.toString();
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					res = "O curso \"" + p.id_projeto + "\" já existe";
				else
					throw e;
			}
		});

		return res;
	}

	public static async excluir(id: number): Promise<string> {
		let res: string = null;

		await Sql.conectar(async (sql: Sql) => {
			await sql.query("delete from curso where id = " + id);
			res = sql.linhasAfetadas.toString();
		});

		return res;
	}
}
