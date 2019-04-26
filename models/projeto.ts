import Sql = require("../infra/sql");

export = class Projeto {
	public id_projeto: number;
	public id_cliente: number;
	public id_industria: number;
	public id_solucao: number;
	public id_pursuit_team: number;
	public problema_projeto: string;
	public vencemos_projeto: string;

	public nome_cliente: string;
	public nome_industria: string;
	public nome_solucao: string;
	public nome_pursuit_team: string;


	private static validar(p: Projeto): string {
		
		if (p.problema_projeto.length < 1 || p.problema_projeto.length > 50)
			return "Nome inválido";
		

		if (p.vencemos_projeto.length < 1 || p.vencemos_projeto.length > 50)
			return "Nome inválido";
		return null;
	}

	public static async listar(): Promise<Projeto[]> {
		let lista: Projeto[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query("select p.id_projeto, c.id_cliente, i.id_industria,i.nome_industria,c.nome_cliente, s.id_solucao,s.nome_solucao, pu.id_pursuit_team,pu.nome_pursuit_team,c.nome_cliente, p.problema_projeto, p.vencemos_projeto"+ 
			" from projeto p, cliente c, industria i, solucao s, pursuit_team pu  where p.id_cliente = c.id_cliente and p.id_industria = i.id_industria and p.id_solucao = s.id_solucao"+
			" and p.id_pursuit_team = pu.id_pursuit_team") as Projeto[];
		});

		return (lista || []);
	}

	public static async obter(id_projeto: number): Promise<Projeto> {
		let lista: Projeto[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query("select p.id_projeto, c.id_cliente, i.id_industria,i.nome_industria, s.id_solucao, pu.id_pursuit_team,c.nome_cliente, p.problema_projeto, p.vencemos_projeto"+ 
			" from projeto p, cliente c, industria i, solucao s, pursuit_team pu  where p.id_cliente = c.id_cliente and p.id_industria = i.id_industria and p.id_solucao = s.id_solucao"+
			" and p.id_pursuit_team = pu.id_pursuit_team and p.id_projeto = ?", [id_projeto]) as Projeto[];
		});

		return ((lista && lista[0]) || null);
	}

	public static async criar(p: Projeto): Promise<string> {
		let res: string;
		if ((res = Projeto.validar(p)))
			return res;

		await Sql.conectar(async (sql: Sql) => {
			try {
				await sql.query("insert into projeto (id_projeto,id_cliente, id_industria, id_solucao, id_pursuit_team, problema_projeto, vencemos_projeto) values (?,?,?,?,?,?,?)", [p.id_projeto,p.id_cliente,p.id_industria,p.id_solucao,p.id_pursuit_team,p.problema_projeto,p.vencemos_projeto]);
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
				await sql.query("update projeto set id_cliente = ?, id_industria = ?, id_solucao = ?, id_pursuit_team = ?, problema_projeto = ?, vencemos_projeto = ? where id_projeto = " + p.id_projeto, [p.id_cliente,p.id_industria,p.id_solucao,p.id_pursuit_team,p.problema_projeto,p.vencemos_projeto]);
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

	public static async excluir(id_projeto: number): Promise<string> {
		let res: string = null;

		await Sql.conectar(async (sql: Sql) => {
			await sql.query("delete from projeto where id_projeto = " + id_projeto);
			res = sql.linhasAfetadas.toString();
		});

		return res;
	}
}
