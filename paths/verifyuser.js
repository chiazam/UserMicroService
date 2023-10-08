let sql = require('../class/mysql');
let config = require("../config/config");

let verifyuser = {

    validateinfo: function (info) {

        let valid = true;

        let message = "";

        if (!info.hasOwnProperty('token')) {

            valid = false;

            message = "Permission Denied";

        }

        return (valid) ? (valid) : ({

            status: valid,
            message: message

        });

    },

    handler: async function (req, res) {

        const params = req.params;

        console.log(params);

        let valid = verifyuser.validateinfo(params);

        if (valid !== true) {

            res.statusCode = 404;

            res.json(valid);

        } else {

            let encryptedPassword = await bcrypt.hash(body.password, create.saltRounds)

            body.password = encryptedPassword;

            let lastid = await sql.dbinsert(`users`, body);

            await sql.dbinsert(`verify`, { token: config.makeid(10), userid: lastid, why: "user" });

            let user = await sql.dbget('users', { id: lastid });

            delete user[0].password;

            res.statusCode = 200;

            res.json({

                status: valid,
                message: "Create User Success",
                data: {
                    user: user[0]
                }
            });

        }

    }

}


module.exports = verifyuser;