let sql = require('../class/mysql');
const config = {

    makeid: (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    },

    userinfo: async function (item) {

        let user = await sql.dbselect('users', item);

        console.log(user);

        if(user===false) {return ({'none':true})};

        user = user[0];

        delete user.password;

        let verify = await sql.dbselect('verify', {userid: user.id}, "*");

        user.verified = (verify===false)?(true):(false);

        console.log(user);

        return user;

    }

};
module.exports = config;