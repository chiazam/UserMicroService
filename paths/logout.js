const { NULL } = require('mysql/lib/protocol/constants/types');
let sql = require('../class/mysql');
let config = require("../config/config");

let logout = {

    validateinfo: function (info) {

        let valid = true;

        let message = "";

        if (!info.hasOwnProperty('logid')) {

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

        let valid = logout.validateinfo(body);

        if (valid !== true) {

            res.statusCode = 404;

            res.json(valid);

        }else{

            let valid = true;

            let message = "";

            let user = false;

            let verify = await sql.dbselect('users', body, "id");

            if(verify == false){

                res.statusCode = 404;

                valid = false;

                message = "Invalid Logid";

            }else{

                let userid = verify[0]['id'];

                console.log(userid);

                await sql.dbupdate(`users`, { id: userid }, { logid: 'NULL'});

                user = await config.userinfo({ id: userid });

                res.statusCode = 200;

                valid = true;

                message = "Logout Success";

            }
        
            let result = {

                status: valid,
                message: message,
                data:(user === false)?(undefined):({ user: user})
        
            }
        
            res.json(result);

        }

    }

}


module.exports = logout;