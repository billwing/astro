seajs.config({
    
    // shim 配置项
    alias: {
        'jquery': {
            src: 'core/jquery/1.8.3/jquery.min',
            exports: 'jQuery'
        },

        'handlebars': {
            src: 'lib/handlebars/1.0.1/handlebars.min',
            exports: 'Handlebars'
        },

        'pjax': {
            src: 'lib/pjax/1.7.0/pjax',
            deps: ['jquery'],
            exports: 'pjax'
        },

        // base
        'base': 'lib/base/1.0.1/base',

        'class': 'lib/class/1.0.0/class',

        'events': 'lib/events/1.0.0/events',

        'widget': 'lib/widget/1.0.3/widget',

        // tool
        'easing': 'lib/easing/1.0.0/easing',

        'iframe-shim': 'lib/iframe-shim/1.0.0/iframe-shim',

        'placeholder': 'lib/placeholder/1.0.1/placeholder',

        'position': 'lib/position/1.0.0/position',

        // component
        'autocomplete': 'lib/autocomplete/1.2.1/autocomplete',

        'dialog': 'lib/dialog/1.0.0/dialog',

        'overlay': 'lib/overlay/1.0.0/overlay',

        'switchable': 'lib/switchable/0.9.12/switchable',

        // project

        'templatable': 'lib/widget/templatable',

        'confirmbox': 'lib/dialog/1.0.0/confirmbox',
        
        'tabs': 'lib/switchable/tabs',

        'slide': 'lib/switchable/slide',

        'carousel': 'lib/switchable/carousel',

        'imagezoom': 'lib/imagezoom/3.0.0/imagezoom',

        'fancybox': 'lib/fancybox/2.1.4/fancybox',

        'stockautotpl': 'lib/autocomplete/1.2.1/autocomplete-stock.tpl'

    },

    // 路径配置
    paths: {
        //'lib': 'http://www.astro.org/js/lib'
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

    // 激活插件
    plugins: ['shim', 'text'],

    // 调试模式
    debug: false,

    // 文件编码
    charset: 'utf-8'
});