define(function (require, exports, module) {

  var $ = require('jquery'),
      async = require('./async'),
      Widget = require('widget'),
      utils = require('./utils'),
      Item = require('./item');

  var validators = [];

  var setterConfig = {
    value: function () {
    },
    setter: function (val) {
      return typeof val != 'function' ? utils.helper(val) : val;
    }
  };

  // 记录外层容器是否是 form 元素
  var isForm;

  // 记录 form 原来的 novalidate 的值，因为初始化时需要设置 novalidate 的值，destroy的时候需要恢复。
  var novalidate_old = undefined;

  var Core = Widget.extend({

    attrs: {
      triggerType: 'blur',
      checkOnSubmit: true,    //是否在表单提交前进行校验，默认进行校验。
      stopOnError: false,     //校验整个表单时，遇到错误时是否停止校验其他表单项。
      autoSubmit: true,       //When all validation passed, submit the form automatically.
      checkNull: true,         //除提交前的校验外，input的值为空时是否校验。
      onItemValidate: setterConfig,
      onItemValidated: setterConfig,
      onFormValidate: setterConfig,
      onFormValidated: setterConfig,
      // 此函数用来定义如何自动获取校验项对应的 display 字段。
      displayHelper: function (item) {
        var labeltext, name;
        var id = item.element.attr('id');
        if (id) {
          labeltext = $('label[for=' + id + ']').text();
          if (labeltext) {
            labeltext = labeltext.replace(/^[\*\s\:\：]*/, '').replace(/[\*\s\:\：]*$/, '');
          }
        }
        name = item.element.attr('name');
        //this.set('display', labeltext || name);
        return labeltext || name;
      },
      showMessage: setterConfig, // specify how to display error messages
      hideMessage: setterConfig, // specify how to hide error messages
      autoFocus: true,           // Automatically focus at the first element failed validation if true.
      failSilently: false,       // If set to true and the given element passed to addItem does not exist, just ignore.
      skipHidden: false          // 如果 DOM 隐藏是否进行校验
    },

    setup: function () {
      //Validation will be executed according to configurations stored in items.
      var that = this;

      this.items = [];

      isForm = this.element.get(0).tagName.toLowerCase() == 'form';

      if (isForm) {

        novalidate_old = this.element.attr('novalidate');
        //disable html5 form validation
        this.element.attr('novalidate', 'novalidate');

        //If checkOnSubmit is true, then bind submit event to execute validation.
        if (this.get('checkOnSubmit')) {
          this.element.submit(function (e) {
            e.preventDefault();
            that.execute(function (err) {
              if (!err) {
                that.get('autoSubmit') && that.element.get(0).submit();
              }
            });
          });
        }
      }

      this.on('formValidate', function () {
        var that = this;
        $.each(this.items, function (i, item) {
          that.query(item.element).get('hideMessage').call(that, null, item.element);
        });
      });

      this.on('itemValidated', function (err, message, element, event) {
        if (err)
          this.query(element).get('showMessage').call(this, message, element, event);
        else
          this.query(element).get('hideMessage').call(this, message, element, event);
      });

      if (this.get('autoFocus')) {
        this.on('formValidated', function (err, results) {
          if (err) {
            var firstEle = null;
            $.each(results, function (i, args) {
              var error = args[0],
                  ele = args[2];
              if (error) {
                firstEle = ele;
                return false;
              }
            });
            that.trigger('autoFocus', firstEle);
            firstEle.focus();
          }
        });
      }

      validators.push(this);
    },

    Statics: $.extend({helper: utils.helper}, require('./rule'), {
      autoRender: function (cfg) {

        var validator = new this(cfg);

        $('input, textarea, select', validator.element).each(function (i, input) {

          input = $(input);
          var type = input.attr('type');

          if (type == 'button' || type == 'submit' || type == 'reset') {
            return true;
          }

          var options = {};

          if (type == 'radio' || type == 'checkbox') {
            options.element = $('[type=' + type + '][name=' + input.attr('name') + ']', validator.element);
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

      query: function (selector) {
        return Widget.query(selector);
      },

      // TODO 校验单项静态方法的实现需要优化
      validate: function (options) {
        var element = $(options.element);
        var validator = new Core({
          element: element.parents()
        });

        validator.addItem(options);
        validator.query(element).execute();
        validator.destroy();
      }
    }),


    addItem: function (cfg) {
      var that = this;
      if ($.isArray(cfg)) {
        $.each(cfg, function (i, v) {
          that.addItem(v);
        });
        return this;
      }

      cfg = $.extend({
        triggerType: this.get('triggerType'),
        checkNull: this.get('checkNull'),
        displayHelper: this.get('displayHelper'),
        showMessage: this.get('showMessage'),
        hideMessage: this.get('hideMessage'),
        failSilently: this.get('failSilently'),
        skipHidden: this.get('skipHidden')
      }, cfg);

      if ($(cfg.element).length == 0) {
        if (cfg.failSilently) {
          return this;
        } else {
          throw new Error('element does not exist');
        }
      }

      var item = new Item(cfg);

      this.items.push(item);

      item.set('_handler', function (e) {
        if (!item.get('checkNull') && !item.element.val()) return;
        item.execute(null, {event: e});
      });
      var t = item.get('triggerType');
      t && this.element.on(t, '[' + DATA_ATTR_NAME + '=' + stampItem(item) + ']', item.get('_handler'));

      item.on('all', function (eventName) {
        this.trigger.apply(this, [].slice.call(arguments));
      }, this);

      return this;
    },

    removeItem: function (selector) {
      var target = selector instanceof Item ? selector.element : $(selector),
          items = this.items,
          that = this;

      var j;
      $.each(this.items, function (i, item) {
        if (target.get(0) == item.element.get(0)) {
          j = i;
          item.get('hideMessage').call(that, null, item.element);
          that.element.off(item.get('triggerType'), '[' + DATA_ATTR_NAME + '=' + stampItem(item) + ']', item.get('_handler'));
          item.destroy();
          return false;
        }
      });
      j !== undefined && this.items.splice(j, 1);

      return this;
    },

    execute: function (callback) {
      var that = this;

      this.trigger('formValidate', this.element);

      var complete = function () {
        var hasError = null;
        $.each(results, function (i, v) {
          hasError = Boolean(v[0]);
          return !hasError;
        });

        that.trigger('formValidated', Boolean(hasError), results, that.element);
        callback && callback(Boolean(hasError), results, that.element);
      };

      var results = [];
      if (this.get('stopOnError')) {
        async.forEachSeries(this.items, function (item, cb) {
          item.execute(function (err, message, ele) {
            results.push([].slice.call(arguments, 0));
            cb(err);
          });
        }, complete);
      } else {
        async.forEach(this.items, function (item, cb) {
          item.execute(function (err, message, ele) {
            results.push([].slice.call(arguments, 0));

            // Async doesn't allow any of tasks to fail, if you want the final callback executed after all tasks finished. So pass none-error value to task callback instead of the real result.
            cb(null);
          });
        }, complete);
      }

      return this;
    },

    destroy: function () {
      if (isForm) {
        if (novalidate_old == undefined)
          this.element.removeAttr('novalidate');
        else
          this.element.attr('novalidate', novalidate_old);

        this.element.unbind('submit');
      }
      var that = this;
      $.each(this.items, function (i, item) {
        that.removeItem(item);
      });
      var j;
      $.each(validators, function (i, validator) {
        if (validator == this) {
          j = i;
          return false;
        }
      });
      validators.splice(j, 1);

      Core.superclass.destroy.call(this);
    },

    query: function (selector) {
      var target = Widget.query(selector),
          result = null;
      $.each(this.items, function (i, item) {
        if (item === target) {
          result = target;
          return false;
        }
      });
      return result;
    }
  });

  var DATA_ATTR_NAME = 'data-validator-set';

  function stampItem(item) {
    var set = item.element.attr(DATA_ATTR_NAME);
    if (!set) {
      set = item.cid;
      item.element.attr(DATA_ATTR_NAME, set);
    }
    return set;
  }

  module.exports = Core;
});
