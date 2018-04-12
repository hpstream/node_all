(function(w,d){
    var id = 1; // 此id无实在意义，仅为操作id
    w.Base64 = function(imgFile){
        this.imgFile = imgFile;
		this.imgData = [];
        // 定义方法
    	var pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/;      
        if(!pattern.test(this.imgFile.value)) { 
          alert("请上传jpg/jpeg/png/gif/bmp格式的照片！");  
          this.imgFile.focus(); 
        }else{
           //判断浏览器类型
           if(document.all){ 
              //兼容IE
              this.ieBase64(this.imgFile.value, document.getElementById(this.id), this.width, this.height);
           }else{
              //兼容主流浏览器 
              this.mainBase64(this.imgFile.files[0], document.getElementById(this.id), this.width, this.height);
           }
        } 
    };
    Base64.prototype = {
        ieBase64: function(file, ele, width, height){
            var realPath, xmlHttp, xml_dom, tmpNode, imgBase64Data;
            realPath = file;//获取文件的真实本地路径.
            xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
            xmlHttp.open("POST",realPath, false);
            xmlHttp.send("");
            xml_dom = new ActiveXObject("MSXML2.DOMDocument");
            tmpNode = xml_dom.createElement("tmpNode");
            tmpNode.dataType = "bin.base64";
            tmpNode.nodeTypedValue = xmlHttp.responseBody;
            imgBase64Data = "data:image/bmp;base64," + tmpNode.text.replace(/\n/g,"");
			this.imgData.push(imgBase64Data);
        },
        mainBase64: function(file, ele, width, height){
            var fileReader, imgData;
        	fileReader = new FileReader();  
            fileReader.readAsDataURL(file); 
			var that = this;
            fileReader.onload = function () {  
                imgData = this.result; //base64数据
				that.imgData.push(imgData);
            }
        }
    }
})(window,document);

