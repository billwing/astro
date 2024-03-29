define("lib/select/0.9.6/select-debug", [ "lib/overlay/1.1.1/overlay-debug", "$-debug", "lib/position/1.0.1/position-debug", "lib/iframe-shim/1.0.2/iframe-shim-debug", "lib/widget/1.1.1/widget-debug", "lib/base/1.1.1/base-debug", "lib/class/1.1.0/class-debug", "lib/events/1.1.0/events-debug", "lib/templatable/0.9.1/templatable-debug", "gallery/handlebars/1.0.2/handlebars-debug", "./select-debug.handlebars" ], function(require, exports, module) {
    var Overlay = require("lib/overlay/1.1.1/overlay-debug");
    var $ = require("$-debug");
    var Templatable = require("lib/templatable/0.9.1/templatable-debug");
    var template = require("./select-debug.handlebars");
    var Select = Overlay.extend({
        Implements: Templatable,
        attrs: {
            trigger: {
                value: null,
                // required
                getter: function(val) {
                    return $(val).eq(0);
                }
            },
            classPrefix: "ui-select",
            template: template,
            // 定位配置
            align: {
                baseXY: [ 0, "100%-1px" ]
            },
            // 原生 select 的属性
            name: "",
            value: "",
            length: 0,
            selectedIndex: -1,
            multiple: false,
            // TODO
            disabled: false,
            // 以下不要覆盖
            selectSource: null
        },
        events: {
            "click [data-role=item]": function(e) {
                var target = $(e.currentTarget);
                this.select(target);
            },
            "mouseenter [data-role=item]": function(e) {
                $(e.currentTarget).addClass(this.get("classPrefix") + "-hover");
            },
            "mouseleave [data-role=item]": function(e) {
                $(e.currentTarget).removeClass(this.get("classPrefix") + "-hover");
            }
        },
        // 覆盖父类
        // --------
        initAttrs: function(config, dataAttrsConfig) {
            Select.superclass.initAttrs.call(this, config, dataAttrsConfig);
            var trigger = this.get("trigger");
            if (trigger[0].tagName.toLowerCase() == "select") {
                // 初始化 name
                // 如果 select 的 name 存在则覆盖 name 属性
                var selectName = trigger.attr("name");
                if (selectName) {
                    this.set("name", selectName);
                }
                // 替换之前把 select 保存起来
                this.set("selectSource", trigger);
                // 替换 trigger
                var triggerTemplate = '<a href="#" class="' + this.get("classPrefix") + '-trigger"></a>';
                var newTrigger = $(triggerTemplate);
                this.set("trigger", newTrigger);
                this._initFromSelect = true;
                trigger.after(newTrigger).hide();
                // trigger 如果为 select 则根据 select 的结构生成
                this.set("model", convertSelect(trigger[0], this.get("classPrefix")));
            } else {
                // 如果 name 存在则创建隐藏域
                var selectName = this.get("name");
                if (selectName) {
                    var input = $("input[name=" + selectName + "]").eq(0);
                    if (!input[0]) {
                        input = $('<input type="hidden" id="select-' + selectName + '" name="' + selectName + '" />').insertBefore(trigger);
                    }
                    this.set("selectSource", input);
                }
                // trigger 如果为其他 DOM，则由用户提供 model
                this.set("model", completeModel(this.get("model"), this.get("classPrefix")));
            }
        },
        setup: function() {
            var trigger = this.get("trigger");
            this.delegateEvents(trigger, "click", this._trigger_click);
            this.delegateEvents(trigger, "mouseenter", function(e) {
                trigger.addClass(this.get("classPrefix") + "-trigger-hover");
            });
            this.delegateEvents(trigger, "mouseleave", function(e) {
                trigger.removeClass(this.get("classPrefix") + "-trigger-hover");
            });
            this.options = this.$("[data-role=content]").children();
            // 初始化 select 的参数
            // 必须在插入文档流后操作
            this.select("[data-selected=true]");
            this.set("length", this.options.length);
            this._tweakAlignDefaultValue();
            // 调用 overlay，点击 body 隐藏
            this._blurHide(trigger);
            Select.superclass.setup.call(this);
        },
        render: function() {
            Select.superclass.render.call(this);
            this._setTriggerWidth();
            return this;
        },
        // trigger 的宽度和浮层保持一致
        _setTriggerWidth: function() {
            var trigger = this.get("trigger");
            var width = this.element.outerWidth();
            var pl = parseInt(trigger.css("padding-left"), 10);
            var pr = parseInt(trigger.css("padding-right"), 10);
            var bl = parseInt(trigger.css("border-left-width"), 10);
            var br = parseInt(trigger.css("border-right-width"), 10);
            trigger.css("width", width - pl - pr - bl - br);
        },
        // borrow from dropdown
        // 调整 align 属性的默认值, 在 trigger 下方
        _tweakAlignDefaultValue: function() {
            var align = this.get("align");
            // 默认基准定位元素为 trigger
            if (align.baseElement._id === "VIEWPORT") {
                align.baseElement = this.get("trigger");
            }
            this.set("align", align);
        },
        _trigger_click: function(e) {
            var self = this;
            e.preventDefault();
            if (!self.get("disabled")) {
                self.show();
            }
        },
        destroy: function() {
            if (this._initFromSelect) {
                this.get("trigger").remove();
            }
            this.element.remove();
            Select.superclass.destroy.call(this);
        },
        // 方法接口
        // --------
        select: function(option) {
            var selectIndex = getOptionIndex(option, this.options);
            var oldSelectIndex = this.get("selectedIndex");
            this.set("selectedIndex", selectIndex);
            // 如果不是原来选中的则触发 change 事件
            if (oldSelectIndex !== selectIndex) {
                var selected = this.options.eq(selectIndex);
                this.trigger("change", selected);
            }
            this.hide();
            return this;
        },
        syncModel: function(model) {
            this.set("model", completeModel(model, this.get("classPrefix")));
            this.renderPartial("[data-role=content]");
            // 同步原来的 select
            syncSelect(this.get("selectSource"), model);
            // 渲染后重置 select 的属性
            this.options = this.$("[data-role=content]").children();
            this.set("length", this.options.length);
            this.set("selectedIndex", -1);
            this.set("value", "");
            var selectIndex = getOptionIndex("[data-selected=true]", this.options);
            var oldSelectIndex = this.get("selectedIndex");
            this.set("selectedIndex", selectIndex);
            // 重新设置 trigger 宽度
            this._setTriggerWidth();
            return this;
        },
        getOption: function(option) {
            var index = getOptionIndex(option, this.options);
            return this.options.eq(index);
        },
        addOption: function(option) {
            var model = this.get("model").select;
            model.push(option);
            this.syncModel(model);
            return this;
        },
        removeOption: function(option) {
            var removedIndex = getOptionIndex(option, this.options), oldIndex = this.get("selectedIndex"), removedOption = this.options.eq(removedIndex);
            // 删除 option，更新属性
            removedOption.remove();
            this.options = this.$("[data-role=content]").children();
            this.set("length", this.options.length);
            // 如果被删除的是当前选中的，则选中第一个
            if (removedIndex === oldIndex) {
                this.set("selectedIndex", 0);
            } else if (removedIndex < oldIndex) {
                this.set("selectedIndex", oldIndex - 1);
            }
            return this;
        },
        // set 后的回调
        // ------------
        _onRenderSelectedIndex: function(index) {
            if (index == -1) return;
            var selected = this.options.eq(index), currentItem = this.currentItem, value = selected.attr("data-value");
            // 如果两个 DOM 相同则不再处理
            if (currentItem && selected[0] == currentItem[0]) {
                return;
            }
            // 设置原来的表单项
            var source = this.get("selectSource");
            if (source) {
                if (source[0].tagName.toLowerCase() === "select") {
                    source[0].selectedIndex = index;
                } else {
                    source[0].value = value;
                }
            }
            // 处理之前选中的元素
            if (currentItem) {
                currentItem.attr("data-selected", "false").removeClass(this.get("classPrefix") + "-selected");
            }
            // 处理当前选中的元素
            selected.attr("data-selected", "true").addClass(this.get("classPrefix") + "-selected");
            this.set("value", value);
            // 填入选中内容，位置先找 "data-role"="trigger-content"，再找 trigger
            var trigger = this.get("trigger");
            var triggerContent = trigger.find("[data-role=trigger-content]");
            if (triggerContent.length) {
                triggerContent.html(selected.html());
            } else {
                trigger.html(selected.html());
            }
            this.currentItem = selected;
        },
        _onRenderDisabled: function(val) {
            var className = this.get("classPrefix") + "-disabled";
            var trigger = this.get("trigger");
            trigger[val ? "addClass" : "removeClass"](className);
            // trigger event
            var selected = this.options.eq(this.get("selectedIndex"));
            this.trigger("disabledChange", selected, val);
        }
    });
    module.exports = Select;
    // Helper
    // ------
    // 将 select 对象转换为 model
    //
    // <select>
    //   <option value='value1'>text1</option>
    //   <option value='value2' selected>text2</option>
    // </select>
    //
    // ------->
    //
    // [
    //   {value: 'value1', text: 'text1',
    //      defaultSelected: false, selected: false}
    //   {value: 'value2', text: 'text2',
    //      defaultSelected: true, selected: true}
    // ]
    function convertSelect(select, classPrefix) {
        var i, model = [], options = select.options, l = options.length, hasDefaultSelect = false;
        for (i = 0; i < l; i++) {
            var j, o = {}, option = options[i];
            var fields = [ "text", "value", "defaultSelected", "selected" ];
            for (j in fields) {
                var field = fields[j];
                o[field] = option[field];
            }
            o.defaultSelected = option.defaultSelected ? "true" : "false";
            if (option.selected) {
                o.selected = "true";
                hasDefaultSelect = true;
            } else {
                o.selected = "false";
            }
            model.push(o);
        }
        // 当所有都没有设置 selected，默认设置第一个
        if (!hasDefaultSelect && model.length) {
            model[0].selected = "true";
        }
        return {
            select: model,
            classPrefix: classPrefix
        };
    }
    // 补全 model 对象
    function completeModel(model, classPrefix) {
        var i, j, l, ll, newModel = [], selectIndexArray = [];
        for (i = 0, l = model.length; i < l; i++) {
            var o = $.extend({}, model[i]);
            if (o.selected) {
                o.selected = o.defaultSelected = "true";
                selectIndexArray.push(i);
            } else {
                o.selected = o.defaultSelected = "false";
            }
            newModel.push(o);
        }
        if (selectIndexArray.length > 0) {
            // 如果有多个 selected 则选中最后一个
            selectIndexArray.pop();
            for (j = 0, ll = selectIndexArray.length; j < ll; j++) {
                newModel[j].selected = "false";
            }
        } else {
            //当所有都没有设置 selected 则默认设置第一个
            newModel[0].selected = "true";
        }
        return {
            select: newModel,
            classPrefix: classPrefix
        };
    }
    function getOptionIndex(option, options) {
        var index;
        if ($.isNumeric(option)) {
            // 如果是索引
            index = option;
        } else if (typeof option === "string") {
            // 如果是选择器
            index = options.index(options.parent().find(option));
        } else {
            // 如果是 DOM
            index = options.index(option);
        }
        return index;
    }
    function syncSelect(select, model) {
        if (!(select && select[0])) return;
        select = select[0];
        if (select.tagName.toLowerCase() === "select") {
            $(select).find("option").remove();
            for (var i in model) {
                var m = model[i];
                var option = document.createElement("option");
                option.text = m.text;
                option.value = m.value;
                select.add(option);
            }
        }
    }
});

