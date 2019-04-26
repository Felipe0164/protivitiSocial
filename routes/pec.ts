import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Pec = require("../models/pec");


const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("tutorial/alterar", {
			titulo: "Criar Tutorial do PEC",
			usuario: u,
			rota: "pec",
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
		let item: Pec = null;
		if (isNaN(id) || !(item = await Pec.obter(id)))
			res.render("shared/nao-encontrado");
		else
			res.render("tutorial/alterar", {
				titulo: "Editar Tutorial do PEC",
				usuario: u,
				rota: "pec",
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
			titulo: "Visualizar Tutoriais do PEC",
			usuario: u,
			rota: "pec",
			lista: JSON.stringify(await Pec.listar()),
			caminhoAbsolutoPastaExterno: Pec.caminhoAbsolutoPastaExterno(),
			extensaoArquivo: Pec.extensaoArquivo
		});
	}
}));

export = router;
