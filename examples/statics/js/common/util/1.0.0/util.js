define("common/util/1.0.0/util", ["$", "dialog", "confirmbox"], function(require, exports, module) {
	
	// dialog
    var Dialog = require('dialog');

    // confirmbox
    var ConfirmBox = require('confirmbox');

    // userAgent
    var ua = (window.navigator.userAgent || '').toLowerCase();

    // 正在加载弹框
    var ajaxLoader = new Dialog({
        classPrefix: 'ui-ajaxload',
        closeTpl: false,
        content: '<div class="ajax-loader"></div>'
    });

    module.exports = {
    	// userAgent
    	ua: ua,

    	// 判断是否IE
    	isIE: ua.indexOf('msie') !== -1,

    	// 判断是否IE6
    	isIE6: ua.indexOf("msie 6") !== -1,

    	init: function() {
        
        },

    	// 显示加载弹框
    	loaderShow: function() {
		    ajaxLoader.show();
    	},

    	// 隐藏加载弹框
    	loaderHide: function() {
		    ajaxLoader.hide();
    	},

    	// 获取URL参数值
	    getUrlParam: function(name) {
	        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]); return null;
	    },

        // 验证码倒计时
        countdown: function(obj, second) {
            var that = this;
            if(second > 0){
                obj.attr('disabled', 'disabled');
                obj.val('请等待' + second + '秒');
                second --;
                setTimeout(function(){
                    that.countdown(obj, second);
                }, 1000);
            } else {
                obj.removeAttr('disabled');
                obj.val('获取验证码');
            }
        },

        // 用户异步表单
        userAsync: function(form, formurl, goto, type, dtype, data, sucmsg, errmsg) {
            var that = this;

            var asyncSub = form.find('input[type=submit]');
            var asyncUrl = formurl || form.data('action') || form.attr('action');
            var asyncGoto = goto || this.getUrlParam('redirectURL') || '/';
            var asyncType = type || 'POST';
            var asyncDType = dtype || 'json';
            var asyncData = data || form.serialize();

            if(form.find('.ui-form-item-error').length == 0) {
                $.ajax({
                    type: asyncType,
                    url: asyncUrl,
                    data: asyncData,
                    dataType: asyncDType,
                    beforeSend: function(XHR) {
                        asyncSub.attr('disabled', true);
                        that.loaderShow();
                    },
                    complete: function(XHR, TS) {
                        asyncSub.removeAttr('disabled');
                        that.loaderHide();
                    },
                    success: function(r) {
                        var code = r.code;
                        var res = r.response;
                        var gotoUrl = r.url;
                        var successMsg = sucmsg || res;
                        var errorMsg = errmsg || res;

                        if(code == 1) {
                            ConfirmBox.alert(successMsg);
                            form[0].reset();
                            if(goto != -1) {
                                location.href = gotoUrl || asyncGoto;
                            }
                        } else {
                            ConfirmBox.alert(errorMsg);
                        }
                    },
                    error: function() {
                        alert('请求失败，请稍后再试！');
                    }
                });
            } else {
                ConfirmBox.alert('请检查表单填写是否正确~');
            }
        }
    }

});
