class AsyncSeriesHook {
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

    // 定义一个 i 变量和 next 函数，每次取出一个事件处理函数执行，并维护 i 的值
    // 直到所有事件处理函数都执行完，调用 callAsync 的回调
    // 如果事件处理函数中没有调用 next，则无法继续
    let i = 0;
    let next = () => {
      let task = this.tasks[i++];
      task ? task(...args, next) : finalCallback();
    };
    next();
  }
}