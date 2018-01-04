/**
 * Created by hp on 2018-01-02.
 */


var path = require('path')
var http = require('http');
var fs = require('fs');
//网络爬虫的基本原理
// http.get('http://m10.music.126.net/20180102193840/2477f47cda62dd9711220454f70e4d52/ymusic/f92c/217d/0b04/dcd03bbe6fa0d90d9c6558b16a95f234.mp3',(res) =>{
//
// 	var data = "";
// 	res.setEncoding('binary');  //图片都是资源必须当成二进制下载
//
// 	res.on('data',(chunk) =>{
// 		data += chunk;
//
// 	})
//
// 	res.on('end',function () {
// 		fs.writeFile('rrd.mp3',data,'binary',function (err) { //以二进制写文件
// 			if(err){
// 				console.log("down fail");
// 			}
// 			console.log("down success");
//
// 		})
//
// 	})
//
// })


//写文件
// fs.writeFile('1.txt','我来写文件',function (err) {
// 	if(err) throw err;
// 	console.log('写文件成功');
// });

//追加写文件
// fs.appendFile('1.txt','我来追加文件',function (err) {
// 	if(err) throw err;
// 	console.log('追加文件成功');
// });
// 判断文件时候存在
fs.exists('1.txt',exists => {
	console.log(exists?'存在':'不存在');
})

// 修改文件名称
// fs.rename('2.txt','3.txt',err => {
// 	if(err) throw err;
// 	console.log('修改文件名成功');
// });
//移动文件 (有权限问题，可以通过流的方式移动文件)
//  fs.rename('3.txt','../3.txt',err => {
// 	 if(err) throw err;
// 	 console.log('移动文件完成');
//  });

//复制文件 可以读文件和写文件的方式
//fs.createReadStream('./3.txt').pipe(fs.createWriteStream('../3.txt')); //大文件
// fs.writeFile('../44.txt',fs.readFileSync('./3.txt')); //小文件


// fs.readFile('文件名称',callback) ; //读取文件
//删除文件
// fs.unlink('3.txt',(err)=>{
// 	if(err) throw err;
// 	console.log('删除文件成功');
// });
//创建目录
// fs.mkdir('../ffs',(err) => {
// 	if(err) throw err;
// 	console.log('创建目录成功');
// });

//删除目录,只能删除空文件夹或者没有被操作的文件夹
// fs.rmdir('../files',(err)=>{
// 	if(err) throw err;
// 	console.log('删除目录成功');
// })

//读取目录
// fs.readdir('../global',(err, files) => {
// 	if(err) throw err;
// 	console.log(files);
// })

