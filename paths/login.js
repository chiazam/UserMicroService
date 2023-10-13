let sql = require('../class/mysql');
let config = require("../config/config");
let bcrypt = require('bcrypt');

let login = {

    regEmail: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,

    regPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,

    validateinfo: function (info) {

        let valid = true;

        let message = "";
        
        if (!this.regEmail.test(info.email)) {

            valid = false;

            message = "Invalid Email";

        } else if (!this.regPassword.test(info.password)) {

            valid = false;

            message = "Invalid Password (password must be at least eight characters that contain at least one lowercase letter, one uppercase letter, and one digit)"
        }

        return (valid) ? (valid) : ({

            status: valid,
            message: message

        });

    },

    handler: async function (req, res) {

        const body = req.body;

        console.log(body);

        let valid = login.validateinfo(body);

        if (valid !== true) {

            res.statusCode = 404;

            res.json(valid);

        } else{

            let email_used = await sql.dbselect(`users`, {'email':body.email}, "*");

            if(email_used === false){

                res.statusCode = 404;

                res.json({

                    status: false,
                    message: "Email Not Registered"
    
                });

            }else {

                let isPassword = await bcrypt.compare(body.password, email_used[0]['password']);

                if(isPassword === false){

                    res.statusCode = 404;
    
                    res.json({
    
                        status: false,
                        message: "Incorrect Password"
        
                    });
    
                }else{

                    await sql.dbupdate(`users`, {'email':body.email}, { logid: config.makeid(10)});

                    user = await config.userinfo({'email':body.email});

                    res.statusCode = 200;

                    res.json({

                        status: valid,
                        message: "Login Success",
                        data: {
                            user: user
                        }
                    });

                }

            }

        }

    }

}

module.exports = login;