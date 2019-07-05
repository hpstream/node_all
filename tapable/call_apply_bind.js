
Function.prototype.myCall = function(obj) {
  obj = obj || window;
  var fn = this;
  obj._fn_ = fn;
  obj._fn_();
  delete  obj._fn_;
}
Function.prototype.myApply = function (obj,...arg) {
  obj = obj || window;
  var fn = this;
  obj._fn_ = fn;
  obj._fn_(...arg);
  delete obj._fn_;
}
Function.prototype.myBind = function (obj, ...arg) {
  obj = obj || window;
  var fn = this;
 
  return function() {

     obj._fn_ = fn;
     obj._fn_(...arg);
     delete obj._fn_;
  }
}
let test = {
  name: 'test'
}

function ab(...arg) {
  console.log(this.name);
  console.log(arg);
}

var ss = ab.myBind(test, 2, 3, 4);
ss();