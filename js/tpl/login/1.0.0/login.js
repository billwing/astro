define("tpl/login/1.0.0/login", ["$", "dialog", "confirmbox", "util", "urlconfig", "validatorrules"], function(require, exports, module) {

    var $ = require('$');

    // dialog
    var Dialog = require('dialog');

    // confirmbox
    var ConfirmBox = require('confirmbox');

    // util
    var Util = require('util');

    // urlconfig
    var UrlConfig = require('urlconfig');

    // validatorrules
    var ValidatorRules = require('validatorrules');

    // 登录验证
    var loginForm = $('#J-loginForm');
    if(loginForm.length) {
	    var loginVal = new ValidatorRules({
	        element: loginForm,
	        autoSubmit: false
	    });

	    exports.loginVal = loginVal;

	    loginVal.addItem({
	        element: '[name=account]',
	        required: true,
	        display: '账号',
	        rule: 'loginAccount'
	    });
	    loginVal.addItem({
	        element: '[name=pwd]',
	        required: true,
	        display: '密码',
	        rule: 'password'
	    });
	    if(loginForm.find('[name=img_code]').length) {
	        loginVal.addItem({
	            element: '[name=img_code]',
	            required: true,
	            rule: 'imgCode'
	        });
	    }

	    loginForm.submit(function() {
	    	Util.userAsync($(this), UrlConfig.login_url);
	    });
	}

});
