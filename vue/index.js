import router from './router.js'
// console.log(router)
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// router.beforeEach(async (to, from, next) => {
//     // console.log(to.meta.templateUrl)
//      to.matched[0].components.default.template = await ajax(to.meta.templateUrl);
//      console.log(to);
//      next()
//   })

 

async function name(params) {
    console.log();
    var myrouter = router.options.routes;
    // for(var i=0;i<myrouter.length;i++){
    //     if(myrouter[i].component && myrouter[i].component.templateUrl){
    //          myrouter[i].component.template = await ajax(myrouter[i].component.templateUrl);
    //     }
        
    // }
    // console.log(router);
    const app = new Vue({
        router
    }).$mount('#app')


}

name();
