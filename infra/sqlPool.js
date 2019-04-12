"use strict";
var _a;
const mysql = require("mysql");
module.exports = (_a = class SqlPool {
    },
    // https://www.npmjs.com/package/mysql
    _a.pool = mysql.createPool({
        connectionLimit: 30,
        host: "129.213.197.48",
        port: 3306,
        user: "root",
        password: "myfafinha",
        database: "protivitiSocial" //"myprotiviti"
    }),
    _a);
//# sourceMappingURL=sqlPool.js.map