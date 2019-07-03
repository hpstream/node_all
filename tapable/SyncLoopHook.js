// 模拟 SyncLoopHook 类
class SyncLoopHook {
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

    // 依次执行事件处理函数，如果返回值为 true，则继续执行当前事件处理函数
    // 直到返回 undefined，则继续向下执行其他事件处理函数
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = this.task(...args);
      } while (ret !== undefined);
    });
  }
}