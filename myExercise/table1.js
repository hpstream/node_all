/**
 * Created by hp on 2018-01-10.
 */

function formatterTableData(data) {

	var tableObj = {

		assessedNameDept: {
			userName: '被考核人',
			departName: '部门'
		},
		changeColumn: {},
		totalGear: {}
	};

	var newObj = [];
	var rootIndex = {}; // 根目录
	var metaElements = {}; // 无目录
	var notMetaElements = {}; // 有目录的

	for (var key in data) {
		if (rootIndex[data[key].parentId]) {
			rootIndex[data[key].parentId].push(data[key]);
		} else {
			rootIndex[data[key].parentId] = [];
			rootIndex[data[key].parentId].push(data[key]);
		}
	}

	hierarchy(rootIndex['blank'], 0);

	function hierarchy(root, deep) {

		for (var i in root) {
			if (rootIndex[root[i].id]) {
				root[i].children = rootIndex[root[i].id];
				root[i].col = rootIndex[root[i].id].length;
				root[i].row = 1;
				root[i].deep = deep;
				hierarchy(rootIndex[root[i].id], deep + 1);

			} else {
				root[i].children = [];
				root[i].col = 1;
				root[i].row = 1;
				root[i].deep = deep;
			}
		}
		return root;
	}

	console.log(data);
	solveData(data);

	function solveData(data) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].deep === 0) {
				console.log(data[i]);
			}
			newObj.push(data[i].deep);
		}
	}
}