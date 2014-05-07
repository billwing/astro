
(function () {
    var wordImagePath = "#";
    CKEDITOR.skin.loadPart("examlib");


    CKEDITOR.plugins.add('examlib.wordimage', {
        requires: 'dialog,fakeobjects',
        icons: "wordimage",
        onLoad: function (editor) {
            //CKEDITOR.addCss('img.cke_audio' +
			//	'{' +
			//		'background-image: url(' + CKEDITOR.getUrl(this.path + 'images/placeholder.png') + ');' +
			//		'background-position: center center;' +
			//		'background-repeat: no-repeat;' +
			//		'border: 1px solid #a9a9a9;' +
			//		'width: 80px;' +
			//		'height: 80px;' +
			//	'}'
            //	);

        },
        init: function (editor) {
            editor.on("paste", function (evnt) {
                if (evnt.data.type == "auto" || evnt.data.type == "html") {
                    var workElement = CKEDITOR.document.createElement('div');
                    workElement.appendHtml(evnt.data.dataValue);
                    var images = workElement.getElementsByTag('img');
                    if (images.count() > 0) {
                        for (var i = 0; i < images.count() ; i++) {
                            var img = images.getItem(i);
                            if (img.getAttribute("src") && /^(?:(file:\/+))/.test(img.getAttribute('src'))) {
                                img.setAttribute('word-image', img.getAttribute('src'));
                                //不同版本的doc和浏览器可能都会影响路径
                                var src = img.getAttribute('src');
                                var leftSlashIndex = src.lastIndexOf("/") || 0,
                                    rightSlashIndex = src.lastIndexOf("\\") || 0,
                                    separater = leftSlashIndex > rightSlashIndex ? "/" : "\\";
                                var flag = parseInt(img.getAttribute("wdith")) < 128 || parseInt(img.getAttribute("height")) < 43;
                                img.setAttributes({
                                    name: src.substring(src.lastIndexOf(separater) + 1),
                                    style: 'background:url(' + (flag ? wordImagePath + '/wordimage.png' : wordImagePath + '/localimage.png') + ') no-repeat center center;border:1px solid #ddd',
                                    src: wordImagePath + '/spacer.gif'
                                });

                                //修改可见状态
                                if (editor.getCommand("wordimage").state == 0) {
                                    editor.getCommand("wordimage").setState(2);
                                }
                            }
                        }
                        evnt.data.dataValue = workElement.getHtml();
                    }
                }
            }, null, null, 4)

            editor.addCommand("wordimage", new CKEDITOR.dialogCommand("wordImage", { startDisabled: true }));

            editor.ui.addButton("wordimage", {
                label: "图片转存",         			        //鼠标移动上去时显示的标签
                command: "wordimage",   			        //按钮单击时执行的命令
                toolbar: "insert,51"
            });


            CKEDITOR.dialog.add('wordImage', this.path + 'dialogs/wordimage.js');

            //editor.on('doubleclick', function (evt) {
            //    var element = evt.data.element;

            //    if (element.is('img') && element.data('cke-real-element-type') == 'audio')
            //        evt.data.dialog = 'audio';
            //});
        },
        afterInit: function (editor) {
            //var dataProcessor = editor.dataProcessor,
			//	dataFilter = dataProcessor && dataProcessor.dataFilter;

            //if (dataFilter) {
            //    dataFilter.addRules({
            //        elements: {
            //            'cke:object': function (element) {

            //                var attributes = element.attributes;

            //                //判断如果不是音频则跳出
            //                if (!attributes.audiosrc) {
            //                    return null;
            //                }

            //                return createFakeElement(editor, element);
            //            }
            //        }
            //    }, 4);
            //}
        }
    });
})();
