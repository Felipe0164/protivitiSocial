import mysql = require("mysql");

export = class SqlPool {
	// https://www.npmjs.com/package/mysql
	public static readonly pool = mysql.createPool({
		connectionLimit: 30,
		host: "129.213.197.48", //"myprotiviti.c1hpz28jfdku.us-east-2.rds.amazonaws.com",
		port: 3306,
		user: "root", //"myprotiviti",
		password: "myfafinha",
		database: "protivitiSocial" //"myprotiviti"
	});
}
