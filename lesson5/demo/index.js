// 引入 express 包
var express = require('express')
    bodyParser = require('body-parser'),
    app = express();

// post 数据解析
app.use(bodyParser.urlencoded({
    extended: false
}));

// 路由表
// GET /
app.get('/', function(req, res, next) {
    res.send('index');
    next();
});

// POST /test
app.post('/test', function(req, res, next) {
    res.status(200).send({
        method: 'POST',
        path: req.path,
        body: req.body,
        query: req.query
    });
    next();
});

// GET /test
app.get('/test', function(req, res, next) {
    res.send('test.');
    next();
});

// DELETE /user/:id
app.delete('/user/:id', function(req, res, next) {
    console.log('我要删除 ID 为', req.params.id, '的用户。');
    // 判断是否为管理员
    if(req.query.admin === '1') {
        console.log('删除成功。');
        res.status(200).end();
    } else {
        console.log('删除失败。');
        res.status(403).end();
    }
});

// GET /user/:name
app.get('/user/:name', function(req, res, next) {
    res.send({
        user: req.params.name
    });
});

app.listen(3000, function() {
    console.log('demo running...');
});
