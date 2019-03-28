import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");
import Administrativo = require("../models/administrativo");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("administrativo/alterar", { titulo: "Criar Tutorial Administrativo", usuario: u, item: null });
	}
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		let id = parseInt(req.query["id"]);
		let item: Administrativo = null;
		if (isNaN(id) || !(item = await Administrativo.obter(id)))
			res.render("shared/nao-encontrado");
		else
			res.render("administrativo/alterar", { titulo: "Editar Tutorial Administrativo", usuario: u, item: item });
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("administrativo/listar", { titulo: "Visualizar Tutoriais Administrativos", usuario: u, lista: JSON.stringify(await Administrativo.listar()) });
	}
}));

export = router;
