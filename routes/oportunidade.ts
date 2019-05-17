import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Oportunidade = require("../models/oportunidade");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("negocios/oportunidade/alterar", {
            titulo: "Criar Oportunidade",
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
        let id_oportunidade = parseInt(req.query["id_oportunidade"]);
        let item: Oportunidade = null;
        if (isNaN(id_oportunidade) || !(item = await Oportunidade.obter(id_oportunidade)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("negocios/oportunidade/alterar", {
                titulo: "Editar Oportunidade",
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
        res.render("negocios/oportunidade/listar", {
            titulo: "Gerenciar Oportunidades",
            usuario: u,
            lista: JSON.stringify(await Oportunidade.listar())
        });
    }
}));

export = router;