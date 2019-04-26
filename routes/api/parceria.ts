"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../../models/usuario");
const Parceria = require("../../models/parceria");
const router = express.Router();
router.get("/listar", wrap(async (req, res) => {
    res.json(await Parceria.listar());
}));
router.get("/obter", wrap(async (req, res) => {
    let id = parseInt(req.query["id"]);
    res.json(isNaN(id) ? null : await Parceria.obter(id));
}));
router.post("/criar", wrap(async (req, res) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let c = req.body;
    if (c) {
        let erro = await Parceria.criar(c);
        if (erro) {
            res.statusCode = 400;
            res.json(erro);
        }
        else {
            res.sendStatus(204);
        }
    }
    else {
        res.statusCode = 400;
        res.json("Dados inválidos");
    }
    // O if/else acima ficaria assim com o jsonRes: jsonRes(res, 400, c ? await Curso.criar(c) : "Dados inválidos");
}));
router.post("/alterar", wrap(async (req, res) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let c = req.body;
    if (c)
        c.id = parseInt(req.body.id);
    if (c && !isNaN(c.id)) {
        let erro = await Parceria.alterar(c);
        if (erro) {
            res.statusCode = 400;
            res.json(erro);
        }
        else {
            res.sendStatus(204);
        }
    }
    else {
        res.statusCode = 400;
        res.json("Dados inválidos");
    }
    // O if/else acima ficaria assim com o jsonRes: jsonRes(res, 400, (c && !isNaN(c.id)) ? await Curso.alterar(c) : "Dados inválidos");
}));
router.get("/excluir", wrap(async (req, res) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id = parseInt(req.query["id"]);
    if (!isNaN(id)) {
        let erro = await Parceria.excluir(id);
        if (erro) {
            res.statusCode = 400;
            res.json(erro);
        }
        else {
            res.sendStatus(204);
        }
    }
    else {
        res.statusCode = 400;
        res.json("Dados inválidos");
    }
    // O if/else acima ficaria assim com o jsonRes: jsonRes(res, 400, !isNaN(id) ? await Curso.excluir(id) : "Dados inválidos");
}));
module.exports = router;
//# sourceMappingURL=curso.js.map