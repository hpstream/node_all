var demo = function (params) {
  this.name = 'ddd'
 
}

demo.prototype.getName = function (params) {
  var name = this.name;
  return function name(params) {
    return this.name;
  }
  this.name = null;

}
var ss = new demo();
ss.getName();


console.log(process.memoryUsage());