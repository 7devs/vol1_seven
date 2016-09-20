var app = require('express')(),
    bdp = require('body-parser');

app.use(bdp.urlencoded({
    extended: false
}));

app.use('/user', require('./lib/routers/user'));
app.use('/album', require('./lib/routers/album'));

app.use('/*', function(req, res, next) {
    res.status(404).send('Not Found...');
});

app.listen(3000, function() {
    console.log('--== Homework Demo ==--');
});
