define("lib/validator/0.9.5/core-debug", [ "$-debug", "./async-debug", "lib/widget/1.1.1/widget-debug", "lib/base/1.1.1/base-debug", "lib/class/1.1.0/class-debug", "lib/events/1.1.0/events-debug", "./utils-debug", "./rule-debug", "./item-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), async = require("./async-debug"), Widget = require("lib/widget/1.1.1/widget-debug"), utils = require("./utils-debug"), Item = require("./item-debug");
    var validators = [];
    var setterConfig = {
        value: $.noop,
        setter: function(val) {
            return $.isFunction(val) ? val : utils.helper(val);
        }
    };
    var Core = Widget.extend({
        attrs: {
            triggerType: "blur",
            checkOnSubmit: true,
            // 是否在表单提交前进行校验，默认进行校验。
            stopOnError: false,
            // 校验整个表单时，遇到错误时是否停止校验其他表单项。
            autoSubmit: true,
            // When all validation passed, submit the form automatically.
            checkNull: true,
            // 除提交前的校验外，input的值为空时是否校验。
            onItemValidate: setterConfig,
            onItemValidated: setterConfig,
            onFormValidate: setterConfig,
            onFormValidated: setterConfig,
            // 此函数用来定义如何自动获取校验项对应的 display 字段。
            displayHelper: function(item) {
                var labeltext, name;
                var id = item.element.attr("id");
                if (id) {
                    labeltext = $("label[for=" + id + "]").text();
                    if (labeltext) {
                        labeltext = labeltext.replace(/^[\*\s\:\：]*/, "").replace(/[\*\s\:\：]*$/, "");
                    }
                }
                name = item.element.attr("name");
                return labeltext || name;
            },
            showMessage: setterConfig,
            // specify how to display error messages
            hideMessage: setterConfig,
            // specify how to hide error messages
            autoFocus: true,
            // Automatically focus at the first element failed validation if true.
            failSilently: false,
            // If set to true and the given element passed to addItem does not exist, just ignore.
            skipHidden: false
        },
        setup: function() {
            // Validation will be executed according to configurations stored in items.
            var self = this;
            self.items = [];
            // 外层容器是否是 form 元素
            if (self.element.is("form")) {
                // 记录 form 原来的 novalidate 的值，因为初始化时需要设置 novalidate 的值，destroy 的时候需要恢复。
                self._novalidate_old = self.element.attr("novalidate");
                // disable html5 form validation
                // see: http://bugs.jquery.com/ticket/12577
                try {
                    self.element.attr("novalidate", "novalidate");
                } catch (e) {}
                //If checkOnSubmit is true, then bind submit event to execute validation.
                if (self.get("checkOnSubmit")) {
                    self.element.on("submit.validator", function(e) {
                        e.preventDefault();
                        self.execute(function(err) {
                            !err && self.get("autoSubmit") && self.element.get(0).submit();
                        });
                    });
                }
            }
            // 当每项校验之后, 根据返回的 err 状态, 显示或隐藏提示信息
            self.on("itemValidated", function(err, message, element, event) {
                this.query(element).get(err ? "showMessage" : "hideMessage").call(this, message, element, event);
            });
            validators.push(self);
        },
        Statics: $.extend({
            helper: utils.helper
        }, require("./rule-debug"), {
            autoRender: function(cfg) {
                var validator = new this(cfg);
                $("input, textarea, select", validator.element).each(function(i, input) {
                    input = $(input);
                    var type = input.attr("type");
                    if (type == "button" || type == "submit" || type == "reset") {
                        return true;
                    }
                    var options = {};
                    if (type == "radio" || type == "checkbox") {
                        options.element = $("[type=" + type + "][name=" + input.attr("name") + "]", validator.element);
                    } else {
                        options.element = input;
                    }
                    if (!validator.query(options.element)) {
                        var obj = utils.parseDom(input);
                        if (!obj.rule) return true;
                        $.extend(options, obj);
                        validator.addItem(options);
                    }
                });
            },
            query: function(selector) {
                return Widget.query(selector);
            },
            // TODO 校验单项静态方法的实现需要优化
            validate: function(options) {
                var element = $(options.element);
                var validator = new Core({
                    element: element.parents()
                });
                validator.addItem(options);
                validator.query(element).execute();
                validator.destroy();
            }
        }),
        addItem: function(cfg) {
            var self = this;
            if ($.isArray(cfg)) {
                $.each(cfg, function(i, v) {
                    self.addItem(v);
                });
                return this;
            }
            cfg = $.extend({
                triggerType: self.get("triggerType"),
                checkNull: self.get("checkNull"),
                displayHelper: self.get("displayHelper"),
                showMessage: self.get("showMessage"),
                hideMessage: self.get("hideMessage"),
                failSilently: self.get("failSilently"),
                skipHidden: self.get("skipHidden")
            }, cfg);
            if (!$(cfg.element).length) {
                if (cfg.failSilently) {
                    return self;
                } else {
                    throw new Error("element does not exist");
                }
            }
            var item = new Item(cfg);
            self.items.push(item);
            item.delegateEvents(item.get("triggerType"), function(e) {
                if (!this.get("checkNull") && !this.element.val()) return;
                this.execute(null, {
                    event: e
                });
            });
            item.on("all", function(eventName) {
                this.trigger.apply(this, [].slice.call(arguments));
            }, self);
            return self;
        },
        removeItem: function(selector) {
            var self = this, target = selector instanceof Item ? selector : findItemBySelector($(selector), self.items);
            if (target) {
                erase(target, self.items);
                target.get("hideMessage").call(self, null, target.element);
                target.destroy();
            }
            return self;
        },
        execute: function(callback) {
            var self = this, results = [], hasError = false, firstElem = null;
            // 在表单校验前, 隐藏所有校验项的错误提示
            $.each(self.items, function(i, item) {
                item.get("hideMessage").call(self, null, item.element);
            });
            self.trigger("formValidate", self.element);
            async[self.get("stopOnError") ? "forEachSeries" : "forEach"](self.items, function(item, cb) {
                // iterator
                item.execute(function(err, message, ele) {
                    // 第一个校验错误的元素
                    if (err && !hasError) {
                        hasError = true;
                        firstElem = ele;
                    }
                    results.push([].slice.call(arguments, 0));
                    // Async doesn't allow any of tasks to fail, if you want the final callback executed after all tasks finished.
                    // So pass none-error value to task callback instead of the real result.
                    cb(self.get("stopOnError") ? err : null);
                });
            }, function() {
                // complete callback
                if (self.get("autoFocus") && hasError) {
                    self.trigger("autoFocus", firstElem);
                    firstElem.focus();
                }
                self.trigger("formValidated", hasError, results, self.element);
                callback && callback(hasError, results, self.element);
            });
            return self;
        },
        destroy: function() {
            var self = this, len = self.items.length;
            if (self.element.is("form")) {
                try {
                    if (self._novalidate_old == undefined) self.element.removeAttr("novalidate"); else self.element.attr("novalidate", self._novalidate_old);
                } catch (e) {}
                self.element.off("submit.validator");
            }
            for (var i = len - 1; i >= 0; i--) {
                self.removeItem(self.items[i]);
            }
            erase(self, validators);
            Core.superclass.destroy.call(this);
        },
        query: function(selector) {
            return findItemBySelector($(selector), this.items);
        }
    });
    // 从数组中删除对应元素
    function erase(target, array) {
        for (var i = 0; i < array.length; i++) {
            if (target === array[i]) {
                array.splice(i, 1);
                return array;
            }
        }
    }
    function findItemBySelector(target, array) {
        var ret;
        $.each(array, function(i, item) {
            if (target.get(0) === item.element.get(0)) {
                ret = item;
                return false;
            }
        });
        return ret;
    }
    module.exports = Core;
});

