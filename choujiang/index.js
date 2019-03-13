import { luckDraw } from './luckDraw.js'
 
var josn = [
  {id:1,name:1},
  {id:2,name:2},
  {id:3,name:3},
  {id:4,name:4}, 
  {id:5,name:5},
  {id:6,name:6},
  {id:7,name:7},
  {id:8,name:8},
  {id:9,name:9},
  {id:10,name:10}
]
var rotateDir = [1,2,3,4,5,6,7,8,9,0]
var app = new Vue({
  el: '#app',
  data:{
    josn,
    index:2
  },
  methods: {
    
  },
})
var luckdraw = new luckDraw(josn, rotateDir,3);
// console.log(luckdraw);
var index = 0;
luckdraw.run(2,function(params) {
 app.index = params.id;
},
function (params) {
  console.log(params)
})