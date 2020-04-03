if(typeof registerPaint !== 'undefined'){
  registerPaint('background-canvas',class {
    static get inputProperties(){
      return ['--background-canvas'];
    }
    paint(ctx,geom,properties){
      console.log('------------------------------------');
      console.log(properties.get('--background-canvas').toString());
      console.log('------------------------------------');
      eval(properties.get('--background-canvas').toString())(ctx, geom, properties);
    }
  })
}