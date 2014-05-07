(function () {

    function attachment(pluginDefinition, editor) {
        var dialogDom = {
            _: {
                container: null,
                panel: null,
                entities: [],
                itemTemplate: CKEDITOR.addTemplate('attachmentDialogItem', '<li>' +
                    '<a class="file" href="{fileUrl}" target="_blank">' +
                        '<i class="icon_img"></i>' +
                        '{fileName}' +
                    '</a>' +
                    '<span class="direction">' +
                        '<input type="radio" value="1" name="direction{index}" />上&nbsp;&nbsp;' +
                        '<input type="radio" value="2" name="direction{index}" />下&nbsp;&nbsp;' +
                        '<input type="radio" value="3" name="direction{index}" />左&nbsp;&nbsp;' +
                        '<input type="radio" value="4" name="direction{index}" />右&nbsp;&nbsp;' +
                    '</span>' +
                    '<a class="del" href="javascript:void(0);">X</a>' +
                '</li>'),
                settings: null
            },
            init: function (settings, containerElement) {
                this._.settings = settings;
                this._.container = $(containerElement);

                this._.container.find("input.upload:eq(0)")
                    .attr("id", this._.settings.id)
                    .uploadify(this._.settings);

                this._.panel = this._.container.find("ul.filePanel")

                this._.panel.on("mousedown", "input[type=radio]", function () {
                    var val = $(this).val();
                    if (dialogDom._.panel.find("input[type=radio][value='" + val + "']:checked").length > 0) {
                        alert("不能选择相同的位置。");
                        return false;
                    }
                    else {
                        dialogDom._.entities[$(this).parents("li:eq(0)").index()].direction = parseInt(val);
                        return true;
                    }
                });

                this._.panel.on("mousedown", "a.del", function () {
                    dialogDom.removeAt($(this).parents("li:eq(0)").index());
                })
            },
            add: function (entity) {
                this._.entities.push(entity);

                this._.panel.append(this._.itemTemplate.output({ fileName: entity.name, index: this._.entities.length - 1, fileUrl: entity.src }));
            },
            removeAt: function (index) {
                if (index >= 0 && index < this._.entities.length) {
                    this._.panel.find("li").eq(index).remove();
                    this._.entities.splice(index, 1);
                }
            },
            setEntities: function (entities) {
                if ($.isArray(entities)) {
                    this._.entities = entities.slice(0);

                    var panel = this._.panel;
                    panel.empty();
                    $(this._.entities).each(function (index) {
                        panel.append(dialogDom._.itemTemplate.output({ fileName: this.name, index: index }));
                        panel.find("li:last input[value=" + this.direction + ']').attr("checked", "checked");
                    });
                }
            },
            getEntities: function () {
                return this._.entities;
            }
        };



        var filePanel = null,
            files = [];

        var settings = {
            id: editor.id + "_attachment_upload", //必须要有id，不然会报异常（如果不设置id会自动读取input.file的id）
            height: 30,
            swf: pluginDefinition.path + "libs/uploadify.swf",
            uploader: '#',
            width: 120,
            removeTimeout: 0,
            buttonText: '选择上传文件',
            multi: false,
            fileSizeLimit: "10MB",
            fileTypeExts: "*.jpg;*.png;*.gif;*.swf;*.mp3;*.doc;*.xsl;*.txt;*.zip;*.rar;",
            onSelect: function (file) {

                if (dialogDom.getEntities().length > 3) {
                    $('#' + this.settings.id).uploadify('cancel');
                    alert("最多只能上传4个附件。");
                }
            },
            onUploadSuccess: function (file, data, response) {
                if (dialogDom.getEntities().length < 4) {
                    var entity = methods.buildEntity(file, data, response);
                    dialogDom.add(entity);
                }
            }
        };

        var methods = {
            buildEntity: function (file, data, response) {

                var jsonData = eval("(" + data + ")");
                return {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    src: jsonData.info.image || jsonData.info.file,
                    data: jsonData.info,
                    direction: null
                };
            },
            getContentDom: function (isBuilder) {
                var part = editor.currentEditable && editor.currentEditable.parent;
                if (!part) {
                    return null;
                }

                var attachmentParts = part.getChildren(CKEDITOR.QUESTIONS_PART_OPTIONS_ATTACHMENT);

                return attachmentParts.length > 0
                    ? attachmentParts[0]
                    : isBuilder
                        ? part.add(CKEDITOR.QUESTIONS_PART_OPTIONS_ATTACHMENT)
                        : null;
            }
        };

        this.init = function () {
            CKEDITOR.scriptLoader.load(pluginDefinition.path + 'libs/jquery.uploadify.js');
            CKEDITOR.skin.loadPart("examlib.dialogui.uploadify");

            $.extend(true, settings || editor.config.uploadify || {});
        };

        this.onLoad = function (containerElement) {
            dialogDom.init(settings, containerElement);
        };

        this.dialogOk = function () {
            var entities = dialogDom.getEntities();
            var noVerify = $(entities).map(function () {
                if (!this.direction)
                    return this;
            }).get();

            if (noVerify.length > 0) {
                alert("请选择附件（" + noVerify[0].name + "）的位置。");
                return false;
            }

            if (entities && entities.length > 0) {
                var contentDom = methods.getContentDom(true);

                contentDom && contentDom.setValue(entities);
            }

            return true;
        };

        this.dialogShow = function () {
            var contentDom = methods.getContentDom();

            dialogDom.setEntities(contentDom && contentDom.getValue() || []);
        };

        return this;
    }

    CKEDITOR.plugins.add('examlib.questions.attachment', {
        requires: 'examlib.questions,dialog',
        icons: "attachment",
        beforeInit: function (editor) {
            editor.attachment = new attachment(this, editor);
            editor.attachment.init();
        },
        init: function (editor) {

            if (!editor.config.isQuestions)
                return;

            editor.addCommand("attachment", new CKEDITOR.dialogCommand("attachment"));

            editor.ui.addButton("attachment", {
                label: "附件",         			            //鼠标移动上去时显示的标签
                command: "attachment",   			        //按钮单击时执行的命令
                toolbar: 'insert,50'
            });
        }
    });


    CKEDITOR.dialog.add('attachment', function (editor) {

        return {
            title: "附件",
            minWidth: 400,
            minHeight: 230,
            buttons: [CKEDITOR.dialog.okButton],
            contents: [
                {
                    id: 'tab1',
                    label: '',
                    title: '',
                    expand: true,
                    padding: 0,
                    elements: [
                        {
                            type: 'html',
                            id: 'container',
                            html: '<div>' +
                                    '<input type="file" class="upload" />' +
                                    '<ul class="filePanel"></ul>' +
                                  '</div>'
                        }
                    ]
                }
            ],
            onLoad: function () {
                var container = this.getContentElement("tab1", "container").getElement();
                editor.attachment.onLoad(container.$);
            },
            onShow: function () {
                editor.attachment.dialogShow();
            },
            onOk: function () {
                return editor.attachment.dialogOk();
            }
        };
    });
})();