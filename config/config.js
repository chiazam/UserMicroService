const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        user: "root",
        password: "",
        database: "usermicroservice",
        connectTimeout: 60000
    }
};
module.exports = config;