define("/js/astro/template", ["$", "widget"], function(require, exports, module) {

    // Template
    // -----------
    // 模板组件，核心特征是：编写规范组件模板

    var $ = require('$');
    var Widget = require('widget');

    var Template = Widget.extend({

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

            classPrefix: 'ui-template'
        },

        setup: function() {
            this._initTriggers();
        },

        _initTriggers: function() {
            var triggers = this.get('triggers');

            this._bindTriggers();
        },

        _bindTriggers: function() {
            var that = this,
                triggers = this.get('triggers');

            triggers.click(function() {
                that.template();
            });
        },

        template: function() {
            console.log('This is component template~');
        },

        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            Template.superclass.destroy.call(this);
        }
    });

    module.exports = Template;


    // Helpers
    // -------

});
