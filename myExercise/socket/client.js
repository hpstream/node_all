/**
 * net 模块使用 client
 *
 */

var net = require('net');

var socket = net.connect({port:30000,host:'192.168.0.119'},(err)=>{
	if(err) throw err;
	console.log('连接成功');


})

socket.on('data',(data) =>{
	console.log('\n'+data.toString());
})
//读取控制台的数据
process.stdin.on('data',(chunk) =>{

	socket.write(chunk.toString().trim())

})



