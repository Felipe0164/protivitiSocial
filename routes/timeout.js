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
const Usuario = require("../models/usuario");
const router = express.Router();
router.all("/mapa", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("timeout/mapa", { titulo: "Mapa de Time-out", usuario: u });
    }
})));
router.all("/criar", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("timeout/criar", { titulo: "Criar Time-Out", usuario: u });
    }
})));
router.get("/listar", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Usuario.cookie(req);
    if (!u || !u.admin) {
        res.redirect("/acesso");
    }
    else {
        res.render("timeout/listar", { titulo: "Gerenciar Time-Out", usuario: u });
    }
})));
module.exports = router;
//# sourceMappingURL=timeout.js.map