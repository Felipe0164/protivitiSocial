import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
        res.render("negocios/indicacaoOportunidade/alterar", { titulo: "Criar Indição de Oportunidade", usuario:u});
	}
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		let id = parseInt(req.query["id"]);
		let item: Usuario = null;
		if (isNaN(id) || !(item = await Usuario.obter(id)))
			res.render("shared/nao-encontrado");
		else
            res.render("negocios/indicacaoOportunidade/alterar", { titulo: "Editar Indição de Oportunidade", usuario:u});
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
        res.render("negocios/indicacaoOportunidade/listar", { titulo: "Visualizar Indição de Oportunidade", usuario:u});
	}
}));

export = router;
