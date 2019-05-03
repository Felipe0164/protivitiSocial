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



}