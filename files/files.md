### 文件拷贝 ###

1.小文件拷贝  (小文件使用同步的方式，把文件直接加载到内存中)

```$xslt
    var fs =  require('fs');
    function copy(src,dst){
        fs.writeFileSync(dst,fs.readFileSync(src));
    }
    
    function main(argv){
        copy(argv[0],argv[1]);
    }
    
    main(process.argv.slice(2));
```
2.大文件拷贝 （大文件使用流的方式）
```$xslt
    var fs = require('fs');
    function copy(src,dst){
        fs.createReadStream(src).pipe(fs.createWriteStream(dst));
    }
    
     function main(argv){
            copy(argv[0],argv[1]);
        }
        
        main(process.argv.slice(2));
```

3.文件的常用方法
```$xslt
 1.创建目录
  fs.mkdir(path,callback);
  2.创建文件
  fs.writeFile(path,callback)
  3.删除目录(同步删除)
    fs.rmdirSync(url);
  4.删除文件（同步删除）
   fs.unlinkSync(tempurl)

```
####文件常用方法
```apple js
fs.writeFile(path,data,callback); //写文件
fs.appendFile(path,data,callback);//追加写文件
fs.exists(path,callback) // 判断文件时候存在
fs.rename(oldName,newName,callback); // 修改文件名称
fs.rename(oldPath,newPath,callback);//移动文件 (有权限问题，可以使用流的方式)
fs.readFile('文件名称',callback) ; //读取文件
fs.unlink('文件名称',callback); //删除文件
fs.mkdir(路径,权限,callback); //创建目录
fs.rmdir(path,callback) //删除目录
fs.readdir(目录,callback) //读取目录
```
