/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'zh-cn';
	// config.skin = 'office2003';
	// config.uiColor = '#AADC6E';
	CKEDITOR.config.width = 500;
	CKEDITOR.config.height = 500;
	config.extraPlugins="linkbutton" ;

	config.coreStyles_bold = {
		element: 'b',
		overrides: 'b'
	};
	CKEDITOR.config.coreStyles_italic = {
		element: 'i',
		overrides: 'i'
	};
	config.disallowedContent = 'img{width,height};img[width,height]';
 // 上传图片路径
//  config.filebrowserImageUploadUrl = "/back/news/imageUpload.do";
config.allowedContent = "p u b i;span{!color,!font-size};a[href];img[!src,alt];";
// config.pasteFromWordIgnoreFontFace = true;
// config.forcePasteAsPlainText = 'allow-word';
// config.pasteFromWordKeepsStructure = true; 
// config.pasteFromWordRemoveStyle = true  ;
// config.pasteFromWordRemoveFontStyles = true;  

	config.toolbar  = [
		['linkbutton','Source','-','Save','NewPage','Preview','-','Templates'],
		['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
		'/',
		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
		 ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		 ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		 ['Link','Unlink','Anchor'],
		['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
		'/',
		 ['Styles','Format','Font','FontSize'],
		 ['TextColor','BGColor']
	 ];
};
