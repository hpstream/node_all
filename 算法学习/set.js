function classify(data = [], key = 'seriesName') {
    const obj = {}
    for (let i = 0; i < data.length; i++) {
        const item = data[i][key]
        obj[item] = obj[item] || []
        obj[item].push(data[i])
    }
    return obj
}
function changeToTree(data, id, pid) {
    const date = new Date()
    const d_class = classify(data, id)
    const p_class = classify(data, pid)
    let back = []
    for (const key in p_class) {
        // d_class[key]为true的时候说明不是根节点
        if (!d_class[key]) {
            back = back.concat(getChild(p_class[key], id, p_class))
        }
    }
    function getChild(data, id, p_class) {
        let child = []
        for (const item of data) {
            const detail = { ...item }
            child.push(detail)
            // p_class[item[id]]为true的时候说明他还有子集
            if (p_class[detail[id]]) {
                detail.child = getChild(p_class[detail[id]], id, p_class)
            }
        }
        return child
    }
    console.log(new Date() - date)
    return back
}

var cardData = [{
    clueId: '123', //线索id
    clueName: '2017考评版本第一版已生效状态', //线索名称
    isRemark: false, //是否已标记
    updateTime: '2017-12-01', //更新时间
    status: '审核中', //线索状态
    reporter:'张三', //举报对象
    infoSource:'**网', //信息来源
    checkType:'问卷', //核查方式
    checkResult:'很好', //核查结果
    cluePoint:'线索点1' //线索点
}]
var data = [
    { icon: 'example',
        id: 'demo',
        name: 'demo',
        requestUrl: '/demo',
        parentId: null,
        type: ''
    },
    { icon: 'example',
        id: 'css',
        name: 'css',
        permissionName: 'css',
        parentId: 'demo',
        requestUrl: '/demo/css',
        type: ''
    },
    { icon: 'example',
        id: 'color',
        name: 'color颜色',
        parentId: 'demo',
        requestUrl: '/demo/color',
        type: ''
    },
    { icon: 'example',
        id: 'standard',
        name: '项目规范',
        parentId: 'demo',
        requestUrl: '/demo/codeStandard',
        type: ''
    },
    { icon: 'example',
        id: 'icons',
        name: 'ICONS',
        parentId: 'demo',
        requestUrl: '/demo/icons',
        type: ''
    },
    { icon: 'example',
        id: 'variant',
        name: '全局变量',
        parentId: 'demo',
        requestUrl: '/demo/variant',
        type: ''
    },
    { icon: 'example',
        id: 'method',
        name: '公共方法',
        parentId: 'demo',
        requestUrl: '/demo/method',
        type: ''
    },
    { icon: 'example',
        id: 'component',
        name: '组件使用',
        parentId: null,
        requestUrl: '/demo1',
        type: ''
    },
    { icon: 'example',
        id: 'table',
        name: '表格使用',
        parentId: 'component',
        requestUrl: '/demo1/table',
        type: ''
    },
    { icon: 'example',
        id: 'tree',
        name: 'tree使用',
        parentId: 'component',
        requestUrl: '/demo1/tree',
        type: ''
    },
    { icon: 'example',
        id: 'card',
        name: '卡片使用',
        parentId: 'component',
        requestUrl: '/demo1/card',
        type: ''
    },
    { icon: 'example',
        id: 'echart',
        name: 'echart',
        parentId: 'component',
        requestUrl: '/echart',
        type: ''
    },
    { icon: 'example',
        id: 'date',
        name: '日期选择器',
        parentId: 'component',
        requestUrl: '/date',
        type: ''
    },
    { icon: 'example',
        id: 'inputTree',
        name: '下拉框选择树',
        parentId: 'component',
        requestUrl: '/inputTree',
        type: ''
    },
    { icon: 'example',
        id: 'scrollBar',
        name: 'scrollBar',
        parentId: 'component',
        requestUrl: '/scrollBar',
        type: ''
    },
    { icon: 'example',
        id: 'toolTip',
        name: 'toolTip',
        parentId: 'component',
        requestUrl: '/toolTip',
        type: ''
    },
    { icon: 'example',
        id: 'system',
        name: '系统管理',
        parentId: null,
        requestUrl: '/system',
        type: ''
    },
    { icon: 'example',
        id: 'addPage',
        name: '增加页面',
        parentId: 'system',
        requestUrl: '/demo1/addPage',
        type: ''
    },
    { icon: 'example',
        id: 'permission',
        name: '菜单管理',
        parentId: 'system',
        requestUrl: '/permission',
        type: ''
    }
];
console.log('changeToTree', changeToTree(data,"id","parentId"));
console.timeEnd('child1');