/**
 * 即时通讯模块
 */

//引入及时通讯模块
var io = require('socket.io');
//引入服务器框架
var express = require('express');
var http = require('http');
var app = express();

//引入静态文件
app.use(express.static('public'));

//添加路由
app.get('/',function(req,res){
	res.status(200).send('欢迎来到汇智网学习！');
});

var server = http.createServer(app);

var io = require('socket.io')(server);
io.on('connection',function(socket){
	console('我已经连接上了');
});

server.listen(8080);


//express也是的内部实现
// app.listen = function (port) {
// 	http.createServer(this).listen(port);
// };