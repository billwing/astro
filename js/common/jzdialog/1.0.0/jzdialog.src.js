/*!
 *@Desc:JZ Dialog
 *@Auth:Billwing
 *@Vers:V1.0.0
 *@Date:2012-12-20
 *@Modi:2013-07-04
 */
;(function($) {

    $.jzDialog = function() {

        // 默认参数
        var defaults = {
            animationSpeed: 250,            // 弹出层和遮罩层关闭动画
            autoClose: false,               // 是否自动关闭弹出层
            buttons: true,                  // 是否自定义按钮
            customClass: false,             // 是否自定义样式
            keyboard: true,                 // 是否允许ESC键关闭弹出层
            message: '',                    // 弹出层内容
            modal: true,                    // 是否添加遮罩层
            overlayClose: false,            // 是否点击遮罩层后关闭弹出层
            overlayOpacity: .15,            // 遮罩层不透明度
            position: 'center',             // 弹出层位置
            title: '提示信息',              // 弹出层标题
            type: 'information',            // 弹出层类型
            vcenterShortMessage: true,      // 是否短内容垂直居中
            width: 350,                     // 弹出层宽度
            onClose: null                   // 关闭弹出层触发事件
        }

        // 引用当前对象实例
        var plugin = this;

        plugin.settings = {};

        options = {};

        if(typeof arguments[0] == 'string') options.message = arguments[0];

        if(typeof arguments[0] == 'object' || typeof arguments[1] == 'object')

            options = $.extend(options, (typeof arguments[0] == 'object' ? arguments[0] : arguments[1]));

        /**
         *  构造函数方法
         *  @return { object } 插件引用
         */
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            plugin.isIE6 = ($.browser.msie && parseInt($.browser.version, 10) == 6) || false;

            //
            if(plugin.settings.modal) {
                plugin.overlay = jQuery('<div>', {

                    'class': 'jzDialog_overlay'

                }).css({
                    'position':   (plugin.isIE6 ? 'absolute' : 'fixed'),
                    'top':        0,
                    'left':       0,
                    'opacity':    plugin.settings.overlayOpacity,
                    'z-index':    1000,
                    'background': '#000'
                });

                if(plugin.settings.overlayClose)
                    plugin.overlay.bind('click', function() {plugin.close()});

                plugin.overlay.appendTo('body');

            }
            
            plugin.dialog = jQuery('<div>', {
                
                'class': 'jzDialog' + (plugin.settings.customClass ? ' ' + plugin.settings.customClass : '')
            
            }).css({
                'position':              (plugin.isIE6 ? 'absolute' : 'fixed'),
                'top':                   0,
                'left':                  0,
                'z-index':               1001,
                'visibility':            'hidden'
            });

            if(!plugin.settings.buttons && plugin.settings.autoClose)
                plugin.dialog.attr('id', 'jzDialog_' + Math.floor(Math.random() * 9999999));

            var tmp = parseInt(plugin.settings.width);

            if(!isNaN(tmp) && tmp == plugin.settings.width && tmp.toString() == plugin.settings.width.toString() && tmp > 0)
                plugin.dialog.css({'width' : plugin.settings.width});

            if(plugin.settings.title){
                var header = jQuery('<div>', {
                    'class': 'jzDialog_header'
                });

                jQuery('<h3>', {
                    'class': 'jzDialog_title'
                }).html(plugin.settings.title).appendTo(header);

                jQuery('<a>', {
                    'class':  'jzDialog_clsBtn',
                    'href':   'javascript:void(0)',
                    'target': '_self',
                    'title':  '关闭',
                    click: function(){
                        plugin.close();
                    }
                }).html('×').appendTo(header);

                header.appendTo(plugin.dialog);
            }

            plugin.message = jQuery('<div>', {
                'class': 'jzDialog_body' + (getType() != '' ? ' jzDialog_icon jzDialog_' + getType() : '')
            });

            if(plugin.settings.vcenterShortMessage)
                jQuery('<div>').html(plugin.settings.message).appendTo(plugin.message);
            else
                plugin.message.html(plugin.settings.message);

            plugin.message.appendTo(plugin.dialog);

            var buttons = getButtons();

            if(buttons) {
                var buttonBar = jQuery('<div>', {
                    'class': 'jzDialog_buttons'
                }).appendTo(plugin.dialog);

                $.each(buttons, function(index, value){
                    var button = jQuery('<input>', {
                        'class':  'jzDialog_button' + index,
                        'type': 'button'
                    });

                    if($.isPlainObject(value)) button.val(value.caption);

                    else button.val(value);

                    button.bind('click', function(){
                        if(undefined != value.callback) value.callback(plugin.dialog);

                        plugin.close(undefined != value.caption ? value.caption : value)
                    });

                    button.appendTo(buttonBar);
                });

                jQuery('<div>', {
                    'style': 'clear:both'
                }).appendTo(buttonBar);
            }

            plugin.dialog.appendTo('body');

            $(window).bind('resize', draw);

            if(plugin.settings.keyboard)
                $(document).bind('keyup', _keyup);

            if(plugin.isIE6)
                $(window).bind('scroll', _scroll);

            if(plugin.settings.autoClose !== false){
                pluging.dialog.bind('click', function(e){
                    clearTimeout(plugin.timeout);
                    plugin.close();
                });

                plugin.timeout = setTimeout(plugin.close, plugin.settings.autoClose);
            }

            draw();

            return plugin;

        }

        /**
         *  关闭弹出层
         *  @param { String } 关闭按钮标题
         *  @return { void }
         */
        plugin.close = function(caption){
            if(plugin.settings.keyboard) $(document).unbind('keyup', _keyup);

            if(plugin.isIE6) $(window).unbind('scroll', _scroll);

            $(window).unbind('resize', draw);

            if(plugin.overlay)
                plugin.overlay.animate({
                    opacity: 0
                },

                plugin.settings.animationSpeed,

                function(){
                    plugin.overlay.remove();
                });

            plugin.dialog.animate({
                top: 0,
                opacity: 0
            },

            plugin.settings.animationSpeed,

            function(){
                plugin.dialog.remove();

                if(plugin.settings.onClose && typeof plugin.settings.onClose == 'function')
                    plugin.settings.onClose(undefined != caption ? caption : '');
            });
        }

        /**
         *  绘制弹出层和遮罩层
         *  @return { void }
         */
        var draw = function() {
            var viewportWidth = $(window).width(),
                viewportHeight = $(window).height(),
                dialogWidth = plugin.dialog.width(),
                dialogHeight = plugin.dialog.height(),
                values = {
                    'top':    0,
                    'right':  viewportWidth - dialogWidth,
                    'bottom': viewportHeight - dialogHeight,
                    'left':   0,
                    'center': (viewportWidth - dialogWidth) / 2,
                    'middle': (viewportHeight - dialogHeight) / 2
                };

            plugin.dialogTop = undefined;
            plugin.dialogLeft = undefined;

            if(plugin.settings.modal)
                plugin.overlay.css({
                    'width':  viewportWidth,
                    'height': viewportHeight
                });

            if(
                $.isArray(plugin.settings.position) &&
                plugin.settings.position.length == 2 &&
                typeof plugin.settings.position[0] == 'string' &&
                plugin.settings.position[0].match(/^(top|bottom|middle)[\s0-9\+\-]*$/) &&
                typeof plugin.settings.position[1] == 'string' &&
                plugin.settings.position[1].match(/^(left|right|center)[\s0-9\+\-]*$/)
            ) {
                plugin.settings.position[0] = plugin.settings.position[0].toLowerCase();
                plugin.settings.position[1] = plugin.settings.position[1].toLowerCase();

                $.each(valuse, function(index, value){
                    for(var i = 0; i < 2; i++){
                        var tmp = plugin.settings.position[i].replace(index, value);

                        if(tmp != plugin.settings.position[i])
                            if(i == 0) plugin.dialogLeft = eval(tmp);
                            else plugin.dialogTop = eval(tmp);
                    }
                });
            }

            if(undefined == plugin.dialogLeft || undefined == plugin.dialogTop){
                plugin.dialogLeft = values['center'];
                plugin.dialogTop = values['middle'];
            }

            if(plugin.settings.vcenterShortMessage){
                var message = plugin.message.find('div:first'),
                    messageHeight = message.height(),
                    containerHeight = plugin.message.height();
                if(messageHeight < containerHeight)
                    message.css({
                        'margin-top': (containerHeight - messageHeight) / 2,
                        'text-align': 'center'
                    });
            }

            plugin.dialog.css({
                'visibility': 'visible',
                'top':         plugin.dialogTop,
                'left':        plugin.dialogLeft
            });

            plugin.dialog.find('a[class^=jzDialog_button]:first').focus();

            if(plugin.isIE6) setTimeout(emulateFixedPosition, 500);
        }

        /**
         *  模拟 "position:fixed" for IE6
         *  @return { void }
         */
        var emulateFixedPosition = function(){
            var scrollTop = $(window).scrollTop(),
                scrollLeft = $(window).scrollLeft()

            if(plugin.settings.modal)
                plugin.overlay.css({
                    'top': scrollTop,
                    'left': scrollLeft
                });

            plugin.dialog.css({
                'top':  plugin.dialogTop + scrollTop,
                'left': plugin.dialogLeft + scrollLeft
            });
        }

        /**
         *  创建弹出层按钮
         *  @return { array }
         */
        var getButtons = function(){
            if(plugin.settings.buttons !== true && !$.isArray(plugin.settings.buttons)) return false;

            if(plugin.settings.buttons === true)
                switch (plugin.settings.type){
                    case 'question':
                        plugin.settings.buttons = ['确定', '取消'];
                        break;
                    default:
                        plugin.settings.buttons = ['确定'];
                }
            return plugin.settings.buttons.reverse();
        }

        /**
         *  设置弹出层类型
         *  @return { boolean }
         */
        var getType = function(){
            switch (plugin.settings.type){
                case 'confirmation':
                case 'error':
                case 'information':
                case 'question':
                case 'warning':
                    return plugin.settings.type.charAt(0).toUpperCase() + plugin.settings.type.slice(1).toLowerCase();
                    break;

                default:
                    return false;
            }
        }

        /**
         *  按键松开后触发事件
         *  @return { boolean }
         */
        var _keyup = function(e){
            if(e.which == 27) plugin.close();
            return true;
        }

        /**
         *  滚动时触发事件for IE6
         *  @return { void }
         */
        var _scroll = function(){
            emulateFixedPosition();
        }

        // 运行插件
        return plugin.init();

    }

    // 插件默认样式
    var dialogStyle = '<style>.jzDialog{min-width:350px;font-size:13px;text-align:left;border:1px solid #e5e5e5;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0 0 10px rgba(0,0,0,0.4);-moz-box-shadow:0 0 10px rgba(0,0,0,0.4);box-shadow:0 0 10px rgba(0,0,0,0.4);background:#FFF}.jzDialog_header{position:relative;height:30px;padding-left:10px;font:bold 14px "宋体",Arial;line-height:30px;color:#e24912;-webkit-border-radius:5px 5px 0 0;-moz-border-radius:5px 5px 0 0;border-radius:5px 5px 0 0;background:#EEE}.jzDialog_title{height:30px;margin:0;font-size:14px;line-height:30px;}.jzDialog_clsBtn{display:block;position:absolute;top:2px;right:8px;font:normal 22px Arial;text-decoration:none;color:#AAA}.jzDialog_clsBtn:hover{color:#666;text-decoration:none}.jzDialog_body{min-height:50px;padding:10px;font-size:14px;line-height:1.5;}.jzDialog_body div{text-align:left!important;}.jzDialog_buttons{margin:10px 10px 0 0;text-align:right}.jzDialog_buttons input{cursor:pointer;width:50px;height:25px;margin-bottom:10px;padding:0 12px;font:normal 12px Arial;border:1px solid #C3C3C3;border-radius:2px}.jzDialog_button0{margin-left:10px;color:#333;border-color:#c3c3c3;background:#ececec;background:-webkit-gradient(linear,center bottom,center top,from(#ececec),to(#f4f4f4));background:-moz-linear-gradient(90deg,#ececec,#f4f4f4)}.jzDialog_button1{color:#FFF;border-color:#f29327;background:#ea791f;background:-webkit-gradient(linear,center bottom,center top,from(#ea791f),to(#f39428));background:-moz-linear-gradient(90deg,#ea791f,#f39428)}</style>';
    $('body').append(dialogStyle);
})(jQuery);