/**
 * 运用net模块编写服务器,完成数据包发送
 */

var net = require('net');

var server = net.createServer();
var clients = []; //存储连接的用户
server.on('connection',(client) =>{
	console.log(`${client.remoteAddress}:${client.remotePort}`+'连接到服务器');
	client.write(`${client.remoteAddress}:${client.remotePort}`+'进入到聊天室');
	clients.push(client);//
	client.on('data',(chunk) =>{
		boardcast(client,chunk)
	})
	client.on('error',()=>{
		clients = clients.splice(clients.indexOf(client), 1)
		console.log(`${client.remoteAddress}:${client.remotePort}`+'退出聊天室');
	}).on('end', () => {
		clients = clients.splice(clients.indexOf(client), 1)
		console.log(`${client.remoteAddress}:${client.remotePort}`+'退出聊天室');
	});
});

var port =30000;
server.listen(port,(err) =>{
	if(err) throw err;
	console.log(port+"服务正在被使用。");
})


//定义两种传输协议（boardcast,p2p）
var procotols = {
	boardcast:{procotol:'boardcast',from:"张三",message:"你好呀"},
	p2p:{procotol:"p2p",from:'张三',to:"李四",message:'我很好'}
}
//分别在客户端定义；两种协议
/*
*    var send = {
			 procotol: 'boardcast',
			 from: name,
			 message: input
			 };
		 send = {
		 procotol: 'p2p',
		 from: name,
		 to: temp[0],
		 message: temp[1]
		 };
* */

function boardcast(client,chunk) {
	for(var i=0;i<clients.length;i++){
		if(clients[i] != client){
			clients[i].write(chunk.toString().trim());
		}
	}
}

function p2p() {

}