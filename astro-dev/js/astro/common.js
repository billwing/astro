define("/js/astro/common", ["$", "dialog", "confirmbox", "util"], function(require, exports, module) {

    var $ = require('$');

    // dialog
    var Dialog = require('dialog');

    // confirmbox
    var ConfirmBox = require('confirmbox');

    // util
    var Util = require('util');

    // Ajax 请求
    if($('#form').length) {
        $.ajax({
            type: 'POST',
            url: '#',
            data: 'key=' + value,
            dataType: 'json',
            //cache: false,
            beforeSend: function(XHR) {
                Util.loaderShow();
            },
            complete: function(XHR, TS) {
                Util.loaderHide();
            },
            success: function(r) {
                var code = r.code;
                var msg = r.msg;

                if(code == 1) {
                    ConfirmBox.alert('请求成功~', function(){}, {width:300});
                } else {
                    ConfirmBox.alert('请求失败~');
                }
            },
            error: function() {
                alert('操作失败，请稍后再试！');
            }
        });
    }

});
