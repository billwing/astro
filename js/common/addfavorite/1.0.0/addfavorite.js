define("common/addfavorite/1.0.0/addfavorite", ["$", "widget"], function(require, exports, module) {

    var $ = require('$');
    var Widget = require('widget');

    // AddFavorite
    // -----------
    // 加入收藏和设为首页组件，核心特征是：实现网页加入收藏和设为首页功能

    var AddFavorite = Widget.extend({

        attrs: {

            // 用户传入的 triggers 和 panels
            // 可以是 Selector、jQuery 对象、或 DOM 元素集
            triggers: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            setHomeBtn: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            addFavoBtn: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            pageUrl: window.location.href,

            pageTit: document.title

        },

        setup: function() {
            this._initTriggers();
        },

        _initTriggers: function() {
            var triggers = this.triggers = this.get('triggers');

            this._bindTriggers();
        },

        _bindTriggers: function() {
            var that = this;
            var pageUrl = this.get('pageUrl');
            var pageTit = this.get('pageTit');
            var setHomeBtn = this.get('setHomeBtn');
            var addFavoBtn = this.get('addFavoBtn');

            setHomeBtn.click(function() {
                that.setHomepage(pageUrl);
            });

            addFavoBtn.click(function() {
                that.addFavorite(pageUrl, pageTit);
            });
        },

        setHomepage: function(url) {
            if (document.all) {
                document.body.style.behavior='url(#default#homepage)';
                document.body.setHomePage(url);
            } else {
                alert('很抱歉，您的浏览器不支持自动设置页面为首页的功能，\n请您手动在浏览器里设置该页面为首页！');
            }
        },

        addFavorite: function(url, title) {
            url = encodeURI(url); 
            try {
                // IE
                window.external.addFavorite(url, title);
            } catch(e) {
                try {
                    // Firefox
                    window.sidebar.addPanel(title, url, '');
                } catch (e) {
                    // Chrome, Opera and Safari
                    alert('加入收藏失败，请通过快捷键“Ctrl + D”加入到收藏夹，\n或手动在浏览器里进行设置。');
                }
            }
        },

        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            AddFavorite.superclass.destroy.call(this);
        }
    });

    module.exports = AddFavorite;

    // Helpers
    // -------

});
