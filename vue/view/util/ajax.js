// 采用同步函数进行书写，房子嵌套过于严重。

export default async function ajax(url) {
    return new Promise(function (resolve, reject) {
        let ajaxSetting = {
            url: url,
            type:'get',
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject("请求失败");
            }
        }
        $.ajax(ajaxSetting);
 
    });
}
