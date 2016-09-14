// 引入 Express 的路由处理
var router       = require('express').Router()
//  ------         -------  -------   --------
// 路由对象变量名      载入     框架      获得路由对象的方法
    userModel    = require('../models/user.js');
//  ---------      ---------------------------
// 用户数据变量名     通过路径载入自定义数据模型

/* 路由（业务）逻辑处理 */
router.route('/')
//---- ----- ---
// 对象.方法  路径
    .get(function(req, res, next) {
//  ---- -------- ---  ---
//请求方式 处理方法 请求  返回
        res.status(200).send({
            msg: 'api is ok.'
        });
    });

router.route('/user')
    .get(function(req, res, next) {
        res.status(200).send(userModel);
    });

router.route('/user/:key')
// ---------  ----- ----
//  路由方法   路径   变量
    .get(function(req, res, next) {
        var keyName = req.params.key;
//          -------   ---------- ---
//      保存路径变量    所有路径变量.之一
        if(userModel[keyName]) {
//         --------- -------
//           对象名    属性名
/*
====================================
假定有一个对象：
var obj = {
    hello: 'world',
    x: 'X Value'
};

访问对象属性（或方法）有两种方式：
1. obj.hello
2. obj['hello']
都将得到 'world' 这个值

假设有个变量：
var keyName = 'hello';
此时要用变量作为键名访问对象属性，则只有一种方法：
obj[keyName]
也将得到值 'world'，因为变量 keyName 都值是 'hello'

结合上面对象的定义，思考（测试）下面三行代码的返回值：
var x = 'hello';
console.log(obj[x]);
console.log(obj['x']);
====================================
*/
            res.status(200).send(userModel[keyName]);
        } else {
            res.status(404).send('数据不存在。');
        }
    })

/* 对外开放整个 router 对象，该对象中包含路由中间件所需方法 */
module.exports = router;
