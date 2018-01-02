** 在nodejs环境中，我们有直接可以拿到的全局变量（在相同的路径下，有对应的jsdemo） **

### 常用的全局变量如下： ###
1. __dirname   ---->  拿到具体文件的路径（包括文件名称）
2. __filename  ---->  拿到具体的文件路径（不包括具体名称）
3. setImmediate(callback[,...args])
4. setInterval(callback[,...args])
5. setTimeout(callback,[,...args])
6. clearImmediate(immediateObject)
7. clearInterval(intervalObject)
8. clearTimeout(timeoutObject)
9. console
10. process （全局的进程对象，拥有自己的属性和方法）
11. reqire() (导入其他的js)
