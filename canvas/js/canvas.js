
/**
 * 
 * @param {*} id  页面的canvas id,
 * @param {*} width  canvas宽度
 * @param {*} height canvas 高度
 * 
 * return   brush  画布的笔刷
 */
function Canvas(id,width,height){

    if(this  == window){
        return new Canvas(id,width,height);
    }else{
        var canvas = document.getElementById(id);
        canvas.width = width;
        canvas.height = height;
        var brush = canvas.getContext('2d') 
        this.width = width;
        this.height = height;
        this.brush = brush;
        this.time = 1000/60;
        this.g = 1; //引力系数
    }
   
}
Canvas.prototype.arc =function(x, y, r, begin, end, direction){
    var that = this,
    posX = x,
    posY = y,
    g = this.g ,
    speedX = 0,//小球X轴速度
    speedY = 0,//小球Y轴速度
    startSpeedX = 0,//小球X轴初始速度
    startSpeedY = 0,//小球Y轴初始速度
    radius = r;//小球半径
    that.brush.strokeStyle = "blue";
    var time1 = setInterval(function(){
        that.brush.clearRect(0,0,that.width,that.height);  
        speedY += g; 
        posY += speedY;
        //小球碰壁反弹
        if(posY > that.height - radius){ 
            speedY=-(18*speedY/20);
            posY = that.height - radius
        }   
        that.brush.arc(posX, posY, r, begin, end, direction);
        that.brush.stroke();
        that.brush.beginPath();
    },that.time)
      
}




















Window.canvas = Canvas;