/**
 * Created by hp on 2018-01-02.
 */

var bin = new Buffer(5);
console.log(bin.toString('utf8'));
var path = require('path')
console.log(path.extname(__filename));

var http = require('http');

http.get('http://www.baidu.com',(res) =>{

	console.log(res.body);

})