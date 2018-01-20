/**
 * Created by hp on 2018-01-18.
 */
var http = require('http');
const port = 12345;
var open = require("open");
var os=require('os')
var path =require('path');
var network = os.networkInterfaces()
var proxyUrl = 'localhost';
var server = http.createServer((req,ress) =>{
		const options = {
			hostname: proxyUrl,
			port: 3000,
			path: req.url,
			method: req.method,
	        headers:{
				referer : proxyUrl,
				COOKIE :'Your Cookie'
	        }
		};
	const reqs = http.request(options, (res) => {
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log(chunk);
			ress.write(chunk.toString('utf8'));
		});
		res.on('end', () => {
			ress.end();
			console.log('响应中已无数据。');
		});
	});

	reqs.on('error', (e) => {
		console.error(`请求遇到问题: ${e.message}`);
	});

	reqs.end();
})
//
// function proxy(req,res) {
// 	const options = {
// 		hostname: proxyUrl,
// 		port: 80,
// 		path: req.url,
// 		method: req.method,
// 		headers: req.headers
// 	};
//
// 	var isreq = http.request(options, (response) => {
// 		response.setEncoding('utf8');
// 		response.on('data', (chunk) => {
// 			res.write(chunk)
// 		});
// 		response.on('end', () => {
// 			res.end();
// 			resolve();
// 		});
// 		response.on('error', () => {
// 			reject();
// 		});
// 	});
// 	isreq.end();
//
//
// }
server.listen(port, function (err) {
	if(err) throw  err;
	open(`http://localhost:${port}`,'chrome');
})





