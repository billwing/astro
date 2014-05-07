define("common/consult/1.0.0/consult", ["$", "widget", "templatable", "confirmbox", "gallery/selection/0.9.0/selection"], function(require, exports, module) {

    // Consult
    // -----------
    // 咨询组件，核心特征是：投顾咨询弹窗

    var $ = require('$');
    var Widget = require('widget');
    var ConfirmBox = require('confirmbox');
    var Templatable = require('templatable');
    var selection = require('gallery/selection/0.9.0/selection');

    var template = '<div style="display:none;"><div id="{{consultId}}" class="{{classPrefix}}"><div class="{{classPrefix}}-hd"><h4><i class="icon-logo"></i>投顾免费在线答疑</h4></div><div class="{{classPrefix}}-bd"><form id="{{formId}}" action="" name="tgzxForm"><input id="J-source" type="hidden" name="source" value="" /><div class="form-item"><i class="icon-tg"></i><label for="J-tgSel">选择投资顾问：</label><select id="J-tgSel" class="tg-sel" name="tougu"><option value="hgw">韩冠文（资深投顾）</option><option value="hxb">胡雄兵（资深投顾）</option><option value="xdl">谢达亮（资深投顾）</option><option value="wzm">吴中明（资深投顾）</option><option value="cyz">蔡英姿（首席投顾）</option></select></div><div class="form-item-bg form-item"><span class="code"><label for="J-code">股票代码：</label><input id="J-code" class="minp" type="text" name="code"></span><span class="cost"><label for="J-cost">成本(<i class="red">选填</i>)：</label><input id="J-cost" class="minp" type="text" name="price">元</span></div><div class="form-item-bg form-item"><textarea id="J-issue" class="issue" name="comments" placeholder="输入您要提交的问题，专业投顾将及时为您解答。"></textarea></div><div class="form-item"><ul id="J-quesSel" class="ui-list"><li class="ui-list-item"><a href="javascript:;">还有机会出局吗？</a></li><li class="ui-list-item"><a href="javascript:;">能否继续持有？</a></li><li class="ui-list-item"><a href="javascript:;">能否逢低介入？</a></li><li class="ui-list-item"><a href="javascript:;">后市如何操作？</a></li></ul></div><div class="form-item"><label for="J-name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</label><input id="J-name" class="name-inp" type="text" name="name" placeholder=""><label for="J-qq">Q&nbsp;Q号码：</label><input id="J-qq" class="qq-inp" type="text" name="qq" placeholder=""></div><div class="form-item"><label for="J-mobile">手机号码：</label><input id="J-mobile" type="text" name="handset" placeholder="请输入您的常用手机，方便接听来电"></div><div class="form-item"><span class="sev-tel"><i class="icon-tel"></i><i class="red">客服热线：</i>400-700-3809</span><input id="J-submit" class="sub-btn" type="submit" value="咨&nbsp;&nbsp;询"></div></form></div><div class="{{classPrefix}}-ft"></div></div></div>';

    seajs.importStyle('.ui-consult{width:340px;background-color:#f5f5f5}.ui-consult i{font-style:normal}.ui-consult .red{color:#c00}.ui-consult-hd{height:26px;line-height:24px;color:#fff;background:url(http://s.n8n8.cn/Images/cps/tgzx/tgzx-hd-bg.png) no-repeat}.ui-consult-hd .icon-logo{display:inline-block;width:18px;height:18px;margin:-2px 5px 0 5px;vertical-align:middle;background:url(http://s.n8n8.cn/Images/cps/tgzx/jz-logo.png) no-repeat}.ui-consult-bd{padding:10px;border-width:0 1px;border-style:solid;border-color:#bd6665}.ui-consult-bd .icon-tg{display:inline-block;width:21px;height:21px;vertical-align:middle;background:url(http://s.n8n8.cn/Images/cps/tgzx/tgzx-bd-icon.png) no-repeat}.ui-consult-ft{height:29px;line-height:29px;border-width:0 1px 1px 1px;border-style:solid;border-color:#bd6665;background:#dfdfdf url(http://s.n8n8.cn/Images/cps/tgzx/tgzx-ban.png) no-repeat 50% 50%}.ui-consult input,.ui-consult textarea{width:223px;padding:0 3px}.ui-consult .form-item{padding:5px 0;padding-left:10px}.ui-consult .form-item-bg{background-color:#e2e2e2}.ui-consult .tg-sel{width:188px}.ui-consult .minp{width:58px;margin-right:5px}.ui-consult .cost{margin-left:5px;}.ui-consult .issue{width:285px;height:80px}.ui-consult .ui-list-item{display:inline-block;overflow:hidden;width:120px;padding:0 5px 0 20px;white-space:nowrap;text-overflow:ellipsis;background:url(http://s.n8n8.cn/Images/cps/tgzx/tgzx-bd-arrow.png) no-repeat 0 50%}.ui-consult .ui-list-item a{color:#c00}.ui-consult .lbl{display:inline-block;width:60px;text-align:right}.ui-consult .name-inp{width:60px;margin-right:15px}.ui-consult .qq-inp{width:80px}.ui-consult .icon-tel{display:inline-block;width:35px;height:25px;margin-right:3px;vertical-align:middle;background:url(http://s.n8n8.cn/Images/cps/tgzx/tgzx-bd-tel.png) no-repeat}.ui-consult .sub-btn{cursor:pointer;width:112px;height:34px;margin-left:5px;padding-bottom:6px;font-weight:700;font-size:22px;line-height:1;text-align:center;vertical-align:middle;color:#fff;border:0;background:url(http://s.n8n8.cn/Images/cps/tgzx/tgzx-sub-btn.png) no-repeat}');

    var Consult = Widget.extend({

        Implements: Templatable,

        attrs: {

            // 用户传入的 triggers 和 panels
            // 可以是 Selector、jQuery 对象、或 DOM 元素集
            triggers: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            consultId: 'J-consult',

            formId: 'J-tgzxForm',

            formAction: 'http://tougu.n8n8.cn/Index/index.php?m=Index&a=consultTougu',

            sucCallback: function() {},

            classPrefix: 'ui-consult',

            template: template,

            model: {}
        },

        parseElement: function() {
            this.set("model", {
                consultId: this.get('consultId'),
                formId: this.get('formId'),
                classPrefix: this.get('classPrefix')
            });
            Consult.superclass.parseElement.call(this);
        },

        setup: function() {
            var that = this;
            this._initTriggers();
            setTimeout(function() {
                that._quesSelect();
                // 来源地址
                var referer = window.location.href;
                $('#J-source').val(referer);
            }, 1000);
        },

        _initTriggers: function() {
            this._bindTriggers();
        },

        _bindTriggers: function() {
            var that = this,
                triggers = this.get('triggers'),
                form = $('#' + this.get('formId')),
                formUrl = this.get('formAction'),
                sucCallback = this.get('sucCallback');

            form.live('submit', function(e) {
                var e = e || event;
                e.preventDefault();

                var form = $(this);
                var formData = form.serialize();
                var formSub = form.find('input[type=submit]');
                
                if(form.find('.ui-form-item-error').length == 0) {
                    $.ajax({
                        type: 'GET',
                        url: formUrl,
                        data: formData,
                        dataType: 'jsonp',
                        beforeSend: function(XHR) {
                            formSub.attr('disabled', true);
                        },
                        complete: function(XHR, TS) {
                            formSub.removeAttr('disabled');
                        },
                        success: function(r) {
                            var code = r.code;
                            var msg = r.data;

                            if(code == 1) {
                                ConfirmBox.alert('提交留言成功！');
                                form[0].reset();
                                sucCallback && sucCallback();
                            } else {
                                ConfirmBox.alert(msg);
                            }
                        },
                        error: function() {
                            alert('操作失败，请稍后再试！');
                        }
                    });
                } else {
                    ConfirmBox.alert('请检查输入是否正确~');
                }
            });
            
        },

        // 问题选择
        _quesSelect: function() {
            var issueArea = selection($('#J-issue'));
            $('#J-quesSel a').click(function() {
                var selVal = $(this).text();
                issueArea.append(selVal);
                var insPos = issueArea.cursor()[1];
                issueArea.cursor(insPos);
            });
        },

        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            Consult.superclass.destroy.call(this);
        }
    });

    module.exports = Consult;


    // Helpers
    // -------

});
