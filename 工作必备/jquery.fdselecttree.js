//# sourceURL=fdselecttree.js
(function($, window, document, undefined) {
    'use strict';
    $(function() {
        var typeOpts = {
            depart: {
                url: "api/departs",
                name: "departName",
                idKey: "departId",
                pIdKey: "parentDepartId"
            },
            department: {
                url: "api/basicdata/trees/depart",
                name: "name",
                idKey: "id",
                pIdKey: "pid"
            },
            user: {
                url: "api/basicdata/trees/user",
                name: "name",
                idKey: "id",
                pIdKey: "pid"
            },
            areaType: {
                url: "api/basicdata/trees/areaType",
                name: "name",
                idKey: "id",
                pIdKey: "pid"
            },
            countyType: {
                url: "api/basicdata/trees/countyType",
                name: "name",
                idKey: "id",
                pIdKey: "pid"
            },
            totalCourt: {
                url: "api/basicdata/trees/totalCourt",
                name: "name",
                idKey: "id",
                pIdKey: "pid"
            },
            student: {
                url: "api/basicdata/trees/student",
                name: "name",
                idKey: "id",
                pIdKey: "pid"
            },
            region: {
                url: "api/pw/basicdata/regions",
                name: "name",
                idKey: "id",
                pIdKey: "pid"
            },
            courtsName: {
                url: "api/basicdata/trees/court/condition/123",
                name: "name",
                idKey: "id",
                pIdKey: "pid"
            }
        };
        
        $.fd.selectTree = $.fd.selectTree || {};
        
        $.fd.selectTree.addTypes = function(types){
    		$.extend(typeOpts, types);
    	};
        
        var defaults = {};
        
        var FdSelectTree = function(ele, options){
        	this.$element = ele;
        	this.options = $.extend({}, this.defaults, options);
        };
        
        FdSelectTree.prototype = {
        	val : function(value){
        		var textEl = this.$element;
        		if(!arguments.length){
        			return textEl.attr("idValue");
        		}
        		
        		if(!value){
        			textEl.attr("idValue", null);
        			textEl.val("");
        			return;
        		}
        		
        		if($.type(value) == "string"){
        			textEl.attr("idValue", value);
        			textEl.val(value);
        		}else{
        			textEl.attr("idValue", value.id);
        			textEl.val(value.text);
        		}
        	},
        	text : function(){
        		var textEl = this.$element;
        		if(!arguments.length){
        			return textEl.val();
        		}
        		
        		if($.type(value) == "string"){
        			textEl.val(value);
        		}
        		
        	},
		    selectTree: function() {
		    	var textEl = this.$element,
		    	options = this.options,
	            tempComboTemp = '<div id="tempComboContent" class="select-tree"><ul id="tempCombo" class="ztree" style="overflow-y:auto;overflow-x:hidden;margin-top:0;max-height:300px; width:100%; padding-right:15px;"></ul></div>',
	            _name = typeOpts[options.type]["name"],
	            _id = typeOpts[options.type]["idKey"],
	            _pId = typeOpts[options.type]["pIdKey"],
	            _url = typeOpts[options.type]["url"];	       
		        
		        var setting = {
		            check: {
		                enable: options.check
		            },
		            view: {
		                dblClickExpand: false
		            },
		            callback: options.callback || {},
		            data: {
		                key: {
		                    name: _name
		                },
		                simpleData: {
		                    enable: true,
		                    idKey: _id,
		                    pIdKey: _pId
		                }
		            }
		        };
		
		        if (setting.check.enable) {
		            setting.callback.onCheck = setTextValue;
		        } else {
		            setting.callback.onClick = setTextValue;
		        }
		
		        // 选择的内容,填写到文本框和隐藏域
		        function setTextValue(e, treeId, treeNode) {
		            var zTree = $.fn.zTree.getZTreeObj("tempCombo"),
		                nodes, text = "",
		                value = "";
		
		            if (options.check) {
		                nodes = zTree.getCheckedNodes();
		            } else {
		                nodes = zTree.getSelectedNodes();
		            }
		
		            // 排序
		            nodes.sort(function compare(a, b) {
		                return a[_name] - b[_name];
		            });
		
		            for (var i = 0, l = nodes.length; i < l; i++) {
		                var node = nodes[i];
		
		                if (options.check) {
		                    // 如果子节点未被全部选择, 则不记录
		                    if (node.isParent && node.getCheckStatus().half) {
		                        continue;
		                    }
		
		                    // 父节点是全被选,则不记录子节点
		                    if (node.getParentNode() && !node.getParentNode().getCheckStatus().half) {
		                        continue;
		                    }
		                }
		                
		                if(options.fullText){
		                	$.each(node.getPath(), function(ii, dd){
		                		text += dd.name + " ";
		                	});
		                	text = $.trim(text) + ",";
		                }else{
		                	text += node[_name] + ",";
		                }
		                
		                
		                value += node[_id] + ",";
		            }
		
		            if (text.length > 0) {
		                text = text.substring(0, text.length - 1);
		                value = value.substring(0, value.length - 1);
		            }
		
		            textEl.val(text);
		            textEl.attr("idValue", value);
		            
		            textEl.trigger("changeTree");
		
		            if (!options.check) {
		                hideMenu();
		            }
		        }
		
		        // 显示下拉框
		        function showMenu() {
		            if (textEl.attr("readonly")) {
		                return false;
		            }
		            $.fd.ajax({
		                url: _url,
		                type: "get",
		                success: function(d) {
		                    if (!$("#tempComboContent").length) {
		                        textEl.after(tempComboTemp);
		                    }
		
		                    var zTree = $.fn.zTree.init($("#tempCombo"), setting,
		                        d.data);
		
		                    $("#tempComboContent").css({
		                        left: "5px",
		                        "overflow-y":"hidden",
		                        "overflow-x":"hidden",
		                        top: textEl.outerHeight() + "px",
		                        "min-width" : textEl.outerWidth() + "px"
		                    }).slideDown("fast");
		                    $("body").bind("mousedown", onBodyDown);
		
		                    var nodes = zTree.getNodes();
		
		                    if (options.check) {
		                        if (!textEl.attr("idValue")) {
		                            return false;
		                        }
		
		                        // 绑定数值
		                        var selected = textEl.attr("idValue").split(",");
		                        $.each(nodes, function(index, node) {
		                            if ($.inArray(node[_id], selected) != -1) {
		                                zTree.checkNode(node, true, true);
		                                zTree.expandNode(node, true, true, true);
		                            } else {
		                                zTree.checkNode(node, false, true);
		                                zTree.expandNode(node, false, true, true);
		                            }
		                        });
		                    }
		                }
		            });
		        }
		
		        // 隐藏下拉框
		        function hideMenu() {
		            $("#tempComboContent").fadeOut("fast");
		            $("body").unbind("mousedown", onBodyDown);
		            $("#tempComboContent").remove();
		        }
		
		        // 点击的不是菜单或输入框时,隐藏菜单
		        function onBodyDown(event) {
		            if (!(event.target.id == "tempComboContent" || 
		            		$(event.target).parents("#tempComboContent").length > 0||
		            		$(event.target).next("#tempComboContent").length > 0)) {
		                hideMenu();
		                var idValue = textEl.attr("idValue");
		                if (!idValue) {
		                	textEl.val("");
		                }else{
		                	var treeObj = $.fn.zTree.getZTreeObj("tempCombo");
		                	var nodes = treeObj.getNodesByParam(_id, idValue, null);
		                	if(nodes.length > 0){
		                		textEl.val(nodes[0][_name]);	
		                	}
		                }
		            }
		        }
		
		        // 监测输入内容,是否变化
		        var isChange = function() {
		
		            if ($.trim(textEl.val()) == "") {
		                textEl.attr("idValue", "");
		            }
		
		            // 输入框添加属性,保存上次输入值
		            if (typeof(textEl.attr('orgVal')) == "undefined") {
		                textEl.attr('orgVal', $.trim(textEl.val()));
		                return true;
		            }
		
		            if (textEl.attr('orgVal') == $.trim(textEl.val())) {
		                return false;
		            }
		
		            textEl.attr('orgVal', $.trim(textEl.val()));
		            return true;
		        };
		
		        // 检索树节点,
		        var searchNode = function(e) {
		
		            // 输入内容无变化时,中止处理
		            if (!isChange()) {
		                return false;
		            }
		
		            var zTree = $.fn.zTree.getZTreeObj("tempCombo");
		            var allNodes = zTree.transformToArray(zTree.getNodes());
		
		            // 输入内容为空时,显示所有的节点
		            if ($.trim(textEl.val()) == "") {
		                zTree.showNodes(allNodes);
		                return false;
		            }
		
		            // 隐藏所有的节点
		            zTree.hideNodes(allNodes);
		
		            // 根据输入内容,匹配到的所有节点,进行显示
		            var matchNodes = zTree.getNodesByParamFuzzy(_name, $.trim(textEl
		                .val()), null);
		            zTree.showNodes(matchNodes);
		
		            // 显示匹配到节点的所有父节点
		            $.each(matchNodes, function(index, node) {
		                zTree.showNodes(node.getPath());
		            });
		
		            // 全部展开
		            zTree.expandAll(true);
		        };
		
		        // 绑定检索事件
		        textEl.on('keyup paste', searchNode);
		        // 输入框获得焦点时,显示菜单
		        textEl.focus(showMenu);
		    }
		};

        $.fn.FdSelectTree = function(options) {
            var selectTree = new FdSelectTree(this, options);
            selectTree.selectTree();
            return selectTree;
        };
    });
    
})(jQuery, window, document);
