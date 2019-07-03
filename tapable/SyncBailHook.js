// 模拟 SyncBailHook 类
class SyncBailHook {
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0, this.args.length);

    // 依次执行事件处理函数，如果返回值不为空，则停止向下执行
    let i = 0,
      ret;
    do {
      ret = this.tasks[i++](...args);
    } while (!ret && i < this.tasks.length);
  }
}