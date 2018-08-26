// 不添加函数名单

var whitelist = {
    constructor:'constructor',
    data:'data',
}

export default class base {
    constructor(template){
        this.template = template;
        this.data = this.data;
        this.methods = {}; 
        this.createMethods();
     }

    createMethods(){
        var arrfn =Object.getOwnPropertyNames(this.__proto__);
        // 把子类定义分函数全部到当methods里面去
        for(var i=0;i<arrfn.length;i++){
            var name = arrfn[i];
            this.methods[name] = this.__proto__[name];
        }
        // 删除函数白名单。
        for(var key in whitelist){
            delete this.methods[key];
        }
    }

}