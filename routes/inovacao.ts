import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Inovacao = require("../models/inovacao");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("tutorial/alterar", {
			titulo: "Criar Tutorial Inovação",
			usuario: u,
			rota: "inovacao",
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
		let item: Inovacao = null;
		if (isNaN(id) || !(item = await Inovacao.obter(id)))
			res.render("shared/nao-encontrado");
		else
			res.render("tutorial/alterar", {
				titulo: "Editar Tutorial Inovação",
				usuario: u,
				rota: "inovacao",
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
			titulo: "Visualizar Tutoriais Inovação",
			usuario: u,
			rota: "inovacao",
			lista: JSON.stringify(await Inovacao.listar()),
			caminhoAbsolutoPastaExterno: Inovacao.caminhoAbsolutoPastaExterno(),
			extensaoMiniatura: Inovacao.extensaoMiniatura,
			extensaoVideo: Inovacao.extensaoVideo
		});
	}
}));

export = router;
