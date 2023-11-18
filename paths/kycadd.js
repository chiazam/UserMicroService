let sql = require('../class/mysql');
let config = require("../config/config");

let kycadd = {

    kycTypes: ["national id", "driver licence", "passport"],

    validateinfo: function (info, params) {

        let valid = true;

        let message = "";

        if (!info.hasOwnProperty('phone') || !info.hasOwnProperty('address') || !info.hasOwnProperty('verifyNo') || !info.hasOwnProperty('verifyType') || !info.hasOwnProperty('bankName') || !info.hasOwnProperty('AccNo') || !info.hasOwnProperty('AccName') || !params.hasOwnProperty('logid')) {

            valid = false;

            message = "Permission Denied";

        } else if ((info.phone.trim()).length == 0 || (info.address.trim()).length == 0 || (info.verifyNo.trim()).length == 0 || (info.verifyType.trim()).length == 0 || (info.bankName.trim()).length == 0 || (info.AccNo.trim()).length == 0 || (info.AccName.trim()).length == 0) {

            valid = false;

            message = "Fill All Fields";

        }else if (!this.kycTypes.includes(info.verifyType)) {

            valid = false;

            message = "Invalid verifyType (type must be either 'national id', 'driver licence' or 'passport'";

        }

        return (valid) ? (valid) : ({

            status: valid,
            message: message

        });

    },

    handler: async function (req, res) {

        const body = req.body;

        const params = req.params;

        console.log(body);

        let valid = kycadd.validateinfo(body, params);

        if (valid !== true) {

            res.statusCode = 404;

            res.json(valid);

        } else {

            console.log(params);

            let verify = await sql.dbselect('users', params, "*");

            console.log(verify);

            if (verify === false) {

                res.statusCode = 404;

                res.json({

                    status: false,
                    message: "Invalid Logid"

                });

            } else {

                let userid = verify[0]['id'];

                let kycinfo = {userid:userid, ...body};

                console.log(kycinfo);

                await sql.dbinsert(`kyc`, kycinfo);

                user = await config.userinfo({ id: userid });

                res.statusCode = 200;

                res.json({

                    status: valid,
                    message: "Add KYC Successfull",
                    data: {
                        user: user
                    }
                });

            }

        }

    }

}


module.exports = kycadd;