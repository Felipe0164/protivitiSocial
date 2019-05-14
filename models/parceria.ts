import Sql = require("../infra/sql");

export = class Parceria {
    public id_parceria: number;
    public id_empresa: number;
    public id_solucao: number;
    public id_pursuit_team: number;
    public valor_agregado_parceria: string;

    private static validar(p: Parceria): string {
        if (!p.id_parceria)
            return "Parceria inválida!";
        return null;
    }

    public static async listar(): Promise<Parceria[]> {
        let lista: Parceria[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_parceria, id_empresa, id_solucao, id_pursuit_team, valor_agregado_parceria from parceria order by nome asc") as Parceria[];
        });

        return (lista || []);
    }

    public static async obter(id_parceria: number): Promise<Parceria> {
        let lista: Parceria[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_parceria, id_empresa, id_solucao, id_pursuit_team, valor_agregado_parceria from parceria where id_parceria = ?", [id_parceria]) as Parceria[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(p: Parceria): Promise<string> {
        let res: string;
        if ((res = Parceria.validar(p)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("insert into parceria (id_empresa, id_solucao, id_pursuit_team, valor_agregado_parceria) values (?, ?, ?, ?)", [p.id_parceria]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `A parceria "${p.id_parceria}" já existe`;
                else
                    throw e;
            }
        });

        return res;
    }

    public static async alterar(p: Parceria): Promise<string> {
        let res: string;
        if ((res = Parceria.validar(p)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("update curso set id_empresa, id_solucao, id_pursuit_team, valor_agregado_parceria = ?, ?, ?, ? where id = ?", [p.id_empresa, p.id_solucao, p.id_pursuit_team, p.valor_agregado_parceria, p.id_empresa]);
                if (!sql.linhasAfetadas)
                    res = "Parceria inexistente";
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `A parceria "${p.id_parceria}" já existe`;
                else
                    throw e;
            }
        });

        return res;
    }

    public static async excluir(id_parceria: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from parceria where id_parceria = ?", [id_parceria]);
            if (!sql.linhasAfetadas)
                res = "Parceria inexistente";
        });

        return res;
    }

}