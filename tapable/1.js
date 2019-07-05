
var arr = [
  [1,2,3,4,5,6],
  [7,8,9,10,11,12],
  [13,14,15,16]
]
// // 遍历数组的每一个，每次间隔一秒出来。
// var i = 0;
// var j = 0;
// var timer = setInterval(() => {
//     var tem = arr[i];
//     if (!tem) return;

//     if (j<tem.length){
//       console.log(tem[j]);
//       j++;
//     }else{
//       i++;
//       j=0;
//     }    

// }, 200);

// 采用事件流推进
class Stream{
  constructor(arr){
    this.arr = arr;
    this.i = 0;
    this.j = 0;
  }
  run(callback){
    let next = ()=>{
      var arr = this.arr[this.i];
      if (!arr) return;
      
      callback && callback(this.arr[this.i][this.j++], next);
      if(this.j > arr.length-1){
        this.i++;
        this.j = 0;   
      }
      
    }
    next();
  }
}
var stream = new Stream(arr);

stream.run((value, next) => {
  console.log(value);
  setTimeout(() => {
      next();
  }, 1000);
})


