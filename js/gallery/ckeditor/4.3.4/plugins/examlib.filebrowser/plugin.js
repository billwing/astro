/*
  文件浏览上传插件,
  此插件将会重写CKEDITOR.ui.dialog.file改变文件上传形式
  并且使用此插件时需要移除filebrowser插件
*/

(function () {

    //加载引用文件,
    function loadResources() {
        CKEDITOR.scriptLoader.load(this.path + 'libs/jquery.uploadify.js');
        CKEDITOR.skin.loadPart("examlib.dialogui.uploadify");
    }

    //构建Jquyer.uploadify插件配置信息
    function buildUploadifySettings(pluginPath) {
        var fileElement=this,
            filebrowser = this._.definition.filebrowser,
	        editor = this._.dialog._.editor,
	        dialogName = ucFirst(this._.dialog._.name);

        if (!filebrowser) {
            return null;
        }

        function defaultOnSelect(files) {
            return true;
        }

        function defaultOnUploadSuccess(file, data, response) {
            var resultDataHandler = editor.config['uploadFile' + dialogName + 'OnUploadSuccess'] || defaultResultDataHandler;
            var data = resultDataHandler(file, data, response);
        }

        function defaultResultDataHandler(file, data, response) {
            var jsonData = eval('(' + data + ')');
            return {
                name: file.name,
                type: file.type,
                size: file.size,
                url: jsonData.url || jsonData.info.image || jsonData.info.file
            };
        }

        return {
            height: 30,
            swf: pluginPath + 'libs/uploadify.swf',
            uploader: filebrowser.url,
            width: 120,
            removeTimeout: 0,
            buttonText: '选择上传文件',
            multi: editor.config['uploadFile' + dialogName + 'Multi'] || false,
            fileSizeLimit: editor.config['uploadFile' + dialogName + 'MaxSize'] || '10MB',
            fileTypeExts: editor.config['uploadFile' + dialogName + 'AllowedExtensions'] || '*.*',
            onSelect: filebrowser.onSelect || defaultOnSelect,
            onUploadSuccess:  function (file, data, response) {
                //因为回调操作中如果出现异常,可能阻断uploadify的进程,出现错误.所以使用setTimeout进行回调操作
                setTimeout(function () {
                    var resultDataHandler = editor.config['uploadFile' + dialogName + 'ResultDataHandler'] || defaultResultDataHandler;
                    var resultData = resultDataHandler(file, data, response);
                    updateTargetElement.call(fileElement,resultData.url);
                    filebrowser.onUploadSuccess && filebrowser.onUploadSuccess.call(fileElement,resultData, file, data, response);
                },0);
            }
        };
    }

    //重写 CKEDITOR.ui.dialog.file
    //重写 CKEDITOR.ui.dialog.fileButton
    function rewriteDialogUI(editor) {
        delete CKEDITOR.ui.dialog.file;

        //初始化私有对象.即this._
        var initPrivateObject = function (elementDefinition) {
            this._ || (this._ = {});
            this._['default'] = this._.initValue = elementDefinition['default'] || '';  //默认值
            this._.required = elementDefinition['required'] || false;                   //是否为必须的
            var args = [this._];
            for (var i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            args.push(true);
            CKEDITOR.tools.extend.apply(CKEDITOR.tools, args); //将其它arguments参数合并到this._
            return this._;
        },
		commonBuilder = {
		    build: function (dialog, elementDefinition, output) {
		        return new CKEDITOR.ui.dialog[elementDefinition.type](dialog, elementDefinition, output);
		    }
		},
	    commonPrototype = {
	        isChanged: function () {
	            return this.getValue() != this.getInitValue();
	        },
	        reset: function (noChangeEvent) {
	            this.setValue(this.getInitValue(), noChangeEvent);
	        },
	        setInitValue: function () {
	            this._.initValue = this.getValue();
	        },
	        resetInitValue: function () {
	            this._.initValue = this._['default'];
	        },
	        getInitValue: function () {
	            return this._.initValue;
	        }
	    },
        pluginPath = this.path;

        CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {

            file: function (dialog, elementDefinition, htmlList) {
                if (arguments.length < 3)
                    return;

                if (elementDefinition['default'] === undefined)
                    elementDefinition['default'] = '';

                var _ = CKEDITOR.tools.extend(initPrivateObject.call(this, elementDefinition), { definition: elementDefinition, buttons: [] });

                if (elementDefinition.validate)
                    this.validate = elementDefinition.validate;

                /** @ignore */
                var innerHTML = function () {
                    _.fileInputId = CKEDITOR.tools.getNextId() + '_fileInput';

                    var size = elementDefinition.size
				        ? elementDefinition.size - (CKEDITOR.env.ie ? 7 : 0) // "Browse" button is bigger in IE.
				        : '';

                    return '<input id="' + _.fileInputId + '" type="file" name="' + CKEDITOR.tools.htmlEncode(elementDefinition.id || 'cke_upload') + '" size="' + CKEDITOR.tools.htmlEncode(size) + '" />';
                };

                CKEDITOR.ui.dialog.uiElement.call(this, dialog, elementDefinition, htmlList, 'div', null, { role: 'presentation' }, innerHTML);
            },
            fileButton: function (dialog, elementDefinition, htmlList) {
                //使用Jquery.uploadify不需要使用"上传"按钮
            }
        }, true);

        /** @class CKEDITOR.ui.dialog.file */
        CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, commonPrototype, {
            getInputElement: function () {
                return CKEDITOR.document.getById(this._.fileInputId);
            },
            //每次打开弹框时进行的重置方法
            reset: function () {
                var settings = buildUploadifySettings.call(this, pluginPath),
			        fileInput = this.getInputElement();

                if (!this._.uploadify && settings && fileInput) {
                    this._.uploadify = $(fileInput.$).uploadify(settings);
                }
            },
            setInitValue: function () {
                this._.initValue = '';
            }
        }, true);

        CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;

        CKEDITOR.dialog.addUIElement('file', commonBuilder);
        CKEDITOR.dialog.addUIElement('fileButton', commonBuilder);
    }

    //url增加参数
    function addQueryString(url, params) {

        if (!params || !url)
            return url;

        var queryString = [];
        for (var i in params) {
            queryString.push(i + "=" + encodeURIComponent(params[i]));
        }

        return url + ((url.indexOf("?") != -1) ? "&" : "?") + queryString.join("&");
    }

    //将字符串的第一个字符转为大写
    function ucFirst(str) {
        return str ? str.charAt(0).toUpperCase() + str.substr(1) : '';
    }

    //filebrowser.action == 'Browse' 时,文件浏览按钮事件
    function browseServer(evt) {
        var dialog = this.getDialog();
        var editor = dialog.getParentEditor();

        editor._.filebrowserSe = this;

        var width = editor.config['filebrowser' + ucFirst(dialog.getName()) + 'WindowWidth'] || editor.config.filebrowserWindowWidth || '80%';
        var height = editor.config['filebrowser' + ucFirst(dialog.getName()) + 'WindowHeight'] || editor.config.filebrowserWindowHeight || '70%';

        var params = this.filebrowser.params || {};
        params.CKEditor = editor.name;
        params.CKEditorFuncNum = editor._.filebrowserFn;
        if (!params.langCode)
            params.langCode = editor.langCode;

        var url = addQueryString(this.filebrowser.url, params);
        // TODO: V4: Remove backward compatibility (#8163).
        editor.popup(url, width, height, editor.config.filebrowserWindowFeatures || editor.config.fileBrowserWindowFeatures);
    }

    //递归遍历definition,处理filebrowser配置定义
    function attachFileBrowser(editor, dialogName, definition, elements) {
        if (!elements || !elements.length)
            return;

        var element, fileInput;

        for (var i = elements.length; i--;) {
            element = elements[i];

            if (element.type == 'hbox' || element.type == 'vbox' || element.type == 'fieldset')
                attachFileBrowser(editor, dialogName, definition, element.children);

            if (!element.filebrowser)
                continue;

            if (typeof element.filebrowser == 'string') {
                element.filebrowser = {
                    action: (element.type == 'fileButton') ? 'QuickUpload' : 'Browse',
                    target: element.filebrowser
                };
            }

            if (element.filebrowser.action == 'Browse') {
                var url = element.filebrowser.url || (editor.config['filebrowser' + ucFirst(dialogName) + 'BrowseUrl']) || editor.config.filebrowserBrowseUrl;
                if (url) {
                    element.onClick = browseServer;
                    element.filebrowser.url = url;
                    element.hidden = false;
                }
            } else if (element.filebrowser.action == 'QuickUpload' && element['for']) {
                var url = element.filebrowser.url || (editor.config['filebrowser' + ucFirst(dialogName) + 'UploadUrl']) || editor.config.filebrowserUploadUrl;
                if (url) {
                    //element.onClick是上传按钮的click事件,因为我们现在已经屏蔽了上传按钮,所以这个事件就无法执行.
                    //不能删除,因为isConfigured需要用它来做判断
                    //element.filebrowser.updateTargetElement = updateTargetElement;
                    element.filebrowser.url = url;
                    element.hidden = false;

                    var fileInput = definition.getContents(element['for'][0]).get(element['for'][1]);
                    if (fileInput) {
                        fileInput.filebrowser = element.filebrowser;
                    }
                }
            }
        }
    }

    //更新上传文件的Url至目标文本输入框 例：target:'info:text'
    function updateTargetElement(fileUrl) {
        var dialog = this._.dialog;
        var targetElement = this.filebrowser.target || null;

        // If there is a reference to targetElement, update it.
        if (targetElement && fileUrl) {
            var target = targetElement.split(':');
            var element = dialog.getContentElement(target[0], target[1]);
            if (element) {
                element.setValue(fileUrl);
                dialog.selectPage(target[0]);
            }
        }
    }

    //判断确定上传fileButton对象是否配置成功
    function isConfigured(definition, tabId, elementId) {
        if (elementId.indexOf(";") !== -1) {
            var ids = elementId.split(";");
            for (var i = 0; i < ids.length; i++) {
                if (isConfigured(definition, tabId, ids[i]))
                    return true;
            }
            return false;
        }

        var elementFileBrowser = definition.getContents(tabId).get(elementId).filebrowser;
        return (elementFileBrowser && elementFileBrowser.url);
    }

    CKEDITOR.plugins.add('examlib.filebrowser', {
        requires: 'dialog,popup',
        init: function (editor) {
            rewriteDialogUI.call(this, editor);
        },
        onLoad: function () {
            loadResources.call(this);
        }
    });

    CKEDITOR.on('dialogDefinition', function (evt) {
        var definition = evt.data.definition,
			element;
        // Associate filebrowser to elements with 'filebrowser' attribute.
        for (var i = 0; i < definition.contents.length; ++i) {
            if ((element = definition.contents[i])) {
                attachFileBrowser(evt.editor, evt.data.name, definition, element.elements);
                if (element.hidden && element.filebrowser) {
                    element.hidden = !isConfigured(definition, element['id'], element.filebrowser);
                }
            }
        }
    });
})();