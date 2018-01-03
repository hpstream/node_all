/**
 * Created by hp on 2018-01-02.
 */


var path = require('path')
var http = require('http');
var fs = require('fs');
//网络爬虫的基本原理
http.get('http://m10.music.126.net/20180102193840/2477f47cda62dd9711220454f70e4d52/ymusic/f92c/217d/0b04/dcd03bbe6fa0d90d9c6558b16a95f234.mp3',(res) =>{

	var data = "";
	res.setEncoding('binary');  //图片都是资源必须当成二进制下载
	
	// res.on('data',(chunk) =>{
	// 	data += chunk;
	//
	// })

	// res.on('end',function () {
	// 	fs.writeFile('rrd.mp3',data,'binary',function (err) { //以二进制写文件
	// 		if(err){
	// 			console.log("down fail");
	// 		}
	// 		console.log("down success");
	//
	// 	})
	//
	// })

})

