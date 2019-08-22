/* eslint-disable no-undef */
import wb from 'front-common/build/modules.js';

function saveImg(el, cb) {
    const dom = document.querySelector(el);
    const box = window.getComputedStyle(dom);
    // DOM 节点计算后宽高
    const width = parseValue(box.width);
    const height = parseValue(box.height);
    var cloneDom = dom.cloneNode(true);
    // console.log(height);
    // 设置克隆节点的css属性，因为之前的层级为0，我们只需要比被克隆的节点层级低即可。
    // console.log(cloneDom);
    // return;
    var obj = {
        'background-color': 'transparent',
        'position': 'absolute',
        'top': '0px',
        'width': width + 'px',
        'z-index': -1,
        'height': height + 'px'
    };
    for (var key in obj) {
        cloneDom.style[key] = obj[key];
    }
    // 将克隆节点动态追加到body后面。
    document.body.appendChild(cloneDom);
    // 获取像素比
    const scaleBy = DPR();
    // 创建自定义 canvas 元素，设置高清图片
    const canvas = document.createElement('canvas');
    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;
    // 设定 canvas css宽高为 DOM 节点宽高
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    // 获取画笔
    const context = canvas.getContext('2d');
    context.scale(scaleBy, scaleBy);
    // context.translate(-20, -10);

    html2canvas(cloneDom, {
        canvas,
        backgroundColor: 'transparent',
        useCORS: true
    }).then(function(canvas) {
        // 获取图片的base64
        var toDataURL = canvas.toDataURL('image/png');

        // 上传base64图片到七牛
        wb.uploadBase64Picture(toDataURL, 'anonymousTree', (res) => {
            cb && cb(res.data.imgSrc);
            cloneDom.remove();
        });
    });
}
// 四舍五入及计算数值
function parseValue(value) {
    return parseInt(value, 10);
}
// 获取像素比
function DPR() {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
    }
    return 1;
}

export default saveImg;
