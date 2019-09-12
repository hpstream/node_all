var {parse} = require('@babel/parser');
var t = require('@babel/types');
var traverse = require('@babel/traverse').default
 
var generate = require('@babel/generator').default;

var code = "let a=2;[1,2].push((val)=>{console.log(val)})";
const ast = parse(code);
traverse(ast, {
    CallExpression(path, state) {
        if (path.get('callee').isMemberExpression()) {
          if (path.get('callee').get('object').isIdentifier()) {
            if (path.get('callee').get('object').get('name').node == 'console') path.remove()
          }
        }
      // path.remove()
    },
  VariableDeclaration:function (path) {
    path.node.kind ='var';``
  }
})
const output = generate(ast, {
  /* options */ }, code);
  console.log(output);
