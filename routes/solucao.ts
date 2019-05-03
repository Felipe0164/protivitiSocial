import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Solucao = require("../models/solucao");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/solucao/alterar", {
            titulo: "Criar Solução",
            usuario: u,
            item: null
        });
    }
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        let id_solucao = parseInt(req.query["id_solucao"]);
        let item: Solucao = null;
        if (isNaN(id_solucao) || !(item = await Solucao.obter(id_solucao)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/solucao/alterar", {
                titulo: "Editar Solução",
                usuario: u,
                item: item
            });
    }
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/solucao/listar", {
            titulo: "Gerenciar Soluções",
            usuario: u,
            lista: JSON.stringify(await Solucao.listar())
        });
    }
}));

export = router;
