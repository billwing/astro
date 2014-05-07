define("common/avatar/1.0.0/avatar", ["$", "dialog", "confirmbox", "upload", "util", "urlconfig"], function(require, exports, module) {
	
	// dialog
    var Dialog = require('dialog');

    // confirmbox
    var ConfirmBox = require('confirmbox');

    // upload
    var Uploader = require('upload');

    // util
    var Util = require('util');

    // urlconfig
    var UrlConfig = require('urlconfig');

    // 修改个人头像
    if($('#J-avatarBtn').length) {
        var avatarBox = new Dialog({
            trigger: '#J-avatarBtn',
            width: 360,
            height: 100,
            hasMask: true,
            content: '<div style="padding:40px 0 0 10px;"><input id="J-avaUploadTxt" style="width:180px;" class="ui-input ui-input-hover" disabled="disabled" type="text" /><input id="J-avaUploadSel" style="height:30px;margin:-1px 0 0 10px;line-height:30px;" class="ui-button-sorange ui-button" type="button" name="file" value="浏览" /><input id="J-avaUploadBtn" style="height:30px;margin:-1px 0 0 10px;line-height:30px;" class="ui-button-sblue ui-button" type="button" value="上传" /></div>'
        }).after('show',function() {
            $('#J-avaUploadBtn').attr('disabled', false);
            var avatarUpload = new Uploader({
                trigger: '#J-avaUploadSel',
                name: 'file',
                accept: 'image/*',
                action: UrlConfig.avatar_url
            }).change(function(filename) {
                $('#J-avaUploadTxt').val(filename);
            }).success(function(r) {
                var r = $.parseJSON(r);
                var code = r.code;
                var res = r.response;
                var avaSrc = r.url;

                Util.loaderHide();
                if(code == 1) {
                    $('#J-avatarImg').attr('src', avaSrc);
                    $('#J-avaUploadTxt').val('');
                    avatarBox.hide();
                    ConfirmBox.alert('头像上传成功！');
                } else {
                    $('#J-avaUploadBtn').attr('disabled', false);
                    ConfirmBox.alert('头像上传失败！');
                }
            });
            $('#J-avaUploadBtn').unbind('click').bind('click', function() {
                var upFile = $.trim($('#J-avaUploadTxt').val());
                if(upFile != '') {
                    $(this).attr('disabled', true);
                    avatarUpload.submit();
                    Util.loaderShow();
                } else {
                    ConfirmBox.alert('请选择您要上传的头像~');
                }
                return false;
            });
        });
    }
});
