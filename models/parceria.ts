"use strict";
const Sql = require("../infra/sql");
module.exports = class Parceria {
    static validar(p) {
        if (p.id_solucao < 1) {
            return "Escolha uma solução";
        }
        if (p.id_empresa < 1) {
            return "Escolha uma empresa parceira";
        }
        if (p.id_pursuit_team < 1) {
            return "Escolha o responsável pela parceria";
        }
        return null;
    }
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select parceria.id_parceria, empresa.id_empresa, solucao.id_solucao, pursuit_team.id_pursuit_team, empresa.nome_empresa, solucao.nome_solucao, pursuit_team.nome_pursuit_team, parceria.valor_agregado_parceria"
                + " from parceria inner join empresa on empresa.id_empresa = parceria.id_empresa"
                + " inner join solucao on solucao.id_solucao = parceria.id_solucao"
                + " inner join pursuit_team on pursuit_team.id_pursuit_team = parceria.id_pursuit_team");
        });

        return (lista || []);
    }
    static async obter(id_parceria) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select parceria.id_parceria, empresa.id_empresa, solucao.id_solucao, pursuit_team.id_pursuit_team, empresa.nome_empresa, solucao.nome_solucao, pursuit_team.nome_pursuit_team, parceria.valor_agregado_parceria"
                + " from parceria inner join empresa on empresa.id_empresa = parceria.id_empresa"
                + " inner join solucao on solucao.id_solucao = parceria.id_solucao"
                + " inner join pursuit_team on pursuit_team.id_pursuit_team = parceria.id_pursuit_team where parceria.id_parceria = ?", [id_parceria]);
        });

        return ((lista && lista[0]) || null);
    }
    static async criar(p) {
        let res;
        if ((res = Parceria.validar(p)))
            return res;
        await Sql.conectar(async (sql) => {
            await sql.query("insert into parceria (id_empresa, id_solucao, id_pursuit_team, valor_agregado_parceria) values (?, ?, ?, ?)", [p.id_empresa, p.id_solucao, p.id_pursuit_team, p.valor_agregado_parceria]);
        });

        return res;
    }
    static async alterar(p) {
        let res;
        if ((res = Parceria.validar(p)))
            return res;
        await Sql.conectar(async (sql) => {
            await sql.query("update parceria set id_empresa = ?, id_solucao = ?, id_pursuit_team = ?, valor_agregado_parceria = ? where id_parceria = ?", [p.id_empresa, p.id_solucao, p.id_pursuit_team, p.valor_agregado_parceria, p.id_parceria]);
            if (!sql.linhasAfetadas)
                res = "Curso inexistente";
        });

        return res;
    }
    static async excluir(id_parceria) {
        let res = null;
        await Sql.conectar(async (sql) => {
            await sql.query("delete from parceria where id_parceria = ?", [id_parceria]);
            if (!sql.linhasAfetadas)
                res = "Parceria inexistente";
        });

        return res;
    }
};
//# sourceMappingURL=parceria.js.map