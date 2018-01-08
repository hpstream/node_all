#### url基本api的使用

```apple js
var url = require('url');

//parse 将url，解析成一个json数组
url.parse('http://www.baidu.com');
//parse 函数的第二个参数是布尔类型，当参数为true，会将查询条件也解析成json
url.parse('http://www.baidu.com?page=1',true);
//parse函数的第三个参数也是布尔类型的，当参数为true，解析时会将url的"//"和第一个"/"之间的部分解析为主机名
url.parse('http://www.baidu.com/news',false,true);

//format函数的作用与parse相反，它的参数是一个JSON对象，返回一个组装好的url地址

url.format({
            protocol: 'http:',
            hostname:'www.baidu.com',
            port:'80',
            pathname :'/news',
            query:{page:1}
        });

url.resolve('http://example.com/', '/one')  // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```

#### path基本api的使用
```apple js
 //导入path 模块
 var path = require('path');
//normalize函数将不符合规范的路径经过格式化转换为标准路径,解析路径中的.与..外，还能去掉多余的斜杠。
path.normalize('/path///normalize/hi/..'); // '/path/normalize/'

//join函数将传入的多个路径拼接为标准路径并将其格式化，返回规范后的路径，避免手工拼接路径字符串的繁琐. 如下示例
 path.join('///you', '/are', '//beautiful'); //'/you/are/beautiful'
 
//dirname函数用来返回路径中的目录名
path.dirname('/foo/strong/cool/nice'); '/foo/strong/cool'

//basename函数可返回路径中的最后一部分，并且可以对其进行条件排除. 如下示例：
//例1：path.basename('路径字符串');
//例2：path.basename('路径字符串', '[ext]')<排除[ext]后缀字符串>;
var data1 = path.basename('/foo/strong/basename/index.html');
var data2 = path.basename('/foo/strong/basename/index.html','.html');
console.log(data1 + ' "and" ' + data2); //'index.html "and" index'

//拿到文件扩展名
path.extname('index.html'); //.html

```

#### querystring模块的使用

```apple js
//将json转换成字符串
 querystring.stringify({foo:'bar',cool:['xux', 'yys']}); //foo=bar&cool=xux&cool=yys
//querystring.stringify("对象","分隔符","分配符") 
querystring.stringify({foo:'bar',cool:['xux', 'yys']},'*','$'); //'foo$bar*cool$xux*cool$yys'
 //反序列化
querystring.parse('foo=bar&cool=xux&cool=yys');  //{ foo: 'bar', cool: ['xux', 'yys']
querystring.parse('foo@bar$cool@xux$cool@yys','@','$'); // foo: '', bar: 'cool', xux: 'cool', yys: '' }
 

```

#### util模块的使用
```apple js
//判断是否是数组
var s =util.isArray([]);
//判断是否是日期类型
util.isDate(object);
//判断是否为正则类型
util.isRegExp(object);
```

#### 子进程 child_process模块
**众所周知node.js是基于单线程架构，这样的设计可以带来高效的cpu利用率，
但是却无法利用多个核心的cpu,为了结局这个问题，node.js提供了child_process模块
，通过多进程来来实现多核cpu的使用。child_process模块提供了四个创建子进程的函
数，分别是spawn,exec,execFile,fork**
```apple js
  具体用法暂时不太懂
```















