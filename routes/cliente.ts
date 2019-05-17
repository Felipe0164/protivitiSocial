import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Cliente = require("../models/cliente");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    } else {
        res.render("controle/cliente/alterar", {
            titulo: "Criar Cliente",
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
        let id_cliente = parseInt(req.query["id_cliente"]);
        let item: Cliente = null;
        if (isNaN(id_cliente) || !(item = await Cliente.obter(id_cliente)))
            res.render("shared/nao-encontrado", { usuario: u });
        else
            res.render("controle/cliente/alterar", {
                titulo: "Editar Cliente",
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
        res.render("controle/cliente/listar", {
            titulo: "Gerenciar Cliente",
            usuario: u,
            lista: JSON.stringify(await Cliente.listar())
        });
    }
}));

export = router;
