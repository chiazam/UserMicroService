let sql = require('../class/mysql');
let config = require("../config/config");

let kycadd = {

    validateinfo: function (info) {

        let valid = true;

        let message = "";

        if (!info.hasOwnProperty('userid') || !info.hasOwnProperty('phone') || !info.hasOwnProperty('address') || !info.hasOwnProperty('verifyNo') || !info.hasOwnProperty('verifyType') || !info.hasOwnProperty('bankName') || !info.hasOwnProperty('AccNo') || !info.hasOwnProperty('AccName')) {

            valid = false;

            message = "Permission Denied";

        }

        return (valid) ? (valid) : ({

            status: valid,
            message: message

        });

    },

    handler: async function (req, res) {

        const body = req.body;

        console.log(body);

        let valid = kycadd.validateinfo(body);

        if (valid !== true) {

            res.statusCode = 404;

            res.json(valid);

        } else {

            let is_user = await sql.dbselect(`users`, { 'userid': body.userid }, "id");

            if (is_user !== false) {

                res.statusCode = 404;

                res.json({

                    status: false,
                    message: "User not found"

                });

            } else {
                
                let verify = await sql.dbselect('users', params, "id");

            if (verify == false) {
    
                res.statusCode = 404;
    
                valid = false;
    
                message = "Invalid Logid";
    
                let result = {
    
                    status: valid,
                    message: message
    
                }
    
                res.json(result);
    
            } else {

                    let lastid = await sql.dbinsert(`kyc`, body);

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

}


module.exports = kycadd;