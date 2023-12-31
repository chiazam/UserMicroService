let sql = require('../class/mysql');
let config = require("../config/config");
let bcrypt = require('bcrypt');

let create = {

    saltRounds: 10,

    regFullName: /^[a-zA-Z]+ [a-zA-Z]+$/,

    regEmail: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,

    regPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,

    userTypes: ["seller", "buyer"],

    validateinfo: function (info) {

        let valid = true;

        let message = "";

        if (!info.hasOwnProperty('fullname') || !info.hasOwnProperty('email') || !info.hasOwnProperty('password') || !info.hasOwnProperty('type')) {

            valid = false;

            message = "Permission Denied";

        } else if (!this.regFullName.test(info.fullname)) {

            valid = false;

            message = "Invalid Full Name";

        } else if (!this.regEmail.test(info.email)) {

            valid = false;

            message = "Invalid Email";

        } else if (!this.regPassword.test(info.password)) {

            valid = false;

            message = "Invalid Password (password must be at least eight characters that contain at least one lowercase letter, one uppercase letter, and one digit)"
        } else if (!this.userTypes.includes(info.type)) {

            valid = false;

            message = "Invalid Type (type must be either 'seller' or 'buyer'";

        }

        return (valid) ? (valid) : ({

            status: valid,
            message: message

        });

    },

    handler: async function (req, res) {

        const body = req.body;

        console.log(body);

        let valid = create.validateinfo(body);

        if (valid !== true) {

            res.statusCode = 404;

            res.json(valid);

        } else{

            let email_used = await sql.dbselect(`users`,{'email':body.email}, "*");

            if(email_used !== false){

                res.statusCode = 404;

                res.json({

                    status: false,
                    message: "Email Already Used"
    
                });

            }else {

                let encryptedPassword = await bcrypt.hash(body.password, create.saltRounds);

                body.password = encryptedPassword;

                let lastid = await sql.dbinsert(`users`, body);

                await sql.dbinsert(`verify`, { token: config.makeid(10), userid: lastid, why: "user" });

                user = await config.userinfo({ id: lastid });

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


module.exports = create;