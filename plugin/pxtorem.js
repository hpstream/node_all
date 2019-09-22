var postcss = require('postcss');
module.exports = postcss.plugin('postcss-pxToRem', function(options) {
    var pxreg = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g;
    return function(root, result) {
        // 判断第一个节点是不是 comment 节点
        if (root.nodes[0].type !== 'comment') {
            return;
        }
        // 判断节点是不是---\n XXXX \n--- 模式
        var regInfo = /^-{3}\n([\d\D]*)\n-{3}$/.exec(root.nodes[0].text);
        var regtext = null;
        var regobj = {};
        if (regInfo.length !== 2) {
            return;
        }
        regtext = regInfo[1];

        // 提出此范围的json格式的数据
        regtext.replace(/([^\n:]*):([^:\n,]*)/g, (res, key, value) => {
            regobj[key] = value;
        });

        root.walkRules(function(rules, i) {
            rules.nodes.forEach((rule) => {
                var type = rule.type;
                var value = rule.value;
                var rootSize = regobj.rootSize || '37.5';
                if (type !== 'decl') {
                    return;
                }
                var newvalue = value.replace(pxreg, (input, val) => {
                    return `${val / rootSize}rem`;
                });
                rule.value = newvalue;
            });
        });
    };
});
