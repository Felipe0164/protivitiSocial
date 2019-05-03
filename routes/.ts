import express = require("express");
import wrap = require("express-async-error-wrapper");
import Usuario = require("../models/usuario");

const router = express.Router();

router.all("/mapa", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("timeout/mapa", { titulo: "Mapa de Time-Out", usuario: u, msg: null });
	}
}));

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let u = await Usuario.cookie(req);
    if (!u) {
        res.redirect("/");
    } else if (!u.admin) {
        res.redirect("/acesso");
    } else {
        let lat = parseFloat(req.query['lat']);
        let lng = parseFloat(req.query['lng']);
        if (isNaN(lat) || isNaN(lng)) {
            res.render("timeout/mapa", { titulo: "Mapa de Time-Out", usuario: u, msg: null });
        }
        res.render("timeout/alterar", { titulo: "Criar Timeout", usuario: u, item: null });
    }
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
    } else {
        let lat = parseFloat(req.query['lat']);
        let lng = parseFloat(req.query['lng']);
        if (isNaN(lat) || isNaN(lng)) {
            res.render("timeout/mapa", { titulo: "Mapa de Time-Out", usuario: u, msg: null });
        } else if (lat > -19.714009 ||
            lat < -25.360810 ||
            lng > -44.153793 ||
            lng < -53.170575) {
            res.render("timeout/mapa", { titulo: "Mapa de Time-Out", usuario: u, msg: "Por favor, especifique um ponto dentro do Estado de SP." });
        } else {
            res.render("timeout/alterar", { titulo: "Criar Time-Out", usuario: u, lat: lat, lng: lng, item: null });
        }
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect("/acesso");
	} else {
		res.render("timeout/listar", { titulo: "Gerenciar Time-Out", usuario: u });
	}
}));

export = router;
