// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const fleetAPI = require("./src/api/fleet");

let instance = {
    ip: '0.0.0.0',
    port: 3001
};

// defining the Express app
const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: false }));

// enabling CORS for all requests
app.use(cors());

app.get('/', function (req, res) {
    console.log('hello world');
});

app.use(`/api/v1/`, function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/api/v1/fleet', fleetAPI);

// starting the server
app.listen(instance.port, instance.ip, function () {
    console.log(`Server listening on ${instance.ip}:${instance.port}`);
});

module.exports = app
