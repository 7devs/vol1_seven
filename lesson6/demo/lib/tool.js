/* 自定义包，一般放在项目目录下的 lib 文件夹中 */
// 定义工具方法
function printDate() {
//------ ---------
// 关键字   方法名
    var d = new Date();
    console.log(d.toString());
}

function printLine() {
    console.log('---------------------------------------');
}

// 对外开放接口
module.exports.printDate = printDate;
//------------ ---------   ---------
//   固定写法   对外方法名    内部方法名
module.exports.printLine = printLine;

/*
也可以写成这样：

module.exports.printDate = function () {
    var d = new Date();
    console.log(d.toString());
}

module.exports.printLine = function () {
    console.log('---------------------------------------');
}
*/
