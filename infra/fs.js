"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const Arquivo = require("./arquivo");
module.exports = (_a = class FS {
        static ajustarCaminhoRelativo(caminhoRelativo, barrasValidas) {
            if (!caminhoRelativo ||
                caminhoRelativo.charAt(0) === "." ||
                caminhoRelativo.indexOf("..") >= 0 ||
                caminhoRelativo.indexOf("*") >= 0 ||
                caminhoRelativo.indexOf("?") >= 0 ||
                (!barrasValidas && (caminhoRelativo.indexOf("\\") >= 0 || caminhoRelativo.indexOf("/") >= 0)))
                throw new Error("Caminho inválido");
            return ((path.sep === "/") ?
                caminhoRelativo.replace(FS.barraInvertida, "/") :
                caminhoRelativo.replace(FS.barra, "\\"));
        }
        static criarDiretorio(caminhoRelativo) {
            return __awaiter(this, void 0, void 0, function* () {
                caminhoRelativo = FS.ajustarCaminhoRelativo(caminhoRelativo, true);
                return new Promise((resolve, reject) => {
                    try {
                        fs.mkdir(path.join(FS.appPath, caminhoRelativo), 0o777, (err) => {
                            if (err)
                                reject(err);
                            else
                                resolve();
                        });
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        static listarDiretorio(caminhoRelativo) {
            return __awaiter(this, void 0, void 0, function* () {
                caminhoRelativo = FS.ajustarCaminhoRelativo(caminhoRelativo, true);
                return new Promise((resolve, reject) => {
                    try {
                        let dir = path.join(FS.appPath, caminhoRelativo);
                        fs.readdir(dir, (err, files) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (!files || !files.length) {
                                resolve([]);
                                return;
                            }
                            let arquivos = new Array(files.length);
                            function processarProximo(i) {
                                try {
                                    if (i >= arquivos.length) {
                                        resolve(arquivos);
                                        return;
                                    }
                                    fs.stat(path.join(dir, files[i]), (err, stats) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }
                                        let a = new Arquivo();
                                        a.nome = files[i];
                                        a.tamanho = stats.size;
                                        a.modificacaoMs = stats.mtimeMs;
                                        // http://momentjs.com/docs/#/displaying/
                                        a.modificacao = moment(stats.mtime).locale("pt-br").format("DD/MM/YYYY HH:mm");
                                        arquivos[i] = a;
                                        processarProximo(i + 1);
                                    });
                                }
                                catch (e) {
                                    reject(e);
                                }
                            }
                            processarProximo(0);
                        });
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        static excluirArquivosEDiretorio(caminhoRelativo) {
            return __awaiter(this, void 0, void 0, function* () {
                caminhoRelativo = FS.ajustarCaminhoRelativo(caminhoRelativo, true);
                return new Promise((resolve, reject) => {
                    try {
                        let dir = path.join(FS.appPath, caminhoRelativo);
                        fs.readdir(dir, (err, files) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            function excluirProximo(i) {
                                try {
                                    if (!files || i >= files.length) {
                                        fs.rmdir(dir, (err) => {
                                            if (err)
                                                reject(err);
                                            else
                                                resolve();
                                        });
                                        return;
                                    }
                                    fs.unlink(path.join(dir, files[i]), (err) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }
                                        excluirProximo(i + 1);
                                    });
                                }
                                catch (e) {
                                    reject(e);
                                }
                            }
                            excluirProximo(0);
                        });
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        static renomearArquivo(caminhoRelativoAtual, caminhoRelativoNovo) {
            return __awaiter(this, void 0, void 0, function* () {
                caminhoRelativoAtual = FS.ajustarCaminhoRelativo(caminhoRelativoAtual, true);
                caminhoRelativoNovo = FS.ajustarCaminhoRelativo(caminhoRelativoNovo, true);
                return new Promise((resolve, reject) => {
                    try {
                        fs.rename(path.join(FS.appPath, caminhoRelativoAtual), path.join(FS.appPath, caminhoRelativoNovo), (err) => {
                            if (err)
                                reject(err);
                            else
                                resolve();
                        });
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        static excluirArquivo(caminhoRelativo) {
            return __awaiter(this, void 0, void 0, function* () {
                caminhoRelativo = FS.ajustarCaminhoRelativo(caminhoRelativo, true);
                return new Promise((resolve, reject) => {
                    try {
                        fs.unlink(path.join(FS.appPath, caminhoRelativo), (err) => {
                            if (err)
                                reject(err);
                            else
                                resolve();
                        });
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
    },
    _a.appPath = path.dirname(require.main.filename),
    _a.barra = /\//g,
    _a.barraInvertida = /\\/g,
    _a);
//# sourceMappingURL=fs.js.map