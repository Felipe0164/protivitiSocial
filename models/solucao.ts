import Sql = require("../infra/sql");

export = class Solucao {
    public id_solucao: number;
    public nome_solucao: string;

    private static validar(s: Solucao): string {
        s.nome_solucao = (s.nome_solucao || "").trim().toUpperCase();
        if (s.nome_solucao.length < 3 || s.nome_solucao.length > 255) {
            return "Nome da solução inválida!";
        }

        return null;
    }

    public static async listar(): Promise<Solucao[]> {
        let lista: Solucao[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_solucao, nome_solucao from solucao order by nome_solucao asc") as Solucao[];
        });

        return (lista || []);
    }

    public static async obter(id_solucao: number): Promise<Solucao> {
        let lista: Solucao[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_solucao, nome_solucao from solucao where id_solucao = ? order by nome_solucao asc", [id_solucao]) as Solucao[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(s: Solucao): Promise<string> {
        let res: string;
        if ((res = Solucao.validar(s)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into solucao (nome_solucao) values (?)`, [s.nome_solucao]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A solução já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(s: Solucao): Promise<string> {
        let res: string;
        if ((res = Solucao.validar(s)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update solucao set nome_solucao = ? where id_solucao = " + s.id_solucao, [s.nome_solucao]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A solução já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_solucao: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from solucao where id_solucao = " + id_solucao);
            res = sql.linhasAfetadas.toString();
        });

        return res;
    }

}