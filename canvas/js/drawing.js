class drawing {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    // 画笔常用的默认参数
    this.option = {
      lineJoin:'',
      lineCap:'',
      strokeStyle:''
    }
    this.canvas.addEventListener('touchstart', this.paintDrawBegin, false);
    this.canvas.addEventListener('touchmove', this.paintDrawing, true);
    this.canvas.addEventListener('touchend', this.paintDrawEnd, false)
  }
  DrawBegin(){

  }
  paintDrawing(){

  }
  paintDrawEnd(){

  }

}