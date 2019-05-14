import Sql = require("../infra/sql");

export = class Timeout {
    public id_localizacao: number;
    public nome_localizacao: string;
    public id_tipo_local: number;
    public dia_semana_localizacao: number;
    public horario_abertura_localizacao: string;
    public horario_fechamento_localizacao: string;
    public preco_localizacao: number;
    public ambiente_localizacao: number;
    public atendimento_localizacao: number;
    public bebida_localizacao: number;
    public tira_gosto_localizacao: number; 
    public comentario_localizacao: string;
    public latitude_localizacao: number;
    public longitude_localizacao: number;     

    public static converter(t: any): Timeout {
        t.id_tipo_local = parseInt(t.id_tipo_local);
        return t as Timeout;
    }

    public static validar(t: Timeout): string {
        if (isNaN(t.id_tipo_local) || t.id_tipo_local <= 0) return "Tipo de local inválido";
        if (!t.nome_localizacao) return "Nome de localização inválido";
        if (isNaN(t.dia_semana_localizacao) || t.dia_semana_localizacao <=0) return "Dias da semana inválidos";       
        if (!t.horario_abertura_localizacao) return"Horario de abaertura inválido";
        if (!t.horario_fechamento_localizacao) return "Horario de fechamento inválido";
        if (isNaN(t.preco_localizacao) || t.preco_localizacao <= 0) return "Preço  inválido";
        if (isNaN(t.ambiente_localizacao) || t.ambiente_localizacao <= 0) return "Ambiente inválido";
        if (isNaN(t.atendimento_localizacao) || t.atendimento_localizacao <= 0) return "Atendimento inválido";
        if (isNaN(t.bebida_localizacao) || t.bebida_localizacao <= 0) return "Bebida inválida";
        if (isNaN(t.tira_gosto_localizacao) || t.bebida_localizacao<=0) return "Tira gosto inválido";
        if (!t.comentario_localizacao) return "Comentário inválido";
        if (!t.latitude_localizacao) return "Latitude inválido";
        if (!t.longitude_localizacao) return "Longitude inválido";
        let regexp = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
        if (!regexp.test(t.horario_abertura_localizacao)) return "Horario de abertura incorreto";
        if (!regexp.test(t.horario_fechamento_localizacao)) return "Horario de fechamento incorrreto";
    }

    public static async listar(): Promise<Timeout[]> {
        let lista: Timeout[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from localizacao order by id_localizacao  asc") as Timeout[];
        });

        return (lista || []);
    }

    public static async obter(id: number): Promise<Timeout> {
        let lista: Timeout[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select id_localizacao,nome_localizacao,id_tipo_local,dia_semana_localizacao,horario_abertura_localizacao,horario_fechamento_localizacao,preco_localizacao,ambiente_localizacao,atendimento_localizacao,bebida_localizacao,tira_gosto_localizacao,comentario_localizacao,latitude_localizacao,longitude_localizacao  from localizacao where id_localizacao = ?", [id]) as Timeout[];
        });

        return ((lista && lista[0]) || null);
    }

    public static async criar(t: Timeout): Promise<string> {
        t.id_localizacao = 0;

        let res: string;
        if ((res = Timeout.validar(t)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("insert into localizacao (nome_localizacao,id_tipo_local,dia_semana_localizacao,horario_abertura_localizacao,horario_fechamento_localizacao,preco_localizacao,ambiente_localizacao,atendimento_localizacao,bebida_localizacao,tira_gosto_localizacao,comentario_localizacao,latitude_localizacao,longitude_localizacao ) values (?,?,?,?,?,?,?,?,?,?,?,?,?)", [t.nome_localizacao,t.id_tipo_local, t.dia_semana_localizacao, t.horario_abertura_localizacao, t.horario_fechamento_localizacao, t.preco_localizacao, t.ambiente_localizacao, t.atendimento_localizacao, t.bebida_localizacao, t.tira_gosto_localizacao, t.comentario_localizacao, t.latitude_localizacao, t.longitude_localizacao]);
        });

        return res;
    }

    public static async alterar(t: Timeout): Promise<string> {
        let res: string;
        if ((res = Timeout.validar(t)))
            return res;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("update localizacao set id_tipo_local=?,nome_localizacao=?,dia_semana_localizacao=?,horario_abertura_localizacao=?,horario_fechamento_localizacao=?,preco_localizacao=?,ambiente_localizacao=?,atendimento_localizacao=?,bebida_localizacao=?,tira_gosto_localizacao=?,comentario_localizacao=?,latitude_localizacao=?,longitude_localizacao  = ? where id_localizacao = ?", [t.id_tipo_local, t.nome_localizacao, t.dia_semana_localizacao, t.horario_abertura_localizacao, t.horario_fechamento_localizacao, t.preco_localizacao, t.ambiente_localizacao, t.atendimento_localizacao, t.bebida_localizacao, t.tira_gosto_localizacao, t.comentario_localizacao, t.latitude_localizacao, t.longitude_localizacao, t.id_localizacao]);
            if (!sql.linhasAfetadas)
                res = "Timeout inexistente";
        });

        return res;
    }

    public static async excluir(id: number): Promise<string> {
        let res: string = null;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from curso where id _localizacao= ?", [id]);
            if (!sql.linhasAfetadas)
                res = "Timeout inexistente";
        });

        return res;
    }
}
