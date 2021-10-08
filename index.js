// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.get('/', function(req,res) {
    console.log('hello world');
});


app.use(`/api/v1/`, function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// defining an endpoint to return all ads
const fleet = { "jaguar": 200, "rover": 900, "hybrid":500};

app.get('/api/v1/fleet/all', function(req,res) {
    res.status(200);
    res.send(fleet);
});


app.get('/api/v1/fleet/model/', function(req,res) {
});



// starting the server
app.listen(3500, instance.ip, function() {
    console.log(`Swagger listening on ${instance.ip}:${instance.port}`);
});


module.exports = app
