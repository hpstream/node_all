
主要面临问题：
1.业务需求没有做到拆分。





播放：
调用画板提供的功能
暂停/播放

画板：

提供功能：(通过事件钩子暴露出所需要的数据)
绘画
撤销
恢复
清空画布
改变背景色
改变画笔颜色
改变画笔粗细
橡皮擦（改变画笔颜色成背景色）




canvasApi.js(core.js)  主要对浏览器的原生api，事件做出一定的封装。
utils.js  主要使处理data 的方法集合。
tapable.js  主要用于js异步复杂逻辑问题。
wb_jq.js  封装简单的dom操作。
