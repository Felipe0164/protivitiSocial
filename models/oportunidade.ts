import Sql = require("../infra/sql");

export = class Oportunidade {
    public id_oportunidade: number;
    public empresa_oportunidade: string;
    public contato_oportunidade: string;
    public tel_oportunidade: string;
    public email_oportunidade: string;
    public id_solucao: number;
    public descricao_oportunidade: string;

    public nome_solucao: string;

    private static validar(o: Oportunidade): string {
        o.empresa_oportunidade = (o.empresa_oportunidade || "").trim().toUpperCase();
        if (o.empresa_oportunidade.length < 3 || o.empresa_oportunidade.length > 150) {
            return "Nome da empresa inválido!";
        }
        if (o.id_solucao < 1) {
            return "Por favor, selecione uma solução!";
        }

        return null;
    }

    public static async listar(): Promise<Oportunidade[]> {
        let lista: Oportunidade[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_oportunidade, empresa_oportunidade, contato_oportunidade, "
                + "tel_oportunidade, email_oportunidade, oportunidade.id_solucao, solucao.nome_solucao, descricao_oportunidade"
                + " from oportunidade inner join solucao on solucao.id_solucao = oportunidade.id_solucao order by empresa_oportunidade asc") as Oportunidade[];
        });

        return (lista || []);
    }

    public static async obter(id_oportunidade: number): Promise<Oportunidade> {
        let lista: Oportunidade[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_oportunidade, empresa_oportunidade, contato_oportunidade, "
                + "tel_oportunidade, email_oportunidade, oportunidade.id_solucao, solucao.nome_solucao, descricao_oportunidade"
                + " from oportunidade inner join solucao on solucao.id_solucao = oportunidade.id_solucao where id_oportunidade = ? order by empresa_oportunidade asc", [id_oportunidade]) as Oportunidade[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(o: Oportunidade): Promise<string> {
        let res: string;
        if ((res = Oportunidade.validar(o)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query(`insert into oportunidade (empresa_oportunidade, contato_oportunidade, tel_oportunidade, email_oportunidade, id_solucao, descricao_oportunidade) values (?, ?, ?, ?, ?, ?)`, [o.empresa_oportunidade, o.contato_oportunidade, o.tel_oportunidade, o.email_oportunidade, o.id_solucao, o.descricao_oportunidade]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A oportunidade já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(o: Oportunidade): Promise<string> {
        let res: string;
        if ((res = Oportunidade.validar(o)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update oportunidade set empresa_oportunidade = ?, contato_oportunidade = ?, tel_oportunidade = ?, email_oportunidade = ?, id_solucao = ?, descricao_oportunidade = ? where id_oportunidade = " + o.id_oportunidade, [o.empresa_oportunidade, o.contato_oportunidade, o.tel_oportunidade, o.email_oportunidade, o.id_solucao, o.descricao_oportunidade]);
                res = sql.linhasAfetadas.toString();
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = "A oportunidade já existe!";
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_oportunidade: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from oportunidade where id_oportunidade = " + id_oportunidade);
            res = sql.linhasAfetadas.toString();
        });

        return res;
    }

}