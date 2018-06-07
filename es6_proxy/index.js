function myVue(option) {
    this._init(option);
}
myVue.prototype._init = function (option) {
    this.$el = $(option.el);
    this.$data = option.data;
    this.$methods = option.methods;
    this.order = {};
    this._complie(this.$el);
    this._obverse(option.data);
}

myVue.prototype._complie  = function (root){
    let that =  this;
    let $doms = root.find("[v-bind]");
    for(let i=0; i<$doms.length; i++) {
        let dom = $($doms[i]).attr("v-bind");
        this.order[dom] = this.order[dom] || [];
        this.order[dom].push(new Wacth( $($doms[i])[0], function(el,arg){
            $(el).text(arg);
        }))
    }

    $doms = root.find("[v-model]");
    for(let i=0; i<$doms.length; i++) {
        let dom = $($doms[i]).attr("v-model");
        this.order[dom] = this.order[dom] || [];
        $($doms[i]).on('input propertychange', function() {
            that.$data[dom] = $(this).val();
        })
    }
}
myVue.prototype._obverse = function (data) {
    let that = this;
    this.$data = new Proxy(data, {
        set: function (target, key, value, receiver) {
            let arr = that.order[key];
            for(let i=0; i<arr.length; i++){
                arr[i].updata(value)
            }
            target[key] = value;
        }
      });
}
function Wacth(el,callback){
    // el ,val, 值
    this.el = $(el);
    this.updata = function(arg){
        callback(this.el,arg);
    }
} 