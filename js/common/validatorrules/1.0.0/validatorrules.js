define("common/validatorrules/1.0.0/validatorrules", ["$", "urlconfig", "validator"], function(require, exports, module) {

    var $ = require('$');

    // urlconfig
    var UrlConfig = require('urlconfig');

    // validator
    ValidatorRules = require('validator');
    
    // 验证账号格式
    ValidatorRules.addRule('account', /^[a-zA-Z][a-zA-Z0-9_]{6,15}$/, '请输入正确的{{display}}');

    // 验证登录账号
    var userAccount = ValidatorRules.getRule('mobile').or('email');
    ValidatorRules.addRule('userAccount', userAccount, '请输入正确的{{display}}');
    var loginAccount = ValidatorRules.getRule('userAccount').or('account');
    ValidatorRules.addRule('loginAccount', loginAccount, '请输入正确的{{display}}');

    // 验证密码格式
    ValidatorRules.addRule('password', /^[a-zA-z0-9]{6,16}$/, '请输入正确的{{display}}');

    // 检查账号唯一性
    ValidatorRules.addRule('checkAccount', function(options, commit) {
        $.post(UrlConfig.checkAccount_url, {account: options.element.val()}, function(data) {
            commit(data.code == '-1' ? null : data.code, data.response);
        }, 'json');
    });

    // 验证昵称格式
    ValidatorRules.addRule('nickName', /[^%&,;=?$\x22]{4,20}/, '请输入正确的{{display}}');

    // 检查昵称唯一性
    ValidatorRules.addRule('checkNickNmae', function(options, commit) {
        $.post(UrlConfig.checkNickNmae_url, {account: options.element.val()}, function(data) {
            commit(data.code == '-1' ? null : data.code, data.response);
        }, 'json');
    });

    // 验证固话格式
    ValidatorRules.addRule('tel', /^\d{3}-\d{8}|\d{4}-\d{7,8}$/, '请输入正确的{{display}}');

    // 检查手机号唯一性
    ValidatorRules.addRule('checkMobile', function(options, commit) {
        $.post(UrlConfig.checkMobile_url, {mobile: options.element.val()}, function(data) {
            commit(data.code == '-1' ? null : data.code, data.response);
        }, 'json');
    });

    // 验证真实姓名
    ValidatorRules.addRule('realName', /^[\u4E00-\u9FA5]{2,4}$/, '请输入正确的{{display}}');

    // 验证身份证号码
    ValidatorRules.addRule('idCard', /^[1-9]\d{14}$|^[1-9]\d{16}(\d|x|X)$/, '请输入正确的{{display}}');
    
    // 验证图片验证码
    ValidatorRules.addRule('imgCode', /^\d{4}$/, '请输入正确的{{display}}');
    
    // 验证手机验证码
    ValidatorRules.addRule('mobiCode', /^\d{6}$/, '请输入正确的{{display}}');
    
    // 验证下拉框必选
    ValidatorRules.addRule('isSelect', function(options) {
        var selVal = $(options.element).val();
        return selVal != 0;
    }, '请选择正确的{{display}}');

    module.exports = ValidatorRules;

});
