define("common/emailcode/1.0.0/emailcode", ["$", "dialog", "confirmbox", "util", "urlconfig", "validatorrules"], function(require, exports, module) {

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

    // 获取验证码弹框
    var mailCodeMail;
    var mailRegFlag;
    var mailCodeDialog = new Dialog({
        trigger: '#J-getMailCode',
        width: 320,
        hasMask: true,
        content: '<div id="J-imgCodeBox" class="imgcode"><div class="ui-box"><div class="ui-box-head"><div class="ui-box-head-border"><h3 class="ui-box-head-title"><i class="icon-logo"></i>免费获取邮箱验证码</h3></div></div><div class="ui-box-container"><div class="ui-box-content"><form id="J-mailImgCodeForm" class="ui-form" action="#" method="post" name="mailImgCodeForm"><fieldset><div style="padding:0 5px 10px 20px;" class="ui-form-item"><label for="J-mailImgCodeInp">验证码：</label><input id="J-mailImgCodeInp" class="ui-input" style="width:40px;padding:4px 9px;" type="text" maxlength="4" name="img_code" /><a id="J-mailImgCodeBtn" class="imgcode-btn" href="javascript:;" title="点击换一张" onclick="this.firstChild.src=\'' + UrlConfig.imgCode_url + '&t=\' + Math.random();return false;"><img style="margin:0 5px;vertical-align:middle;" class="imgcode-img" src="http://u.n8n8.cn/User/index.php?m=Mobi&a=getVerCode">看不清？换一张</a><div style="padding-left: 50px;" class="ui-form-explain">请填写验证码</div></div><div style="padding:0 5px 10px 20px;text-align: center;" class="ui-form-item ui-form-btn"><input style="line-height:20px;" class="ui-button-sorange ui-button" type="submit" value="提交" /></div></fieldset></form></div></div></div></div>'
    }).before('show', function() {
        var getCodeBtn = this.activeTrigger;
        var emailInp = getCodeBtn.parents('form').find('[name=email]');
        mailCodeMail = $.trim(emailInp.val());
        mailRegFlag = $('#J-mailRegAcc').length;

        if(mailCodeMail == '') {
            ConfirmBox.alert('请输入邮箱地址~', function() {
                emailInp.focus();
            });
            return false;
        } else if(!(/^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/).test(mailCodeMail)) {
            ConfirmBox.alert('请输入正确的邮箱地址');
            return false;
        }
    }).after('show', function() {
        var mailImgCodeVal = new ValidatorRules({
            element: '#J-mailImgCodeForm',
            autoSubmit: false
        });
        mailImgCodeVal.addItem({
            element: '[name=img_code]',
            required: true,
            rule: 'imgCode'
        });
        $('#J-mailImgCodeBtn').click();
        $('#J-mailImgCodeInp').val('').focus();
    });

    // 获取验证码提交
    $('#J-mailImgCodeForm').live('submit', function(event) {
        event.preventDefault();
        var imgCode = $.trim($('#J-mailImgCodeInp').val());
        var mailCodeUrl = UrlConfig.getEmailCode_url;
        if(mailRegFlag) {
            mailCodeUrl = UrlConfig.getEmailCode2_url;
        }
        if($(this).find('.ui-form-item-error').length == 0) {
            $.ajax({
                type: 'POST',
                url: mailCodeUrl,
                data: 'email=' + mailCodeMail + '&img_code=' + imgCode,
                dataType: 'json',
                beforeSend: function(XHR) {
                    Util.loaderShow();
                },
                complete: function(XHR, TS) {
                    Util.loaderHide();
                },
                success: function(r) {
                    var code = r.code;
                    var msg = r.response;

                    if(code == 1) {
                        mailCodeDialog.hide();
                        Util.countdown($('#J-getMailCode'), 60);
                        ConfirmBox.alert('验证码发送成功，请注意查收~');
                    } else {
                        ConfirmBox.alert(msg);
                    }
                },
                error: function() {
                    alert('请求失败，请稍后再试！');
                }
            });
        } else {
            ConfirmBox.alert('请正确输入图片验证码~');
        }
    });
});
