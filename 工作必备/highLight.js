(function($) {

	$.extend({
		highlight: highlight
	});

	function highlight(_dom, highTip, className) {
		return new createHeghLight(_dom, highTip, className);
	}

	/**
	 * 
	 * @param  str _domID      一个标签的id,(需要控制文本的id) 
	 * @param  str highTip    一个jqury选择器字符串,(弹框功能id)
	 * @return  Object     createHeghLight 对象 
	 */
	function createHeghLight(_domID, highTip, className) {
        // var roleParentId = $('li.active[role=presentation]').attr('id').replace('tab_','');
		var that = this;
		this.txt = ""; //被选中的文本
		this.domID = _domID.substr(1);
        this._domID = $(_domID);  //$(_domID)
		this._highTip = $(highTip);
		this.range;
		this.className = className.substr(1);
		$(_domID).css("position", "relative")
		this.init();
	}
	//初始化绑定事件		
	createHeghLight.prototype.init = function() {
		var that = this;
        this._domID.on("mouseup", function(event) {
			//that.txt = "" //清空被选中的文本
			that.e = event;
			if(event.button == 2)
				return false;
			var x = event.target;
			if(x.tagName == "HTML")
				return false;
			var flag = false;
			while(x.tagName != "BODY") {
				if(x.id == that.domID) {
					flag = true;
					break;
				}
				x = x.parentNode;
			}
			setTimeout(function () {
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
                if(!flag) {
                    $(that._highTip).hide();
                    return false;
                }
                if(that.txt  && that.range.collapse) {
                    that.getPointPosition(event);
                    $(that._highTip).show();
                    //that.showLight(that.txt); //显示高亮
                    //that.addComment(event);
                }else{
                    $(that._highTip).hide();
                }
            },100)
		})

	}
	createHeghLight.prototype.pointerX = function(event) {
		return this.e.pageX ||
			( this.e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	}
	createHeghLight.prototype.pointerY = function(event) {
		return  this.e.pageY ||
			( this.e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	}
	//获取坐标
	createHeghLight.prototype.getPointPosition = function(event) {
		event = event || window.event;
		var offset =this._domID.offset()
		this.x_Px_page =this.pointerX(event) - offset.left +75;
        this.y_Px_page = this.pointerY(event) - offset.top ;
        this._highTip.css({
			top: (this.y_Px_page + 20),
			left: (this.x_Px_page)
		});
        this._highTip.removeClass("hide");
	}
	//文字显示高亮
	createHeghLight.prototype.showLight = function(txtArr) {
		var arr = [];

		if(typeof txtArr == "string" ) {
			arr.push(txtArr);
		} else {
			arr = txtArr;
		}
		var _txt = this._domID.html();

		for(var i = 0; i < arr.length; i++) {
			if(arr[i] ==""){
				return ;
			}
			var str = "<span class = '" + this.className + "'>" + arr[i] + "</span>";
			var reg = RegExp(arr[i], "g");
			_txt = _txt.replace(reg, str);
		}
        this._domID.html(_txt);
        $(this._highTip).hide();
		return arr;	
	}
	//文字不显示高亮
	createHeghLight.prototype.hideLight = function(txt) {
        var _txt = this._domID.html();
		if(txt){
            var str = RegExp('<span class="' + this.className + '">' + txt + '</span>', "g");
            _txt = _txt.replace(str, txt);
		}else{
            var str = RegExp('<span class="' + this.className + '">', "g");
            _txt = _txt.replace(str, "");
            _txt = _txt.replace(/\<\/span\>/g, "");

		}
        $(this._highTip).hide();
        this._domID.html(_txt);
	}
	//添加标注
	createHeghLight.prototype.addComment = function(listObj) {

		if(listObj){
			this.batchComment(listObj);
			return;
		}
		var id = new Date().getTime();
		var ins = document.createElement('ins');
		ins.className = this.className;
		ins.id = id;
		this.range.surroundContents(ins);//把获取文本放到标签当中
		var allEpx = '(<ins class="'+this.className+'" id="'+id+'">'+this.txt+'</ins>)|'+"("+this.txt+")";
		var chooseEpx ='<ins class="'+this.className+'" id="'+id+'">'+this.txt+'</ins>';
		
		var _txt = this._domID.html();
		var exp1  = new RegExp(allEpx,"g");
		var exp2  = new RegExp(chooseEpx,"g");
		var size = 0;
		var postion = 0;
		var s =_txt.replace(exp1,function(v){
			if(v !=""){
				size++;
				console.log(v);
				if(exp2.test(v)){
					postion = size;
					return ;
				}
			}
		})
			
		var commentIcon = $("<span class='fa fa-commenting jufa-size' icon-id="+id+" style='position:relative;top: -6px;'></span>");
        $(this._highTip).hide();
		$("#" + id).after(commentIcon);
		
		return {
			txt:this.txt,
			index:postion,
			id:id,
			x:this.x_Px_page,
			y:this.y_Px_page
		};
	}
	//删除标注
	createHeghLight.prototype.delectComment = function(deleteID) {
		//拿到对应的dom，拿到里面的文本，
		//在其后面插入文本
		//删除当前结点
		var deleteIns = $("#" + deleteID);
		var keyword = deleteIns.html();
		deleteIns.after(keyword);
		deleteIns.remove();
        this._domID.find("[icon-id="+deleteID+"]").remove();
		
	}
    createHeghLight.prototype.batchComment = function (listObj) {
        var _txt = this._domID.html();


        //添加高亮批注
        for(var i = 0; i < listObj.length; i++) {
        	var pos = JSON.parse(listObj[i].pos);
            var str = '<ins class="'+this.className+'" id="'+listObj[i].id+'">'+listObj[i].text+'</ins>';
			var index = pos.index;
            var exp  = new RegExp(listObj[i].text,"g");
			var currentIndex = 0;
			_txt = _txt.replace(exp, function (v) {
                currentIndex++;
				if(index == currentIndex ){
					return str;
				}else{
                    return listObj[i].text;
				}

			});

        }
        $(this._highTip).hide();
        this._domID.html(_txt);

        //添加高亮图标
        for(var i = 0; i < listObj.length; i++) {
            var commentIcon = $("<span class='fa fa-commenting jufa-size' icon-id="+listObj[i].id+" style='position:relative;top: -6px;'></span>");
            $("#" +listObj[i].id).after(commentIcon);
        }
    }



})(jQuery);