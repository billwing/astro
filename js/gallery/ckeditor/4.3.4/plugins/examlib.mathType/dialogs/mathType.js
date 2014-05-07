
CKEDITOR.dialog.add('mathType', function (editor) {

    function wrs_urlencode(clearString) {
        var output = '';
        var x = 0;
        clearString = clearString.toString();
        var regex = /(^[a-zA-Z0-9_.]*)/;

        var clearString_length = ((typeof clearString.length) == 'function') ? clearString.length() : clearString.length;

        while (x < clearString_length) {
            var match = regex.exec(clearString.substr(x));
            if (match != null && match.length > 1 && match[1] != '') {
                output += match[1];
                x += match[1].length;
            }
            else {
                var charCode = clearString.charCodeAt(x);
                var hexVal = charCode.toString(16);
                output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
                ++x;
            }
        }

        return output;
    }

    function wrs_mathmlEntities(mathml) {
        var toReturn = '';

        for (var i = 0; i < mathml.length; ++i) {
            //parsing > 128 characters
            if (mathml.charCodeAt(i) > 128) {
                toReturn += '&#' + mathml.charCodeAt(i) + ';';
            }
            else {
                toReturn += mathml.charAt(i);
            }
        }

        return toReturn;
    }

    var resourcesPath = editor.plugins['examlib.mathType'].path + 'dialogs/resources',
        config = editor.config;

    return {
        title: "公式编辑器",
        minWidth: 390,
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
                        id: 'editorContainer',
                        html: ''
                    }
                ]
            }
        ],
        onLoad: function () {

            editor.matheditor = com.wiris.jsEditor.defaultBasePath
                ? com.wiris.jsEditor.JsEditor.newInstance()
                : new com.wiris.jsEditor.JsEditor(resourcesPath);

            var editorContainer = this.getContentElement("tab1", "editorContainer").getElement();
            editorContainer.append(CKEDITOR.dom.element.get(editor.matheditor.getElement()));
        },
        onOk: function () {
            var img = CKEDITOR.document.createElement('img'),
                mathml = wrs_urlencode(wrs_mathmlEntities(editor.matheditor.getMathML())),
                buildImageUrl = config.mathTypeImageBuildUrl || 'http://www.wiris.net/demo/editor/render.png?mml=';

            img.setStyles({ verticalAlign: 'middle', display: 'inline' });
            img.setAttribute('src', buildImageUrl + mathml)
            img.setAttribute('data-mathexpression', mathml);
            img.setAttribute('class', 'mathml');
            editor.insertElement(img);
        }
    };
});