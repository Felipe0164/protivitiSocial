import express = require("express");
import multer = require("multer");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Usuario = require("../../models/usuario");
import Alocacao = require("../../models/alocacao");

const router = express.Router();

// Se utilizar router.xxx() mas não utilizar o wrap(), as exceções ocorridas
// dentro da função async não serão tratadas!!!
router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res);
	if (!u)
		return;
	res.json(await Alocacao.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	res.json(isNaN(id) ? null : await Alocacao.obter(id));
}));

router.post("/criar", multer().single("miniatura"), wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res, true);
	if (!u)
		return;
	let a = req.body as Alocacao;
	jsonRes(res, 400, a && req["file"] && req["file"].buffer && req["file"].size && req["file"].size <= Alocacao.tamanhoMaximoMiniaturaEmBytes ? await Alocacao.criar(a, req["file"]) : "Dados inválidos!");
}));

router.post("/uploadVideo", multer().single("video"), wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res, true);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	jsonRes(res, 400, !isNaN(id) && req["file"] && req["file"].buffer && req["file"].size ? await Alocacao.uploadVideo(id, req["file"]) : "Dados inválidos!");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res);
	if (!u)
		return;
	let a = req.body as Alocacao;
	jsonRes(res, 400, a ? await Alocacao.alterar(a) : "Dados inválidos!");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req, res, true);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	jsonRes(res, 400, !isNaN(id) ? await Alocacao.excluir(id) : "Dados inválidos");
}));

export = router;
