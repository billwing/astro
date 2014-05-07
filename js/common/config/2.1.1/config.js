seajs.config({

    // 别名配置
    alias: {
        '$': 'core/jquery/1.8.3/jquery',

        // base
        'base': 'lib/base/1.1.1/base',
        'class': 'lib/class/1.1.0/class',
        'events': 'lib/events/1.1.0/events',
        'widget': 'lib/widget/1.1.1/widget',

        // tool
        'easing': 'lib/easing/1.0.0/easing',
        'iframe-shim': 'lib/iframe-shim/1.0.2/iframe-shim',
        'placeholder': 'lib/placeholder/1.1.0/placeholder',
        'position': 'lib/position/1.0.1/position',
        'sticky': 'lib/sticky/1.2.1/sticky',
        'templatable': 'lib/templatable/0.9.2/templatable',
        'upload': 'lib/upload/1.0.1/upload',
        'dnd': 'lib/dnd/1.0.0/dnd',
        'qrcode': 'lib/qrcode/1.0.3/qrcode',

        // component
        'autocomplete': 'lib/autocomplete/1.2.3/autocomplete',
        'calendar': 'lib/calendar/1.0.0/calendar',
        'dialog': 'lib/dialog/1.2.1/dialog',
        'confirmbox': 'lib/dialog/1.2.1/confirmbox',
        'overlay': 'lib/overlay/1.1.2/overlay',
        'mask': 'lib/overlay/1.1.2/mask',
        'popup': 'lib/popup/1.1.3/popup',
        'switchable': 'lib/switchable/1.0.0/switchable',
        'tabs': 'lib/switchable/1.0.0/tabs',
        'slide': 'lib/switchable/1.0.0/slide',
        'carousel': 'lib/switchable/1.0.0/carousel',
        'accordion': 'lib/switchable/1.0.0/accordion',
        'select': 'lib/select/0.9.6/select',
        'validator': 'lib/validator/0.9.6/validator',

        // gallery
        'handlebars': 'gallery/handlebars/1.0.2/handlebars',
        'moment': 'gallery/moment/2.0.0/moment',
        'ckeditor': 'gallery/ckeditor/4.3.0/ckeditor',
        'kindeditor': 'gallery/kindeditor/4.1.7/kindeditor.js',
        'zeroclipboard': 'gallery/zeroclipboard/1.1.7/zeroclipboard',
        'ztree': 'gallery/ztree/3.5.14/ztree',
        'morris': 'gallery/morris/0.4.1/morris',
        'lazyload': 'gallery/lazyload/1.9.1/lazyload',
        'store': 'gallery/store/1.3.14/store',

        // common
        'jzloginpopup': 'common/jzlogin/1.0.0/jzloginpopup',
        'jzim': 'common/jzim/3.0.0/jzim',
        'jiathis': 'common/jiathis/1.0.0/jiathis',
        'baiduad': 'common/baiduad/1.0.0/baiduad',
        'navselected': 'common/navselected/1.0.0/navselected',

        // debug
        'seajs-debug': 'seajs/2.1.1/seajs-debug'

    },

    // 路径配置
    /*paths: {
        'dialogTplUrl': 'http://' + location.host + '/js/lib/dialog/1.1.2'
    },*/

    // 变量配置
    /*vars: {
    },*/

    // 映射配置
    /*map: [
        // 调试映射
        //['http://www.astro.org/js/lib', 'http://127.0.0.1/js/lib'],
        // 项目JS缓存刷新
        //[/^(.*\/astro\/.*\.(?:js))(?:.*)$/i, '$1?20130507'],
        // 项目CSS缓存刷新(暂时没有实现)
        //[
        //    function(url) {
        //        if(url.indexOf('index.css') > 0) {
        //            url = url.replace('index.css', 'index.css?v=20130507');
        //        }
        //        return url;
        //    }
        //]
        // 单独JS缓存刷新
        //['main.js', 'main.js?v=20130507']
    ],*/

    // 预加载项
    /*preload: [
        'jzloginpopup'
    ],*/

    // 调试模式
    //debug: true,

    // Sea.js 的基础路径
    //base: 'http://static.n6n6.cn/Public/Js/',

    // 文件编码
    charset: 'utf-8'
});