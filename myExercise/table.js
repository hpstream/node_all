/**
 * Created by hp on 2018-01-10.
 */
var tree = [{ id: "1", parentId: "", name: "一级目录", listType: "1", parentName: '', sortId: '', weights: '' },
	{ id: "11", parentId: "1", name: "二级目录", listType: "1", parentName: '', sortId: '', weights: '' },
	{ id: "111", parentId: "11", name: "指标1", listType: "2", parentName: '', sortId: '', weights: '' },
	{ id: "112", parentId: "11", name: "指标2", listType: "2", parentName: '', sortId: '', weights: '' },
	{ id: "2", parentId: "", name: "一级目录2", listType: "", parentName: '', sortId: '', weights: '' },
	{ id: "21", parentId: "2", name: "指标3", listType: "2", parentName: '', sortId: '', weights: '' },
	{ id: "22", parentId: "2", name: "二级目录2", listType: "1", parentName: '', sortId: '', weights: '' },
	{ id: "221", parentId: "22", name: "指标4", listType: "2", parentName: '', sortId: '', weights: '' }]


var target = [{ id: "111", value: "11" }, { id: "112", value: "22" }, { id: "21", value: "33" }, {
	id: "221",
	value: "44"
}];

var columns = [];
//tree的最大深度
var deep = 0;
//数组转换成对象
var treeObj = changeArrToObj(tree, "id");
//数组转换成对象
var targetObj = changeArrToObj(target, "id");
//获取叶子节点，返回所有叶子节点的id
var leafs = getLeafNode(tree);
//获取根节点，返回所有根子节点的id
var roots = getRootNode(tree);
var leafSort = [];
//从下往上算出所有的节点宽度
getChildLength(leafs, treeObj);
getChildNode(treeObj);
getColumnsArr(roots, treeObj, columns);
getLeafSort(roots, treeObj, leafSort);
console.log('leafSort', leafSort);
columns.push(getLastRow(leafSort));


var result = getColumns(columns, deep + 1);

console.log(result);

function getLastRow(data) {
	var back = [];
	for (var i = 0; i < data.length; i++) {
		back.push({ field: data[i], text: targetObj[data[i]].value });
	}
	return back;
}

//找个每个节点的直系子节点 //找到所有子孩子
function getChildNode(treeObj) {
	for (var key in treeObj) {
		var parentId = treeObj[key].parentId;
		if (parentId !== "") {
			treeObj[parentId].child = treeObj[parentId].child || [];
			treeObj[parentId].child.push(treeObj[key].id);
		}
	}
}

function getLeafSort(roots, treeObj, leafSort) {
	for (var i = 0; i < roots.length; i++) {
		var child = treeObj[roots[i]].child;
		if (child) {
			getLeafSort(child, treeObj, leafSort)
		} else {
			leafSort.push(roots[i]);
		}
	}
}

function getColumnsArr(roots, treeObj, columns) {
	var child = [];
	var column = [];
	for (var i = 0; i < roots.length; i++) {
		var row = treeObj[roots[i]];
		var item = { text: row.name, colspan: row.childCount, rowspan: 1 };
		if (row.listType === "2") {//根节点的时候需要合并剩余的行数
			item.rowspan = deep - columns.length;//在columns.push之前的前提是第一级不会是指标

		}
		column.push(item);
		if (row.child) {
			child = child.concat(row.child);
		}
	}
	columns.push(column);
	if (child.length) {
		getColumnsArr(child, treeObj, columns)
	}
}

function getColumns(data, deep) {
	//数组的长度代表所在的行数
	var start = [[{ text: "名称1", colspan: 1 }]];
	var end = [[{ text: "名称2", colspan: 2 }], [{ text: "名称2-1" }, { text: "名称2-2" }]];
	start[0][0].rowspan = deep;
	end[0][0].rowspan = deep;
	end[0][0].rowspan = deep - 1;
	var cols = [];
	for (var i = 0; i < deep; i++) {
		cols[i] = (start[i] || []).concat(data[i] || []).concat(end[i] || []);
	}
	return cols;
}

function getChildLength(leafs, treeObj) {
	var parent = [];
	var parentObj = {};
	var parentId = '';
	deep++;
	for (var i = 0; i < leafs.length; i++) {
		parentId = treeObj[leafs[i]].parentId;
		//根节点的child长度默认为1
		treeObj[leafs[i]].childCount = treeObj[leafs[i]].childCount || 1
		if (parentId !== "") {
			if (treeObj[parentId].childCount) {
				treeObj[parentId].childCount += treeObj[leafs[i]].childCount;
			} else {
				treeObj[parentId].childCount = treeObj[leafs[i]].childCount;
			}
			if (!parentObj[parentId]) {
				parentObj[parentId] = true;
				parent.push(parentId);
			}
		}
	}

	if (parent.length > 0) {
		getChildLength(parent, treeObj);
	}
}

function changeArrToObj(data, key) {
	var back = {};
	for (var i = 0; i < data.length; i++) {
		back[data[i][key]] = data[i]
	}
	return back;
}

//获取所有的根节点
function getRootNode(data) {
	var back = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i].parentId === "") {
			back.push(data[i].id)
		}
	}
	return back;
}

//获取所有的叶子节点
function getLeafNode(data) {
	var back = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i].listType === "2") {
			back.push(data[i].id)
		}
	}
	return back
}
