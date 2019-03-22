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
const mysql = require("mysql");
module.exports = (_a = class Sql {
        static conectar(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    Sql.pool.getConnection((error, connection) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        let sql = new Sql();
                        sql.connection = connection;
                        sql.transacaoAberta = false;
                        sql.linhasAfetadas = 0;
                        try {
                            callback(sql)
                                .then(() => {
                                if (sql.transacaoAberta) {
                                    sql.transacaoAberta = false;
                                    connection.rollback(error => {
                                        connection.release();
                                        if (error)
                                            reject(error);
                                        else
                                            resolve();
                                    });
                                }
                                else {
                                    connection.release();
                                    resolve();
                                }
                            }, reason => {
                                if (sql.transacaoAberta) {
                                    sql.transacaoAberta = false;
                                    connection.rollback(error => {
                                        connection.release();
                                        if (error)
                                            reject(error);
                                        else
                                            reject(reason);
                                    });
                                }
                                else {
                                    connection.release();
                                    reject(reason);
                                }
                            });
                        }
                        catch (e) {
                            if (sql.transacaoAberta) {
                                sql.transacaoAberta = false;
                                connection.rollback(error => {
                                    connection.release();
                                    if (error)
                                        reject(error);
                                    else
                                        reject(e);
                                });
                            }
                            else {
                                connection.release();
                                reject(e);
                            }
                        }
                    });
                });
            });
        }
        query(queryStr, valores = null) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let terminar = (error, results, fields) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        this.linhasAfetadas = parseInt(results.affectedRows);
                        resolve(results);
                    };
                    if (valores)
                        this.connection.query(queryStr, valores, terminar);
                    else
                        this.connection.query(queryStr, terminar);
                });
            });
        }
        scalar(queryStr, valores = null) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let terminar = (error, results, fields) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        this.linhasAfetadas = parseInt(results.affectedRows);
                        let r;
                        if (!results || !(r = results[0]))
                            resolve(null);
                        for (let i in r) {
                            resolve(r[i]);
                            return;
                        }
                        resolve(null);
                    };
                    if (valores)
                        this.connection.query(queryStr, valores, terminar);
                    else
                        this.connection.query(queryStr, terminar);
                });
            });
        }
        beginTransaction() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    if (this.transacaoAberta) {
                        reject(new Error("Já existe uma transação aberta"));
                        return;
                    }
                    this.connection.beginTransaction(error => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        this.transacaoAberta = true;
                        resolve();
                    });
                });
            });
        }
        commit() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    if (!this.transacaoAberta) {
                        resolve();
                        return;
                    }
                    this.connection.commit(error => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        this.transacaoAberta = false;
                        resolve();
                    });
                });
            });
        }
        rollback() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    if (!this.transacaoAberta) {
                        resolve();
                        return;
                    }
                    this.connection.rollback(error => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        this.transacaoAberta = false;
                        resolve();
                    });
                });
            });
        }
    },
    // https://www.npmjs.com/package/mysql
    _a.pool = mysql.createPool({
        connectionLimit: 30,
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "protivitiSocial"
    }),
    _a);
//# sourceMappingURL=sql.js.map