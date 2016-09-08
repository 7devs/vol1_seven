// 定义工具方法
function printDate() {
    var d = new Date();
    console.log(d.toString());
}

function printLine() {
    console.log('---------------------------------------');
}

// 对外开放接口
module.exports.printDate = printDate;
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
