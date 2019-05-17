import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Oportunidade = require("../../models/oportunidade");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await Oportunidade.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_oportunidade = parseInt(req.query["id_oportunidade"]);
    res.json(isNaN(id_oportunidade) ? null : await Oportunidade.obter(id_oportunidade));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as Oportunidade;
    jsonRes(res, 400, o ? await Oportunidade.criar(o) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let o = req.body as Oportunidade;
    if (o)
        o.id_oportunidade = parseInt(req.body.id_oportunidade);
    jsonRes(res, 400, (o && !isNaN(o.id_oportunidade)) ? await Oportunidade.alterar(o) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_oportunidade = parseInt(req.query["id_oportunidade"]);
    jsonRes(res, 400, isNaN(id_oportunidade) ? "Dados inválidos!" : await Oportunidade.excluir(id_oportunidade));
}));

export = router;
