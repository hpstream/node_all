/**
 * 
 * @param {*} id   页面上的id
 * @param {*} width  canvas的宽度
 * @param {*} height canvas的高度
 */
(function(window){



function hpCanvas(id,width,height){

    if(this == window){
       return  new hpCanvas(id,width,height);
    }
    this.elementArr = []; //存档元素对象
    this.canvas = document.getElementById(id);
    this.canvas.height = height;
    this.canvas.width = width;
    this.width = width;
    this.height = height;
    this.g =3; //设置重力加速度
    this.brush = this.canvas.getContext('2d');
    
    for(var key in this.graph){
        this.graph[key].prototype = {
            constructor:this.graph[key],
            g:this.g,
            brush:this.brush,
            borderLeft:0,
            borderTop:0,
            borderRight:this.width,
            borderBottom:this.height
        };
    }
    
}
//运行
hpCanvas.prototype.run = function(){
    var that = this;
    function TimeLoop (){
        that.brush.clearRect(0,0,that.width,that.height);  
        that.elementArr.forEach(function(v,i){
            v.draw();
        })
        that.id = requestAnimationFrame(TimeLoop);
    }
   
    TimeLoop();
}
//暂停
hpCanvas.prototype.pause = function(){
    cancelAnimationFrame(this.id);//可以取消该次动画。
}

hpCanvas.prototype.circle = function(x,y,r){
    this.elementArr.push(new this.graph.circle(x,y,r)); 
}
//图形管理
hpCanvas.prototype.graph = {
    circle
}

function circle(x,y,r,brush){
    this.posX = x;
    this.posY = y;
    this.radius = r;
    this.speedY =2;
    this.speedX =2;
    this.draw = function(){
        this.ckeck();
        this.brush.beginPath();
        this.brush.arc(this.posX,this.posY,this.radius,0,Math.PI*2,false) 
        this.brush.stroke();
    }

    this.ckeck = function(){
       // 带重力碰撞检测
        // this.speedY += this.g; //加速运动
        // this.posY += this.speedY;
        // this.posX += this.speedX;
        //  //检测是否碰撞到底部
        // if(this.posY > this.borderBottom - this.radius){
        //    // this.speedY = -4*this.speedY/5;
        //     this.speedY = -this.speedY;
        //     this.posY  = this.borderBottom - this.radius
        // }
        
        //四周墙壁碰撞检测
        this.posY += this.speedY;
        this.posX += this.speedX;

         if(this.posY > this.borderBottom - this.radius ||this.posY <  this.radius ){
           // this.speedY = -4*this.speedY/5;
            this.speedY = -this.speedY;
         }
         if(this.posX > this.borderRight - this.radius ||this.posX <  this.radius ){
            // this.speedY = -4*this.speedY/5;
             this.speedX = -this.speedX;
          }
         
        
    }
}

var mgCans = hpCanvas('demo2',window.innerWidth,window.innerHeight);

mgCans.circle(50,50,50);
mgCans.circle(150,450,50);
mgCans.circle(650,50,50);
mgCans.run();

//共有函数 



window.hpCanvas = hpCanvas;

})(window)
