define("lib/popup/1.1.1/popup-debug", [ "$-debug", "lib/overlay/1.1.1/overlay-debug", "lib/position/1.0.1/position-debug", "lib/iframe-shim/1.0.2/iframe-shim-debug", "lib/widget/1.1.1/widget-debug", "lib/base/1.1.1/base-debug", "lib/class/1.1.0/class-debug", "lib/events/1.1.0/events-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Overlay = require("lib/overlay/1.1.1/overlay-debug");
    // Popup 是可触发 Overlay 型 UI 组件
    var Popup = Overlay.extend({
        attrs: {
            // 触发元素
            trigger: {
                value: null,
                // required
                getter: function(val) {
                    return $(val);
                }
            },
            // 触发类型
            triggerType: "hover",
            // or click or focus
            // 触发事件委托的对象
            delegateNode: {
                value: null,
                getter: function(val) {
                    return $(val);
                }
            },
            // 默认的定位参数
            align: {
                value: {
                    baseXY: [ 0, "100%" ],
                    selfXY: [ 0, 0 ]
                },
                setter: function(val) {
                    if (!val) {
                        return;
                    }
                    if (val.baseElement) {
                        this._specifiedBaseElement = true;
                    } else if (this.activeTrigger) {
                        // 若给的定位元素未指定基准元素
                        // 就给一个...
                        val.baseElement = this.activeTrigger;
                    }
                    return val;
                },
                getter: function(val) {
                    // 若未指定基准元素，则按照当前的触发元素进行定位
                    return $.extend({}, val, this._specifiedBaseElement ? {} : {
                        baseElement: this.activeTrigger
                    });
                }
            },
            // 延迟触发和隐藏时间
            delay: 70,
            // 是否能够触发
            // 可以通过set('disabled', true)关闭
            disabled: false,
            // 基本的动画效果，可选 fade|slide
            effect: "",
            // 动画的持续时间
            duration: 250
        },
        setup: function() {
            Popup.superclass.setup.call(this);
            this._bindTrigger();
            this._blurHide(this.get("trigger"));
            // 默认绑定activeTrigger为第一个元素
            // for https://github.com/aralejs/popup/issues/6
            this.activeTrigger = this.get("trigger").eq(0);
        },
        show: function() {
            if (this.get("disabled")) {
                return;
            }
            return Popup.superclass.show.call(this);
        },
        _bindTrigger: function() {
            var triggerType = this.get("triggerType");
            if (triggerType === "click") {
                this._bindClick();
            } else if (triggerType === "focus") {
                this._bindFocus();
            } else {
                // 默认是 hover
                this._bindHover();
            }
        },
        _bindClick: function() {
            var that = this;
            bindEvent("click", this.get("trigger"), function(e) {
                if (this.tagName.toLowerCase() === "a") {
                    e.preventDefault();
                }
                // this._active 这个变量表明了当前触发元素是激活状态
                if (this._active === true) {
                    that.hide();
                } else {
                    // 将当前trigger标为激活状态
                    makeActive(this);
                    that.show();
                }
            }, this.get("delegateNode"), this);
            // 隐藏前清空激活状态
            this.before("hide", function() {
                makeActive();
            });
            // 处理所有trigger的激活状态
            // 若 trigger 为空，相当于清除所有元素的激活状态
            function makeActive(trigger) {
                if (that.get("disabled")) {
                    return;
                }
                that.get("trigger").each(function(i, item) {
                    if (trigger == item) {
                        item._active = true;
                        // 标识当前点击的元素
                        that.activeTrigger = $(item);
                    } else {
                        item._active = false;
                    }
                });
            }
        },
        _bindFocus: function() {
            var that = this;
            bindEvent("focus", this.get("trigger"), function() {
                // 标识当前点击的元素
                that.activeTrigger = $(this);
                that.show();
            }, this.get("delegateNode"), this);
            bindEvent("blur", this.get("trigger"), function() {
                setTimeout(function() {
                    !that._downOnElement && that.hide();
                    that._downOnElement = false;
                }, that.get("delay"));
            }, this.get("delegateNode"), this);
            // 为了当input blur时能够选择和操作弹出层上的内容
            this.delegateEvents("mousedown", function(e) {
                this._downOnElement = true;
            });
        },
        _bindHover: function() {
            var trigger = this.get("trigger");
            var delegateNode = this.get("delegateNode");
            var delay = this.get("delay");
            var showTimer, hideTimer;
            var that = this;
            // 当 delay 为负数时
            // popup 变成 tooltip 的效果
            if (delay < 0) {
                this._bindTooltip();
                return;
            }
            bindEvent("mouseenter", trigger, function() {
                clearTimeout(hideTimer);
                hideTimer = null;
                // 标识当前点击的元素
                that.activeTrigger = $(this);
                showTimer = setTimeout(function() {
                    that.show();
                }, delay);
            }, delegateNode, this);
            bindEvent("mouseleave", trigger, leaveHandler, delegateNode, this);
            // 鼠标在悬浮层上时不消失
            this.delegateEvents("mouseenter", function() {
                clearTimeout(hideTimer);
            });
            this.delegateEvents("mouseleave", leaveHandler);
            function leaveHandler(e) {
                clearTimeout(showTimer);
                showTimer = null;
                if (that.get("visible")) {
                    hideTimer = setTimeout(function() {
                        that.hide();
                    }, delay);
                }
            }
        },
        _bindTooltip: function() {
            var trigger = this.get("trigger");
            var delegateNode = this.get("delegateNode");
            var that = this;
            bindEvent("mouseenter", trigger, function() {
                // 标识当前点击的元素
                that.activeTrigger = $(this);
                that.show();
            }, delegateNode, this);
            bindEvent("mouseleave", trigger, function() {
                that.hide();
            }, delegateNode, this);
        },
        _onRenderVisible: function(val) {
            var fade = this.get("effect").indexOf("fade") !== -1;
            var slide = this.get("effect").indexOf("slide") !== -1;
            var animConfig = {};
            slide && (animConfig.height = val ? "show" : "hide");
            fade && (animConfig.opacity = val ? "show" : "hide");
            if (fade || slide) {
                this.element.stop(true, true).animate(animConfig, this.get("duration")).css({
                    visibility: "visible"
                });
            } else {
                this.element[val ? "show" : "hide"]();
            }
        }
    });
    module.exports = Popup;
    // 一个绑定事件的简单封装
    function bindEvent(type, element, fn, delegateNode, context) {
        var hasDelegateNode = delegateNode && delegateNode[0];
        context.delegateEvents(hasDelegateNode ? delegateNode : element, hasDelegateNode ? type + " " + element.selector : type, function(e) {
            fn.call(e.currentTarget, e);
        });
    }
});
