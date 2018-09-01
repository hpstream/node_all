(function(){ 
    //Section 1 : 按下自定义按钮时执行的代码 
    var a= { 
        exec:function(editor){ 
            // alert("这是自定义按钮"); 
            // console.log(editor);
            var data = '';
            var mySelection = editor.getSelection();
            if (CKEDITOR.env.ie) {
                mySelection.unlock(true);
                data = mySelection.getNative().createRange().text;
            } else {
                data = mySelection.getNative();
            }
            editor.insertHtml('<b>'+data+'</b>');
        } 
    }, 
    //Section 2 : 创建自定义按钮、绑定方法 
    b='linkbutton'; 
    CKEDITOR.plugins.add(b,{ 
        init:function(editor){ 
            editor.addCommand(b,a); 
            editor.ui.addButton('linkbutton',{ 
                label:'Link Button', 
                icon: this.path + '1.jpg', 
                command:b 
            }); 
        } 
    }); 
})(); 