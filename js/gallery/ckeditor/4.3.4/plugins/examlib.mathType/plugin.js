
(function () {

    CKEDITOR.plugins.add('examlib.mathType', {
        requires: 'dialog',
        icons: "mathType",
        beforeInit: function (editor) {
            CKEDITOR.scriptLoader.load(this.path + 'dialogs/editor.js');
        },
        init: function (editor) {

            editor.addFeature({
                allowedContent: {
                    img: {
                        attributes: 'data-mathexpression,src',
                        classes: 'mathml'
                    }
                }
            });

            editor.addCommand("mathType", new CKEDITOR.dialogCommand("mathType"));

            editor.ui.addButton("mathType", {
                label: "公式编辑器",         			//鼠标移动上去时显示的标签
                command: "mathType",   			        //按钮单击时执行的命令
                toolbar: "insert,0"
            });

            CKEDITOR.dialog.add('mathType', this.path + 'dialogs/mathType.js');
        }
    });
})();