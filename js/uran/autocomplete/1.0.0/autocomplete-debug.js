define("uran/autocomplete/1.0.0/js/autocomplete-debug", [ "$-debug", "lib/widget/1.0.3/widget-debug", "lib/base/1.0.1/base-debug", "lib/class/1.0.0/class-debug", "lib/events/1.0.0/events-debug", "uran/base/1.0.0/js/detect-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Widget = require("lib/widget/1.0.3/widget-debug");
    var Detect = require("uran/base/1.0.0/js/detect-debug");
    var AutoComplete = Widget.extend({
        attrs: {
            trigger: {
                value: null,
                // required
                getter: function(val) {
                    return $(val);
                }
            },
            parentNode: {
                value: null,
                // required
                getter: function(val) {
                    return $(val).first();
                }
            },
            template: '<ul data-role="autocomplete" class="ui-autocomplete"></ul>',
            itemTemplate: '<li data-role="item" class="ui-autocomplete-item">{{value}}</li>',
            delay: 300,
            dataSource: []
        },
        events: {
            "touchstart [data-role=item]": "_touchstart",
            "touchmove [data-role=item]": "_touchmove",
            "touchend [data-role=item]": "_touchend"
        },
        delegateEvents: function() {
            if (!Detect.support.touch) {
                this.events = {
                    "click [data-role=item]": "_click"
                };
            }
            AutoComplete.superclass.delegateEvents.apply(this, arguments);
        },
        setup: function() {
            this.get("trigger").attr("autocomplete", "off").on("blur.autocomplete", $.proxy(this._blurEvent, this)).on("input.autocomplete", $.proxy(this._inputEvent, this));
            this.get("parentNode").append(this.element.hide());
        },
        _blurEvent: function() {
            this._hideTimer = setTimeout($.proxy(this, "hide"), 50);
        },
        _inputEvent: function() {
            var value = this.get("trigger").val();
            if (this.valueCache === value) return;
            this.valueCache = value;
            var dataSource = this.get("dataSource");
            var data;
            if (typeof dataSource === "function") {
                data = dataSource(value, $.proxy(this, "_dataRender"));
            } else {
                data = dataSource;
            }
            data && this._dataRender(data);
        },
        _dataRender: function(data) {
            if (!(typeof data === "object" && data.length > 0)) {
                this.hide();
                return;
            }
            this.element.empty();
            var me = this;
            var tpl = this.get("itemTemplate");
            var key = this.get("dataKey");
            $.each(data, function(i, item) {
                var value = key ? item[key] : item;
                me.element.append($(tpl.replace("{{value}}", value)).data("item", item));
            });
            this.show();
        },
        _touchstart: function() {
            this.touchState = "start";
            this._hideTimer && clearTimeout(this.hideTimer);
        },
        _touchmove: function() {
            this.touchState = "move";
        },
        _touchend: function(e) {
            if (this.touchState === "start") {
                var item = $(e.currentTarget).data("item");
                var key = this.get("dataKey");
                var value = key ? item[key] : item;
                this.get("trigger").val(value);
                setTimeout($.proxy(this, "hide"), 360);
            }
        },
        _click: function(e) {
            var item = $(e.currentTarget).data("item");
            var key = this.get("dataKey");
            var value = key ? item[key] : item;
            this.get("trigger").val(value);
            this.hide();
        },
        show: function() {
            this.element.show();
            this.trigger("show");
        },
        hide: function() {
            this.element.hide();
            this.trigger("hide");
        }
    });
    return AutoComplete;
});
