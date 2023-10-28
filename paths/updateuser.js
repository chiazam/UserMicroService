let sql = require('../class/mysql');
let config = require("../config/config");
let create = require('./create');

let updateuser = {

    validateinfo: function (info) {

        let valid = true;

        let message = "";

        if (!info.hasOwnProperty('fullname') && !info.hasOwnProperty('type')) {

            valid = false;

            message = "Permission Denied";

        } else if (info.hasOwnProperty('fullname')&&!create.regFullName.test(info.fullname)) {

            valid = false;

            message = "Invalid Full Name";

        } else if (info.hasOwnProperty('type')&&!create.userTypes.includes(info.type)) {

            valid = false;

            message = "Invalid Type (type must be either 'seller' or 'buyer'";

        }

        return (valid) ? (valid) : ({

            status: valid,
            message: message

        });

    },

    handler: async function (req, res) {

        const params = req.params;

        let valid = true;

        let message = "";

        let user = false;

        console.log(params);

        let verify = await sql.dbselect('users', params, "id");

        if (verify == false) {

            res.statusCode = 404;

            valid = false;

            message = "Invalid Logid";

        } else {

            const body = req.body;

            console.log(body);

            valid = create.validateinfo(body);

            if (valid !== true) {

                res.statusCode = 404;

                res.json(valid);

            } else {

                await sql.dbupdate(`users`, params, body);

                user = await config.userinfo(params);

                res.statusCode = 200;

                res.json({

                    status: valid,
                    message: "Create User Success",
                    data: {
                        user: user
                    }
                });

            }

        }

    }

}


module.exports = updateuser;