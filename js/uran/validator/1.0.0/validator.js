(function(win, doc){
  // rule
  var _rules = {}, _messages = {};

  function addRule(name, handle, message) {
    if(!name)  return;
    _rules[name] =  handle || null;
    setMessage(name, message);
  }
  
  function setMessage(name, message) {
    if(!name)  return;
    _messages[name] = message;
  }
  
  addRule('required', function(options){
    return !!options.value;
  }, '请输入{{display}}');

  addRule('email', /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '{{display}}的格式不正确');

  addRule('url', /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, '{{display}}的格式不正确');

  addRule('number', /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/, '{{display}}的格式不正确');

  addRule('tel', /^1\d{10}$/, '请输入正确的{{display}}');

  addRule('min', function (options, min) {
    return Number(options.value) >= Number(min);
  }, '{{display}}必须大于或者等于{{param}}');

  addRule('max', function (options, max) {
    return Number(options.value) <= Number(max);
  }, '{{display}}必须小于或者等于{{param}}');

  addRule('minlength', function (options, min) {
    var l = options.value.length;
    return l >= Number(min);
  }, '{{display}}的长度必须大于或等于{{param}}');

  addRule('maxlength', function (options, max) {
    var l = options.value.length;
    return l <= Number(max);
  }, '{{display}}的长度必须小于或等于{{param}}');
  
  // default option
  var _default = {
    itemClass: 'ui-field',
    explainClass: 'ui-field-message',
    itemErrorClass: 'ui-field-error',
    autoSubmit: true, // When all validation passed, submit the form automatically.
    stopOnError: true, // stop when one validation fail.
    onFormValidate: null,
    onFormValidated: null,
    onItemValidate: null,
    onItemValidated: null
  };

  // validator
  var Validator = function(formId, options) {
    if(_.$(formId).novalidate) return;

    this.form = _.$(formId);
    this.options = _.extend(_default, options || {});
    this.fields = [];
    this.rules = _rules;
    this.messages = _messages;
    this.handlers = {};
    this.init(); 
  };
  
  Validator.prototype = (function() {
    var getValue = function(element) {
      var type = element.type.toLowerCase(),
          value = '';

      if(type === 'radio' || type === 'checkbox') {
        var elements = this.form.querySelectorAll('[name='+ element.name +']')
        for(var i=0, l=elements.length; i<l; i++ ) {
          if(element[i].checked) {
            value += element[i].value;
          }
        }
      } else {
        value = element.value;
      }
      return value;
    },

    parseDom = function(element) {
      var type = element.type, name = element.name;

      var result = [];
      
      // type = file ?
      // html5 new types:
      // search email url tel number range date month week time datetime datetime-local color
      if(type == 'button' || type == 'submit' || type == 'reset' || type == 'hidden') return;
      
      if(type == 'url' || type == 'email' || type == 'number' || type == 'tel' || type == 'date') {
        result.push(type);
      }
      
      // html5 new attribute:
      // placeholder autofocus autocomplete required pattern list multiple novalidate formnovalidate form formaction formenctype formmethod formtarget

      element.required && result.push('required');
      var min = _.attr(element, 'min');
      min && result.push('min{'+ min +'}');

      var max = _.attr(element, 'max');
      max && result.push('max{'+ max +'}');

      var minlength = _.attr(element, 'minlength');
      minlength && result.push('minlength{'+ minlength +'}');

      var maxlength = _.attr(element, 'maxlength');
      maxlength && result.push('maxlength{'+ maxlength +'}');
      
      var pattern = element.pattern;
      if(pattern) {
        var regexp = new RegExp(pattern),
            name = _.uniqueId()
        addRule(name, regexp); 
        result.push(name);
      }
      
      var rules = _.data(element, 'rule');
      if (rules) {
        result = result.concat(rules.split(' '));
      }

      return result;
    },

    bind = function(element, type, handler) {
      var that = this,
          eventMap = {
            focus: 'onfocusin',
            blur: 'onfocusout'
          }
          selectorPattern =  /^(INPUT|SELECT|TEXTAREA)$/;
          ieEvent = eventMap[type];
          wrapper = function(evt) {
            var target = evt.target || e.srcElement;
            selectorPattern.test(target.tagName) && handler.call(that, target);
          };
      ieEvent in element ? element.attachEvent(ieEvent, wrapper) : element.addEventListener(type, wrapper, true);
    };

    return {
      init: function() {
        var targets = this.form.querySelectorAll('input, select, textarea');
        var element, onItemValidate, onItemValidated;

        for(var i=0, l=targets.length; i<l; i++) {
          element = targets[i],
          onItemValidate = _.attr(element, 'onitemvalidate'),
          onItemValidated = _.attr(element, 'onitemvalidated');

          this.fields.push({
            element: element,
            name: element.name,
            display: _.data(element, 'display') || name,
            rules: parseDom.call(this, element),
            type: element.type,
            onItemValidate: this.handlers[onItemValidate] || this.options.onItemValidate || null,
            onItemValidated: this.handlers[onItemValidated] || this.options.onItemValidated || null
          });
        }

        this.options.onFormValidate && this.options.onFormValidate.call(this, this.form);
        
        bind.call(this, this.form, 'focus', this.hideMessage);

        // bind submit
        var _onsubmit = this.form.onsubmit;

        this.form.onsubmit = (function(that) {
          return function(evt) {
            try {
              return that.validateForm(evt) && (_onsubmit === undefined || _onsubmit());
            } catch(e) {}
          };
        })(this);
      },

      validateForm: function(evt) {
        this.errors = [];

        for(var i = 0, l = this.fields.length; i < l; i ++) {
          if(!this.validateField(this.fields[i]) && this.options.stopOnError ) break;
        }

        if(this.errors.length > 0 || !autoSubmit) {
          if(evt && evt.preventDefault) {
            evt.preventDefault();
          }else if(event) {
            event.returnValue = false;
          }
        }

        this.options.onFormValidated && this.options.onFormValidated.call(this, this.form, this.errors);
        return true;
      },

      validateField: function(options) {
        options.onItemValidate &&  options.onItemValidate.call(this, options.element);

        for(var i = 0, l = options.rules.length; i < l; i++) {
          var method = options.rules[i],
              result = false,
              parts = /^(.+?)\{(.+)\}$/.exec(method),
              param = null;

          if(parts) {
            method = parts[1];
            param = parts[2];
          }

          options.value = getValue.call(this, options.element);

          if(_.isFunction(this.rules[method])) {
            result = this.rules[method].call(this, options, param);
          } else if(_.isRegExp(this.rules[method])) {
            result = this.rules[method].test(options.value);
          } else {
            // callback
          }

          if(!result) {
            var source = this.messages[method],
                message = options.display + '校验错误。';

            if(source) {
              message = _.template(this.messages[method], {display: options.display, param: param});
            }
            this.showMessage(options.element, message);
            this.errors.push({
              element: options.element,
              message: message
            });
            options.onItemValidated && options.onItemValidated.call(this, result, options.element, message);
            break;
          }
        }

        return result;
      },
      
      registerCallback: function(name, handler) {
        if (name && typeof name === 'string' && handler && _.isFunction(handler)) {
            this.handlers[name] = handler;
        }
      },

      getRule: function(name) {
        return this.rules[name];
      },

      addRule: function(name, handle, message) {
        addRule(name, handle, message);
        return this;
      },

      getMessage: function(name) {
        return this.messages[name];
      },

      setMessage: function(name, message) {
        setMessage(name, message);
        return this;
      },

      // about ui
      showMessage: function(element, message) {
        var item = _.getParent(element, this.options.itemClass);
        if(item == doc) return;

        var explain = item.querySelectorAll('.' + this.options.explainClass);
        _.addClass(item, this.options.itemErrorClass);

        if(explain.length) {
          explain[0].innerHTML = message;
        } else {
          explain = doc.createElement('div');
          explain.className = this.options.explainClass;
          explain.innerHTML = message;
          item.appendChild(explain);
        }
      },
      
      hideMessage: function(element) {
        var item = _.getParent(element, this.options.itemClass);
        if(item == doc) return;

        var explain = item.querySelectorAll('.' + this.options.explainClass);
        _.removeClass(item, this.options.itemErrorClass);

        if(explain.length) {
          explain[0].innerHTML = '';
        }
      }
    }
  })();

  // helper
  var _ = {};
  // utility  
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    return '__rule__' + (idCounter++);
  }

  _.isFunction = function(obj) {
    return Object.prototype.toString.call(obj) === "[object Function]";
  }

  _.isRegExp = function(obj) {
    return Object.prototype.toString.call(obj) === "[object RegExp]";
  }

  _.extend = function(obj) {
    var source = Array.prototype.slice.call(arguments, 1);
    for(var i = 0, l = source.length; i<l; i++) {
      for(var prop in source[i]) {
        if(obj.hasOwnProperty(prop)) {
          obj[prop] = source[i][prop];
        }
      }
    }
    return obj;
  }

  _.template = function(template, data) {
    if(!template) return '';
    if(!data) return template;
    
    return template.replace(new RegExp('{{\\w+}}', 'gmi'), function(property){
      var prop = property.substr(2, property.length - 4),
          value = data[prop];

      return value != null ? value.toString() : '{{'+ prop +'}}';
    });
  }
  
  // dom
  _.$ = function(id) {
    return doc.getElementById(id);
  }
  
  _.data = function(element, attribute) {
    if(element.dataset) {
      return element.dataset[attribute];
    } else { 
      return element.getAttribute('data-' + attribute);
    }
  }

  _.attr = function(element, attribute) {
    return typeof element.getAttribute !== "undefined" && typeof element[attribute] !== "boolean" ? element.getAttribute(attribute) : element[attribute];
  }

  _.getParent = function(element, tClass) {
    var element = element.parentNode;
    while(element.nodeType == 1 && element !== doc && !_.hasClass(element, tClass)){
        element = element.parentNode;
    }
    return element;
  }

  _.hasClass = function(element, tClass) {
    var reg = new RegExp('(?:^|\\s)' + tClass + '(?:\\s|$)');
    return reg.test(element.className);
  }

  _.addClass = function(element, tClass) {
    var className = element.className,
        reg = new RegExp('(?:^|\\s)' + tClass + '(\\s|$)');;
    if(!className) {
      element.className = tClass;
    } else if(!reg.test(className)){
      element.className += ' ' + tClass;
    }
  }

  _.removeClass = function(element, tClass) {
    var className = element.className,
        reg = new RegExp('(?:^|\\s)' + tClass + '(\\s|$)');
    if(className && reg.test(className)) {
      element.className = className.replace(reg, '$1');
    }
  }
  
  win.Validator = Validator;
})(window, document);
