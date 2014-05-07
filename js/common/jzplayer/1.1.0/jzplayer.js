define(function(require, exports, module) {

    // JZPlayer
    // -----------
    // 多媒体播放组件，核心特征是：多个视频切换播放、多张图片分类切换和图片视频混合播放

    var $ = require('$');
    var Widget = require('widget');
    var Handlebars = require('handlebars');
    var Carousel = require('carousel');

    var JZPlayer = Widget.extend({

        attrs: {

            // 用户传入的 triggers 和 panels
            // 可以是 Selector、jQuery 对象、或 DOM 元素集
            triggers: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            panels: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            curClass: null,

            panelEffect: null,

            // Flash
            vsrc: null,
            vwid: 630,
            vhei: 450,

            // Image
            imgShowUrl: '#',
            iElement: '#J-jzPlayerCnt',
            iPanels: '#J-jzPlayerCnt .ui-switchable-content li',
            iEffect: 'scrollx',
            iEasing: 'easeOutStrong',
            iAutoplay: true,
            iInterval: 5000,
            iCrcular: true,
            iPrevBtn: '#J-imgCar .prev',
            iNextBtn: '#J-imgCar .next'
        },

        setup: function() {
            var panEff = this.get('panelEffect');
            if(panEff == 'slide') {
                this._imgSwitchTpl();
            } else if(panEff == 'video') {
                this._videoTpl();
            } else {
                this._imgSwitchTpl();
                this._videoTpl();
            }
            this._initTriggers();
        },

        _initTriggers: function() {
            var triggers = this.triggers = this.get('triggers');

            this._bindTriggers();
        },

        _bindTriggers: function() {
            var that = this;
            var panEff = this.get('panelEffect');
            var triggers = this.get('triggers');
            var firstItem = this.get('firstItem');

            this.delegateEvents(triggers, 'click', function(e) {
                var item = $(e.currentTarget);
                if(panEff == 'slide') {
                    that.imageShow(item);
                } else if(panEff == 'video') {
                    that.videoPlay(item);
                } else {
                    that.imageShow(item);
                    that.videoPlay(item);
                }
                that.curStyle(item);
                that.checkEmpty(item);
            });

            triggers.eq(0).trigger('click');
        },

        videoPlay: function(btn) {
            var panEff = this.get('panelEffect');
            var panels = this.get('panels');
            var vwid = this.get('vwid');
            var vhei = this.get('vhei');

            var vsrc = btn.data('vsrc');

            if(!vsrc && panEff != 'video') return;

            var source = $('#jzPlayerVidTpl').html(),
                template = Handlebars.compile(source),
                data = {
                    'video': [
                        {
                            'vsrc': vsrc,
                            'vwid': vwid,
                            'vhei': vhei
                        }
                    ]
                };

            // Fix:软件点击无效
            clearTimeout(t);
            var t = setTimeout(function() {
                panels.html(template(data));
            }, 0);
        },

        imageShow: function(btn) {
            var that = this;
            var panEff = this.get('panelEffect');
            var panels = this.get('panels');
            var imgShowUrl = this.get('imgShowUrl');

            var isrc = btn.data('isrc').split(',');
            var isrcLen = isrc.length;

            if(!isrc[0] && panEff != 'slide') return;

            var source = $('#jzPlayerImgTpl').html(),
                template = Handlebars.compile(source),
                data = {
                }

            Handlebars.registerHelper("setImgSrc", function() {
                var imgCnt = '';
                for(var i = 0; i < isrcLen; i ++) {
                    if(isrc[i] == '') {
                        imgCnt += '<li class="no-img">数据加载失败……</li>';
                    }
                    imgCnt += '<li><a href="javascript:;"><img class="img" alt="" src="' + isrc[i] + '" /></a></li>';
                }
                return new Handlebars.SafeString(imgCnt);
            });

            Handlebars.registerHelper("setImgNav", function() {
                var imgNav = '';
                for(var i = 0; i < isrcLen; i ++) {
                    imgNav += '<li>•</li>';
                }
                return new Handlebars.SafeString(imgNav);
            });

            panels.html(template(data));
            that.imgSwitch();

            /*$.ajax({
                type: 'GET',
                url: imgShowUrl,
                data: 'sort=' + isrc,
                dataType: 'json',
                success: function(r) {
                    var code = r.code;
                    var msg = r.msg;

                    if(code == 1) {
                        var source = $('#jzPlayerVidTpl').html(),
                            template = Handlebars.compile(source);

                            panels.html(template(r));
                            that.imgSwitch();
                    } else {
                        Confirmbox.alert(msg);
                    }
                }
            });*/
        },

        imgSwitch: function() {
            var that = this;
            var panelSlide = new Carousel({
                element: that.get('iElement'),
                panels: that.get('iPanels'),
                effect: that.get('iEffect'),
                easing: that.get('iEasing'),
                autoplay: that.get('iAutoplay'),
                interval: that.get('iInterval'),
                circular: that.get('iCrcular'),
                prevBtn: that.get('iPrevBtn'),
                nextBtn: that.get('iNextBtn')
            }).render();
        },

        curStyle: function(btn) {
            var curClass = this.get('curClass');
            btn.siblings().removeClass(curClass).end().addClass(curClass);
        },

        checkEmpty: function(btn) {
            var panEff = this.get('panelEffect');
            var isrc = btn.data('isrc').split(',');
            var vsrc = btn.data('vsrc');
            if(!panEff && !isrc[0] && !vsrc) {
                alert('该数据加载失败，请浏览其它内容~')
            } else if(panEff == 'video' && !vsrc) {
                alert('该数据加载失败，请浏览其它内容~')
            } else if(panEff == 'slide' && !isrc[0]) {
                alert('该数据加载失败，请浏览其它内容~')
            }
        },

        _videoTpl: function() {
            var videoTpl = '<script id="jzPlayerVidTpl" type="x-handlebars-template">{{#video}}<embed src="{{vsrc}}" allowFullScreen="true" quality="high" width="{{vwid}}" height="{{vhei}}" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>{{/video}}</script>';
            $('body').append(videoTpl);
        },

        _imgSwitchTpl: function() {
            var imageTpl = '<script id="jzPlayerImgTpl" type="x-handlebars-template"><div id="J-imgCar" class="imgcar ui-carousel"><a class="prev" href="javascript:;" data-role="prev" title="上一张"></a><a class="next" href="javascript:;" data-role="next" title="下一张"></a><ol class="ui-switchable-content">{{setImgSrc}}</ol><ul class="ui-switchable-nav" data-role="nav">{{setImgNav}}</ul></div></script>';
            $('body').append(imageTpl);
        },

        destroy: function() {
            $.each(this._plugins, function(i, plugin) {
                if (plugin.destroy) {
                    plugin.destroy.call(this);
                }
            });

            JZPlayer.superclass.destroy.call(this);
        }
    });

    module.exports = JZPlayer;


    // Helpers
    // -------

});
