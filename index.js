const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const create = require('./paths/create');
const login = require("./paths/login");
const logout = require("./paths/logout");
const verifyuser = require('./paths/verifyuser');
const verifylogin = require('./paths/verifylogin');
const updateuser = require('./paths/updateuser');
const updatepass = require('./paths/updatepass');
const kycadd = require("./paths/kycadd.js");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create user route starts .......

app.post('/user/create', create.handler);

app.post('/user/login', login.handler);

app.post('/user/logout', logout.handler);

app.get('/user/verifyuser/:token', verifyuser.handler);

app.get('/user/verifylogin/:logid', verifylogin.handler);

app.post('/user/updateuser/:logid',updateuser.handler);

app.post('/user/updatepasslink',updatepass.handleemail);

app.post('/user/kyc/add/:logid',kycadd.handler);


// create user route ends .......

app.listen(port, () => { console.log(`app listening on port ${port}!`) });