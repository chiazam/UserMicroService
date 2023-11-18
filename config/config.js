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

        if (user === false) { return ({ 'none': true }) };

        user = user[0];

        delete user.password;

        let verify = await sql.dbselect('verify', { userid: user.id }, "*");

        user.verified = (verify === false) ? (true) : (false);

        user.kyc = await config.kycinfo({ userid: user.id });

        console.log(user);

        return user;

    },

    kycinfo: async function (item) {

        let kyc = await sql.dbselect('kyc', item);

        console.log(kyc);

        if (kyc === false) { return ({ 'none': true }) };

        kyc = kyc[0];

        let kycVerify = await sql.dbselect('kyc_verify', { userid: kyc.userid });

        kyc.verified = (kycVerify === false) ? (true) : (false);

        if (kyc.verified === true) {

            kyc.verify = kycVerify;

        }

        return kyc;

    }

};
module.exports = config;