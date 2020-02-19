function promisify(fn) {
  return function (...args) {
    return new Promise(function (reject, resole) {
      args.push((function (err, ...arg) {
        if (err) {
          reject(err)
        } else {
          resole(...arg)
        }
      }))
      fn.apply(null, args)
    })
  }
}
var fs = require('fs')
var path = require('path')
var state = promisify(fs.stat);

state(path.join(__dirname, '1.js'), (err, res) => {
  console.log(err);
})

state(path.join(__dirname,'1.js'))
.then((res)=>{
  // console.log(res);
}).catch((err)=>{
  // console.log('2',err);
})
