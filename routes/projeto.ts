import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Projeto = require("../models/projeto");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("negocios/projeto/alterar", {
            titulo: "Criar Projeto",
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
        let id_projeto = parseInt(req.query["id_projeto"]);
        let item: Projeto = null;
        if (isNaN(id_projeto) || !(item = await Projeto.obter(id_projeto)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("negocios/projeto/alterar", {
                titulo: "Editar Projeto",
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
        res.render("negocios/projeto/listar", {
            titulo: "Gerenciar Projeto",
            usuario: u,
            lista: JSON.stringify(await Projeto.listar())
        });
    }
}));

export = router;
