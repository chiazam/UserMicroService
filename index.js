const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create', (req, res) => {

    const query = req.query;

    const body = req.body;

    // Output the book to the console for debugging
    console.log(body, query);

    res.json([body, query]);

});

app.listen(port, () => { console.log(`app listening on port ${port}!`) });