import express = require("express");
import multer = require("multer");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Inovacao = require("../../models/inovacao");
import { isNullOrUndefined } from "util";

const router = express.Router();

// Se utilizar router.xxx() mas não utilizar o wrap(), as exceções ocorridas
// dentro da função async não serão tratadas!!!
router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res);
	if (!u)
		return;
	res.json(await Inovacao.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	res.json(isNaN(id) ? null : await Inovacao.obter(id));
}));

router.post("/criar", multer().single("miniatura"), wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res, true);
	if (!u)
		return;
	let a = req.body as Inovacao;
	jsonRes(res, 400, a && req["file"] && req["file"].buffer && req["file"].size && req["file"].size <= Inovacao.tamanhoMaximoMiniaturaEmBytes ? await Inovacao.criar(a, req["file"]) : "Dados inválidos!");
}));

router.post("/uploadVideo", multer().single("video"), wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res, true);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	jsonRes(res, 400, !isNaN(id) && req["file"] && req["file"].buffer && req["file"].size ? await Inovacao.uploadVideo(id, req["file"]) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res);
	if (!u)
		return;
	let a = req.body as Inovacao;
	jsonRes(res, 400, a ? await Inovacao.alterar(a) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res, true);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	jsonRes(res, 400, !isNaN(id) ? await Inovacao.excluir(id) : "Dados inválidos");
}));

export = router;
