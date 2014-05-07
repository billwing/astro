define("common/navselected/1.0.0/navselected", ["$", "widget"], function(require, exports, module) {

    var $ = require('$');
    var Widget = require('widget');

    // NavSelected
    // -----------
    // 导航栏选中状态组件，核心特征是：导航栏元素选中后根据URL变化改变当前焦点元素样式
    var NavSelected = Widget.extend({

        attrs: {

            // 传入的 triggers
            triggers: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            // 触发类型
            triggerType: 'hover', // or 'click'

            // 触发class
            activeTriggerClass: 'ui-nav-item-current'

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
            var triggers = this.triggers;
            var actCls = this.get('activeTriggerClass');

            // click
            if (this.get('triggerType') === 'click') {
                this.triggers.click(focus);
            }
            // hover
            else {
                this.triggers.hover(focus, leave);
            }

            function focus() {
                triggers.removeClass(actCls);
            }

            function leave() {
                //var path = location.pathname;
                var pathArr = location.href.split('/');
                var path = pathArr[pathArr.length - 1];
                if(path != '/') {
                    that.get('triggers').find('a[href="/' + path + '"]').parent().addClass(actCls);
                } else {
                    that.get('triggers').find('a[href="/"]').parent().addClass(actCls);
                }
            }

            focus();
            leave();
        },

        destroy: function() {
            NavSelected.superclass.destroy.call(this);
        }

    });

    module.exports = NavSelected;

});
