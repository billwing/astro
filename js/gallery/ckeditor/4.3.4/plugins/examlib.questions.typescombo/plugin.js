(function () {
    CKEDITOR.plugins.add('examlib.questions.typescombo', {
        requires: 'examlib.questions,richcombo',
        init: function (editor) {

            var config = editor.config,
				lang = { label: '试题类型', panelTitle: '试题类型' },
				combo,
		        questionType,
				questionEditor;

            if (!config.isQuestions)
                return;

            editor.on('mode', setComboLabel, null, null, 1000);
                       
            editor.on('questionEditorInstanceReady', function (event) {

                questionEditor = event.data.questionEditor;

                questionEditor.on('setValue', function (event) {
                    var value = event.data.value;
                    if (value && value.questions && value.questions.type) {
                        questionType = questionEditor.types[value.questions.type.name];
                        setComboLabel();
                    }
                });
            },null,null,1);

            editor.ui.addRichCombo('questions.typescombo', {
                label: lang.label,
                title: lang.panelTitle,
                toolbar: 'typescombo',
                readOnly: true, //用以撤销editor对typescombo.readOnly的事件侦听
                panel: {
                    css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
                    multiSelect: false,
                    attributes: { 'aria-label': lang.panelTitle }
                },
                init: function () {
                    combo = this;

                    var list = [];
                    if (config.questionTypes) {
                        for (var i = 0; i < config.questionTypes.length; i++) {
                            var type = questionEditor.types[config.questionTypes[i].name];
                            list.push(type);
                        }
                    }
                    else {

                        for (var name in questionEditor.types) {
                            var type = questionEditor.types[name];
                            list.push(type);
                        }
                    }

                    list.sort(function (a, b) {
                        return a.index - b.index;
                    });

                    for (var i = 0; i < list.length; i++) {
                        var type = list[i];
                        combo.add(type.name, type.html, type.title);
                    }

                    combo.commit();
                },

                onClick: function (value) {

                    editor.focus();
                    editor.fire('saveSnapshot');

                    questionType = questionEditor.types[value];

                    if (questionType) {
                        questionType.selected();

                        setComboLabel();
                    }

                    editor.fire('saveSnapshot');
                }
            });

            function setComboLabel() {
                if (!questionEditor) {
                    return;
                }

                if (!combo) {
                    combo = editor.ui.instances['questions.typescombo'];
                }

                if (combo && questionType) {
                    combo.setValue(questionType.name, questionType.title);

                    if (combo.questionType != questionType) {
                        combo.questionType = questionType;
                        editor.fire('changeQuestionType', { type: questionType });
                    }
                }
            }
        }
    });
})();