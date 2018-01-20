/**
 * 使用cheerio模块实现网络爬虫
 * 只能爬去页面的数据，不能爬去js动态渲染的数据
 */

var http = require('http');
var cheerio = require('cheerio'); //引入爬虫模块
var fs = require('fs');
var path = require('path');
var url = 'http://www.hubwiz.com/api/table?';
var getData = {}
http.get(url,function (res) {
	var html = '';
	res.on('data',(chunk) =>{
		html += chunk;
	})
	res.on('end',()=>{
		var $ = cheerio.load(html);
		var chapters = $('#paneOne');//panel panel-default//panel-title //panel-body > li
		var list = chapters.find('.panel.panel-default');

		for(var i=0;i<list.length;i++){
			var key = $(list[i]).find('.panel-title').text().replace(/[/\s]/g,'');
			//console.log(key)
			getData[key] = [];

			var children = $(list[i]).find('.panel-body');
			console.log($(list[i]).text())
			for(var j=0;j<children.length;j++){
				var text = $(children[j]).text().replace(/[/\s]/g,'')

				getData[key].push(text);
			}
		}

		fs.writeFile(path.join(__dirname,'./2.html'),html,function (err,data) {
			console.log('写入完成');
		})
	})

}).on('error',function () {
	console.log('爬去网页出错');
})


