"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Parcerias = require("../models/parcerias");
const router = express.Router();
router.all("/criar", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Parcerias.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("negocios/parcerias/alterar", { titulo: "Criar nova parceria", usuario: u });
    }
})));
router.all("/alterar", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Parcerias.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        let id = parseInt(req.query["id"]);
        let item = null;
        if (isNaN(id) || !(item = yield Parcerias.obter(id)))
            res.render("shared/nao-encontrado");
        else
            res.render("negocios/parcerias/alterar", { titulo: "Editar Parceria", usuario: u });
    }
})));
router.get("/listar", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Parcerias.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("negocios/parcerias/listar", { titulo: "Visualizar Parceria", usuario: u });
    }
})));
module.exports = router;
//# sourceMappingURL=parcerias.js.map