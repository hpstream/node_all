/**
 * 练习os模块
 */

var os = require('os');
// 查看操作系统平台
const platform = os.platform();

// 查看操作系统版本
const release = os.release();
// 查看操作系统名称
const type = os.type();
// 查看cpu架构
const arch = os.arch();


// console.log(platform);
// console.log(release);
// console.log(type);
// console.log(arch);

console.log(os.cpus().length);

$(function () {
	var data= [
		{
			"parentName": "",
			"sortId": 1,
			"name": "一级目录",
			"id": "catalogName",
			"weights": null,
			"listType": "2",
			"parentId": ""
		},
		{
			"parentName": "一级目录",
			"sortId": 2,
			"name": "参办案件工作量",
			"id": "zb_fy_00001",
			"weights": "100",
			"listType": "1",
			"parentId": "catalogName"
		},
		{
			"parentName": "一级目录",
			"sortId": 3,
			"name": "参办案件数",
			"id": "zb_fy_00002",
			"weights": "100",
			"listType": "1",
			"parentId": "catalogName"
		},
		{
			"parentName": "",
			"sortId": 4,
			"name": "二级目录1",
			"id": "catalogName1515392765448",
			"weights": null,
			"listType": "2",
			"parentId": ""
		},
		{
			"parentName": "二级目录1",
			"sortId": 5,
			"name": "承办人案件工作量",
			"id": "zb_fy_00003",
			"weights": "100",
			"listType": "1",
			"parentId": "catalogName1515392765448"
		},
		{
			"parentName": "二级目录1",
			"sortId": 6,
			"name": "承办人案件数",
			"id": "zb_fy_00004",
			"weights": "100",
			"listType": "1",
			"parentId": "catalogName1515392765448"
		},
		{
			"parentName": "",
			"sortId": 7,
			"name": "三级目录1",
			"id": "catalogName1515392765449",
			"weights": null,
			"listType": "2",
			"parentId": ""
		},
		{
			"parentName": "三级目录1",
			"sortId": 8,
			"name": "审判长案件工作量",
			"id": "zb_fy_00005",
			"weights": "100",
			"listType": "1",
			"parentId": "catalogName1515392765449"
		},
		{
			"parentName": "三级目录1",
			"sortId": 9,
			"name": "审判长案件数",
			"id": "zb_fy_00006",
			"weights": "100",
			"listType": "1",
			"parentId": "catalogName1515392765449"
		}
	];
	var dir ={};
	var leaf = {};
	var colums = [];
	for(var i=0;i<data.length;i++){
		if(data[i].listType == 1){//子叶
			data[i].col=1;
			data[i].row=1;
			leaf[data[i].id] = data[i]
		}else{
			dir[data[i].id] = data[i]
		}
	}
	var maxDeep = 0;
	var firstDir = {};
	for(var key in leaf){
		//算出最大深度
		var tempDeep = getDeep(leaf[key].parentId);
		if(tempDeep>maxDeep){
			maxDeep = tempDeep;
		}
		var tempPid = leaf[key].parentId

		//找到每个跟节点的父节点有多少个子节点
		if(firstDir[tempPid]){
			firstDir[tempPid].maxWidth++;
		}else{
			firstDir[tempPid] = {
				deep:1,
				maxWidth:1
			};
		}
	}

	colums.push(leaf)
	//找到每一个目录占多少宽度
	getDir(firstDir);

	function getDeep(key) {
		var deep = 1;

		loop(key);
		function loop(key) {
			if(dir[key]){
				deep++;
				loop(dir[key].parentId);
			}
		}

		return  deep;
	}


	function getDir(tempdir) {
		var temp ={};

		for(var key in tempdir){

			if(dir[key].parentId ==''){
				dir[key].col =tempdir[key].maxWidth;
				dir[key].row =1;
				continue;
			}else{
				dir[key].col =tempdir[key].maxWidth;
				dir[key].row =maxDeep - tempdir[key].deep;
			}
			if(dir[key].parentId){
				temp[dir[key].parentId].maxWidth++;
			}else{
				temp[dir[key].parentId] = {
					deep:tempdir[key].deep++,
					maxWidth:1
				};
			}
		}

		if(jQuery.isEmptyObject(temp)){
			return ;
		}
		colums.push(temp);
		getDir(temp);
	}


	var istemp = {};
	for(var m=0;m<data.length;m++){
		if(data[m].parentId ==''){
			istemp[data[m].id] = data[m];
		}
	}
	colums.push(istemp);
	console.log(colums);
})

