# 弄懂js异步编程

## 前置知识

### 同步异步和阻塞非阻塞

|     | 同步  | 异步  |
| ----  | ----  |--- |
| 阻塞  | 同步阻塞 |异步阻塞  |
| 非阻塞  | 同步非阻塞 |异步非阻塞  |

![image](http://www.zhufengpeixun.com/jg-vue/assets/img/2.1a033437.png)

**特点**
1. 调用方会产生阻塞非阻塞，被调用方是异步还是同步。
2. 被调用方的是否同异步，在代码层面上表示为异步线程是否被复用。
3. 同步阻塞和异步非阻塞这两种情况，在软件中实现最多。

> js 相当于调用方，属于异步非阻塞

## 提问
1. 让 js 休眠一秒，打印1，在休眠两秒打印2，在休眠3s打印三。
## 实现
```
function sleep(timer, cb) {
  setTimeout(() => {
    cb && cb();
  }, timer);
}

sleep(1000, () => {
  console.log(1)
  sleep(2000, () => {
    console.log(2)
    sleep(3000, () => {
      console.log(3)
    })
  })
})
```
**代码的缺点：**
1. 回调太多，不利于代码的阅读。
2. 无法捕获错误，导致运营程序的崩溃。

**扩展**
node为了捕获错误，采用了第一错误优先的回调函数
```
fs.readFile('某个文件', function (err, data) {
  if (err) throw err;
  console.log(data);
});

```

> 如何解决js的缺点
1. Generator + CO;
   
```
function sleep(timer, cb) {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(cb && cb())
    }, timer);
  })
}
function* main() {
  yield sleep(1000)
  console.log(1)
  yield sleep(2000)
  console.log(2)
  yield sleep(3000)
  console.log(3)
}
function co(gen) {
  let it = gen();
  return new Promise(function (resolve, reject) {
    ! function next(lastVal) {
      let {
        value,
        done
      } = it.next(lastVal);
      if (done) {
        resolve(value);
      } else {
        value.then(next, reason => reject(reason));
      }
    }();
  });
}
co(main).then(function (data) {
  console.log(data);
}, function (err) {
  console.log(err);
});
```

> 通过 Generator + CO, 我们把难以理解的异步编程模式转化成了同步编程模式。

注意： 只是代码写法上的转换，本质上并没有改变异步非阻塞

看一看babel 如何转换语法糖
```
require("regenerator-runtime/runtime.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.timers.js");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(main);

function sleep(timer, cb) {
  return new Promise(function (reslove, reject) {
    setTimeout(function () {
      reslove(cb && cb());
    }, timer);
  });
}

function main() {
  return regeneratorRuntime.wrap(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return sleep(1000);

        case 2:
          console.log(1);
          _context.next = 5;
          return sleep(2000);

        case 5:
          console.log(2);
          _context.next = 8;
          return sleep(3000);

        case 8:
          console.log(3);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```
> 我们发现他转化成了 switch case 的语法。在配合CO函数,实现了此功能。

** 总结：Generator + CO 虽然解决了异步变成带来的问题，但是在代码使用中还是显得十分麻烦。需要多个函数配合，因此社区做了进一步语法糖Async/ await**

```
function sleep(timer, cb) {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(cb && cb())
    }, timer);
  })
}
async function main() {
  await sleep(1000)
  console.log(1)
  await sleep(2000)
  console.log(2)
  await sleep(3000)
  console.log(3)
}
main()
```

注意： Async/ await 本质上就是 Generator + CO 的语法糖。


> 至此，我们可以在js中使用同步变成的方式写异步代码了。