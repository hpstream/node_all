// 模拟 AsyncParallelHook 类：tapAsync/callAsync
class AsyncParallelHook {
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tabAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    // 先取出最后传入的回调函数
    let finalCallback = args.pop();

    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0, this.args.length);

    // 定义一个 i 变量和 done 函数，每次执行检测 i 值和队列长度，决定是否执行 callAsync 的回调函数
    let i = 0;
    let done = () => {
      if (++i === this.tasks.length) {
        finalCallback();
      }
    };

    // 依次执行事件处理函数
    this.tasks.forEach(task => task(...args, done));
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0, this.args.length);

    // 将所有事件处理函数转换成 Promise 实例，并发执行所有的 Promise
    return Promise.all(this.tasks.map(task => task(...args)));
  }
}