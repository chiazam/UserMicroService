const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const create = require('./paths/create');

const verifyuser = require('./paths/verifyuser')

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create user route starts .......

app.post('/user/create', create.handler);

app.post('/user/verify/:token', verifyuser.handler);

// create user route ends .......

app.listen(port, () => { console.log(`app listening on port ${port}!`) });