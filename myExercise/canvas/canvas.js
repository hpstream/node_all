
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
    var that = this;
    var Sx = x;
    var Sy = y;
    var Vy = 0; 
    var Vx = 0; 
    var time1 = setInterval(function(){
        that.brush.clearRect(0,0,that.width,that.height);  
        that.brush.strokeStyle = "blue";
        Sx +=0;
        Vy += that.g;
       
        if( Sy - r > that.height ){
            Sy  = that.height-r;
            Vy = - Vy/2;    
           
        }
        if(Math.ceil(Sy) > that.height- 2*r && (Vy>=(-that.g) &&Vy<=that.g)){
            Vy = 0 ;
        }
        Sy += Vy;
        that.brush.arc(Sx, Sy, r, begin, end, direction);
        that.brush.stroke();
        that.brush.beginPath();
      

    },that.time)
      
}




















Window.canvas = Canvas;