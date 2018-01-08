/**
 * Created by hp on 2018-01-04.
 */

var url = require('url');
var path = require('path');
var querystring = require('querystring');
var util = require('util');
var child_process = require('child_process');
var str = url.parse('http://www.baidu.com/news',true,false);


// var isurl1 = url.resolve('http://example.com/', '/one')  // 'http://example.com/one'
// var isurl2 = url.resolve('http://example.com/one/', '/two') // 'http://example.com/two'
//
// console.log(isurl1);
//
// console.log(isurl2);

var data = path.normalize('/path///normalize/hi/..');
console.log(data);

//将json 转成字符串
var result = querystring.stringify({foo:'bar',cool:['xux', 'yys']});

console.log(result)

//判断是否是数组
var s =util.isArray([]);
//判断是否是日期类型
//util.isDate(object);
//判断是否为正则类型
//util.isRegExp(object);

console.log(s);

var child = child_process.spawn('ping', ['127.0.0.1'], {encoding: 'utf-8'});
child.stdout.on('data', function(data) {
	console.log(data.toString());
});