define("lib/select/0.9.6/select-debug.handlebars", [ "gallery/handlebars/1.0.2/runtime-debug" ], function(require, exports, module) {
    var Handlebars = require("gallery/handlebars/1.0.2/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ];
        helpers = helpers || {};
        for (var key in Handlebars.helpers) {
            helpers[key] = helpers[key] || Handlebars.helpers[key];
        }
        data = data || {};
        var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression, self = this;
        function program1(depth0, data, depth1) {
            var buffer = "", stack1, stack2;
            buffer += '\n        <li data-role="item" class="' + escapeExpression((stack1 = depth1.classPrefix, 
            typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + '-item" data-value="';
            if (stack2 = helpers.value) {
                stack2 = stack2.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack2 = depth0.value;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + '" data-defaultSelected="';
            if (stack2 = helpers.defaultSelected) {
                stack2 = stack2.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack2 = depth0.defaultSelected;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + '" data-selected="';
            if (stack2 = helpers.selected) {
                stack2 = stack2.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack2 = depth0.selected;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + '">';
            if (stack2 = helpers.text) {
                stack2 = stack2.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack2 = depth0.text;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            if (stack2 || stack2 === 0) {
                buffer += stack2;
            }
            buffer += "</li>\n        ";
            return buffer;
        }
        buffer += '<div class="';
        if (stack1 = helpers.classPrefix) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.classPrefix;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + '">\n    <ul class="';
        if (stack1 = helpers.classPrefix) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.classPrefix;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + '-content" data-role="content">\n        ';
        stack1 = helpers.each.call(depth0, depth0.select, {
            hash: {},
            inverse: self.noop,
            fn: self.programWithDepth(1, program1, data, depth0),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n    </ul>\n</div>\n";
        return buffer;
    });
});
