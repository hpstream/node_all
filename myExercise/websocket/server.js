/**
 * 使用socket.io 完成及时通讯
 */

let express = require('express');
let app = express();
//
// //添加静态文件
app.use('/',express.static('./static'));
//
//
app.get('/',(req,res) =>{
	res.sendFile(__dirname + '/static/client.html');
})
//
//
var server = require('http').createServer(app);
let io = require('socket.io')(server);

var clients = [];
io.on("connection", function(socket){
	clients.push(socket);
	// socket.send({count:clients.length});
	broadcast();
	socket.on('message',function(data){
		//收到消息
		broadcast(data);

	});
	socket.on('disconnect',function () {
		clients = clients.splice(clients.indexOf(socket)-1, 1)
		console.log(`${socket.id} 离开了`);
		console.log(clients);
		broadcast();

	})
});

function broadcast(data){
	for(var i=0;i<clients.length;i++){
		clients[i].send({count:clients.length,info:data});
	}
}
server.listen(8080);



