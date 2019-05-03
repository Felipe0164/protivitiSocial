import Sql = require("../infra/sql");

export = class TipoLocal {
    public nome_tipo_local: string;
    public id_tipo_local: number;

    public static async listar(): Promise<TipoLocal[]> {
        let lista: TipoLocal[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_tipo_local,nome_tipo_local from tipo_local order by id_tipo_local asc") as TipoLocal[];
        });

        return (lista || []);
    }

   
}
