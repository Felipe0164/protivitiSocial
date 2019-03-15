import { randomBytes } from "crypto";
import express = require("express");
// https://www.npmjs.com/package/lru-cache
import lru = require("lru-cache");
import Sql = require("../infra/sql");
import GeradorHash = require("../utils/geradorHash");

export = class Usuario {
	private static readonly cacheUsuarioLogados = lru(100);

	// A senha padrão é 1234
	private static readonly HashSenhaPadrao = "peTcC99vkvvLqGQL7mdhGuJZIvL2iMEqvCNvZw3475PJ:JVyo1Pg2HyDyw9aSOd3gNPT30KdEyiUYCjs7RUzSoYGN";
	// Não utilizar números > 0x7FFFFFFF, pois os XOR resultarão em -1
	private static readonly HashId = 0x16e7fef4;

	public static readonly PerfilAdmin = 1;

	public id: number;
	public login: string;
	public nome: string;
	public perfil: number;
	public senha: string;

	// Utilizados apenas no cache
	private cookieStr: string;
	public admin: boolean;

	public static removerDoCache(id: number): void {
		Usuario.cacheUsuarioLogados.del(id);
	}

	// Parei de usar Usuario.pegarDoCookie como middleware, porque existem muitas requests
	// que não precisam validar o usuário logado, e agora, é assíncrono...
	// http://expressjs.com/pt-br/guide/writing-middleware.html
	//public static pegarDoCookie(req: express.Request, res: express.Response, next: Function): void {
	public static async cookie(req: express.Request, res: express.Response = null, admin: boolean = false): Promise<Usuario> {
		let cookieStr = req.cookies["usuario"] as string;
		if (!cookieStr || cookieStr.length !== 48) {
			if (res) {
				res.statusCode = 403;
				res.json("Não permitido");
			}
			return null;
		} else {
			let id = parseInt(cookieStr.substr(0, 8), 16) ^ Usuario.HashId;
			let usuario = Usuario.cacheUsuarioLogados.get(id) as Usuario;
			if (usuario) {
				if (usuario.cookieStr !== cookieStr)
					usuario = null;
			} else {
				usuario = null;

				await Sql.conectar(async (sql: Sql) => {
					let rows = await sql.query("select id, login, nome, perfil, token from usuario where id = ?", [id]);
					let row;

					if (!rows || !rows.length || !(row = rows[0]))
						return;

					let token = cookieStr.substring(16);

					if (!row.token ||
						token !== (row.token as string))
						return;

					let u = new Usuario();
					u.id = id;
					u.login = row.login as string;
					u.nome = row.nome as string;
					u.perfil = row.perfil as number;
					u.cookieStr = cookieStr;
					u.admin = (u.perfil === Usuario.PerfilAdmin);

					Usuario.cacheUsuarioLogados.set(id, u);

					usuario = u;
				});
			}
			if (admin && usuario && usuario.perfil !== Usuario.PerfilAdmin)
				usuario = null;
			if (!usuario && res) {
				res.statusCode = 403;
				res.json("Não permitido");
			}
			return usuario;
		}
	}

	private static gerarTokenCookie(id: number): [string, string] {
		let idStr = "0000000" + (id ^ Usuario.HashId).toString(16);
		let extraStr = "00000000";
		let token = randomBytes(16).toString("hex");
		let cookieStr = idStr.substring(idStr.length - 8) + extraStr.substring(extraStr.length - 8) + token;
		return [token, cookieStr];
	}
	
	public static async efetuarLogin(login: string, senha: string, res: express.Response): Promise<[string, Usuario]> {
		if (!login || !senha)
			return ["Usuário ou senha inválidos", null];

		let r: string = null;
		let u: Usuario = null;

		await Sql.conectar(async (sql: Sql) => {
			login = login.trim().toUpperCase();

			let rows = await sql.query("select id, nome, perfil, senha from usuario where login = ?", [login]);
			let row;
			let ok: boolean;

			if (!rows || !rows.length || !(row = rows[0]) || !(ok = await GeradorHash.validarSenha(senha, row.senha))) {
				r = "Usuário ou senha inválidos";
				return;
			}

			let [token, cookieStr] = Usuario.gerarTokenCookie(row.id);

			await sql.query("update usuario set token = ? where id = ?", [token, row.id]);

			u = new Usuario();
			u.id = row.id;
			u.login = login;
			u.nome = row.nome as string;
			u.perfil = row.perfil as number;
			u.cookieStr = cookieStr;
			u.admin = (u.perfil === Usuario.PerfilAdmin);

			Usuario.cacheUsuarioLogados.set(row.id, u);

			// @@@ secure!!!
			res.cookie("usuario", cookieStr, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/", secure: false });
		});

		return [r, u];
	}

	public async efetuarLogout(res: express.Response): Promise<void> {
		await Sql.conectar(async (sql: Sql) => {
			await sql.query("update usuario set token = null where id = ?", [this.id]);

			Usuario.cacheUsuarioLogados.del(this.id);

			// @@@ secure!!!
			res.cookie("usuario", "", { expires: new Date(0), httpOnly: true, path: "/", secure: false });
		});
	}

	public async alterarPerfil(res: express.Response, nome: string, senhaAtual: string, novaSenha: string): Promise<string> {
		nome = (nome || "").trim().toUpperCase();
		if (nome.length < 3 || nome.length > 100)
			return "Nome inválido";

		if (!!senhaAtual !== !!novaSenha || (novaSenha && novaSenha.length > 20))
			return "Senha inválida";

		let r: string = null;

		await Sql.conectar(async (sql: Sql) => {
			if (senhaAtual) {
				let hash = await sql.scalar("select senha from usuario where id = ?", [this.id]) as string;
				if (!await GeradorHash.validarSenha(senhaAtual, hash)) {
					r = "Senha atual não confere";
					return;
				}

				hash = await GeradorHash.criarHash(novaSenha);

				let [token, cookieStr] = Usuario.gerarTokenCookie(this.id);

				await sql.query("update usuario set nome = ?, senha = ?, token = ? where id = ?", [nome, hash, token, this.id]);

				this.nome = nome;
				this.cookieStr = cookieStr;

				// @@@ secure!!!
				res.cookie("usuario", cookieStr, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/", secure: false });
			} else {
				await sql.query("update usuario set nome = ? where id = ?", [nome, this.id]);

				this.nome = nome;
			}
		});

		return r;
	}

	private static validar(u: Usuario): string {
		u.nome = (u.nome || "").trim().toUpperCase();
		if (u.nome.length < 3 || u.nome.length > 100)
			return "Nome inválido";

		if (u.perfil !== Usuario.PerfilAdmin)
			return "Tipo inválido";

		return null;
	}

	public static async listar(): Promise<Usuario[]> {
		let lista: Usuario[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query("select u.id, u.login, u.nome, p.nome perfil from usuario u inner join perfil p on p.id = u.perfil order by u.login asc") as Usuario[];
		});

		return (lista || []);
	}

	public static async obter(id: number): Promise<Usuario> {
		let lista: Usuario[] = null;

		await Sql.conectar(async (sql: Sql) => {
			lista = await sql.query("select id, login, nome, perfil from usuario where id = ?", [id]) as Usuario[];
		});

		return ((lista && lista[0]) || null);
	}

	public static async criar(u: Usuario): Promise<string> {
		let res: string;
		if ((res = Usuario.validar(u)))
			return res;

		u.login = (u.login || "").trim().toUpperCase();
		if (u.login.length < 3 || u.login.length > 50)
			return "Login inválido";

		await Sql.conectar(async (sql: Sql) => {
			try {
				await sql.query("insert into usuario (login, nome, perfil, senha) values (?, ?, ?, '" + Usuario.HashSenhaPadrao + "')", [u.login, u.nome, u.perfil]);
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					res = "O login \"" + u.login + "\" já está em uso";
				else
					throw e;
			}
		});

		return res;
	}

	public static async alterar(u: Usuario): Promise<string> {
		let res: string;
		if ((res = Usuario.validar(u)))
			return res;

		await Sql.conectar(async (sql: Sql) => {
			await sql.query("update usuario set nome = ?, perfil = ? where id = ?", [u.nome, u.perfil, u.id]);
			res = sql.linhasAfetadas.toString();
			if (res)
				Usuario.cacheUsuarioLogados.del(u.id);
		});

		return res;
	}

	public static async excluir(id: number): Promise<string> {
		let res: string = null;

		await Sql.conectar(async (sql: Sql) => {
			await sql.query("delete from usuario where id = ?", [id]);
			res = sql.linhasAfetadas.toString();
			if (res)
				Usuario.cacheUsuarioLogados.del(id);
		});

		return res;
	}

	public static async redefinirSenha(id: number): Promise<string> {
		let res: string = null;

		await Sql.conectar(async (sql: Sql) => {
			await sql.query("update usuario set token = null, senha = '" + this.HashSenhaPadrao + "' where id = ?", [id]);
			res = sql.linhasAfetadas.toString();
			if (res)
				Usuario.cacheUsuarioLogados.del(id);
		});

		return res;
	}
}
