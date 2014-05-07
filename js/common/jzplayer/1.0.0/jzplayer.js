define(function(require, exports, module) {

    // YKplayer
    // -----------
    // 优酷视频组件，核心特征是：多个优酷视频切换播放

    var $ = require('$');
    var Widget = require('widget');
    var Handlebars = require('handlebars');

    var YKplayer = Widget.extend({

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

            vsrc: null,

            vwid: 630,

            vhei: 450,

            curClass: null
        },

        setup: function() {
            this._initTpl();
            this._initTriggers();
        },

        _initTriggers: function() {
            var triggers = this.triggers = this.get('triggers');

            this._bindTriggers();
        },

        _bindTriggers: function() {
            var that = this;
            var triggers = this.get('triggers');
            var firstItem = this.get('firstItem');

            this.delegateEvents(triggers, 'click', function(e) {
                that.videoPlay($(e.currentTarget));
                that.curStyle($(e.currentTarget));
            });

            triggers.eq(0).trigger('click');
        },

        videoPlay: function(btn) {
            var panels = this.get('panels');
            var vwid = this.get('vwid');
            var vhei = this.get('vhei');

            var vsrc = btn.data('vsrc');

            var source = $('#ykPlayerTpl').html(),
                template = Handlebars.compile(source),
                data = {
                    'video': [
                        {
                            'vsrc': vsrc,
                            'vwid': vwid,
                            'vhei': vhei
                        }
                    ]
                };

            // Fix:软件点击无效
            clearTimeout(t);
            var t = setTimeout(function() {
                panels.html(template(data));
            }, 0);
        },

        curStyle: function(btn) {
            var curClass = this.get('curClass');
            btn.siblings().removeClass(curClass).end().addClass(curClass);
        },

        _initTpl: function() {
            var ykPlayerTpl = '<script id="ykPlayerTpl" type="x-handlebars-template">{{#video}}<embed src="{{vsrc}}" allowFullScreen="true" quality="high" width="{{vwid}}" height="{{vhei}}" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>{{/video}}</script>';
            $('body').append(ykPlayerTpl);
        },

        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            YKplayer.superclass.destroy.call(this);
        }
    });

    module.exports = YKplayer;


    // Helpers
    // -------

});
