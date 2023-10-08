let sql = require('../class/mysql');
let config = require("../config/config");

let verifyuser = {

    handler: async function (req, res) {

        const params = req.params;

        let valid = true;

        let message = "";

        let user = false;

        console.log(params);

        let verify = await sql.dbselect('verify', params, "userid");

        if(verify == false){

            res.statusCode = 404;

            valid = false;

            message = "Invalid Token";

        }else{

            let userid = verify[0]['userid'];

            console.log(userid);

            await sql.dbdelete('verify', params);

            console.log(userid);

            user = await config.userinfo({ id: userid });

            res.statusCode = 200;

            valid = true;

            message = "Verify User Success";

        }
        
        let result = {

            status: valid,
            message: message,
            data:(user === false)?(undefined):({ user: user})
        
        }
        
        res.json(result);

    }

}


module.exports = verifyuser;