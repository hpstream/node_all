(function($){
 
    /**
     * 注意：文本中出现 / 二次标注会出现问题
     * @param {jq} _dom    输入值：Jq选择器 || Jq对象 || 空; 
     */
    function  markupHTML(_dom,option) {
        var dom = this || $(_dom);
		return new createMarkupHTML(dom,option);
    }
    // lightHTML,commentHTML
    function createMarkupHTML(_domID,option) {
		this.txt = ""; //记录被选中的文本
		this.domName = _domID.selector; //保存选择器名称
        this.$domID = _domID ;  //$(_domID)
        this.range; 
        this.option;
        this.event = {};//定义事件
        //设置默认的标签
        var tepOption = $.extend(true,{},option);
        tepOption.lightHTML = tepOption.lightHTML?tepOption.lightHTML:"<span class = 'markupLight'></span>";
        tepOption.commentHTML = tepOption.commentHTML?tepOption.commentHTML:"<span class = 'markupComment'></span>";
        this.option = tepOption;
		$(_domID).css("position", "relative")
		this.init();
    }
    
    createMarkupHTML.prototype.init = function(){
        var that = this;  //this 指向会改变,需要保存
        this.$domID.on("mouseup", function(event) {
			//that.txt = "" //清空被选中的文本
            that.e = event;
            var flag;
			if(event.button == 2)
				return false;
			var x = event.target;
			if(x.tagName == "HTML"){
                return false;
            }  
			while(x.tagName != "BODY") {
				if(x == that.$domID[0]) { // 这里需要测试
					flag = true;
					break;
				}
				x = x.parentNode;
			}
    
            if(!flag) {  
                return false;
            }
            if(document.selection) { // IE
                that.txt = document.selection.createRange().htmlText;
                // tempText = document.selection.createRange().htmlText;
            } else if(window.getSelection().rangeCount == 0) { //解决点击法规和数据可视化中的a标签出现的错误
                $(that._highTip).hide();
                return false;
            } else {
                that.range = window.getSelection().getRangeAt(0);
                var container = document.createElement('div');
                container.appendChild(that.range.cloneContents());
                that.txt = container.innerHTML;
                // tempText = container.innerHTML;
            }
               
            if(that.txt  && that.range.collapse) {
                that.getPointPosition(event);
                if(that.event['selectText'] && typeof that.event['selectText'] == 'function'){
                    that.event['selectText'](event,that.txt); //第二个参数返回选中文本，如果没有选中文字，则不触发事件;
                }


                //that.showLight(that.txt); //显示高亮
                //that.addComment(event);
            }
        })
        
    }
    //绑定事件
    createMarkupHTML.prototype.on = function(eventName,eventFn){
        this.event[eventName] = eventFn;
    }
    createMarkupHTML.prototype.HTMLEncode = function(html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    }
    createMarkupHTML.prototype.EscapeStr = function(text){
        return text.replace(/([`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]])/g,'\\$1')
    }
    /**
     * 计算位置 
     */
    createMarkupHTML.prototype.pointerX = function(event) {
		return this.e.pageX ||
			( this.e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	}
	createMarkupHTML.prototype.pointerY = function(event) {
		return  this.e.pageY ||
			( this.e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	}
	//获取坐标，待分析
	createMarkupHTML.prototype.getPointPosition = function(event) {
		event = event || window.event;
		var offset =this.$domID .offset()
		this.x_Px_page =this.pointerX(event) - offset.left +75;
        this.y_Px_page = this.pointerY(event) - offset.top ;
        return {
            left: this.y_Px_page,
            top:this.x_Px_page
        }
	}
    /**
     *  显示高亮
     * @param {*} txtArr 输入值： 数组 || 字符串
     */
    createMarkupHTML.prototype.showLight = function(txtArr) {
        var arr = [];
        arr = (typeof txtArr == "string")?arr.push(txtArr):arr;
        var _txt = this.$domID.html(); //把节点里面的内容变成带html的标签
        //如果页面选中文字，这把选中文字放到数组中
        this.txt?arr.push(this.txt):'';
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] =="" ||arr[i] =="/" ){ //过滤掉误操作，'/'会出现问题
				return ;
			}
			var str = $('<div>').append($(this.option.lightHTML).html(arr[i])).html();
            var reg = RegExp(this.EscapeStr(arr[i]), "g");
            if(_txt.indexOf(str)==-1){ //防止多次标记
                _txt = _txt.replace(reg, str);
            }
		}
        this.$domID.html(_txt);
		return this;		
    }
    /**
     *  隐藏高亮
     * @param {*} text  输入值： 字符串
     */
    createMarkupHTML.prototype.hideLight = function(text) {
        var _txt = this.$domID.html();
		if(text){
            var  RegStr = $('<div>').append($(this.option.lightHTML).text(text)).html();
            var str = RegExp(RegStr, "g");
            _txt = _txt.replace(str, text);
		}
        this.$domID.html(_txt);
    }
   
    /**
     * 添加标注
     * @param {*} ListObj  输入值： 数组对象
     */
	createMarkupHTML.prototype.addComment = function(ListObj){}
    /**
     * 删除批注
     * @param {*} deleteID  输入值： 标注的id
     */
	createMarkupHTML.prototype.delectComment = function(deleteID) {}
    /**
     * 批量标注
     * @param {*} listObj  输入值： listObj
     */
    createMarkupHTML.prototype.batchComment = function (listObj) {}
    $.fn.extend({
		markupHTML: markupHTML
    });
})(jQuery);