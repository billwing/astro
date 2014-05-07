if (!CKEDITOR.questions)
    CKEDITOR.questions = {};

(function () {
    CKEDITOR.questions.editor = function (ckeditor,config) {
        CKEDITOR.event.call(this);

        //this.element=ckeditor.element;

        this.element = buildContainer.apply(this, [ckeditor]);

        this.id = this.element.getId() || CKEDITOR.tools.getNextId();

        this.config = CKEDITOR.tools.extend(CKEDITOR.questions.config, ckeditor.config.questions || {});

        this.ckeditor = ckeditor;

        //因为ckeditor.element侦听了mousedown事件，它会阻止ckeditor.element中的有子元素为img、textarea、input、select、hr的事件冒泡，无法选中对象，所以要将它移除
        //var events = this.element.getPrivate().events;
        //delete events['mousedown'];

        CKEDITOR.tools.setTimeout(function () {
            loadPlugins(this);
        }, 0, this);
    };

    CKEDITOR.questions.editor.prototype = {
        getValue: function () {
            return this.fire('getValue', { value: {} }).value;
        },
        setValue: function (value) {
            this.fire('setValue', { value: value });
        }
    };

    CKEDITOR.event.implementOn(CKEDITOR.questions.editor.prototype)

    function loadPlugins(editor) {
        var plugins = editor.config.plugins,
            removePlugins = editor.config.removePlugins;

        if (removePlugins) {
            var removeRegex = new RegExp('(?:^|,)(?:' + removePlugins.replace(/\s*,\s*/g, '|') + ')(?=,|$)', 'g');
            plugins = plugins.replace(removeRegex, '');
        }

        CKEDITOR.questions.plugins.load(plugins.split(','), function (plugins) {
            var resourceArray = new Array(),
                pluginArray = new Array();

            for (var pluginName in plugins) {
                var plugin = plugins[pluginName];
                if (!plugin) {
                    continue;
                }
                
                if (plugin.resources && CKEDITOR.tools.isArray(plugin.resources)) {
                    for (var i = 0; i < plugin.resources.length; i++) {
                        resourceArray.push(CKEDITOR.getUrl(plugin.path + plugin.resources[i]));
                    }
                }

                pluginArray.push(plugin);
            }

            CKEDITOR.scriptLoader.load(resourceArray, function () {
                var methods = ['beforeInit', 'init', 'afterInit'];
                for (var m = 0; m < methods.length; m++) {
                    var methodName = methods[m];
                    for (var i = 0; i < pluginArray.length; i++) {
                        var plugin = pluginArray[i];
                        plugin[methodName] && plugin[methodName](editor);
                    }
                }

                editor.plugins = plugins;
                editor.fireOnce('loaded');
            });

        });
    }

    function buildContainer(ckeditor) {
        var containerElement = CKEDITOR.document.createElement('div');
        containerElement.setAttribute('class', ckeditor.element.getAttribute('class'));
        containerElement.insertAfter(ckeditor.element);
        ckeditor.element.hide();

        return containerElement;
    }
})();
﻿
(function () {
    CKEDITOR.questions.plugins = new CKEDITOR.resourceManager('plugins/examlib.questions/plugins/', 'plugin');
})();﻿
(function () {
    CKEDITOR.questions.registermanager = function (createHandler) {
        this.handler = createHandler || function (definition) { };
        this.items = {};
    };

    CKEDITOR.questions.registermanager.prototype = {
        add: function (name, definition) {

            definition.name = name.toLowerCase();

            var item = this.items[name] = {
                args: Array.prototype.slice.call(arguments, 2)
            };

            CKEDITOR.tools.extend(item, definition);
        },

        get: function (name) {
            return this.items[name];
        },

        create: function (editor,name, definition) {
            //var def = CKEDITOR.tools.extend(definition || {}, this.get(name) || { name: name });

            //CKEDITOR.tools.extend2是从JQuery中抓取出来的方法，可以递归合并
            //合并前需要先clone一个，否则会改变registerManager中存储的对象
            var def = CKEDITOR.tools.extend2(true, CKEDITOR.tools.clone(this.get(name) || { name: name }), definition || {});

            return this.handler(editor, def);
        }
    }
})();﻿
(function () {

    CKEDITOR.questions.ui = {};

})();

//CKEDITOR.questions.ui = function (editor) {
//    if (editor.ui)
//        return editor.ui;

//    this.editor = editor;
//};

//CKEDITOR.questions.ui.prototype = {

//    space: function (name) {
//        return CKEDITOR.document.getById(this.spaceId(name));
//    },

