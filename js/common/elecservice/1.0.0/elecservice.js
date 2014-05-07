define("common/elecservice/1.0.0/elecservice", ["$", "widget"], function(require, exports, module) {

    // Elecservice
    // -----------
    // 电子客服组件，核心特征是：包括新手入门、高级进阶、投顾服务、牛牛咨询、自助充值和企业QQ功能

    var $ = require('$');
    var Widget = require('widget');

    var template = '<div id="J-elecService" class="elecservice"><div class="ser-hd"><a id="J-elecServiceCls" class="ser-cls" data-role="close" href="javascript:;">×</a><i class="icon-comm icon-tit"></i><span class="ser-tit">电子客服</span></div><div class="ser-bd"><ul class="ser-list"><li class="ser-list-item"><a class="ser-list-link" href="http://club.n8n8.cn/index.php?m=index&c=service&a=ykplayer"><i class="icon-comm icon-xsrm"></i><span class="ser-btn">新手入门</span></a></li><li class="ser-list-item"><a class="ser-list-link" href="http://www.jingzhuan.cn/product/qihang.html"><i class="icon-comm icon-gjjj"></i><span class="ser-btn">高级进阶</span></a></li><li class="ser-list-item fn-hide"><a class="ser-list-link" href="javascript:;"><i class="icon-comm icon-tgfw"></i><span class="ser-btn">投顾服务</span></a></li><li class="ser-list-item"><a id="chatBtn2" class="ser-list-link" href="http://club.n8n8.cn/index.php?m=index&c=service&a=jzwebchat"><i class="icon-comm icon-nnzx"></i><span class="ser-btn">牛牛咨询</span></a></li><li class="ser-list-item fn-hide"><a class="ser-list-link" href="http://account.n8n8.cn/index.php?c=recharge&a=chargeGold" target="_blank"><i class="icon-comm icon-zzcz"></i><span class="ser-btn">自助充值</span></a></li><li class="ser-list-item"><a class="ser-list-link" href="http://wpa.qq.com/msgrd?v=3&uin=4007003809&site=qq&menu=yes" target="_blank"><i class="icon-comm icon-qyqq"></i><span class="ser-btn">企业Q&nbsp;Q</span></a></li></ul></div><div class="ser-ft"><a class="ser-ft-link" href="http://wpa.qq.com/msgrd?v=3&uin=4007003809&site=qq&menu=yes" target="_blank" title="点击这里给我发消息"><i class="icon-comm icon-dzkf"></i><p class="ser-ft-tit">电子客服</p><p class="ser-tel">400-700-3809</p></a></div></div>';

    var Elecservice = Widget.extend({

        attrs: {

            // 用户传入的 triggers 和 panels
            // 可以是 Selector、jQuery 对象、或 DOM 元素集
            triggers: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            panels: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            eleSerAuto: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            template: template

        },

        parseElement: function() {
            this.element = $(this.get('template'));
        },

        events: {
            'click [data-role=close]': function(e) {
                e.preventDefault();
                this.hide();
            }
        },

        setup: function() {
            this.element.appendTo('body');
            this._initTriggers();
        },

        _initTriggers: function() {
            var triggers = this.triggers = this.get('triggers');

            this._bindTriggers();
        },

        _bindTriggers: function() {
            var that = this;
            var triggers = this.get('triggers');
            var eleSerAuto = this.get('eleSerAuto');

            triggers.on('click', function() {
                that.show();
            });

        },

        show: function() {
            this.trigger('show');
            this.element.show();
        },

        hide: function() {
            this.trigger('hide');
            this.element.hide();
        },

        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            Elecservice.superclass.destroy.call(this);
        }
    });

    module.exports = Elecservice;

    // Helpers
    // -------

});
