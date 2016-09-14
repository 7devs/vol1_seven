/* 定义变量 */
var app = require('express')(),
//  ---   -------  -------  --
// 变量名    载入     包名    执行
//                          默认方法（返回 app 对象）
    bodyParser = require('body-parser'),
    tool = require('./lib/tool.js');
//  ----   -------  -------------
// 变量名    载入      私有包路径

/* 中间件 */
app.use(
//  ---
// express 框架的 app 对象引用中间件的方法
    bodyParser.urlencoded({
//  ---------- ----------
//   中间件之一  body-parser 返回中间件的方法
        extended: false
    })
);

/* 路由表 */
// 将要处理的逻辑交给具体的包来执行
app.use('/api', require('./lib/routers/api'));
//       ----   ----------------------------
//       路径       处理该路径下所有逻辑的包
// （一般与模块关联）
app.use('/news', require('./lib/routers/news'));

// 处理上面所列路由表之外的情况
app.use('/*', function(request, response, next) {
//                     -------  --------
//                       请求      返回
    response.status(404).send('Not Found.');
//  -------- ------ ---  ----  ----------
//    返回     状态   码   发送     内容
});

app.listen(3000, function() {
//  ------ ----
//   监听   端口
    tool.printLine();
    tool.printDate();
    tool.printLine();
    console.log('lesson 6 demo.');
    tool.printLine();
});