//    spaceId: function (name) {
//        return this.editor.id + '_' + name;
//    }
//}﻿
CKEDITOR.tools.isPlainObject = function (obj) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if (!obj || typeof obj !== "object" || obj.nodeType || (obj != null && obj == obj.window)) {
        return false;
    }

    var core_hasOwn = {}.hasOwnProperty;

    try {
        // Not own constructor property must be Object
        if (obj.constructor &&
            !core_hasOwn.call(obj, "constructor") &&
            !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
    } catch (e) {
        // IE8,9 Will throw exceptions on certain host objects #9897
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.

    var key;
    for (key in obj) { }

    return key === undefined || core_hasOwn.call(obj, key);
};

CKEDITOR.tools.extend2 = function () {
    var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if (length === i) {
        target = this;
        --i;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (CKEDITOR.tools.isPlainObject(copy) || (copyIsArray = CKEDITOR.tools.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && CKEDITOR.tools.isArray(src) ? src : [];

                    } else {
                        clone = src && CKEDITOR.tools.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = CKEDITOR.tools.extend2(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};﻿
(function () {

    function buildChildren() {
        var children = this._.definition.children;
        if (!children || !CKEDITOR.tools.isArray(children))
            return;

        for (var i = 0; i < children.length; i++) {
            var definition = children[i];
            definition.name && this.add(definition.name, definition);
        }
    }

    function bindAttributes() {

        var attributes = this._.definition.attributes,
            element = this._.element,
            name = this.name;

        if (attributes) {
            for (var attributeName in attributes) {
                var value = attributes[attributeName];

                if (typeof value == "function") {
                    var original = element.getAttribute(attributeName) || '';
                    value = value(original) || original;
                }

                element.setAttribute(attributeName, value);
            }
        }

        if (!attributes || !attributes['name']) {
            element.setAttribute('name', name);
        }

        element.addClass('cke_questions_' + name);
    }

    function init() {
        var definition = this._.definition;

        var methods = ['beferInit', 'init', 'afterInit'];
        for (var i = 0; i < methods.length; i++) {
            var name = methods[i];
            definition[name] && definition[name].call(this);
        }
    }

    CKEDITOR.questions.part = CKEDITOR.tools.createClass({
        base: CKEDITOR.dom.element,
        _: {
            definition: {
                name: CKEDITOR.tools.getNextId(),
                isOnlyClear:false //true：在remove时只允许清除子项，false：在remove时彻底删除。一般用于type:'element'时生成的part，有可能是不能删除的
            },
            element:new CKEDITOR.dom.element('div')
            //children: new Array(); children不能放在这里，不然在调用add方法时this指针会乱掉，会把子级的part也加到当前children中。原因不明。
        },
        $: function (editor,element, definition) {

            var def = this._.definition = CKEDITOR.tools.extend(definition, this._.definition);
            var elem = (element && (this._.element = element)) || this._.element;

            this.base(elem.$ || elem);

            this.name = def.name;
            this.parent = def.parent || null;
            this.children = new Array();
            this.editor = editor;

            buildChildren.call(this);
            bindAttributes.call(this);
            init.call(this);
        },
        proto: {
            getChildren:function(name){
                if (!name) {
                    return this.children;
                }

                var array = new Array();
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    if (child._.definition.name == name) {
                        array.push(child);
                    }
                }

                return array;
            },
            add: function (name, definition) {
                !definition && (definition = {});
                definition.parent = this;
                var part = CKEDITOR.questions.parts.create(this.editor,name, definition);
                if (part) {
                    this.children.push(part);

                    if (!this.equals(part) && !part.contains(this) && !this.contains(part)) {
                        this.append(part);
                    }

                    this.fire('afterAddChild', { part: this, child: part });
                }

                return part;
            },
            clear: function () {

                //不能用for循环，否则循环过程中数组对像被删除，数据发生变化，循环产生异常
                while (this.children.length > 0) {
                    this.children[0].remove();
                }
            }
        },
        statics: {
        }
    });

    CKEDITOR.questions.part.prototype.remove = CKEDITOR.tools.override(CKEDITOR.questions.part.prototype.remove, function (original) {
        return function () {

            this.parent && this.parent.fire('beferRemoveChild', { part: this.parent, child: this });

            this.clear();

            if (!this._.definition.isOnlyClear) {
                original.apply(this, arguments);
            }

            if (this.parent) {
                this.parent.children.splice(CKEDITOR.tools.indexOf(this.parent.children, this), 1);
            }
        }
    });

    CKEDITOR.questions.part.prototype.getValue = CKEDITOR.tools.override(CKEDITOR.questions.part.prototype.getValue, function (original) {
        return function () {
            var value = this._.definition.getValue
                ? this._.definition.getValue.call(this)
                : original.call(this);

            return this.fire('getValue', { value: value }).value;
        }
    });

    CKEDITOR.questions.part.prototype.setValue = CKEDITOR.tools.override(CKEDITOR.questions.part.prototype.setValue, function (original) {
        return function (value) {
            if (value == undefined || value == null) {
                return;
            }

            if (this._.definition.setValue) {
                this._.definition.setValue.call(this,value);
            }
            else {
                original.call(this,value);
            }

            this.fire('setValue', { value: value });
        }
    });

    /* ------------------------------------------------    CKEDITOR.questions.parts 及常规组件    ----------------------------------------------------------*/
    CKEDITOR.questions.parts = new CKEDITOR.questions.registermanager(function (editor,definition) {

        var element = CKEDITOR.questions.ui.part.create(editor, definition.type || 'html', definition);

        return new CKEDITOR.questions.part(editor,element,definition);
    });

    //语法：CKEDITOR.questions.parts.add('partName',partDefinition);
    //partDefinition:{
    //    type:'html|element|...',                  //这里是指part元素的生成方式，这些方式注册在CKEDITOR.questions.ui.part当中
    //    html:'<a class="margin5"></a>',           //html是type=html时的特有配置属性，当我们设置不同的元素生成方式时，要为这个生成方式指定一些生成参数，html参数就是html生成方式特有的参数。
    //    attributes:{                              //attributes是用来设定part元素的attributes
    //        href:'http://www.sina.com.cn',        //以定值的方式设置attribute             a.href="http://www.sina.com.cn"
    //        'class':function(original){           //以函数处理的形式来设置attribute        a.class="padding5 margin5"
    //            return 'padding5 ' + original;
    //        }
    //    },
    //    children:[                                //子级part部件
    //        {
    //            name:''                           //子级部件名称，子级部件比partDefinition多了一个name属性
    //            ...                               //子级部件的其它定义与partDefinition相同，
    //        } 
    //    ],
    //    beferInit:function(){
    //    },
    //    init:function(){                          //part元素生成后的初始化方法
    //    },
    //    afterInit:function(){
    //    }
    //}

    CKEDITOR.QUESTIONS_PART_BUTTON = 'button';
    CKEDITOR.questions.parts.add('button', {
        type: 'html',
        html: '<a href="javascript:void(0);" hidefocus="true"></a>',
        title: '',
        text: '',
        onClick:null,
        init: function () {
            this._.definition.title && this.setAttribute('title', this._.definition.title);
            this._.definition.onClick && this.on('click', this._.definition.onClick);
            this._.definition.text && this.setText(this._.definition.text);
            this.removeAttribute('name');
            this.unselectable();
        }
    });

    CKEDITOR.QUESTIONS_PART_DROPDOWNLIST = 'dropdownlist';
    CKEDITOR.questions.parts.add('dropdownlist', {
        type: 'html',
        html: '<select></select>',
        items: [],
        onChange: null,
        init: function () {
            this._.definition.onChange && this.on('change', this._.definition.onChange);

            if (this._.definition.items && this._.definition.items.length > 0) {
             
                for (var i = 0; i < this._.definition.items.length; i++) {
                    var item = this._.definition.items[i];
                    if (item && item.value) {
                        //bug,select对象必须这样子添加option项
                        this.$.options.add(new Option((item.text || item.value), item.value));
                    }
                }
            }
        }
    });

    CKEDITOR.QUESTIONS_PART_HEADER = 'header';
    CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_HEADER, {
        type: 'html',
        html: '<h5></h5>',
        title:'',
        init: function () {
            this._.definition.title && this.append(CKEDITOR.dom.element.createFromHtml('<span>' + this._.definition.title + '</span>'), true);
            this.unselectable();
        }
    });

    

    CKEDITOR.QUESTIONS_PART_EDITOR = 'editor';
    CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_EDITOR, {
        type: 'html',
        html: '<div>' + 
                    '<div class="cke_questions_editorArea" contentEditable="true" style="outline: none;"></div>' +
              '</div>',
        init: function () {

            var self = this,
                ckeditor = this.editor.ckeditor,
                element = self.editable = self.getChild(0);

            ckeditor.on('dataReady', function () {
                self.isEditable() && self.fire('dataReady');
            });

            var editable;

            self.on('mousedown', function (event) {

                if (!self.isEditable()) {

                    ckeditor.currentEditable = self;
                    ckeditor.readOnly = false;
                    CKEDITOR.env.gecko && ckeditor.unlockSelection(); //如果是ff等浏览器，则需要清除当前保存的Selection
                    ckeditor.editable(0);
                  
                    ckeditor.editable(element);
                    ckeditor.container = element
                    //注意使用setData时会启用ckeditor的ACF功能，会对数据进行筛选和处理
                    //ckeditor.setData(element.getHtml());
                    //ckeditor.setData(ckeditor.getData(1));
                   
                    ckeditor.fire('contentDom');
                    ckeditor.fire('ariaWidget', element);
                    ckeditor.resetDirty();

                    setTimeout(function () {
                        ckeditor.fire('mode');

                        //在google和ff下边focusin事件发生在ckeditor.editable()之前，所以需要重新检测selection使工具栏按钮状态正确显示
                        if (CKEDITOR.env.webkit) {
                            ckeditor.selectionChange(true);
                        }
                    }, 0);
                }

                //注意这里要返回true，否则在ff和chrom浏览器下会阻止element的mousedown冒泡
                return true;
            });


            self.insertHtml = function (html) {
                if (self.isEditable()) {
                    ckeditor.insertHtml(html);
                }
                else {
                    element.appendHtml(html);
                }
            };

            self.insertText = function (text) {
                if (self.isEditable()) {
                    ckeditor.insertText(text);
                }
                else {
                    element.appendText(text);
                }
            }

            self.insertElement = function (node) {
                if (self.isEditable()) {
                    ckeditor.insertElement(node);
                }
                else {
                    element.append(node);
                }
            }

            self.isEditable = function () {
                return ckeditor.currentEditable && ckeditor.currentEditable == self;
            }
        },
        getValue: function () {
            var html = this.editor.ckeditor.dataProcessor.toDataFormat(this.editable.getHtml());
            //&#8203;是ff和google浏览器下的问题，暂时不知道是什么原因，在第一次编辑器打开，点击第一个编辑框并使用ctrl + v粘贴内容，那么就会在内容前边自动产生&#8203;
            return html.replace(/<!--(\s*){cke_protected}[^>]*-->/g, '').replace('&#8203;', '');
        },
        setValue: function (value) {
            this.editable.setHtml(this.editor.ckeditor.dataProcessor.toHtml(value));
        }
    });


    /* ------------------------------------------------    CKEDITOR.questions.ui.part   --------------------------------------------------------- */

    CKEDITOR.questions.ui.part = new CKEDITOR.questions.registermanager(function(editor,definition){
        return definition.build
            ? definition.build(definition)
            : this.get('html').build(definition);
    });
    
    CKEDITOR.questions.ui.part.add('html', {
        build:function(definition){
            CKEDITOR.tools.extend(definition, {
                html: '<div></div>'
            });

            if (definition.html.charAt(0) != '<') {
                definition.html = '<div>' + definition.html + '</div>';
            }

            return new CKEDITOR.dom.element.createFromHtml(definition.html);
        }
    });

    CKEDITOR.questions.ui.part.add('element', {
        build: function (definition) {
            CKEDITOR.tools.extend(definition, {
                element: new CKEDITOR.dom.element('div')
            });

            return definition.element;
        }
    });


    //必须加一个控件进ckeditor.questions.plugins中不然文件合并后在加载过程中ff会报异常
    CKEDITOR.questions.plugins.add('part', {});

    //必须要将自动创建行编辑器关闭，否则part会自动创建为editor对象
    CKEDITOR.disableAutoInline = true;
})();﻿
(function () {

    var defaultDefinition = {
        id: 1,
        name: '',
        title: '',
        html: '',
        parts: [],
        index: 999,
        init: function (partArray) { } //这里的
    };

    CKEDITOR.questions.type = function (editor, definition) {
        CKEDITOR.tools.extend(this, definition);

        this.editor = editor;
    };

    CKEDITOR.questions.type.prototype = {

        selected: function (part) {
            if (!part) {
                var questionParts = this.editor.fire('uiParts', { name: CKEDITOR.QUESTIONS_PART_QUESTIONS, parts: new Array() }).parts;
                if(!questionParts || questionParts.length==0){
                    return;
                }

                part = questionParts[0];
            }

            if (part.questionType && part.questionType == this) {
                return;
            }

            part.questionType = this;

            if (part.questionParts) {
                for (var i = 0; i < part.questionParts.length; i++) {
                    part.questionParts[i].remove();
                }
            }

            var questionParts = part.questionParts = new Array();
            for (var i = 0; i < this.parts.length; i++) {
                questionParts.push(part.add(this.parts[i]));
            }

            this.init && this.init(questionParts);

            for (var i = 0; i < questionParts.length; i++) {
                questionParts[i].fire('typeLoaded');
            }
        }
    };

    /* ----------------------------------------------------    CKEDITOR.questions.types 静态        -------------------------------------------------*/
    
    CKEDITOR.questions.types = new CKEDITOR.questions.registermanager(function (editor,definition) {
        return new CKEDITOR.questions.type(editor,definition);
    });

    CKEDITOR.questions.types.createAll = function (editor) {

        var list = {};

        for (var name in this.items) {
            list[name] = this.create(editor,name) || null;
        }

        return list;
    };

    /* ----------------------------------------------------    add types plugin        -------------------------------------------------*/

    //依赖于part
    CKEDITOR.questions.plugins.add('type', {
        init: function (editor) {
            editor.on('loaded', function () {
                editor.types = CKEDITOR.questions.types.createAll(editor);
            },null,null,1);
        }
    });

})();﻿(function () {
    CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT = 'knowledgepoint';

    function pointViewModel(settingOptions) {
        var self = this;
        self.settings = {
            isEdit: true,
            otherParam: {},
            maxPointCount: 20,
            pointShowPanel: $("#content_score"),
            ratingDeviceExpr: "i",
            showItemTemplate: '<li class="in_score">' +
                                '<div class="cf" style="padding-bottom:5px;height:30px;">' +
                                    '<span id="txt_score_2" class="t_elli" style="width:145px;margin-right:10px;float:left;display: block;color: #0456AD;">{0}</span>' +
                                    '<a title="删除该知识点" class="stars_del" href="javascript:;"></a>' +
                                '</div>' +
                                '<div>' +
                                    '<span style="float:left;padding-right:10px;">' +
                                        '<i title="了解" class="stars_0"></i>' +
                                        '<i title="理解" class="stars_0"></i>' +
                                        '<i title="掌握" class="stars_0"></i>' +
                                    '</span>' +
                                    '<b style="float:left;padding-top:2px;">了解</b>' +
                                '</div>' +
                             '</li>',
            addButton: $("#btnAddPoint")
        };
        $.extend(true, self.settings, settingOptions || {});

        if (self.settings.pointShowPanel.length == 0) {
            self.settings.pointShowPanel = self.settings.addButton.parent();
        }

        self.PointItems = new Array();

        self.showItemTagName = $(self.settings.showItemTemplate).get(0).tagName;

        self.toggleAddButton = function () {
            if (self.settings.pointShowPanel.find(self.showItemTagName).length > self.settings.maxPointCount) {
                self.settings.addButton.hide();
            }
            else {
                self.settings.addButton.show();
            }
        };

        self.getItem = function (elem) {
            return $(elem).parents(string.Format("{0}:first", self.showItemTagName));
        };

        self.setRatingDeviceTitle = function (content) {
            content.parent().next().text(content.attr("title"));
        };
        self.setRatingDevice = function (index, val, elem) {

            if (!val) {
                if (self.PointItems[index].ratingDevice) {
                    val = self.PointItems[index].ratingDevice;
                }
                else {
                    val = self.settings.isEdit ? 1 : 0;
                }
            }

            self.PointItems[index].ratingDevice = val;

            if (val == 0) {
                self.settings.pointShowPanel.find(string.Format("{0}:eq({1})", self.showItemTagName, index))
                    .find(self.settings.ratingDeviceExpr)
                    .removeClass("stars_1")
                    .addClass("stars_0");
            }
            else {

                var currentRatingDevice = elem
                    ? $(elem)
                    : self.settings.pointShowPanel.find(string.Format("{0}:eq({1})", self.showItemTagName, index)).find(string.Format("{0}:eq({1})", self.settings.ratingDeviceExpr, val - 1));

                currentRatingDevice.siblings().removeClass("stars_1");
                currentRatingDevice.prevAll().addClass("stars_1");
                currentRatingDevice.addClass("stars_1");
                currentRatingDevice.nextAll().addClass("stars_0");
                self.setRatingDeviceTitle(currentRatingDevice);
            }
        };
        self.getRatingDevice = function (index) {
            if (self.PointItems[index].ratingDevice) {
                return self.PointItems[index].ratingDevice;
            }

            return 1;
        };

        self.buildShowPanel = function () {
            self.settings.pointShowPanel.empty();
            $.each(self.PointItems, function (index, item) {
                self.settings.pointShowPanel.append(string.Format(self.settings.showItemTemplate, item.name));
                self.setRatingDevice(index);
            });

            self.bindRatingDeviceClick();
            self.bindPointDeleteClick();
            self.toggleAddButton();
        };

        self.bindPointDeleteClick = function () {
            self.settings.pointShowPanel.find("a.stars_del").unbind("click").click(function () {
                var currnetLi = self.getItem(this);
                //self.multiSelector.removeAt(currnetLi.index(), 1);
                self.PointItems.splice(currnetLi.index(), 1);
                currnetLi.remove();
                self.toggleAddButton();
            });
        };

        self.bindRatingDeviceClick = function () {
            self.settings.pointShowPanel.find(self.settings.ratingDeviceExpr).unbind().bind({
                click: function () {
                    self.setRatingDevice(self.getItem(this).index(), $(this).index() + 1, this);
                },
                mouseover: function () {
                    $(this).siblings().removeClass("stars_1");
                    $(this).prevAll().addClass("stars_1");
                    $(this).addClass("stars_3");
                    $(this).nextAll().addClass("stars_0");
                    self.setRatingDeviceTitle($(this));
                },
                mouseout: function () {
                    $(this).removeClass("stars_3");
                    var itemIndex = self.getItem(this).index();
                    self.setRatingDevice(itemIndex);
                }
            });
        };

        self.clear = function () {
            self.settings.pointShowPanel.find("a.stars_del").click();
        }

        self.getPoints = function () {

            return $(self.PointItems).map(function (index, item) {
                return {
                    PointName: item.name,
                    PointCode: item.id,
                    NeedLevel: item.ratingDevice ? item.ratingDevice : 1
                };
            }).get();

        };

        self.init = function (points) {

            if (points && $.isArray(points)) {
                $.each(points, function (index, item) {
                    self.PointItems[index] = {
                        id: item.PointCode,
                        name: item.PointName,
                        ratingDevice: item.NeedLevel
                    };
                });

                self.buildShowPanel();
            }

            if (self.settings.isEdit) {
                self.bindPointDeleteClick();
            }
            else {
                self.settings.addButton.hide();
            }

            return self;
        };

        return self;
    }

    function buildKnowledgePointDefinition() {
        return {
            type: 'html',
            children: [
                {
                    name: CKEDITOR.QUESTIONS_PART_HEADER,
                    attributes: {
                        'class': 'cke_questions_header_children'
                    },
                    title: '知识点'
                },
                {
                    name: "knowledgeInfo",
                    html: '<div><ul id="content_score" class="box_score_1 cf content_score" style="font-size:14px;"></ul></div>',
                    init: function () {

                        this.viewModel = new pointViewModel({ pointShowPanel: $(this._.element.$).find('ul'), otherParam: { subjectId: subject.ID, subjectName: subject.name } });
                    },
                    getValue: function () {
                        return this.viewModel.PointItems;
                    },
                    setValue: function (value) {
                        this.viewModel.init(value);
                    }
                },
                {
                    name: 'button',
                    title: '添加知识点',
                    text: '+添加知识点',
                    onClick: function () {
                        this.editor.ckeditor.currentKnowledgePointPart = this.parent;
                        this.editor.ckeditor.getCommand('knowledge').state = 2;
                        this.editor.ckeditor.execCommand("knowledge");
                    },
                    attributes: {
                        'class': 'cke_questions_known_button_add'
                    }
                }
            ],
            init: function () {

                this.editor.ckeditor.addCommand('knowledge', new CKEDITOR.dialogCommand('knowledge'));
                CKEDITOR.dialog.add('knowledge', this.editor.plugins.knowledgepoint.path + "dialogs/knowledge.js");

            },
            getValue: function () {
                var points = this.children[1].getValue();
                if (points && points.length > 0) {
                    return $(points).map(function () {
                        return {
                            PointName: this.name,
                            PointCode: this.id,
                            NeedLevel: this.ratingDevice ? this.ratingDevice : 1
                        }
                    }).get();
                }
            },
            setValue: function (value) {
                this.children[1].setValue(value)
            }
        }

    }

    CKEDITOR.questions.plugins.add(CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT, {
        init: function (editor) {
            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT, buildKnowledgePointDefinition());

        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_QUESTIONS = 'questions';

    CKEDITOR.questions.plugins.add('questions', {
        requires: 'part',
        init: function (editor) {

            var part;

            editor.on('uiReady', function (event) {
                event.data.parts && CKEDITOR.tools.isArray(event.data.parts) && event.data.parts.push(CKEDITOR.questions.parts.create(editor,CKEDITOR.QUESTIONS_PART_QUESTIONS));
            }, null, null, 1);

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_QUESTIONS, {
                getValue: function () {
                    if (!this.questionType) {
                        return null;
                    }

                    var value = {
                        
                        type: {                                 //试题类型
                            id: this.questionType.id,               //类型id
                            name: this.questionType.name            //类型名称
                        },
                        mode: 1,                                //客观（1）、主观（0）,
                        trunk: {                                //题干
                            content: '',                            //内容
                            attachment:[]                           //附件
                        },                                      
                        ideas: '',                              //解题思路
                        options: [],                            //选项
                        children:[]                             //子试题                       
                    };

                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i],
                            valueName = getValueName(child,value.type);

                        var childValue = child.getValue();
                        if (childValue != undefined && childValue != null) {
                            //简单题答案需要转为数组
                            if (child.name == CKEDITOR.QUESTIONS_PART_SHORTANSWER) {
                                childValue.isAnswer = true;
                                childValue = [childValue];
                            }
                            value[valueName] = childValue;
                        }
                    }

                    return value;
                },
                setValue: function (value) {
                    var type = value.type && value.type.name && editor.types[value.type.name];
                    if (!type)
                        return;

                    type.selected(this);

                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i],
                            childValue = value[getValueName(child,value.type)];

                        //childValue可以为false，因为有boolean值的控件
                        if (childValue != null && childValue != undefined) {
                            child.setValue(child.name == CKEDITOR.QUESTIONS_PART_SHORTANSWER ? childValue[0].contents[0] : childValue);
                        }
                    }
                }
            });

            function getValueName(childPart,type) {
                return childPart.name == type.name
                            ? 'options'
                            : childPart.name == "childrenspace"
                                ? 'children'
                                : childPart.name;
            }
        }
    });

})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_ADVANCED = 'advanced';
    CKEDITOR.QUESTIONS_PART_GRADE = 'grade';
    CKEDITOR.QUESTIONS_PART_SCOPE = 'scope';
    CKEDITOR.QUESTIONS_PART_LEVEL = 'level';
    CKEDITOR.QUESTIONS_PART_AREA = 'area';
    CKEDITOR.QUESTIONS_PART_TAG = 'tag';
    CKEDITOR.QUESTIONS_PART_SOURCE = 'source';
    CKEDITOR.QUESTIONS_PART_AUTHOR = 'author';
    CKEDITOR.QUESTIONS_PART_DATE = 'date';
    CKEDITOR.QUESTIONS_PART_CHECKBOXLIST = 'checkboxlist';

    CKEDITOR.questions.plugins.add('advanced', {
        requires: 'part',
        resources: ['resources.js'],
        init: function (editor) {

            editor.on('uiReady', function (event) {
                event.data.parts.push(CKEDITOR.questions.parts.create(editor,CKEDITOR.QUESTIONS_PART_ADVANCED));
            }, null, null, 2);

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_ADVANCED, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "高级选项"
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_GRADE
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_LEVEL
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_SCOPE
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_AREA
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_REFERENCE
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_TAG
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_SOURCE
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_AUTHOR
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_DATE
                    }
                ],
                init: function () {
                },
                getValue: function () {
                    var value = {}
                    for (var i = 1; i < this.children.length; i++) {
                        var child = this.children[i];
                        value[child.name] = child.getValue();
                    }
                    return value;
                },
                setValue: function (value) {
                    if (!value) {
                        return;
                    }

                    for (var i = 1; i < this.children.length; i++) {
                        var child = this.children[i],
                            childValue = value[child.name];

                        childValue && child.setValue(childValue);
                    }
                }
            });

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_GRADE, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "年级"
                    },
                    {
                        name: 'gradePanel',
                        init: function () {

                            function mouseHander(event) {
                                for (var i = 1; i < this.children.length; i++) {
                                    this.children[i][(event.name == 'mouseenter' || event.name == 'mouseover') ? 'show' : 'hide']();
                                }
                            }

                            //google浏览器不支持mouseenter事件
                            this.on(CKEDITOR.env.webkit ? 'mouseover' : 'mouseenter', mouseHander);
                            this.on(CKEDITOR.env.webkit ? 'mouseout' : 'mouseleave', mouseHander);

                            var periodArray = examlib.resources.period;
                            var periodCheckBoxList = this.add(CKEDITOR.QUESTIONS_PART_CHECKBOXLIST, {
                                groupName: 'period'
                            });

                            for (var i = 0; i < periodArray.length; i++) {
                                var period = periodArray[i];

                                var gradeCheckBoxList = this.add(CKEDITOR.QUESTIONS_PART_CHECKBOXLIST, {
                                    html: '<div><span>' + period.name + '</span></div>',
                                    dataSource: examlib.resources.finder.findGradeByPeriod(period.id),
                                    groupName: 'grade',
                                    checkAll: {
                                        text: period.name,
                                        groupName: 'period',
                                        value:period.id
                                    }
                                });

                                periodCheckBoxList.append(gradeCheckBoxList.checkAll);
                                periodCheckBoxList.children.push(gradeCheckBoxList.checkAll);

                                gradeCheckBoxList.hide();
                            }
                        },
                        getValue: function () {
                            var grades = new Array();
                            for (var i = 1; i < this.children.length; i++) {
                                grades = grades.concat(this.children[i].getValue());
                            }

                            var periods = this.children[0].getValue();

                            return {
                                grades: grades,
                                periods: periods
                            };
                        },
                        setValue: function (value) {
                            this.children[0].setValue(value.periods);
                            this.children[1].setValue(value.grades);
                        }
                    }
                ],
                init: function () { },
                getValue: function () {
                    return this.children[1].getValue();
                },
                setValue: function (value) {
                    this.children[1].setValue(value);
                }
            });

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_SCOPE, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "适用范围"
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_CHECKBOXLIST,
                        dataSource: function () { return examlib.resources.scope; },
                        groupName: 'scope'
                    }
                ],
                getValue: function () {
                    return this.children[1].getValue();
                },
                setValue: function (value) {
                    this.children[1].setValue(value);
                }
            });

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_LEVEL, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "难易度"
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_CHECKBOXLIST,
                        dataSource: function () { return examlib.resources.level; },
                        groupName: 'level',
                        isMultiple: false,
                        afterInit: function () {
                            var checkboxList = this.getElementsByTag('input');
                            if (checkboxList.count() > 0) {
                                checkboxList.getItem(0).$.checked = true;
                            }
                        }
                    }
                ],
                getValue: function () {
                    return this.children[1].getValue();
                },
                setValue: function (value) {
                    this.children[1].setValue(value);
                }
            });

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_AREA, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "适合区域"
                    },
                    {
                        name: CKEDITOR.QUESTIONS_PART_CHECKBOXLIST,
                        dataSource: function () { return examlib.resources.area; },
                        groupName: 'area',
                        checkAll: {
                            text:'全部地区'
                        }
                    }
                ],
                getValue: function () {
                    return this.children[1].getValue();
                },
                setValue: function (value) {
                    this.children[1].setValue(value);
                }
            });

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_TAG, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "标签"
                    },
                    {
                        name: 'textbox',
                        html: '<div><input type="text" /></div>'
                    }
                ],
                getValue: function () {
                    return this.children[1].getChild(0).getValue();
                },
                setValue: function (value) {
                    this.children[1].getChild(0).setValue(value);
                }
            });

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_SOURCE, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "来源"
                    },
                    {
                        name: 'textbox',
                        html: '<div><input type="text" /></div>'
                    }
                ],
                getValue: function () {
                    return this.children[1].getChild(0).getValue();
                },
                setValue: function (value) {
                    this.children[1].getChild(0).setValue(value);
                }
            });

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_AUTHOR, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "作者"
                    },
                    {
                        name: 'textbox',
                        html: '<div><input type="text" /></div>'
                    }
                ],
                getValue: function () {
                    return this.children[1].getChild(0).getValue();
                },
                setValue: function (value) {
                    this.children[1].getChild(0).setValue(value);
                }
            });

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_DATE, {
                html: '<div class="cke_questions_part"></div>',
                children: [
                    {
                        name: CKEDITOR.QUESTIONS_PART_HEADER,
                        title: "发布日期"
                    },
                    {
                        name: 'textbox',
                        html: '<div><input id="publish_date" class="date" type="text" /></div>'
                    }
                ],
                getValue: function () {
                    return this.children[1].getChild(0).getValue();
                },
                setValue: function (value) {
                    this.children[1].getChild(0).setValue(value);
                }
            });



            var checkBoxTpl = CKEDITOR.addTemplate('checkBox', '<span>' +
                    '<input id="checkbox_{groupName}_{value}" name="{groupName}" value="{value}" type="{type}" />' +
                    '<label>{text}</label>' +
                '</span>'
            );

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_CHECKBOXLIST, {
                dataSource: new Array(),  //也可以用返回数组的fun
                valueField: 'id',
                textField: 'name',
                groupName: null,
                checkAll: {
                    isShow: true,
                    text: '全部',
                    value: 'all',
                    groupName: null,
                    classes: 'cke_checkbox_checkAll'
                },
                isMultiple: true,
                init: function () {
                    var self = this,
                        dataSource = typeof this._.definition.dataSource == 'function' ? this._.definition.dataSource() : this._.definition.dataSource,
                        valueField = this._.definition.valueField,
                        textField = this._.definition.textField,
                        groupName = this._.definition.groupName || CKEDITOR.tools.getNextId(),
                        isMultiple = this._.definition.isMultiple,
                        checkAll = this._.definition.checkAll;

                    if (!CKEDITOR.tools.isArray(dataSource)) {
                        return;
                    }

                    if (isMultiple && checkAll.isShow) {
                        var checkAllButton = self.checkAll = this.add('checkBox', {
                            html: checkBoxTpl.output({
                                groupName: checkAll.groupName || (groupName + 'all'),
                                value: checkAll.value,
                                text: checkAll.text,
                                type: 'checkBox'
                            })
                        });

                        checkAllButton.setAttribute('class', checkAll.classes);

                        checkAllButton.getChild(0).on('click', function () {
                          
                            for (var i = 1; i < self.children.length ; i++) {
                                var checkBox=self.children[i].getChild(0);

                                if(checkBox.$.checked!=this.$.checked){
                                    checkBox.$.click();
                                }
                            }

                        });
                    }

                    for (var j = 0; j < dataSource.length; j++) {
                        var data = dataSource[j],
                            value = data[valueField] || data,
                            text = data[textField] || value;

                        this.add('checkBox', {
                            html: checkBoxTpl.output({
                                groupName: groupName,
                                value: value,
                                text: text,
                                type: isMultiple ? 'checkbox' : 'radio'
                            })
                        });
                    }
                },
                getValue: function () {
                    var value = new Array();
                    var checkBoxList = this.getElementsByTag('input');
                    for (var i = 0; i < checkBoxList.count() ; i++) {
                        var checkBox = checkBoxList.getItem(i);
                        if (checkBox.getAttribute('name') == this._.definition.groupName && checkBox.$.checked) {
                            value.push(checkBox.getValue());
                        }
                    }
                    return value;
                },
                setValue: function (value) {
                    if (value == undefined) {
                        return;
                    }

                    if (!CKEDITOR.tools.isArray(value)) {
                        value = [value];
                    }

                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        if (child.name == 'checkbox') {
                            child.getChild(0).$.checked = false;
                        }
                    }

                    for (var i = 0; i < value.length; i++) {
                        var id = 'checkbox_' + this._.definition.groupName + '_' + value[i],
                            element = document.getElementById(id);

                        element && (element.checked = true);
                    }
                }
            });
        }
    });
})();﻿
(function () {

    var defaultDefinition = {
        text: '选项',                         //header.text
        number: 4,                            //初始化时默认选择项数量
        isEditable: true,                     //选项是否允许编辑
        addDisplay: true,                    //是否显示添加选项按钮     
        addText: '添加选项',                  //添加选项按钮文字
        addClick: function (event) { },      //添加按钮事件
        answerDisplay: true,                 //是否显示答案项
        answerIsMultiple: false,             //答案是否可多选
        answerContentIsMultiple: false,         //是否显示多答案
        answerTitle: '设置当前选项为正确答案', //答案title
        delDisplay: true,                    //是否显示删除选项按钮
        delText: 'X',                       //删除选项按钮文本 
        delTitle: '删除当前选项',             //删除选项按钮title
        delClick: function (event) { },       //删除按钮事件  
        buildNumber: function (index) {         //生成选项序号
            var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            if (index > 25) {
                return index + 1;
            }

            return alpha[index];
        },
        init: function () { },
        getValue: function () {
            var value = [];
            for (var i = 0; i < this.options.length; i++) {
                var child = this.options[i];

                value.push({
                    contents: child.contents.getValue(),
                    isAnswer: child.answer.$.checked
                });
            }
            return value;
        },
        setValue: function (value) {
            if (!value || !CKEDITOR.tools.isArray(value) || value.length == 0) {
                return;
            }

            for (var i = 0; i < value.length; i++) {
                var option = this.options[i]
                optionValue = value[i];

                !option && (option = this.addOption());

                option.contents.setValue(optionValue.contents);
                if (optionValue.isAnswer) {
                    option.answer.setAttribute('checked', 'checked');
                }
            }

            for (var i = (this.options.length - 1) ; i >= value.length; i--) {
                this.options[i].remove();
            }
        }
    };
 
    CKEDITOR.tools.extend(CKEDITOR.questions.parts, {
        addOptions: function (name, definition) {

            var def = CKEDITOR.tools.extend(definition, defaultDefinition);

            function addButton(part)
            {
                if (!def.addDisplay) 
                    return;

                var btn = CKEDITOR.questions.parts.create(part.editor,'button', {
                    title: def.addText,
                    text: def.addText,
                    onClick: function (event) {
                        var option= part.addOption();
                        def.addClick && def.addClick.call(option, event);
                    }
                });

                part.getChild(0).append(btn);
            }

            function addOption() {
                var part = this;
                if (part.options.length == 26) {
                    alert("最多只能添加26个选项。");
                    return;
                }

                var option = part.children[1].add('option', {
                    type: 'html',
                    children: [
                        {
                            name: def.isEditable ? CKEDITOR.QUESTIONS_PART_EDITORSPACE : 'inline',
                            isMultiple: def.answerContentIsMultiple,
                            afterInit: function () {
                                !def.isEditable && this.addClass('cke_questions_editorspace');
                            }
                        },
                        {
                            name: 'isAnswer',
                            html: '<input type="' + (def.answerIsMultiple ? 'checkbox' : 'radio') + '" />',
                            attributes: {
                                style: def.answerDisplay ? '' : 'display:none',
                                title: def.answerTitle,
                                name:part.id
                            }
                        },
                        {
                            name: 'button',
                            title: def.delTitle,
                            onClick: function () {
                                confirm('确认要删除当前所有子选项？删除后将不可恢复。') && part.removeOption(option);
                            },
                            attributes: {
                                style: def.delDisplay ? '' : 'display:none',
                                'class': 'cke_questions_icon_del'
                            }
                        },
                        {
                            name: 'sort',
                            html:'<span></span>'
                        }
                    ],
                    init: function () {
                        this.contents = this.children[0];
                        this.answer = this.children[1];
                        this.sort = this.children[3];
                    }
                });

                option.part = part;

                part.fire('resetSort');

                return option;
            }

            function removeOption(option) {

                def.delClick && def.delClick.call(option);

                option.remove();

                this.fire('resetSort');
            }

            CKEDITOR.questions.parts.add(name, {
                html: '<div class="cke_questions_part" name="options"></div>',
                children: [
                    {
                        name: 'header',
                        title: def.text
                    },
                    {
                        name: 'content',
                        html:'<div class="cke_questions_options"></div>'
                    }
                ],
                init: function () {
                    this.id = CKEDITOR.tools.getNextId();
                    this.options = this.children[1].children;
                    this.addOption = addOption;
                    this.removeOption = removeOption;

                    addButton(this);

                    for (var i = 0; i < def.number; i++) {
                        this.addOption();
                    }

                    this.on('resetSort', function () {
                        for (var i = 0; i < this.options.length; i++) {
                            var option = this.options[i];
                            option.sort.setText(def.buildNumber(i) + '.');
                        }
                    });

                    def.init && def.init.call(this);

                    this.fire('resetSort');
                },
                getValue: def.getValue,
                setValue: def.setValue
            });
        }
    });

    CKEDITOR.questions.plugins.add('options', {
        beforeInit: function () {

        }
    });

})();﻿
(function () {
    
    CKEDITOR.QUESTIONS_PART_EDITORSPACE = 'editorspace';

    CKEDITOR.questions.plugins.add(CKEDITOR.QUESTIONS_PART_EDITORSPACE, {
        beforeInit: function (editor) {
            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_EDITORSPACE, buildEditorSpaceDefinition());
        }
    });

    function buildEditorSpaceDefinition() {

        function addEditorItem(settingsOptions) {
            var settings = CKEDITOR.tools.extend(settingsOptions, {
                displayAddButton: false,
                displayRemoveButton: false
            });
            var part = this;

            var content = part.add('editoritem', {
                type: 'html',
                children: [
                    {
                        name: 'editor'
                    }, {
                        name: 'button',
                        title: "添加",
                        onClick: function () {
                            part.addEditor({
                                displayRemoveButton: true
                            });
                        },
                        attributes: {
                            style: 'display:none', //style: settings.displayAddButton ? '' : 'display:none', //一题多解先隐藏
                            'class': 'cke_questions_icon_add'
                        }
                    }, {
                        name: 'button',
                        title: "删除",
                        onClick: function () {
                            confirm('确认要删除当前选项？删除后将不可恢复。') && content.remove();
                        },
                        attributes: {
                            style: settings.displayRemoveButton ? '' : 'display:none',
                            'class': 'cke_questions_icon_del'
                        }
                    }
                ],
                getValue: function () {
                    return this.children[0].getValue();
                },
                setValue: function (value) {
                    value && this.children[0].setValue(value);
                }
            });
        }

        return {
            type: 'html',
            isMultiple: false,
            getValue: function () {
                var value = [];
                for (var i = 0; i < this.children.length; i++) {

                    var child = this.children[i];
                    var attachment = child.getChildren('attachment');

                    value.push({
                        content: child.getValue(),
                        attachment: attachment.length > 0 ? attachment[0].getValue() : []
                    });
                }

                return value;
            },
            setValue: function (value) {
                if (!value || !CKEDITOR.tools.isArray(value) || value.length == 0) {
                    return;
                }

                for (var i = 0; i < value.length; i++) {
                    var child = this.children[i],
                        childValue = value[i];

                    !child && (child = this.addContent({
                        displayAddButton: false
                    }));

                    child.setValue(childValue.content);

                    if (childValue.attachment && CKEDITOR.tools.isArray(childValue.attachment) && childValue.attachment.length > 0) {
                        var attachment = child.add(CKEDITOR.QUESTIONS_PART_OPTIONS_ATTACHMENT);
                        attachment.setValue(childValue.attachment);
                    }
                }
            },
            init: function () {
                this.addEditor = addEditorItem;

                this.addEditor({
                    displayAddButton: this._.definition.isMultiple
                });
            }
        }
    }

})();﻿
(function () {
    CKEDITOR.QUESTIONS_PART_TRUNK = 'trunk';
    CKEDITOR.QUESTIONS_PART_ANSWER = 'answer';
    CKEDITOR.QUESTIONS_PART_IDEAS = 'ideas';
    CKEDITOR.QUESTIONS_PART_REFERENCE = 'reference';

    CKEDITOR.questions.plugins.add('textarea', {
        requires: 'part',
        init: function (editor) {

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_TRUNK, buildDefinition('题干'));

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_ANSWER, buildDefinition('答案'));

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_IDEAS, buildDefinition('解题思路'));

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_REFERENCE, buildDefinition('参考资料'));

            
        }
    });

    function buildDefinition(title) {
        return {
            attributes: {
                'class': 'cke_questions_part cke_questions_textarea'
            },
            children: [
                {
                    name: CKEDITOR.QUESTIONS_PART_HEADER,
                    title: title
                },
                {
                    name: CKEDITOR.QUESTIONS_PART_EDITOR
                }
            ],
            init: function () {
                this.content = this.children[1];
                this.getAttachment = function (isBuilder) {
                    var attachment = this.getChildren('attachment');
                    if (attachment && attachment.length > 0) {
                        return attachment[0];
                    }

                    if (isBuilder) {
                        return this.add(CKEDITOR.QUESTIONS_PART_OPTIONS_ATTACHMENT);
                    }

                    return null;
                };
            },
            getValue: function () {

                var attachment = this.getAttachment();

                return {
                    content: this.content.getValue(),
                    attachment: attachment ? attachment.getValue() : []
                };
            },
            setValue: function (value) {
                value.content && this.content.setValue(value.content);

                if (value.attachment && CKEDITOR.tools.isArray(value.attachment) && value.attachment.length > 0) {
                    var attachment = this.getAttachment(true);
                    attachment.setValue(value.attachment);
                }
            }
        }
    }

})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_MODE = 'mode';

    CKEDITOR.questions.plugins.add('mode', {
        requires: 'part',
        init: function (editor) {

            CKEDITOR.questions.parts.addOptions(CKEDITOR.QUESTIONS_PART_MODE, {
                text: '类型',
                number: 2,
                listType: 'none',
                addDisplay: false,
                delDisplay: false,
                isEditable: false,
                init: function () {
                    this.options[0].answer.setAttribute('checked', 'checked');
                    this.options[0].contents.setHtml('客观题');
                    this.options[1].contents.setHtml('主观题');
                },
                getValue: function () {
                    return this.options[0].answer.$.checked;
                },
                setValue: function (value) {
                    var rightOption = value ? this.options[0] : this.options[1];

                    rightOption.answer.setAttribute('checked', 'checked');
                }
            });
        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_OPTIONS_CHILDRENSPACE = 'childrenspace';

    CKEDITOR.questions.plugins.add('childrenspace', {
        init: function (editor) {

            function addQuestion(type) {
                var part = this;

                var child = this.add(CKEDITOR.QUESTIONS_PART_QUESTIONS, {
                    html: '<li></li>',
                    children: [
                        {
                            name: 'header',
                            title:type.title,
                            children: [
                                {
                                    name: CKEDITOR.QUESTIONS_PART_BUTTON,
                                    text: '删除小题',
                                    onClick: function () {
                                        confirm('确定要删除小题？删除后不可恢复，请慎重操作。') && child.remove();
                                    },
                                    afterInit: function () {
                                        this.addClass('cke_questions_delete');
                                    }
                                }
                            ]
                        }
                    ],
                    afterInit: function () {
                        type.selected(this);
                    }
                });

                return child;
            }

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_OPTIONS_CHILDRENSPACE, {
                html:'<ul></ul>',
                init: function () {
                    this.addQuestion = addQuestion;
                },
                getValue: function () {
                    var value = [];
                    for (var i = 0; i < this.children.length; i++) {
                        value.push(this.children[i].getValue());
                    }
                    return value;
                },
                setValue: function (value) {
                    if (!value || !CKEDITOR.tools.isArray(value) || value.length == 0)
                        return;

                    for (var i = 0; i < value.length; i++) {
                        var childValue = value[i];
                        if (childValue.type && childValue.type.name) {
                            var type = editor.types[childValue.type.name];
                            if (type) {
                                var part = this.addQuestion(type);
                                part.setValue(childValue);
                            }
                        }
                    }
                }
            });
        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_OPTIONS_ATTACHMENT = 'attachment';

    CKEDITOR.questions.plugins.add('attachment', {
        init: function (editor) {

            var directionText = ['上', '下', '左', '右'];

            //attachment={
            //  name: '附件1.jpg',    //附件名称
            //  type: '.jpg',         //附件扩展名  
            //  size: '12000',        //附件大小
            //  data: {},             //数据
            //  direction: 1          //方向（上、下、左、右）
            //}
            function addAttachment(attachment) {
                var part = this;

                var child = this.add('item', {
                    html: '<li></li>',
                    children: [
                        {
                            name: 'name',
                            html: '<span></span>',
                            init: function () {
                                this.setHtml('<a href="' + attachment.src + '" target="_blank">' + attachment.name + '</a>');
                            }
                        },
                        {
                            name:'direction',
                            html:'<span></span>',
                            init:function(){
                                this.setText(directionText[parseInt(attachment.direction) - 1 ]);
                            }
                        },
                        {
                            name: CKEDITOR.QUESTIONS_PART_BUTTON,
                            text: 'X',
                            onClick: function () {
                                child.remove();
                                if (part.children.length == 0) {
                                    part.remove();
                                    delete part;
                                }
                            }
                        }
                    ],
                    init: function () {
                        
                        this.attachment = attachment;
                    }
                });

                return child;
            }

            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_OPTIONS_ATTACHMENT, {
                html:'<ul></ul>',
                init: function () {
                    this.addAttachment = addAttachment;
                },
                getValue: function () {
                    var attachments = new Array();
                    for (var i = 0; i < this.children.length; i++) {
                        attachments.push(this.children[i].attachment);
                    }

                    return attachments;
                },
                setValue: function (attachments) {
                    if (!CKEDITOR.tools.isArray(attachments))
                        return;

                    this.clear();
                    for (var i = 0; i < attachments.length; i++) {
                        this.addAttachment(attachments[i]);
                    }
                }
            });
        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_OPTIONS_ONECHOICE = 'onechoice';

    CKEDITOR.questions.plugins.add('onechoice', {
        init: function (editor) {

            //添加试题类型（单项选择题）
            CKEDITOR.questions.types.add('onechoice', {
                id: 1,
                title: '单项选择题',
                html: '单项选择题',
                parts: [CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT,CKEDITOR.QUESTIONS_PART_TRUNK, CKEDITOR.QUESTIONS_PART_OPTIONS_ONECHOICE, CKEDITOR.QUESTIONS_PART_IDEAS],
                index:1
            });

            //添加选项部件（单项选择）
            CKEDITOR.questions.parts.addOptions(CKEDITOR.QUESTIONS_PART_OPTIONS_ONECHOICE, {});
        }
    });
})();﻿
(function () {
    CKEDITOR.QUESTIONS_PART_OPTIONS_MULTIPLECHOICE = 'multiplechoice';

    CKEDITOR.questions.plugins.add('multiplechoice', {
        init: function (editor) {

            //添加试题类型（多项选择题）
            CKEDITOR.questions.types.add('multiplechoice', {
                id: 2,
                title: '多项选择题',
                html: '多项选择题',
                parts: [CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT, CKEDITOR.QUESTIONS_PART_TRUNK, CKEDITOR.QUESTIONS_PART_OPTIONS_MULTIPLECHOICE, CKEDITOR.QUESTIONS_PART_IDEAS],
                index: 2
            });

            //添加选项部件（多项选择）
            CKEDITOR.questions.parts.addOptions(CKEDITOR.QUESTIONS_PART_OPTIONS_MULTIPLECHOICE, {
                answerIsMultiple:true
            });

        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_OPTIONS_INTERPRETATION = 'interpretation';

    CKEDITOR.questions.plugins.add('interpretation', {
        init: function (editor) {

            //添加试题类型（单项选择题）
            CKEDITOR.questions.types.add('interpretation', {
                id: 8,
                title: '判断题',
                html: '判断题',
                parts: [CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT, CKEDITOR.QUESTIONS_PART_TRUNK, CKEDITOR.QUESTIONS_PART_OPTIONS_INTERPRETATION, CKEDITOR.QUESTIONS_PART_IDEAS],
                index: 3
            });

            //添加选项部件（单项选择）
            CKEDITOR.questions.parts.addOptions(CKEDITOR.QUESTIONS_PART_OPTIONS_INTERPRETATION, {
                text: '答案',                        
                number: 2,                          
                listType: 'none',                    
                addDisplay:false,
                delDisplay: false,
                isEditable: false,
                init: function () {
                    this.options[0].answer.setAttribute('checked', 'checked');
                    this.options[0].contents.setHtml('正确');
                    this.options[1].contents.setHtml('错误');
                },
                getValue: function () {
                    return [{ content: new String(this.options[0].answer.$.checked ? 1 : 0), isAnswer: true }];
                },
                setValue: function (value) {
           
                    var rightOption = (value && value[0] && value[0].content)=="1" ? this.options[0] : this.options[1];

                    rightOption.answer.setAttribute('checked', 'checked');
                }
            });
        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_OPTIONS_FILLING = 'filling';

    CKEDITOR.questions.plugins.add('filling', {
        init: function (editor) {

            var ckeditor = editor.ckeditor,
                dataProcessor = ckeditor.dataProcessor,
                dataFilter = dataProcessor && dataProcessor.dataFilter,
                htmlFilter = dataProcessor && dataProcessor.htmlFilter;

            var rule = {
                elements: {
                    input: function (element) {
                        var attributes = element.attributes;
                        if (attributes['data-blankinput']) {
                            delete element.attributes['contenteditable'];
                            delete element.attributes['data-cke-editable']
                        }
                    }
                }
            };

            dataFilter && dataFilter.addRules(rule);
            htmlFilter && htmlFilter.addRules(rule);

            ckeditor.addFeature({
                allowedContent: {
                    input: {
                        attributes: 'data-blankinput,value',
                        classes: 'blank'
                    }
                }
            });

            //添加试题类型（填空题）
            CKEDITOR.questions.types.add('filling', {
                id: 3,
                title: '填空题',
                html: '填空题',
                parts: [CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT, CKEDITOR.QUESTIONS_PART_TRUNK, CKEDITOR.QUESTIONS_PART_MODE, CKEDITOR.QUESTIONS_PART_OPTIONS_FILLING, CKEDITOR.QUESTIONS_PART_IDEAS],
                init: function (partArray) {
                    var filling = null, trunk = null;
                    for (var i = 0; i < partArray.length; i++) {
                        var item = partArray[i];


                        switch (item.name) {
                            case CKEDITOR.QUESTIONS_PART_TRUNK:
                                trunk = item;
                                break;
                            case CKEDITOR.QUESTIONS_PART_OPTIONS_FILLING:
                                filling = item;
                                break;
                            default:
                                break;
                        }

                    }
                    filling && trunk && (filling.trunk = trunk);
                },
                index: 4
            });

            //添加选项部件（填空题）
            CKEDITOR.questions.parts.addOptions(CKEDITOR.QUESTIONS_PART_OPTIONS_FILLING, {
                number:0,
                text: '答案',
                listType: 'decimal',
                addText: '添加填写框',
                addClick: function () {

                    var editorArea = this.part.editorArea,
                        input = CKEDITOR.dom.element.createFromHtml('<input type="text" readonly="true" class="blank cke_questions_blankInput" data-blankinput="' + this.part.options.length + '" value="' + this.part.options.length + '" />');

                    editorArea.insertElement(input);
                    editorArea.insertHtml('&nbsp;');

                    //超郁闷，insertElement是没有经过acf数据筛选的，而是强制设置了input,textarea的contentEditable=false，所以插入dom后要修改contentEditable为true
                    input.setAttribute('contentEditable', true);

                    this.answer.$.checked = true;
                },
                delClick: function () {

                    var index = CKEDITOR.tools.indexOf(this.part.options, this);

                    var currentInput = this.part.getInput(index);
                    currentInput && currentInput.remove();

                    for (var i = index + 1; i < this.part.options.length; i++) {
                        var input = this.part.getInput(i);
                        input && input.setAttribute('value', i);
                    }
                },
                answerDisplay: false,
                answerIsMultiple: true,
                answerContentIsMultiple:true,
                buildNumber: function (index) {         //生成选项序号
                    return index + 1;
                },
                init: function () {

                    //'keyup'
                    var self = this,
                        options = self.options,
                        editorArea;

                    this.on('typeLoaded', function () {

                        editorArea = self.editorArea = self.trunk.children[1];

                        editorArea.on('keyup', function (event) {

                            if (event.data.$.keyCode == 8 || event.data.$.keyCode == 46) {

                                for (var i = options.length - 1; i >= 0; i--) {
                                    !self.getInput(i) && self.removeOption(options[i]);
                                }
                            }

                            return true;
                        });

                        this.on('setValue', function () {
                            editorArea && editorArea.fire('dataReady');
                        });
                    });

                    this.getInput = function (index) {
                        if (!this.editorArea) {
                            return null;
                        }

                        var inputResults = this.editorArea.getElementsByTag('input');
                        for (var i = 0; i < inputResults.count() ; i++) {
                            var input = inputResults.getItem(i);
                            if (input.getAttribute('data-blankinput')) {
                                var value = input.getValue();
                                if ((parseInt(value) - 1) == index) {
                                    return input;
                                }
                            }
                        }
                    };
                }
            });
        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_SHORTANSWER = 'shortanswer';

    CKEDITOR.questions.plugins.add('shortanswer', {
        requires: 'part',
        init: function (editor) {

            //添加试题类型（填空题）
            CKEDITOR.questions.types.add('shortanswer', {
                id: 6,
                title: '简答题',
                html: '简答题',
                parts: [CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT, CKEDITOR.QUESTIONS_PART_TRUNK, CKEDITOR.QUESTIONS_PART_MODE, CKEDITOR.QUESTIONS_PART_ANSWER, CKEDITOR.QUESTIONS_PART_IDEAS],
                init: function (partArray) {
                    partArray[3].name = CKEDITOR.QUESTIONS_PART_SHORTANSWER;
                },
                index: 5
            });
        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_CLOZE = 'cloze';

    CKEDITOR.questions.plugins.add('cloze', {
        requires: 'part',
        init: function (editor) {

            var ckeditor = editor.ckeditor,
                dataProcessor = ckeditor.dataProcessor,
                dataFilter = dataProcessor && dataProcessor.dataFilter,
                htmlFilter = dataProcessor && dataProcessor.htmlFilter;

            var rule = {
                elements: {
                    input: function (element) {
                        var attributes = element.attributes;
                        if (attributes['data-blankinput']) {
                            delete element.attributes['contenteditable'];
                            delete element.attributes['data-cke-editable']
                        }
                    }
                }
            };

            dataFilter &&  dataFilter.addRules(rule);
            htmlFilter && htmlFilter.addRules(rule);

            ckeditor.addFeature({
                allowedContent: {
                    input: {
                        attributes: 'data-blankinput,value,readonly',
                        classes: 'blank'
                    }
                }
            });

            //添加试题类型（完形填空）
            CKEDITOR.questions.types.add('cloze', {
                id: 4,
                title: '完形填空',
                html: '完形填空',
                parts: [CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT, CKEDITOR.QUESTIONS_PART_TRUNK, CKEDITOR.QUESTIONS_PART_CLOZE, CKEDITOR.QUESTIONS_PART_OPTIONS_CHILDRENSPACE],
                init: function (partArray) {
                    partArray[2].trunk = partArray[1];
                    partArray[2].childrenSpace = partArray[3];
                },
                index: 6
            });

            CKEDITOR.questions.parts.add('cloze', {
                children: [
                    {
                        name: 'button',
                        text: '添加填空框',
                        onClick: function () {

                            //要clone一份，否则下边的splice会修改editor.types中onechoice类型的parts
                            //var type = CKEDITOR.tools.clone(editor.types[CKEDITOR.QUESTIONS_PART_OPTIONS_ONECHOICE]),

                            var type = editor.types[CKEDITOR.QUESTIONS_PART_OPTIONS_ONECHOICE],
                                child = this.parent.childrenSpace.addQuestion(type),
                                editorArea = this.parent.trunk.children[1],
                                input = CKEDITOR.dom.element.createFromHtml('<input type="text readonly="true"" class="blank cke_questions_blankInput" data-blankinput="' + this.parent.childrenSpace.children.length + '" value="' + this.parent.childrenSpace.children.length + '" />');

                            editorArea.insertElement(input);
                            editorArea.insertHtml('&nbsp;');

                            //超郁闷，insertElement是没有经过acf数据筛选的，而是强制设置了input,textarea的contentEditable=false，所以插入dom后要修改contentEditable为true
                            input.setAttribute('contentEditable', true);

                            child.input = input;
                            //child.input.unselectable();
                        }
                    }
                ],
                init: function () {

                    var typeLoaded = function () {
                        var trunkHeader = this.trunk.children[0],
                            trunkEditor = this.trunk.children[1],
                            childrenSpace = this.childrenSpace;

                        trunkHeader.append(this.children[0]);

                        trunkEditor.on('keyup', function (event) {
                            if (event.data.$.keyCode != 8 && event.data.$.keyCode != 46)
                                return;

                            for (var i = 0; i < childrenSpace.children.length; i++) {
                                if (!childrenSpace.children[i].input.$.parentElement) {
                                    childrenSpace.children[i].remove();
                                }
                            }
                        });

                        //当数据准备完成后，需要重新关联input与option的关系
                        trunkEditor.on('dataReady', function (event) {
                            var inputResults = this.getElementsByTag('input');

                            for (var i = 0; i < inputResults.$.length; i++) {
                                var input = inputResults.getItem(i);
                                if (input.getAttribute('data-blankinput')) {
                                    var value = input.getValue(),
                                        index=parseInt(value) - 1,
                                        child=childrenSpace.children[index];
                                    
                                    if (!child) {
                                        var type = CKEDITOR.tools.clone(editor.types[CKEDITOR.QUESTIONS_PART_OPTIONS_ONECHOICE]);
                                        child=childrenSpace.addQuestion(type);
                                    }

                                    child.input = input;
                                }
                            }
                        });

                        childrenSpace.on('setValue', function () {
                            trunkEditor && trunkEditor.fire('dataReady');
                        });

                        childrenSpace.on('afterAddChild', function (event) {

                            var child = event.data.child;

                            var trunk = child.getChildren(CKEDITOR.QUESTIONS_PART_TRUNK);
                            trunk && trunk[0] && trunk[0].hide();
                        });

                        childrenSpace.on('beferRemoveChild', function (event) {
                            var child = event.data.child;

                            child.input.remove();

                            var index = CKEDITOR.tools.indexOf(childrenSpace.children, child);
                            for (var i = index + 1; i < childrenSpace.children.length; i++) {
                                childrenSpace.children[i].input.setAttribute('value', i);
                            }
                        });
                    };

                    //元素是 editor.element ，给它加typeLoaded后，part删除了，但是editor.element元素没有删除，所以它的typeLoaded事件保留。
                    //这样就造成创建新cloze part后多次注册typeLoaded事件侦听
                    this.on('typeLoaded', typeLoaded);

                    //this.parent && this.parent.on('beferRemoveChild', function () {
                    //    this.removeListener('typeLoaded', typeLoaded);
                    //});
                }
            });

        }
    });
})();﻿
(function () {

    CKEDITOR.QUESTIONS_PART_OPTIONS_READING = 'reading';

    CKEDITOR.questions.plugins.add('reading', {
        init: function (editor) {

            //添加试题类型（阅读理解）
            CKEDITOR.questions.types.add('reading', {
                id: 5,
                title: '阅读理解',
                html: '阅读理解',
                parts: [CKEDITOR.QUESTIONS_PART_KNOWLEDGEPOINT, CKEDITOR.QUESTIONS_PART_TRUNK, CKEDITOR.QUESTIONS_PART_OPTIONS_CHILDRENSPACE, CKEDITOR.QUESTIONS_PART_OPTIONS_READING],
                init: function (partArray) {
                    partArray[3].childrenSpace = partArray[2];
                },
                index: 7
            });

            //添加选项部件（阅读理解）
            CKEDITOR.questions.parts.add(CKEDITOR.QUESTIONS_PART_OPTIONS_READING, {
                html: '<div></div>',
                children: [
                    {
                        name: 'header',
                        html: '<h5>添加小题：</h5>',
                        children: [
                            {
                                name: CKEDITOR.QUESTIONS_PART_DROPDOWNLIST,
                                beferInit: function () {
                                    this._.definition.items = getTypes();
                                }
                            },
                            {
                                name: CKEDITOR.QUESTIONS_PART_BUTTON,
                                text: '确定',
                                onClick: function (event) {
                                    var name = this.parent.children[0].getValue();

                                    this.parent.parent.childrenSpace.addQuestion(editor.types[name]);
                                },
                                afterInit: function () {
                                    this.addClass('cke_questions_addChild');
                                }
                            }
                        ]
                    }   
                ]
            });

            function getTypes() {
                var items = [];
                var typeNames = editor.config.readingTypes.split(',');
                for (var i = 0; i < typeNames.length; i++) {
                    var name = typeNames[i];
                    var type = editor.types[name];
                    name && type && items.push({ text: type.title, value: name });
                }

                return items;
            }
        }
    });
})();﻿
CKEDITOR.questions.config = {
    plugins: 'part,type,editorspace,options,knowledgepoint,textarea,mode,childrenspace,attachment,onechoice,multiplechoice,interpretation,filling,shortanswer,cloze,reading,questions,advanced',
    readingTypes: 'onechoice,multiplechoice,interpretation,filling,shortanswer',




};﻿
(function () {

    var scripts = [
        //'core/editor.js',
        //'core/plugins.js',
        //'core/registermanager.js',
        //'core/ui.js',
        //'core/tools.js',
        //'config.js'
    ];


    CKEDITOR.skin.loadPart("examlib.questions");

    CKEDITOR.plugins.add('examlib.questions', {
        init: function (editor) {
            if (!editor.config.isQuestions)
                return;

            

            var paths = new Array();
            for (var i = 0; i < scripts.length; i++) {
                paths.push(CKEDITOR.getUrl(this.path + scripts[i]));
            }

            if (!editor.questionEditor) {
                CKEDITOR.scriptLoader.load(paths, function () {
                    var questionEditor = editor.questionEditor = new CKEDITOR.questions.editor(editor);
                    questionEditor.on('loaded', function () {

                        var parts = this.fire('uiReady', { parts: new Array() }).parts;

                        this.on('contentDom', function (event) {
                            var parts = event.data.parts;
                            for (var i = 0; i < parts.length; i++) {
                                this.element.append(parts[i]);
                            }
                        });

                        this.on('uiParts', function (event) {

                            for (var i = 0; i < parts.length; i++) {
                                var part = parts[i];
                                if (!event.data.name || event.data.name == part.name) {
                                    event.data.parts.push(part);
                                }
                            }
                        });

                        this.on('getValue', function (event) {
                            for (var i = 0; i < parts.length; i++) {
                                var part = parts[i],
                                    value = part.getValue();

                                value && (event.data.value[part.name] = value);
                            }
                        });

                        this.on('setValue', function (event) {
                            var value = event.data.value;
                            if (!value) {
                                return;
                            }

                            for (var i = 0; i < parts.length; i++) {
                                var part = parts[i],
                                    childValue = value[part.name];

                                childValue && part.setValue(childValue);
                            }
                        });

                        this.fire('contentDom', { parts: parts });

                        this.fireOnce('instanceReady');
                        editor.fire('questionEditorInstanceReady', { questionEditor: this });
                    }, null, null, 999);
                });
            }
        }
    });

})();