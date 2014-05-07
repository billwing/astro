/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	// skin
    //config.skin = 'moono';

	// Toolbar configuration generated automatically by the editor based on config.toolbarGroups.
	/*config.toolbar = [
		
		{ name: 'basicstyles', groups: [ 'basicstyles' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ] },

		{ name: 'insert', items: [ 'Mathjax', 'Image', 'Flash' ] },

		{ name: 'clipboard', groups: [ 'clipboard' ], items: [ 'PasteText', 'PasteFromWord' ] }

	];*/

	// Toolbar groups configuration.
	config.toolbarGroups = [
		{ name: 'basicstyles' },
		{ name: 'insert' },
        { name: 'clipboard' },
        { name: 'typescombo' }
    ];

    config.removeButtons = 'Copy,Cut,Paste,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Flash';
    config.removeDialogTabs = 'flash:properties;flash:advanced';

    config.extraPlugins = 'sharedspace,mathjax,examlib.filebrowser,examlib.questions,examlib.questions.typescombo,examlib.questions.attachment';
    config.removePlugins = 'filebrowser';


    config.filebrowserUploadUrl = '#';

	config.uploadFileImageAllowedExtensions = '*.jpg;*.jpeg;*.gif;*.png';
	config.uploadFileImageMaxSize = '200KB';

	config.uploadFileFlashAllowedExtensions = '*.swf';
	config.uploadFileAudioAllowedExtensions = '*.mp3';

	config.uploadFileVideoAllowedExtensions = '*.flv;*.mp4;';
	config.uploadFileVideoMaxSize = '20MB';

	config.uploadFileAttachmentMulti = true;
	config.uploadFileAttachmentMaxSize = '20MB';
	config.uploadFileAttachmentAllowedExtensions = '*.zip;*.rar;*.doc;*.docx;*.xsl;*.xslx;*.ppt;*.pptx;*.txt';

	config.uploadFileWordImageMulti = true;

	//config.mathTypeImageBuildUrl = '#';

	config.allowedContent = true;
	config.forcePasteAsPlainText = false;
};
