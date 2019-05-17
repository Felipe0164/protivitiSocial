import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Solucao = require("../../models/solucao");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    res.json(await Solucao.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res);
    if (!u)
        return;
    let id_solucao = parseInt(req.query["id_solucao"]);
    res.json(isNaN(id_solucao) ? null : await Solucao.obter(id_solucao));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let s = req.body as Solucao;
    jsonRes(res, 400, s ? await Solucao.criar(s) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let s = req.body as Solucao;
    if (s)
        s.id_solucao = parseInt(req.body.id_solucao);
    jsonRes(res, 400, (s && !isNaN(s.id_solucao)) ? await Solucao.alterar(s) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req, res, true);
    if (!u)
        return;
    let id_solucao = parseInt(req.query["id_solucao"]);
    jsonRes(res, 400, isNaN(id_solucao) ? "Dados inválidos!" : await Solucao.excluir(id_solucao));
}));

export = router;
