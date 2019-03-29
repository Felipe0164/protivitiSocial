import express = require("express");
import wrap = require("express-async-error-wrapper");
import Parcerias = require("../models/parcerias");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
        res.render("negocios/parcerias/alterar", { titulo: "Criar Nova Parceria", usuario:u});
	}
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		let id = parseInt(req.query["id"]);
        let item: Parcerias = null;
        if (isNaN(id) || !(item = await Parcerias.obter(id)))
			res.render("shared/nao-encontrado");
		else
            res.render("negocios/parcerias/alterar", { titulo: "Editar Parceria", usuario:u});
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Parcerias.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
        res.render("negocios/parcerias/listar", { titulo: "Visualizar Parceria", usuario:u});
	}
}));

export = router;
