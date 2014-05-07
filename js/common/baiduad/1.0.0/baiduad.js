define(function(require, exports, module) {

    // BaiduAd
    // -----------
    // 百度广告组件，核心特征是：异步加载百度广告

    var $ = require('$');
    var Widget = require('widget');

    var BaiduAd = Widget.extend({

        attrs: {

            // 用户传入的 triggers 和 panels
            // 可以是 Selector、jQuery 对象、或 DOM 元素集
            triggers: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            adSrc: null,

            adArr: null,

            prefix: 'baiduAd-'
        },

        setup: function() {
            this.asynLoad();
        },

        loadScript: function(src, callback) {
            var s,
                r,
                t;
                r = false;
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = src;
            s.onload = s.onreadystatechange = function() {
                if ( !r && (!this.readyState || this.readyState == 'complete') ) {
                    r = true;
                    callback();
                }
            };
            t = document.getElementsByTagName('script')[0];
            t.parentNode.insertBefore(s, t);
        },

        asynLoad: function() {
            var that = this;
            var reqSrc = this.get('adSrc');
            this.loadScript(reqSrc, function() {
                that.createAd();
            });
        },

        createAd: function() {
            var adCnt = this.get('adArr');
            var preEl = this.get('prefix');
            var adLen = adCnt.length;
            for(var i = 0; i < adLen; i ++) {
                if(document.getElementById(preEl + i)) {
                    BAIDU_CLB_fillSlotAsync(adCnt[i], preEl + i);
                }
            }
        },

        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            BaiduAd.superclass.destroy.call(this);
        }
    });

    module.exports = BaiduAd;


    // Helpers
    // -------

});