// Thanks to Caolan McMahon. These codes blow come from his project Async(https://github.com/caolan/async).
define("lib/validator/0.9.5/async-debug", [], function(require, exports, module) {
    var async = {};
    module.exports = async;
    //// cross-browser compatiblity functions ////
    var _forEach = function(arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };
    var _map = function(arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _forEach(arr, function(x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };
    var _keys = function(obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };
    //// exported async module functions ////
    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === "undefined" || !process.nextTick) {
        async.nextTick = function(fn) {
            setTimeout(fn, 0);
        };
    } else {
        async.nextTick = process.nextTick;
    }
    async.forEach = function(arr, iterator, callback) {
        callback = callback || function() {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _forEach(arr, function(x) {
            iterator(x, function(err) {
                if (err) {
                    callback(err);
                    callback = function() {};
                } else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback(null);
                    }
                }
            });
        });
    };
    async.forEachSeries = function(arr, iterator, callback) {
        callback = callback || function() {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function() {
            iterator(arr[completed], function(err) {
                if (err) {
                    callback(err);
                    callback = function() {};
                } else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback(null);
                    } else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    var doParallel = function(fn) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [ async.forEach ].concat(args));
        };
    };
    var doSeries = function(fn) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [ async.forEachSeries ].concat(args));
        };
    };
    var _asyncMap = function(eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function(x, i) {
            return {
                index: i,
                value: x
            };
        });
        eachfn(arr, function(x, callback) {
            iterator(x.value, function(err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function(err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.series = function(tasks, callback) {
        callback = callback || function() {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function(fn, callback) {
                if (fn) {
                    fn(function(err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        } else {
            var results = {};
            async.forEachSeries(_keys(tasks), function(k, callback) {
                tasks[k](function(err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function(err) {
                callback(err, results);
            });
        }
    };
});

define("lib/validator/0.9.5/utils-debug", [ "$-debug", "lib/validator/0.9.5/rule-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), Rule = require("lib/validator/0.9.5/rule-debug");
    var u_count = 0;
    var helpers = {};
    function unique() {
        return "__anonymous__" + u_count++;
    }
    function parseRules(str) {
        if (!str) return null;
        return str.match(/[a-zA-Z0-9\-\_]+(\{[^\{\}]*\})?/g);
    }
    function parseDom(field) {
        var field = $(field);
        var result = {};
        var arr = [];
        //parse required attribute
        var required = field.attr("required");
        if (required) {
            arr.push("required");
            result.required = true;
        }
        //parse type attribute
        var type = field.attr("type");
        if (type && type != "submit" && type != "cancel" && type != "checkbox" && type != "radio" && type != "select" && type != "select-one" && type != "file" && type != "hidden" && type != "textarea") {
            if (!Rule.getRule(type)) {
                throw new Error('Form field with type "' + type + '" not supported!');
            }
            arr.push(type);
        }
        //parse min attribute
        var min = field.attr("min");
        if (min) {
            arr.push('min{"min":"' + min + '"}');
        }
        //parse max attribute
        var max = field.attr("max");
        if (max) {
            arr.push("max{max:" + max + "}");
        }
        //parse minlength attribute
        var minlength = field.attr("minlength");
        if (minlength) {
            arr.push("minlength{min:" + minlength + "}");
        }
        //parse maxlength attribute
        var maxlength = field.attr("maxlength");
        if (maxlength) {
            arr.push("maxlength{max:" + maxlength + "}");
        }
        //parse pattern attribute
        var pattern = field.attr("pattern");
        if (pattern) {
            var regexp = new RegExp(pattern), name = unique();
            Rule.addRule(name, regexp);
            arr.push(name);
        }
        //parse data-rule attribute to get custom rules
        var rules = field.attr("data-rule");
        rules = rules && parseRules(rules);
        if (rules) arr = arr.concat(rules);
        result.rule = arr.length == 0 ? null : arr.join(" ");
        return result;
    }
    function parseJSON(str) {
        if (!str) return null;
        var NOTICE = 'Invalid option object "' + str + '".';
        // remove braces
        str = str.slice(1, -1);
        var result = {};
        var arr = str.split(",");
        $.each(arr, function(i, v) {
            arr[i] = $.trim(v);
            if (!arr[i]) throw new Error(NOTICE);
            var arr2 = arr[i].split(":");
            var key = $.trim(arr2[0]), value = $.trim(arr2[1]);
            if (!key || !value) throw new Error(NOTICE);
            result[getValue(key)] = $.trim(getValue(value));
        });
        // 'abc' -> 'abc'  '"abc"' -> 'abc'
        function getValue(str) {
            if (str.charAt(0) == '"' && str.charAt(str.length - 1) == '"' || str.charAt(0) == "'" && str.charAt(str.length - 1) == "'") {
                return eval(str);
            }
            return str;
        }
        return result;
    }
    function isHidden(ele) {
        var w = ele[0].offsetWidth, h = ele[0].offsetHeight, force = ele.prop("tagName") === "TR";
        return w === 0 && h === 0 && !force ? true : w !== 0 && h !== 0 && !force ? false : ele.css("display") === "none";
    }
    module.exports = {
        parseRule: function(str) {
            var match = str.match(/([^{}:\s]*)(\{[^\{\}]*\})?/);
            // eg. { name: "valueBetween", param: {min: 1, max: 2} }
            return {
                name: match[1],
                param: parseJSON(match[2])
            };
        },
        parseRules: parseRules,
        parseDom: parseDom,
        isHidden: isHidden,
        helper: function(name, fn) {
            if (fn) {
                helpers[name] = fn;
                return this;
            }
            return helpers[name];
        }
    };
});

define("lib/validator/0.9.5/rule-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), rules = {}, messages = {};
    function Rule(name, operator) {
        var self = this;
        self.name = name;
        if (operator instanceof RegExp) {
            self.operator = function(opts, commit) {
                var result = operator.test($(opts.element).val());
                commit(result ? null : opts.rule, _getMsg(opts, result));
            };
        } else if ($.isFunction(operator)) {
            self.operator = function(opts, commit) {
                var result = operator.call(this, opts, function(result, msg) {
                    commit(result ? null : opts.rule, msg || _getMsg(opts, result));
                });
                // 当是异步判断时, 返回 undefined, 则执行上面的 commit
                if (result !== undefined) {
                    commit(result ? null : opts.rule, _getMsg(opts, result));
                }
            };
        } else {
            throw new Error("The second argument must be a regexp or a function.");
        }
    }
    Rule.prototype.and = function(name, options) {
        var target = name instanceof Rule ? name : getRule(name, options);
        if (!target) {
            throw new Error('No rule with name "' + name + '" found.');
        }
        var that = this;
        var operator = function(opts, commit) {
            that.operator(opts, function(err, msg) {
                if (err) {
                    commit(err, _getMsg(opts, !err));
                } else {
                    target.operator(opts, commit);
                }
            });
        };
        return new Rule(null, operator);
    };
    Rule.prototype.or = function(name, options) {
        var target = name instanceof Rule ? name : getRule(name, options);
        if (!target) {
            throw new Error('No rule with name "' + name + '" found.');
        }
        var that = this;
        var operator = function(opts, commit) {
            that.operator(opts, function(err, msg) {
                if (err) {
                    target.operator(opts, commit);
                } else {
                    commit(null, _getMsg(opts, true));
                }
            });
        };
        return new Rule(null, operator);
    };
    Rule.prototype.not = function(options) {
        var target = getRule(this.name, options);
        var operator = function(opts, commit) {
            target.operator(opts, function(err, msg) {
                if (err) {
                    commit(null, _getMsg(opts, true));
                } else {
                    commit(true, _getMsg(opts, false));
                }
            });
        };
        return new Rule(null, operator);
    };
    function addRule(name, operator, message) {
        if ($.isPlainObject(name)) {
            $.each(name, function(i, v) {
                if ($.isArray(v)) addRule(i, v[0], v[1]); else addRule(i, v);
            });
            return this;
        }
        if (operator instanceof Rule) {
            rules[name] = new Rule(name, operator.operator);
        } else {
            rules[name] = new Rule(name, operator);
        }
        setMessage(name, message);
        return this;
    }
    function _getMsg(opts, b) {
        var ruleName = opts.rule;
        var msgtpl;
        if (opts.message) {
            // user specifies a message
            if ($.isPlainObject(opts.message)) {
                msgtpl = opts.message[b ? "success" : "failure"];
                // if user's message is undefined，use default
                typeof msgtpl === "undefined" && (msgtpl = messages[ruleName][b ? "success" : "failure"]);
            } else {
                //just string
                msgtpl = b ? "" : opts.message;
            }
        } else {
            // use default
            msgtpl = messages[ruleName][b ? "success" : "failure"];
        }
        return msgtpl ? compileTpl(opts, msgtpl) : msgtpl;
    }
    function setMessage(name, msg) {
        if ($.isPlainObject(name)) {
            $.each(name, function(i, v) {
                setMessage(i, v);
            });
            return this;
        }
        if ($.isPlainObject(msg)) {
            messages[name] = msg;
        } else {
            messages[name] = {
                failure: msg
            };
        }
        return this;
    }
    function getRule(name, opts) {
        if (opts) {
            var rule = rules[name];
            return new Rule(null, function(options, commit) {
                rule.operator($.extend(null, options, opts), commit);
            });
        } else {
            return rules[name];
        }
    }
    function compileTpl(obj, tpl) {
        var result = tpl;
        var regexp1 = /\{\{[^\{\}]*\}\}/g, regexp2 = /\{\{(.*)\}\}/;
        var arr = tpl.match(regexp1);
        arr && $.each(arr, function(i, v) {
            var key = v.match(regexp2)[1];
            var value = obj[$.trim(key)];
            result = result.replace(v, value);
        });
        return result;
    }
    addRule("required", function(options) {
        var element = $(options.element);
        var t = element.attr("type");
        switch (t) {
          case "checkbox":
          case "radio":
            var checked = false;
            element.each(function(i, item) {
                if ($(item).prop("checked")) {
                    checked = true;
                    return false;
                }
            });
            return checked;

          default:
            return Boolean(element.val());
        }
    }, "请输入{{display}}");
    addRule("email", /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, "{{display}}的格式不正确");
    addRule("text", /.*/);
    addRule("password", /.*/);
    addRule("radio", /.*/);
    addRule("checkbox", /.*/);
    addRule("url", /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, "{{display}}的格式不正确");
    addRule("number", /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/, "{{display}}的格式不正确");
    addRule("date", /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/, "{{display}}的格式不正确");
    addRule("min", function(options) {
        var element = options.element, min = options.min;
        return Number(element.val()) >= Number(min);
    }, "{{display}}必须大于或者等于{{min}}");
    addRule("max", function(options) {
        var element = options.element, max = options.max;
        return Number(element.val()) <= Number(max);
    }, "{{display}}必须小于或者等于{{max}}");
    addRule("minlength", function(options) {
        var element = options.element;
        var l = element.val().length;
        return l >= Number(options.min);
    }, "{{display}}的长度必须大于或等于{{min}}");
    addRule("maxlength", function(options) {
        var element = options.element;
        var l = element.val().length;
        return l <= Number(options.max);
    }, "{{display}}的长度必须小于或等于{{max}}");
    addRule("mobile", /^1\d{10}$/, "请输入正确的{{display}}");
    addRule("confirmation", function(options) {
        var element = options.element, target = $(options.target);
        return element.val() == target.val();
    }, "两次输入的{{display}}不一致，请重新输入");
    module.exports = {
        addRule: addRule,
        setMessage: setMessage,
        getRule: getRule,
        getOperator: function(name) {
            return rules[name].operator;
        }
    };
});

define("lib/validator/0.9.5/item-debug", [ "$-debug", "lib/validator/0.9.5/utils-debug", "lib/validator/0.9.5/rule-debug", "lib/widget/1.1.1/widget-debug", "lib/base/1.1.1/base-debug", "lib/class/1.1.0/class-debug", "lib/events/1.1.0/events-debug", "lib/validator/0.9.5/async-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), utils = require("lib/validator/0.9.5/utils-debug"), Widget = require("lib/widget/1.1.1/widget-debug"), async = require("lib/validator/0.9.5/async-debug"), Rule = require("lib/validator/0.9.5/rule-debug");
    var setterConfig = {
        value: $.noop,
        setter: function(val) {
            return $.isFunction(val) ? val : utils.helper(val);
        }
    };
    var Item = Widget.extend({
        attrs: {
            rule: "",
            display: null,
            displayHelper: null,
            triggerType: {
                setter: function(val) {
                    if (!val) return val;
                    var element = $(this.get("element")), type = element.attr("type");
                    // 将 select, radio, checkbox 的 blur 和 key 事件转成 change
                    var b = element.is("select") || type == "radio" || type == "checkbox";
                    if (b && (val.indexOf("blur") > -1 || val.indexOf("key") > -1)) return "change";
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
        setup: function() {
            // 强制给 required 的项设置 required 规则
            if (this.get("required")) {
                if (!this.get("rule") || this.get("rule").indexOf("required") < 0) {
                    this.set("rule", "required " + this.get("rule"));
                }
            }
            if (!this.get("display") && $.isFunction(this.get("displayHelper"))) {
                this.set("display", this.get("displayHelper")(this));
            }
        },
        // callback 为当这个项校验完后, 通知 form 的 async.forEachSeries 此项校验结束并把结果通知到 async,
        // 通过 async.forEachSeries 的第二个参数 Fn(item, cb) 的 cb 参数
        execute: function(callback, context) {
            var self = this, elemDisabled = !!self.element.attr("disabled");
            context = context || {};
            // 如果是设置了不检查不可见元素的话, 直接 callback
            if (self.get("skipHidden") && utils.isHidden(self.element) || elemDisabled) {
                callback && callback(null, "", self.element);
                return self;
            }
            self.trigger("itemValidate", self.element, context.event);
            var rules = utils.parseRules(self.get("rule"));
            if (rules) {
                _metaValidate(self.element, self.get("required"), rules, self.get("display"), self, function(err, msg) {
                    self.trigger("itemValidated", err, msg, self.element, context.event);
                    callback && callback(err, msg, self.element);
                });
            } else {
                callback && callback(null, "", self.element);
            }
            return self;
        }
    });
    function upperFirstLetter(str) {
        str = str + "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function _metaValidate(ele, required, rules, display, self, callback) {
        if (!required) {
            var truly = false;
            var t = ele.attr("type");
            switch (t) {
              case "checkbox":
              case "radio":
                var checked = false;
                ele.each(function(i, item) {
                    if ($(item).prop("checked")) {
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
        if (!$.isArray(rules)) throw new Error("No validation rule specified or not specified as an array.");
        var tasks = [];
        $.each(rules, function(i, item) {
            var obj = utils.parseRule(item), ruleName = obj.name, param = obj.param;
            var ruleOperator = Rule.getOperator(ruleName);
            if (!ruleOperator) throw new Error('Validation rule with name "' + ruleName + '" cannot be found.');
            var options = $.extend({}, param, {
                element: ele,
                display: param && param.display || display,
                rule: ruleName
            });
            var message = self.get("errormessage") || self.get("errormessage" + upperFirstLetter(ruleName));
            if (message && !options.message) {
                options.message = {
                    failure: message
                };
            }
            tasks.push(function(cb) {
                // cb 为 rule.js 的 commit
                // 即 async.series 每个 tasks 函数 的 callback
                // callback(err, results)
                ruleOperator.call(self, options, cb);
            });
        });
        // form.execute -> 多个 item.execute -> 多个 rule.operator
        // 多个 rule 的校验是串行的, 前一个出错, 立即停止
        // async.series 的 callback fn, 在执行 tasks 结束或某个 task 出错后被调用
        // 其参数 results 为当前每个 task 执行的结果
        // 函数内的 callback 回调给项校验
        async.series(tasks, function(err, results) {
            callback && callback(err, results[results.length - 1]);
        });
    }
    module.exports = Item;
});
