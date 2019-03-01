import express = require("express");

export = function jsonRes(res: express.Response, statusCodeFalha: number, resultado: string): void {
	let r: number;
	if (!resultado) {
		res.sendStatus(204);
	} else if (!isNaN(r = parseInt(resultado)) && r.toString() === resultado) {
		res.json(r);
	} else {
		res.statusCode = statusCodeFalha;
		res.json(resultado);
	}
}
