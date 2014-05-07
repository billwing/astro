define("tpl/password/1.0.0/password", ["$", "util", "urlconfig", "validatorrules"], function(require, exports, module) {

    var $ = require('$');

    // util
    var Util = require('util');

    // urlconfig
    var UrlConfig = require('urlconfig');

    // validatorrules
    var ValidatorRules = require('validatorrules');

    // 密码管理
    var passwordForm = $('#J-passwordForm');
    if(passwordForm.length) {
        var pwdManaVal = new ValidatorRules({
            element: passwordForm,
            autoSubmit: false
        });

        exports.pwdManaVal = pwdManaVal;

        pwdManaVal.addItem({
            element: '[name=old_pwd]',
            required: true,
            rule: 'password'
        });
        pwdManaVal.addItem({
            element: '[name=new_pwd]',
            required: true,
            rule: 'password'
        });
        pwdManaVal.addItem({
            element: '[name=re_pwd]',
            required: true,
            rule: 'confirmation{target: "#J-pwdManaNew"}'
        });

        passwordForm.submit(function() {
            Util.userAsync($(this), UrlConfig.resetPwd_url);
        });

    }

});
