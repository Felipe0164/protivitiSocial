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
router.all("/", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Usuario.cookie(req);
    if (!u) {
        let mensagem = null;
        if (req.body.login || req.body.senha) {
            [mensagem, u] = yield Usuario.efetuarLogin(req.body.login, req.body.senha, res);
            if (mensagem)
                res.render("home/login", { layout: "layout-externo", mensagem: mensagem });
            else
                res.render("home/index", { usuario: u });
        }
        else {
            res.render("home/login", { layout: "layout-externo", mensagem: null });
        }
    }
    else {
        res.render("home/index", { usuario: u });
    }
})));
router.get("/acesso", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Usuario.cookie(req);
    if (!u) {
        res.redirect("/");
    }
    else {
        res.render("home/acesso", { titulo: "Sem Permissão", usuario: u });
    }
})));
router.get("/perfil", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Usuario.cookie(req);
    if (!u) {
        res.redirect("/");
    }
    else {
        res.render("home/perfil", { titulo: "Meu Perfil", usuario: u });
    }
})));
router.get("/logout", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let u = yield Usuario.cookie(req);
    if (u)
        yield u.efetuarLogout(res);
    res.redirect("/");
})));
module.exports = router;
//# sourceMappingURL=home.js.map