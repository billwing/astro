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
        'placeholder': 'lib/placeholder/1.0.1/placeholder',
        'position': 'lib/position/1.0.1/position',
        'templatable': 'lib/templatable/0.9.1/templatable',

        // component
        'autocomplete': 'lib/autocomplete/1.2.2/autocomplete',
        'dialog': 'lib/dialog/1.1.2/dialog',
        'confirmbox': 'lib/dialog/1.1.2/confirmbox',
        'overlay': 'lib/overlay/1.1.2/overlay',
        'mask': 'lib/overlay/1.1.2/mask',
        'popup': 'lib/popup/1.1.1/popup',
        'switchable': 'lib/switchable/0.9.15/switchable',
        'tabs': 'lib/switchable/0.9.15/tabs',
        'slide': 'lib/switchable/0.9.15/slide',
        'select': 'lib/select/0.9.5/select',

        // gallery
        'handlebars': 'gallery/handlebars/1.0.2/handlebars',
        'moment': 'gallery/moment/2.0.0/moment',
        'kindeditor': 'gallery/editor/kindeditor/4.1.4/kindeditor',

        // common
        'jzloginpopup': 'common/jzlogin/1.0.0/jzloginpopup',
        'jiathis': 'common/jiathis/1.0.0/jiathis',
        'baiduad': 'common/baiduad/1.0.0/baiduad'

    },

    // 路径配置
    paths: {
        'dialogTplUrl': 'http://' + location.host + '/js/lib/dialog/1.1.2'
    },

    // 变量配置
    vars: {
    },

    // 映射配置
    map: [
        // 调试映射
        //['http://www.astro.org/js/lib', 'http://127.0.0.1/js/lib'],
        // 项目JS缓存刷新
        //[/^(.*\/astro\/.*\.(?:js))(?:.*)$/i, '$1?20130507'],
        // 项目CSS缓存刷新(暂时没有实现)
        /*[
            function(url) {
                if(url.indexOf('index.css') > 0) {
                    url = url.replace('index.css', 'index.css?v=20130507');
                }
                return url;
            }
        ]*/
        // 单独JS缓存刷新
        //['main.js', 'main.js?v=20130507']
    ],

    // 预加载项
    preload: [
        //'jzloginpopup'
    ],

    // 调试模式
    debug: true,

    // Sea.js 的基础路径
    //base: '/Js/',

    // 文件编码
    charset: 'utf-8'
});