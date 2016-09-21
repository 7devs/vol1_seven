var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/wxapi', require('./lib/routers/wxapi'));

app.get('/*', function(req, res) {
    res.status(404).send('NOT FOUND.');
});

app.listen(8777, function(err) {
    console.log('wxtest...');
});
