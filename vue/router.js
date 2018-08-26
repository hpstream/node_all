import ajax from './view/util/ajax.js'

// console.log(Bar);
// console.log(s);
const routesList = [
  { 
      name:'1', path: '/foo', 
      meta:{
          templateUrl:'./view/fool/index.html',
          indexjs:'./view/fool/fool.js'
        },
      children:[{
         path: 'id',
         meta:{
          templateUrl:'./view/bar/index.html',
          indexjs:'./view/bar/bar.js'
        } 
      }]
    },
  { 
    name:'2', 
    path: '/bar', 
    meta:{
      templateUrl:'./view/bar/index.html',
      indexjs:'./view/bar/bar.js'
    }},
  { name:'3',path: '/', redirect: '/foo' }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。

// 导出方式一
export var router = new VueRouter({
    routes:routesList // (缩写) 相当于 routes: routes
})

router.beforeEach(async (to, from, next) => {
  // console.log(to.meta.templateUrl)
  to.path
  console.log()
  //  to.matched[0].components.default.template = await ajax(to.meta.templateUrl);

 var components = to.matched;
 for(var i=0; i<components.length;i++){
  var de = await import(components[i].meta['indexjs']);
  de.default.template = await ajax(components[i].meta.templateUrl);
  components[i].components =de;
 }
   next()
})

// router.beforeEach((to, from, next) => {
//     // ...
//     console.log(from);
//     console.log(to);
//   })

// 导出方式二
export default router;