require('./model/mongoose.js');
const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');

const routes = require('./routes/index');
const utils = require('./utils/index');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(req, res, next) {
    // var err = new Error('Not Found');
    // const err = {
    //     "status":404,
    //     "reason": "Not Found"
    // }
    // err.status = 404;
    utils.resp.errResponse(err, res);
    next(err);
});

const server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('sc0ville app listening at http://%s:%s', host, port);

});

module.exports = app;
