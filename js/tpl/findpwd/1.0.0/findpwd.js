define("tpl/findpwd/1.0.0/findpwd", ["$", "util", "urlconfig", "validatorrules", "mobilecode"], function(require, exports, module) {

    var $ = require('$');

    // util
    var Util = require('util');

    // urlconfig
    var UrlConfig = require('urlconfig');

    // validatorrules
    var ValidatorRules = require('validatorrules');

    // mobilecode
    var MobileCode = require('mobilecode');

    // 邮箱找回密码
    var findPwdMailForm = $('#J-findPwdMailForm');
    if(findPwdMailForm.length) {
        var findPwdMailVal = new ValidatorRules({
            element: findPwdMailForm,
            autoSubmit: false
        });

        exports.findPwdMailVal = findPwdMailVal;

        if(findPwdMailForm.find('[name=account]').length) {
	        findPwdMailVal.addItem({
	            element: '[name=account]',
	            required: true,
	            rule: 'account'
	        });
	    }
        findPwdMailVal.addItem({
            element: '[name=email]',
            required: true,
            rule: 'email'
        });
        findPwdMailVal.addItem({
            element: '[name=eml_code]',
            required: true,
            rule: 'mobiCode'
        });
        findPwdMailVal.addItem({
            element: '[name=new_pwd]',
            required: true,
            rule: 'password'
        });
        findPwdMailVal.addItem({
            element: '[name=re_pwd]',
            required: true,
            rule: 'confirmation{target: "#J-findPwdMailNew"}'
        });
        if(findPwdMailForm.find('[name=img_code]').length) {
            findPwdMailVal.addItem({
                element: '[name=img_code]',
                required: true,
                rule: 'imgCode'
            });
        }

        findPwdMailForm.submit(function() {
            Util.userAsync($(this), UrlConfig.findPwdByEmail_url);
        });
    }

    // 手机找回密码
    var findPwdMobiForm = $('#J-findPwdMobiForm');
    if(findPwdMobiForm.length) {
        var findPwdMobiVal = new ValidatorRules({
            element: findPwdMobiForm,
            autoSubmit: false
        });

        exports.findPwdMobiVal = findPwdMobiVal;

        if(findPwdMobiForm.find('[name=account]').length) {
	        findPwdMobiVal.addItem({
	            element: '[name=account]',
	            required: true,
	            rule: 'account'
	        });
	    }
        findPwdMobiVal.addItem({
            element: '[name=mobile]',
            required: true,
            rule: 'mobile'
        });
        findPwdMobiVal.addItem({
            element: '[name=mob_code]',
            required: true,
            rule: 'mobiCode'
        });
        findPwdMobiVal.addItem({
            element: '[name=new_pwd]',
            required: true,
            rule: 'password'
        });
        findPwdMobiVal.addItem({
            element: '[name=re_pwd]',
            required: true,
            rule: 'confirmation{target: "#J-findPwdMobiNew"}'
        });
        
        findPwdMobiForm.submit(function() {
            Util.userAsync($(this), UrlConfig.resetPwdByMobile_url);
        });
    }

    // 密码重置
    var findPwdResetForm = $('#J-findPwdResetForm');
    if(findPwdResetForm.length) {
        var findPwdResetVal = new ValidatorRules({
            element: findPwdResetForm,
            autoSubmit: false
        });

        exports.findPwdResetVal = findPwdResetVal;

        findPwdResetVal.addItem({
            element: '[name=eml_code]',
            required: true,
            rule: 'mobiCode'
        });
        findPwdResetVal.addItem({
            element: '[name=new_pwd]',
            required: true,
            rule: 'password'
        });
        findPwdResetVal.addItem({
            element: '[name=re_pwd]',
            required: true,
            rule: 'confirmation{target: "#J-findPwdResetNew"}'
        });

        findPwdResetForm.submit(function() {
            Util.userAsync($(this), UrlConfig.resetPwdByEmail_url);
        });

    }

});
