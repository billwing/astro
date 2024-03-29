define(function (require, exports, module) {
    var $ = require('$'),
        utils = require('./utils'),
        Widget = require('widget'),
        async = require('./async'),
        Rule = require('./rule');

    var setterConfig = {
        value: $.noop,
        setter: function (val) {
            return $.isFunction(val) ? val : utils.helper(val);
        }
    };
    var Item = Widget.extend({
        attrs: {
            rule: '',
            display: null,
            displayHelper: null,
            triggerType: {
                setter: function (val) {
                    if (!val)
                        return val;

                    var element = $(this.get('element')),
                        type = element.attr('type');

                    // 将 select, radio, checkbox 的 blur 和 key 事件转成 change
                    var b = element.is("select") || type == 'radio' || type == 'checkbox';
                    if (b && (val.indexOf('blur') > -1 || val.indexOf('key') > -1))
                        return 'change';
                    return val;
                }
            },
            required: false,
            checkNull: true,
            errormessage: null,
            onItemValidate: setterConfig,
            onItemValidated: setterConfig,
            showMessage: setterConfig,
            hideMessage: setterConfig
        },

        setup: function () {
            // 强制给 required 的项设置 required 规则
            if (this.get('required')) {
                if (!this.get('rule') || this.get('rule').indexOf('required') < 0) {
                    this.set('rule', 'required ' + this.get('rule'));
                }
            }

            if (!this.get('display') && $.isFunction(this.get('displayHelper'))) {
                this.set('display', this.get('displayHelper')(this));
            }
        },

        // callback 为当这个项校验完后, 通知 form 的 async.forEachSeries 此项校验结束并把结果通知到 async,
        // 通过 async.forEachSeries 的第二个参数 Fn(item, cb) 的 cb 参数
        execute: function (callback, context) {
            var self = this;

            context = context || {};
            // 如果是设置了不检查不可见元素的话, 直接 callback
            if (self.get('skipHidden') && !self.element.is(':visible')) {
                callback && callback(null, '', self.element);
                return self;
            }

            self.trigger('itemValidate', self.element, context.event);

            var rules = utils.parseRules(self.get('rule'));

            if (rules) {
                _metaValidate(self.element, self.get('required'), rules, self.get('display'), function (err, msg) {
                    var message = err ? (self.get('errormessage') || self.get('errormessage' + upperFirstLetter(err)) || msg) : msg;

                    self.trigger('itemValidated', err, message, self.element, context.event);
                    callback && callback(err, message, self.element);
                });
            } else {
                callback && callback(null, '', self.element);
            }

            return self;
        }
    });

    function upperFirstLetter(str) {
        str = str + "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function _metaValidate(ele, required, rules, display, callback) {
        if (!required) {
            var truly = false;
            var t = ele.attr('type');
            switch (t) {
                case 'checkbox':
                case 'radio':
                    var checked = false;
                    ele.each(function (i, item) {
                        if ($(item).prop('checked')) {
                            checked = true;
                            return false;
                        }
                    });
                    truly = checked;
                    break;
                default:
                    truly = !!ele.val();
            }

            // 非必要且没有值的时候, 直接 callback
            if (!truly) {
                callback && callback(null, null);
                return;
            }
        }

        if (!$.isArray(rules))
            throw new Error('No validation rule specified or not specified as an array.');

        var tasks = [];

        $.each(rules, function (i, item) {
            var obj = utils.parseRule(item),
                ruleName = obj.name,
                param = obj.param;

            var ruleOperator = Rule.getOperator(ruleName);
            if (!ruleOperator)
                throw new Error('Validation rule with name "' + ruleName + '" cannot be found.');

            var options = $.extend({}, param, {
                element: ele,
                display: (param && param.display) || display,
                rule: ruleName
            });

            tasks.push(function (cb) {
                // cb 为 rule.js 的 commit
                // 即 async.series 每个 tasks 函数 的 callback
                // callback(err, results)
                ruleOperator(options, cb);
            });
        });


        // form.execute -> 多个 item.execute -> 多个 rule.operator
        // 多个 rule 的校验是串行的, 前一个出错, 立即停止
        // async.series 的 callback fn, 在执行 tasks 结束或某个 task 出错后被调用
        // 其参数 results 为当前每个 task 执行的结果
        // 函数内的 callback 回调给项校验
        async.series(tasks, function (err, results) {
            callback && callback(err, results[results.length - 1]);
        });
    }

    module.exports = Item;
});
