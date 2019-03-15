import express = require("express");
import wrap = require("express-async-error-wrapper");
import Solucoes = require("../models/solucoes");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Solucoes.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
        res.render("solucoes/alterar", { titulo: "Criar nova solução", usuario:u});
	}
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Solucoes.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		let id = parseInt(req.query["id"]);
        let item: Solucoes = null;
        if (isNaN(id) || !(item = await Solucoes.obter(id)))
			res.render("shared/nao-encontrado");
		else
			res.render("solucoes/alterar", { titulo: "Editar solução", usuario:u});
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Solucoes.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("solucoes/listar", { titulo: "Gerenciar solução", usuario:u});
	}
}));

export = router;
