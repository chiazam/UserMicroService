let sql = require('../class/mysql');
let config = require("../config/config");

let verifylogin = {

    handler: async function (req, res) {

        const params = req.params;

        let valid = true;

        let message = "";

        let user = false;

        console.log(params);

        let verify = await sql.dbselect('users', params, "id");

        if(verify == false){

            res.statusCode = 404;

            valid = false;

            message = "Invalid Logid";

        }else{

            let userid = verify[0]['id'];

            console.log(userid);

            user = await config.userinfo({ id: userid });

            res.statusCode = 200;

            valid = true;

            message = "Verify Login Success";

        }
        
        let result = {

            status: valid,
            message: message,
            data:(user === false)?(undefined):({ user: user})
        
        }
        
        res.json(result);

    }

}


module.exports = verifylogin;