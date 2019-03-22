import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");

const router = express.Router();

router.all("/mapa", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("timeout/mapa", { titulo: "Mapa de Time-out", usuario:u});
	}
}));

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
        res.render("timeout/criar", { titulo: "Criar Time-Out", usuario: u };
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("timeout/listar", { titulo: "Gerenciar Time-Out", usuario:u});
	}
}));

export = router;
