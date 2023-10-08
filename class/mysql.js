const mysql = require("mysql");

let dbinfo = {
    host: "localhost",
    user: "root",
    password: "",
    database: "usermicroservice"
};

let conn = mysql.createConnection(dbinfo);

conn.connect(err => { if (err) throw err; });

const sql = {

    dbinfo: dbinfo,
    dbconn: conn,
    dbinsert: async function (table, item) {

        return new Promise((resolve, reject) => {

            this.dbconn.query(`INSERT INTO ${table} SET ?`, item, (err, res) => {

                if (err) reject(false);

                resolve(res.insertId);

            });

        });

    },
    dbselect: async function (table, item = 1, column = "*", limit = 1, offset = 0) {

        return new Promise((resolve, reject) => {

            this.dbconn.query(`SELECT ${column} FROM ${table} WHERE ? LIMIT ${limit} OFFSET ${offset}`, item, (err, res) => {

                if (err) reject(false);

                if (res.length) {

                    resolve(res);

                } else {

                    resolve(false);

                }

            });

        });

    },
    dbdelete: async function (table, item = 1, column = "*", limit = 1, offset = 0) {

        return new Promise((resolve, reject) => {

            this.dbconn.query(`DELETE FROM ${table} WHERE ? LIMIT ${limit} OFFSET ${offset}`, item, (err, res) => {

                if (err) reject(false);

                resolve(true);

            });

        });

    }

};
module.exports = sql;