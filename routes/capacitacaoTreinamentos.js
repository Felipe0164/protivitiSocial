"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../models/usuario");
const router = express.Router();
router.all("/criar", wrap(async (req, res) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("carreira/capacitacaoTreinamentos/alterar", { titulo: "Criar Capacitação ou Treinamento", usuario: u });
    }
}));
router.all("/alterar", wrap(async (req, res) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        let id = parseInt(req.query["id"]);
        let item = null;
        if (isNaN(id) || !(item = await Usuario.obter(id)))
            res.render("shared/nao-encontrado");
        else
            res.render("carreira/capacitacaoTreinamentos/alterar", { titulo: "Editar Capacitação ou Treinamento", usuario: u });
    }
}));
router.get("/listar", wrap(async (req, res) => {
    let u = await Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("carreira/capacitacaoTreinamentos/listar", { titulo: "Visualizar Capacitação ou Treinamento", usuario: u });
    }
}));
module.exports = router;
//# sourceMappingURL=capacitacaoTreinamentos.js.map