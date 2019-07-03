class SyncHook{
  constructor(args){
    this.tasks = []
  }

  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
      this.tasks.forEach(task=> {
        task(...args);
      });
  }
}

let hook = new SyncHook();

hook.tap('node',function(name) {
  console.log(name);
})
hook.tap('vue', function (name) {
  console.log(name);
})
hook.call('node');