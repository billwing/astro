define(function(require, exports, module) {

    // Switchable
    // -----------
    // 可切换组件，核心特征是：有一组可切换的面板（Panel），可通过触点（Trigger）来触发。
    // 感谢：
    //  - https://github.com/kissyteam/kissy/blob/master/src/switchable/


    var $ = require('jquery');
    require('easing');
    var Widget = require('widget');

    var CLASS_PREFIX = 'ui-switchable';
    var Effects = require('./effects');
    var Autoplay = require('./autoplay');
    var Circular = require('./circular');
    var Multiple = require('./multiple');


    var Switchable = Widget.extend({

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

            classPrefix: CLASS_PREFIX,

            // 是否包含 triggers，用于没有传入 triggers 时，是否自动生成的判断标准
            hasTriggers: true,
            // 触发类型
            triggerType: 'hover', // or 'click'
            // 触发延迟
            delay: 100,

            // 切换效果，可取 scrollx | scrolly | fade 或直接传入 effect function
            effect: 'none',
            easing: 'linear',
            duration: 500,

            // 初始切换到哪个面板
            activeIndex: 0,

            // 一屏内有多少个 panels
            step: 1,
            // 有多少屏
            length: {
                readOnly: true,
                getter: function() {
                    return this.panels.length / this.get('step');
                }
            },

            // 可见视图区域的大小。一般不需要设定此值，仅当获取值不正确时，用于手工指定大小
            viewSize: [],

            activeTriggerClass: CLASS_PREFIX + '-active',

            // 异步加载面板内容
            asyn: false
        },

        setup: function() {
            this._initConstClass();
            this._parseRole();
            this._initElement();
            this._initPanels();
            this._initTriggers();
            this._initPlugins();
        },

        _initConstClass: function() {
            var classPrefix = this.get('classPrefix');
            this.CONST = require('../const')(classPrefix);
        },

        _parseRole: function(role) {
            var role = this.dataset && this.dataset.role;
            role = role || this._getDatasetRole();
            if (!role) return;

            var triggers = this.get('triggers');
            var panels = this.get('panels');

            // attr 里没找到时，才根据 data-role 来解析
            if (triggers.length === 0 && (role.trigger || role.nav)) {
                triggers = role.trigger || role.nav.find('> *');
            }

            if (panels.length === 0 && (role.panel || role.content)) {
                panels = role.panel || role.content.find('> *');
            }

            this.set('triggers', triggers);
            this.set('panels', panels);
        },

        _getDatasetRole: function(role) {
            var element = this.element;
            var role = role || {};
            var isHaveRole = false;
            var roles = ['trigger', 'panel', 'nav', 'content'];
            $.each(roles, function(index, key) {
              var elems = $('[data-role=' + key + ']', element); 
              if (elems.length) {
                role[key] = elems;
                isHaveRole = true;
              }
            });
            if (!isHaveRole) return null;
            return role;
        },

        _initElement: function() {
            this.element.addClass(this.CONST.UI_SWITCHABLE);
        },

        _initPanels: function() {
            var panels = this.panels = this.get('panels');

            if (panels.length === 0) {
                throw new Error('panels.length is ZERO');
            }

            this.content = panels.parent().addClass(this.CONST.CONTENT_CLASS);
            panels.addClass(this.CONST.PANEL_CLASS);
        },

        _initTriggers: function() {
            var triggers = this.triggers = this.get('triggers');

            // 用户没有传入 triggers，也没有通过 data-role 指定时，如果
            // hasTriggers 为 true，则自动生成 triggers
            if (triggers.length === 0 && this.get('hasTriggers')) {
                this.nav = generateTriggersMarkup(
                        this.get('length'),
                        this.get('activeIndex'),
                        this.get('activeTriggerClass')
                ).appendTo(this.element);

                // update triggers
                this.triggers = this.nav.children();
            }
            else {
                this.nav = triggers.parent();
            }

            this.triggers.addClass(this.CONST.TRIGGER_CLASS);
            this.nav.addClass(this.CONST.NAV_CLASS);

            this.triggers.each(function(i, trigger) {
                $(trigger).data('value', i);
            });
            this._bindTriggers();
        },

        _initPlugins: function() {
            this._plugins = [];

            this._plug(Effects);
            this._plug(Autoplay);
            this._plug(Circular);
            this._plug(Multiple);
        },


        _bindTriggers: function() {
            var that = this;

            if (this.get('triggerType') === 'click') {
                this.triggers.click(focus);
            }
            // hover
            else {
                this.triggers.hover(focus, leave);
            }

            function focus(ev) {
                that._onFocusTrigger(ev.type, $(this).data('value'));
            }

            function leave() {
                clearTimeout(that._switchTimer);
            }
        },

        _onFocusTrigger: function(type, index) {
            var that = this;

            // click or tab 键激活时
            if (type === 'click') {
                this.switchTo(index);
            }

            // hover
            else {
                this._switchTimer = setTimeout(function() {
                    that.switchTo(index);
                }, this.get('delay'));
            }
        },


        // 切换到指定 index
        switchTo: function(toIndex) {
            this.set('activeIndex', toIndex);
            return this;
        },

        _onRenderActiveIndex: function(toIndex, fromIndex) {
            if (this._triggerIsValid(toIndex, fromIndex)) {
                this._switchTo(toIndex, fromIndex);
            }
        },

        _switchTo: function(toIndex, fromIndex) {
            this.trigger('switch', toIndex, fromIndex);
            this._switchTrigger(toIndex, fromIndex);
            this._switchPanel(this._getPanelInfo(toIndex, fromIndex));
            this.trigger('switched', toIndex, fromIndex);
        },

        // 触发是否有效
        _triggerIsValid: function(toIndex, fromIndex) {
            return toIndex !== fromIndex;
        },

        _switchTrigger: function(toIndex, fromIndex) {
            var triggers = this.triggers;
            if (triggers.length < 1) return;

            triggers.eq(fromIndex).removeClass(this.get('activeTriggerClass'));
            triggers.eq(toIndex).addClass(this.get('activeTriggerClass'));
        },

        _switchPanel: function(panelInfo) {
            // 默认是最简单的切换效果：直接隐藏/显示
            panelInfo.fromPanels.hide();
            panelInfo.toPanels.show();
        },

        _getPanelInfo: function(toIndex, fromIndex) {
            var panels = this.panels.get();
            var step = this.get('step');

            var fromPanels, toPanels;

            var toPanelsCnt;
            var triggers = this.triggers;

            if (fromIndex > -1) {
                var begin = fromIndex * step;
                var end = (fromIndex + 1) * step;
                fromPanels = panels.slice(begin, end);
            }

            toPanels = panels.slice(toIndex * step, (toIndex + 1) * step);

            // ajax加载面板
            if (this.get('asyn') && $(toPanels).is(':empty')) {
                var url = triggers.eq(toIndex).attr('data-url');
                $.ajax({
                    url: url,
                    cache: false,
                    beforeSend: function(XHR){
                        $(toPanels).html('<p style="width:32px;height:32px;margin:12% auto 0;"><img src="../static/images/common/loading32.gif" alt="Loading……" /></p>')
                    },
                    success: function(msg){
                        var toPanelsCnt = $(toPanels).html(msg);
                    },
                    error: function(){
                        alert('数据加载错误，请您稍后再试！');
                    }
                });
            }
            else {
                var toPanelsCnt = $(toPanels);
            }

            return {
                toIndex: toIndex,
                fromIndex: fromIndex,
                toPanels: $(toPanels),
                fromPanels: $(fromPanels)
            };
        },

        // 切换到上一视图
        prev: function() {
            var fromIndex = this.get('activeIndex');
            // 考虑循环切换的情况
            var index = (fromIndex - 1 + this.get('length')) % this.get('length');
            this.switchTo(index);
        },

        // 切换到下一视图
        next: function() {
            var fromIndex = this.get('activeIndex');
            var index = (fromIndex + 1) % this.get('length');
            this.switchTo(index);
        },


        _plug: function(plugin) {
            if (!plugin.isNeeded.call(this)) return;

            var pluginAttrs = plugin.attrs;
            var methods = plugin.methods;

            if (pluginAttrs) {
                for (var key in pluginAttrs) {
                    if (pluginAttrs.hasOwnProperty(key) &&
                            // 不覆盖用户传入的配置
                            !(key in this.attrs)) {
                        this.set(key, pluginAttrs[key]);
                    }
                }
            }

            if (methods) {
                for (var method in methods) {
                    if (methods.hasOwnProperty(method)) {
                        // 覆盖实例方法。
                        this[method] = methods[method];
                    }
                }
            }

            if (plugin.install) {
                plugin.install.call(this);
            }

            this._plugins.push(plugin);
        },


        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            Switchable.superclass.destroy.call(this);
        }
    });

    module.exports = Switchable;


    // Helpers
    // -------

    function generateTriggersMarkup(length, activeIndex, activeTriggerClass) {
        var nav = $('<ul>');

        for (var i = 0; i < length; i++) {
            var className = i === activeIndex ? activeTriggerClass : '';

            $('<li>', {
                'class': className,
                'html': i + 1
            }).appendTo(nav);
        }

        return nav;
    }

});
