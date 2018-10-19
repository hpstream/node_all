// 下载
$.fd.download = function (data, url, requestType) {
    var url = url || "api/attachments/owners/batch";
    var method = requestType || "get";

    if ($.type(data) == "string") {
        url = data;
        data = {};
    }
    if (url && data) {
        var inputs = '';
        $.each(data, function (name, value) {
            if ($.isPlainObject(value) || $.isArray(value)) {
                inputs += '<input type="hidden" name="' + name + '" value=' + (method == "get" ? encodeURI(JSON.stringify(value)) : JSON.stringify(value)) + ' />';
            } else {
                inputs += '<input type="hidden" name="' + name + '" value=\'' + (method == "get" ? encodeURI(value) : value) + '\' />';
            }
        });

        // request发送请求
        $('<form action="' + url + '" method="' + method + '">' + inputs + '</form>')
            .appendTo('body').submit().remove();
    };
};