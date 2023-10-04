const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const create = require('./paths/create');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create user route starts .......

app.post('/create', (req, res) => {

    const query = req.query;

    const body = req.body;

    console.log(body, query);

    let valid = create.validateinfo(body);

    if (valid !== true) {

        res.json(valid);

    }

    res.json([body, query]);

});

// create user route ends .......

app.listen(port, () => { console.log(`app listening on port ${port}!`) });