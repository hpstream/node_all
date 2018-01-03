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
        fs.createReaDstream(src).pipe(fs.createWriteSteanm(dst));
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