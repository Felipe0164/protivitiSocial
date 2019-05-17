import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Parceria = require("../models/parceria");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("negocios/parceria/alterar", {
            titulo: "Criar Parceria",
            usuario: u,
            rota: "parceria",
            item: null
        });
    }
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        let id = parseInt(req.query["id_parceria"]);
        let item: Parceria = null;
        if (isNaN(id) || !(item = await Parceria.obter(id)))
            res.render("shared/nao-encontrado");
        else
            res.render("negocios/parceria/alterar", {
                titulo: "Editar Parceria",
                usuario: u,
                rota: "parceria",
                item: item
            });
    }
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("negocios/parceria/listar", {
            titulo: "Visualizar Parcerias",
            usuario: u,
            rota: "parceria",
            lista: JSON.stringify(await Parceria.listar())
        });
    }
}));

export = router;
