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
        'cookie': 'lib/cookie/1.0.2/cookie',
        'dnd': 'lib/dnd/1.0.0/dnd',
        'detector': 'lib/detector/1.3.0/detector',
        'easing': 'lib/easing/1.0.0/easing',
        'iframe-shim': 'lib/iframe-shim/1.0.2/iframe-shim',
        'messenger': 'lib/messenger/1.0.2/messenger',
        'name-storage': 'lib/name-storage/1.0.0/name-storage',
        'placeholder': 'lib/placeholder/1.1.0/placeholder',
        'position': 'lib/position/1.0.1/position',
        'qrcode': 'lib/qrcode/1.0.3/qrcode',
        'sticky': 'lib/sticky/1.2.1/sticky',
        'templatable': 'lib/templatable/0.9.2/templatable',
        'upload': 'lib/upload/1.1.1/upload',

        // component
        'autocomplete': 'lib/autocomplete/1.2.3/autocomplete',
        'calendar': 'lib/calendar/1.0.0/calendar',
        'dialog': 'lib/dialog/1.2.5/dialog',
        'confirmbox': 'lib/dialog/1.2.5/confirmbox',
        'overlay': 'lib/overlay/1.1.4/overlay',
        'mask': 'lib/overlay/1.1.4/mask',
        'popup': 'lib/popup/1.1.6/popup',
        'switchable': 'lib/switchable/1.0.2/switchable',
        'tabs': 'lib/switchable/1.0.2/tabs',
        'slide': 'lib/switchable/1.0.2/slide',
        'carousel': 'lib/switchable/1.0.2/carousel',
        'accordion': 'lib/switchable/1.0.2/accordion',
        'select': 'lib/select/0.9.9/select',
        'tip': 'lib/tip/1.2.1/tip',
        'validator': 'lib/validator/0.9.7/validator',

        // gallery
        'handlebars': 'gallery/handlebars/1.0.2/handlebars',
        'moment': 'gallery/moment/2.5.1/moment',
        'ckeditor': 'gallery/ckeditor/4.3.4/ckeditor',
        'kindeditor': 'gallery/kindeditor/4.1.7/kindeditor.js',
        'zeroclipboard': 'gallery/zeroclipboard/1.1.7/zeroclipboard',
        'ztree': 'gallery/ztree/3.5.14/ztree',
        'morris': 'gallery/morris/0.4.1/morris',
        'lazyload': 'gallery/lazyload/1.9.1/lazyload',
        'store': 'gallery/store/1.3.14/store',
        'jcrop': 'gallery/jcrop/0.9.12/jcrop',
        'menuaim': 'gallery/menuaim/1.1.0/menuaim',

        // common
        'util': 'common/util/1.0.0/util',
        'urlconfig': 'common/urlconfig/1.0.0/urlconfig',
        'validatorrules': 'common/validatorrules/1.0.0/validatorrules',
        'mobilecode': 'common/mobilecode/1.0.0/mobilecode',
        'emailcode': 'common/emailcode/1.0.0/emailcode',
        'jzloginpopup': 'common/jzlogin/1.0.0/jzloginpopup',
        'jzim': 'common/jzim/3.0.0/jzim',
        'jiathis': 'common/jiathis/1.0.0/jiathis',
        'baiduad': 'common/baiduad/1.0.0/baiduad',
        'navselected': 'common/navselected/1.1.0/navselected',
        'address': 'common/address/1.0.0/address',
        'addfavorite': 'common/addfavorite/1.0.0/addfavorite',
        'avatar': 'common/avatar/1.0.0/avatar',

        // tpl
        'register': 'tpl/register/1.0.0/register',
        'login': 'tpl/login/1.0.0/login',
        'information': 'tpl/information/1.0.0/information',
        'password': 'tpl/password/1.0.0/password',
        'findpwd': 'tpl/findpwd/1.0.0/findpwd',

        // debug
        'seajs-debug': 'seajs/2.1.1/seajs-debug'

    },

    // 路径配置
    paths: {
        'tpl': '../../statics/js/tpl/'
    },

    // 变量配置
    /*vars: {
    },*/

    // 映射配置
    map: [
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
    ],

    // 预加载项
    /*preload: [
        'jzloginpopup'
    ],*/

    // 调试模式
    //debug: true,

    // Sea.js 的基础路径
    //base: 'http://static.n6n6.cn/Public/Js/',

    // 合并规则
    comboExcludes: function(uri) {
        if (uri.indexOf('/statics/js/') > 0) {
            return true
        }
    },

    comboMaxLength: 1000,

    // 文件编码
    charset: 'utf-8'
});