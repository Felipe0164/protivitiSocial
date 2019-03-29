﻿import express = require("express");
import wrap = require("express-async-error-wrapper");
import jsonRes = require("../../utils/jsonRes");
import Parcerias = require("../../models/parcerias");

const router = express.Router();

// Se utilizar router.xxx() mas não utilizar o wrap(), as exceções ocorridas
// dentro da função async não serão tratadas!!!
router.post("/login", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req);
    jsonRes(res, 403, u ? null : await Parcerias.efetuarLogin(req.body.login as string, req.body.senha as string, res)[0]);
}));

router.get("/logout", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req);
	if (u)
		await u.efetuarLogout(res);
	res.sendStatus(204);
}));

router.post("/alterarPerfil", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Parcerias.cookie(req, res);
	if (!u)
		return;
	jsonRes(res, 400, await u.alterarPerfil(res, req.body.nome as string, req.body.senhaAtual as string, req.body.novaSenha as string));
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req, res, true);
	if (!u)
		return;
	res.json(await Parcerias.listar());
}));

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Parcerias.cookie(req, res, true);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	res.json(isNaN(id) ? null : await Parcerias.obter(id));
}));

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req, res, true);
	if (!u)
		return;
    u = req.body as Parcerias;
	u.perfil = parseInt(req.body.perfil);
    jsonRes(res, 400, u ? await Parcerias.criar(u) : "Dados inválidos");
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req, res, true);
	if (!u)
		return;
	let id = u.id;
    u = req.body as Parcerias;
	u.id = parseInt(req.body.id);
	u.perfil = parseInt(req.body.perfil);
	jsonRes(res, 400, (u && !isNaN(u.id)) ? (id === u.id ? "Um usuário não pode alterar a si próprio" : await Parcerias.alterar(u)) : "Dados inválidos");
}));

router.get("/excluir", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req, res, true);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	jsonRes(res, 400, isNaN(id) ? "Dados inválidos" : (id === u.id ? "Um usuário não pode excluir a si próprio" : await Parcerias.excluir(id)));
}));

router.get("/redefinirSenha", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req, res, true);
	if (!u)
		return;
	let id = parseInt(req.query["id"]);
	jsonRes(res, 400, isNaN(id) ? "Dados inválidos" : (id === u.id ? "Um usuário não pode redefinir sua própria senha" : await Parcerias.redefinirSenha(id)));
}));

export = router;