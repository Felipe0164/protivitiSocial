import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Parceria = require("../../models/parceria");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await Parceria.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id = parseInt(req.query["id_parceria"]);
    res.json(isNaN(id) ? null : await Parceria.obter(id));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let p = req.body as Parceria;

    jsonRes(res, 400, p ? await Parceria.criar(p) : "Dados inválidos");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let p = req.body as Parceria;
    jsonRes(res, 400, p ? await Parceria.alterar(p) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id = parseInt(req.query["id_parceria"]);
    jsonRes(res, 400, !isNaN(id) ? await Parceria.excluir(id) : "Dados inválidos");
}));

export = router;
