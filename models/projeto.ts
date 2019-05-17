import Sql = require("../infra/sql");

export = class Projeto {
	public id_projeto: number;
	public id_cliente: number;
	public id_segmento: number;
	public id_pursuit_team: number;
	public id_matriz_servico: number;
	public id_origem_lead: number;
	public id_responsavel_projeto: number;
	public id_escritorio_lider: number;
	public id_cc_lider: number;
	 
	public valor_projeto: number;
	public descricao_projeto: string;

	public nome_cliente: string;
	public nome_segmento: string;
	public nome_matriz_servico: string;
	public nome_pursuit_team: string;
	public nome_origem_lead: string;
	public nome_responsavel_proposta: string;
	public nome_escritorio_lider: string;


	private static validar(p: Projeto): string {
		

		if (p.descricao_projeto.length < 1 || p.descricao_projeto.length > 50)
			return "Descrição inválida";
		return null;
	}

	public static async listar(): Promise<Projeto[]> {
		let lista: Projeto[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query("select p.id_projeto, c.id_cliente, s.id_segmento,s.nome_segmento,c.nome_cliente, pu.id_pursuit_team,pu.nome_pursuit_team,ma.id_matriz_servico,"+
			" ma.nome_matriz_servico,o.id_origem_lead,o.nome_origem_lead,rp.id_responsavel_proposta,rp.nome_responsavel_proposta,es.id_escritorio_lider,"+
			" es.nome_escritorio_lider,cc.id_cc_lider,cc.nome_cc_lider,p.valor_projeto, p.descricao_projeto"+
			" from projeto p, cliente c, segmento s, pursuit_team pu, matriz_servico ma, origem_lead o, responsavel_proposta rp, escritorio_lider es, cc_lider cc"+  
			" where p.id_cliente = c.id_cliente and p.id_segmento = s.id_segmento and p.id_matriz_servico = ma.id_matriz_servico"+
			" and p.id_pursuit_team = pu.id_pursuit_team and p.id_origem_lead = o.id_origem_lead"+
			" and p.id_responsavel_proposta = rp.id_responsavel_proposta and p.id_escritorio_lider = es.id_escritorio_lider"+
			" and p.id_cc_lider = cc.id_cc_lider") as Projeto[];
		});

		return (lista || []);
	}

	public static async obter(id_projeto: number): Promise<Projeto> {
		let lista: Projeto[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query("select p.id_projeto, c.id_cliente, s.id_segmento,s.nome_segmento,c.nome_cliente, pu.id_pursuit_team,pu.nome_pursuit_team,ma.id_matriz_servico,"+
			" ma.nome_matriz_servico,o.id_origem_lead,o.nome_origem_lead,rp.id_responsavel_proposta,rp.nome_responsavel_proposta,es.id_escritorio_lider,"+
			" es.nome_escritorio_lider,cc.id_cc_lider,cc.nome_cc_lider,p.valor_projeto, p.descricao_projeto"+
			" from projeto p, cliente c, segmento s, pursuit_team pu, matriz_servico ma, origem_lead o, responsavel_proposta rp, escritorio_lider es, cc_lider cc"+  
			" where p.id_cliente = c.id_cliente and p.id_segmento = s.id_segmento and p.id_matriz_servico = ma.id_matriz_servico"+
			" and p.id_pursuit_team = pu.id_pursuit_team and p.id_origem_lead = o.id_origem_lead"+
			" and p.id_responsavel_proposta = rp.id_responsavel_proposta and p.id_escritorio_lider = es.id_escritorio_lider"+
			" and p.id_cc_lider = cc.id_cc_lider and p.id_projeto = ?", [id_projeto]) as Projeto[];
		});

		return ((lista && lista[0]) || null);
	}

	public static async criar(p: Projeto): Promise<string> {
		let res: string;
		if ((res = Projeto.validar(p)))
			return res;

		await Sql.conectar(async (sql: Sql) => {
			try {
				await sql.query("insert into projeto (id_cliente, id_segmento, id_pursuit_team,id_matriz_servico,id_origem_lead,id_responsavel_proposta,id_escritorio_lider,id_cc_lider, valor_projeto, descricao_projeto) values (?,?,?,?,?,?,?,?,?,?,?)", [,p.id_cliente,p.id_segmento,p.id_pursuit_team,p.id_matriz_servico,p.id_origem_lead,p.id_responsavel_projeto,p.id_escritorio_lider,p.id_cc_lider,p.valor_projeto,p.descricao_projeto]);
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
				await sql.query("update projeto set id_cliente = ?, id_segmento = ?, id_pursuit_team = ?, id_matriz_servico = ?,id_origem_lead = ?,id_responsavel_proposta = ?,id_escritorio_lider = ?,id_cc_lider = ?,valor_projeto = ?, descricao_projeto = ? where id_projeto = " + p.id_projeto, [p.id_cliente,p.id_segmento,p.id_pursuit_team,p.id_matriz_servico,p.id_origem_lead,p.id_responsavel_projeto,p.id_escritorio_lider,p.id_cc_lider,p.valor_projeto,p.descricao_projeto]);
				res = sql.linhasAfetadas.toString();
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					res = "O Projeto \"" + p.id_projeto + "\" já existe";
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
