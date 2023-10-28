let sql = require('../class/mysql');
let config = require("../config/config");
let bcrypt = require('bcrypt');
let create = require('./create');

let updatepass = {

    validateemail: function (info) {

        let valid = true;

        let message = "";

        if (!info.hasOwnProperty('email')) {

            valid = false;

            message = "Permission Denied";

        } else if (!create.regEmail.test(info.email)) {

            valid = false;

            message = "Invalid Email";

        }

        return (valid) ? (valid) : ({

            status: valid,
            message: message

        });

    },

    validatepass: function (info) {

        let valid = true;

        let message = "";

        if (!info.hasOwnProperty('password')) {

            valid = false;

            message = "Permission Denied";

        } else if (!create.regPassword.test(info.password)) {

            valid = false;

            message = "Invalid Password (password must be at least eight characters that contain at least one lowercase letter, one uppercase letter, and one digit)"
        }

        return (valid) ? (valid) : ({

            status: valid,
            message: message

        });

    },

    handleemail: async function (req, res) {

        const body = req.body;

        console.log(body);

        let valid = updatepass.validateemail(body);

        if (valid !== true) {

            res.statusCode = 404;

            res.json(valid);

        } else {

            let email_used = await sql.dbselect(`users`, { 'email': body.email }, "*");

            if (email_used === false) {

                res.statusCode = 404;

                res.json({

                    status: false,
                    message: "Email Not Registered"

                });

            } else {

                userid = email_used[0].id;

                await sql.dbinsert(`verify`, { token: config.makeid(10), userid: userid, why: "pass" });

                user = await config.userinfo({ id: userid });

                res.statusCode = 200;

                res.json({

                    status: valid,
                    message: "Create Update Link Success",
                    data: {
                        user: user
                    }
                });

            }

        }

    },

    handlepass: async function (req, res) {

        const params = req.params;

        let valid = true;

        let message = "";

        let user = false;

        console.log(params);

        let verify = await sql.dbselect('verify', params, "userid");

        if (verify == false) {

            res.statusCode = 404;

            valid = false;

            message = "Invalid Token";

            let result = {

                status: valid,
                message: message

            }

            res.json(result);

        } else {

            const body = req.body;

            console.log(body);

            let valid = updatepass.validatepass(body);

            if (valid !== true) {

                res.statusCode = 404;

                res.json(valid);

            } else {

                let userid = verify[0]['userid'];

                console.log(userid);

                let encryptedPassword = await bcrypt.hash(body.password, create.saltRounds);

                body.password = encryptedPassword;

                await sql.dbupdate(`users`, { id: userid }, body);

                await sql.dbdelete('verify', params);

                user = await config.userinfo({ id: userid });

                res.statusCode = 200;

                res.json({

                    status: valid,
                    message: "Update Password Success",
                    data: {
                        user: user
                    }
                });

            }

        }

    }

}


module.exports = updatepass;