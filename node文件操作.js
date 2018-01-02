/*
* @Author: Marte
* @Date:   2017-06-27 14:39:50
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-27 17:28:34
*/
//文件操作学习
'use strict';
const fs = require('fs');
const path = require('path');

//创建文件；
// fs.writeFile(__dirname+"/1.txt","",function(err){
//     if(err) throw err;
// })

//删除文件；
// fs.unlink(__dirname+"/aaf",(err) =>{
//     if(err) throw err;
//     console.log('删除成功！');
// });

//判断文件或者文件夹是否存在
//console.log(fs.existsSync(__dirname+"/demow1.py"));

//创建目录
// fs.mkdir(__dirname+"/hp",(err,a) => {
//     if(err) throw err;
//     console.log(a);
// })

//删除空目录目录
// fs.rmdir(__dirname+"/abc",(err) =>{
//         if(err) throw err;
//         console.log("删除成功");
// })

//删除非空目录（可以删除空目录）

// function delDirectory(url){
//     //获取目录下面的所有文件
//     let files = fs.readdirSync(url);//返回数组
//     files.forEach((v) =>{
//         var tempurl =path.join(url,v);//path.join 拼接路径

//         let type = fs.statSync(tempurl);
//         //如果是文件 ，处理
//         if(type.isFile()){
//              fs.unlinkSync(tempurl);
//             console.log(tempurl+"文件已删除");
//         }
//         //如果是目录，处理
//         if(type.isDirectory()){
//               delDirectory(tempurl);
//         }
//     })
//     fs.rmdirSync(url);
//     console.log(url+"目录已删除");
// }

//追加写文件

// fs.appendFile(__dirname+"/2.txt","hphphphp",(err,a) =>{
//         if(err) throw err;
// })
