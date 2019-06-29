class DrawingBoard {
  constructor(ctx, opt) {
    var defaultOpt = {
      type: 1,
      color: '#f00',
      linewidth: 1,
      lineJoin: 'round',
      lineCap: 'round'
    };
    this.$option = Object.assign(defaultOpt, opt);
    this.ctx = ctx;
  }

  
  draw(path,index,context) {
    var length = path.length;
    var ctx = context || this.ctx;
      ctx.beginPath();
      // ctx.strokeStyle = "black";
      // 第一个点
      if (index == 0) {
        ctx.moveTo(path[index][0], path[index][1]);
        ctx.lineTo(
          (path[index][0] + path[index + 1][0]) / 2,
          (path[index][1] + path[index + 1][1]) / 2
        );
      }
      // 中间点
      if (index < path.length - 1 && index > 0) {
        ctx.moveTo(
          (path[index - 1][0] + path[index][0]) / 2,
          (path[index - 1][1] + path[index][1]) / 2
        );
        ctx.quadraticCurveTo(
          Math.floor(path[index][0]), //控制点
          Math.floor(path[index][1]), //控制点
          Math.floor((path[index][0] + path[index + 1][0]) / 2),
          Math.floor((path[index][1] + path[index + 1][1]) / 2)
        );

      }
      // 最后一个点
      if (index >= path.length - 1) {
        // ctx.strokeStyle = "pink";
        ctx.moveTo(
          (path[index - 2][0] + path[index - 1][0]) / 2,
          (path[index - 2][1] + path[index - 1][1]) / 2
        );
        ctx.quadraticCurveTo(
          Math.floor(path[index - 1][0]),
          Math.floor(path[index - 1][1]),
          Math.floor(path[index][0]),
          Math.floor(path[index][1])
        );
      }
      ctx.stroke();
      ctx.closePath();
  }

  startVideo(path,cb) {
    var counter = 0;
    var length = path.length;
    var frameCounter = 0;
    // Frame == 1000/16
    function step(params) {
        // console.log(2)
         var frame = this.frame || 1;
        // 控制快慢播放
        if (frameCounter == frame){
          this.draw(path, counter, this);
          frameCounter = 0;
          counter++;
        }
         
        if (length !== counter){
          window.requestAnimationFrame(step);
          cb && cb();
        }
        
    }
    window.requestAnimationFrame(step);

  }


  //  撤销
  revoke(path,content) {
      path.forEach((arr,index) => {
        this.draw(path,index);
      });
  }
  // 恢复
  recovery(path, content) {
     this.revoke(path, content);
  }
  // 清空画板
  clearBoard() {
    // 
    // this.ctx.clearRect(0, 0, canvasWidth, canvasWidth);
  }
}