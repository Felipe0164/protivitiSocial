import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Alocacao = require("../models/alocacao");


const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("tutorial/alterar", {
			titulo: "Criar Tutorial de Alocação",
			usuario: u,
			rota: "alocacao",
			item: null
		});
	}
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		let id = parseInt(req.query["id"]);
		let item: Alocacao = null;
		if (isNaN(id) || !(item = await Alocacao.obter(id)))
			res.render("shared/nao-encontrado");
		else
			res.render("tutorial/alterar", {
				titulo: "Editar Tutorial de Alocação",
				usuario: u,
				rota: "alocacao",
				item: item
			});
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("tutorial/listar", {
			titulo: "Visualizar Tutoriais de Alocação",
			usuario: u,
			rota: "alocacao",
			lista: JSON.stringify(await Alocacao.listar()),
			caminhoAbsolutoPastaExterno: Alocacao.caminhoAbsolutoPastaExterno(),
			extensaoMiniatura: Alocacao.extensaoMiniatura,
			extensaoVideo: Alocacao.extensaoVideo
		});
	}
}));

export = router;
