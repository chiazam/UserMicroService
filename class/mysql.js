const mysql = require("mysql");

const sql = {

    dbinfo: {
        host: "localhost",
        user: "root",
        password: "",
        database: "usermicroservice"
    },
    dbconn: function () {

        let conn = mysql.createConnection(this.dbinfo);

        conn.connect(err => { if (err) throw err; });

        return conn;

    },
    dbend: function (conn) {

        conn.end(err => { if (err) throw err; });

    },
    dbinsert: function (table, item, result = false) {

        let conn = this.dbconn();

        let lastid = conn.query(`INSERT INTO ${table} SET ?`, item, (err, res) => {

            if (err) throw err;

            return res.insertId;
        });

        this.dbend();

        return lastid;

    }

};
module.exports = sql;