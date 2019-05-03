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
    let id_parceria = parseInt(req.query["id_parceria"]);
    res.json(isNaN(id_parceria) ? null : await Parceria.obter(id_parceria));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as Parceria;
    jsonRes(res, 400, o ? await Parceria.criar(o) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as Parceria;
    if (o)
        o.id_parceria = parseInt(req.body.id_parceria);
    jsonRes(res, 400, (o && !isNaN(o.id_parceria)) ? await Parceria.alterar(o) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_parceria = parseInt(req.query["id_parceria"]);
    jsonRes(res, 400, isNaN(id_parceria) ? "Dados inválidos!" : await Parceria.excluir(id_parceria));
}));

export = router;
