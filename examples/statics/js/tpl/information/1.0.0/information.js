define("tpl/information/1.0.0/information", ["$", "widget", "dialog", "confirmbox", "util", "urlconfig", "validatorrules", "calendar", "address", "avatar"], function(require, exports, module) {

    var $ = require('$');

    // widget
    var Widget = require('widget');

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

    // 切换个人资料
    var infoModiBtn = $('.J-infoModiBtn');
    var infoViewBtn = $('.J-infoViewBtn');
    var infoDetShow = $('#J-infoDetShow');
    var infoDetForm = $('#J-infoDetForm');
    if(infoModiBtn.length) {
        infoModiBtn.click(function() {
            infoDetShow.hide('fast', function() {
                infoDetForm.show('400');         
            });
            infoModiBtn.hide('fast', function() {
                infoViewBtn.show('400');
            });
        });
        infoViewBtn.click(function() {
            infoDetForm.hide('fast', function() {
                infoDetShow.show('400');         
            });
            infoViewBtn.hide('fast', function() {
                infoModiBtn.show('400');
            });
        });
    }

    // 修改个人资料
    if(infoDetForm.length) {
        // 初始化所有使用`data-widget`指定的组件
        Widget.autoRenderAll();
        /*var infoDetVal = new ValidatorRules({
            element: infoDetForm,
            failSilently: true,
            autoSubmit: false
        });
        infoDetVal.addItem({
            element: '[name=name]',
            required: false,
            rule: 'realName'
        })
        .addItem({
        	element: '[name=nick]',
        	required: false,
        	rule: 'nickName'
        })
        .addItem({
            element: '[name=birthday]',
            required: false,
            rule: 'date'
        })
        .addItem({
        	element: '[name=mobile]',
        	required: false,
        	rule: 'mobile'
        })
        .addItem({
            element: '[name=industry]',
            required: false,
            rule: 'isSelect'
        })
        .addItem({
        	element: '[name=qq]',
        	required: false,
        	rule: 'qq'
        });*/
        
        infoDetForm.submit(function() {
        	Util.userAsync($(this), UrlConfig.information_url);
        });

        // calendar
        var Calendar = require('calendar');
        var calBirthday = new Calendar({
            trigger: '#J-infoBirthday'
        });

        // address
        var Address = require('address');
        var userAdd = new Address({
            defValue: $('#J-userRegion').text().split('-'),
            province: $('#J-regionProv'),
            city: $('#J-regionCity'),
            district: $('#J-regionDist')
        });
    }

    // 修改个人头像
    var avatarBtn = $('#J-avatarBtn');
    if(avatarBtn.length) {
        var Avatar = require('avatar');
    }

});
