define("astro/call", ["$", "confirmbox", "dialog", "handlebars", "autocomplete", "popup", "tabs", "slide", "carousel", "accordion", "calendar", "zeroclipboard", "validator", "upload", "ckeditor", "kindeditor", "echo", "lazyload", "store", "sticky", "menuaim", "moment", "jiathis", "navselected", "baiduad"], function(require, exports, module) {

    var $ = require('$');

    // confirmbox
    var Confirmbox = require('confirmbox');
    ConfirmBox.alert('提示内容~', function() {}, {
        afterHide: function() {
            alert('提示已关闭~');
        },
        title: '提示信息',
        closeTpl: '×'
    });

    var itemBox = new ConfirmBox({
        trigger: '#J-itemBtn',
        title: '提示信息',
        hasMask: false,
        message: '<div>提示内容~</div>',
        confirmTpl: false,
        cancelTpl: false
    });

    // dialog
    var Dialog = require('dialog');
    var itemDialog = new Dialog({
        trigger: '#J-itemBtn',
        width: '500px',
        hasMask: false,
        content: $('#J-itemBox')
    }).before('show', function() {
        var currItem = this.activeTrigger;
    }).after('show', function() {
        $('#J-itemBox input:first').focus();
    });
    
    // 正在加载弹框
    var ajaxLoader = new Dialog({
        classPrefix: 'ui-ajaxload',
        closeTpl: false,
        content: '<div style="position:fixed;top:50%;left:50%;width:32px;height:32px;outline:0;background-image:url(http://static.n8n8.cn/Public/Images/common/ajax-loader3.gif);" class="ajax-loader"></div>'
    });

    // Handlebars Template
    var Handlebars = require('handlebars');

    var itemTpl = '<script id="itemTpl" type="x-handlebars-template">{{#template}}<div>{{content}}</div><div>{{compareZero change}}</div>{{/template}}</script>';
    $('body').append(itemTpl);

    var source = $('#itemTpl').html(),
        template = Handlebars.compile(source),
        data = {
            'template': [
                {   
                    'content': content
                }
            ]
        };
        Handlebars.registerHelper('compareZero', function(val) {
            var result;
            if(val > 0) {
                result = '<span class="red">+' + val + '</span>';
            } else if(val < 0) {
                result = '<span class="green">' + val + '</span>';
            } else {
                result = val;
            }
            return new Handlebars.SafeString(result);
        });
    $('#tplTarget').html(template(data));

    // autocomplete
    var AutoComplete = require('autocomplete');
    var stockAutoTpl = '<div class="{{classPrefix}}"><ul class="{{classPrefix}}-ctn" data-role="items">{{#each items}}<li data-role="item" class="{{../classPrefix}}-item" data-value="{{code}}">{{highlightItem ../classPrefix matchKey}}</li>{{/each}}</ul></div>';

    var searchCodeAuto = new AutoComplete({
        trigger: '#searchCodeInp',
        template: stockAutoTpl,
        selectFirst: true,
        dataSource: '../../../js/lib/autocomplete/1.2.2/stockAutoData.json?q={{query}}',
        filter: function(data, query) {
            var result = [];
            $.each(data, function(index, value) {
                    if ((value.code.indexOf(query.toUpperCase()) > -1 || value.Secu_Sht.indexOf(query) > -1 || value.py.indexOf(query.toUpperCase()) > -1) && (result.length < 10)) {
                        result.push({
                            code: value.code,
                            matchKey: value.Secu_Sht + '（' + value.code + '）'
                        });
                    }
                });
            return result;
        }
    }).on('itemSelect', function(data){
        $('#searchCodeForm').submit();
    }).render();

    // autocomplete email
    var emailSuffix = ['qq.com', '126.com', '163.com', '139.com', 'sina.com', 'sohu.com', 'yahoo.com', 'gmail.com'];
    var mailAutoInp = new AutoComplete({
        trigger: '#J-mailAutoInp',
        submitOnEnter: false,
        dataSource: function(query) {
            var a = $.map(emailSuffix, function(v, i) {
                return query + '@' + v;
            });
            return a;
        },
        filter: '',
        inputFilter: function(v){
            return v.replace(/^(.*)@.*$/,'$1');
        }
    }).render();

    // popup
    var Popup = require('popup');
    var itemPopup = new Popup({
        trigger: '#J-itemPopup',
        triggerType: 'hover',
        align: {
            baseXY: [0, 0]
        },
        element: '#J-itemPopupBox'
    }).render();
    itemPopup.after('show', function(){
        console.log('itemPopup is shown!');
    }).after('hide', function(){
        console.log('itemPopup is hidden!');
    });

    // tabs
    var Tabs = require('tabs');
    var itemTabs = new Tabs({
        element: '#J-itemTabs',
        triggers: '#J-itemTabs .ui-tab-trigger-item',
        panels: '#J-itemTabs .ui-tab-cnt-item',
        triggerType: 'click',
        activeIndex: 0,
        asyn: true
    }).render();
    itemTabs.on('change:activeIndex', function(toIndex, fromIndex) {});
    // Multiple Tabs hover
    var tabsHvrLen = $('.J-tabsHover').length;
    if(tabsHvrLen) {
        for(var i = 0; i < tabsHvrLen; i ++) {
            $('.J-tabsHover').eq(i).addClass('J-tabsHover-' + i);
            if($('.J-tabsHover').eq(i).find('.ui-tab-cnt-item').length) {
                var tabsHvrCls = '.J-tabsHover-' + i;
                var tabsHvr = new Tabs({
                    element: tabsHvrCls,
                    triggers: tabsHvrCls + ' .ui-tab-trigger-item',
                    panels: tabsHvrCls + ' .ui-tab-cnt-item',
                    triggerType: 'hover',
                    activeIndex: 0
                }).render();
            }
        }
    }
    // Multiple Tabs click
    var tabsClkLen = $('.J-tabsClick').length;
    if(tabsClkLen) {
        for(var i = 0; i < tabsClkLen; i ++) {
            $('.J-tabsClick').eq(i).addClass('J-tabsClick-' + i);
            if($('.J-tabsClick').eq(i).find('.ui-tab-cnt-item').length) {
                var tabsClkCls = '.J-tabsClick-' + i;
                var tabsClk = new Tabs({
                    element: tabsClkCls,
                    triggers: tabsClkCls + ' .ui-tab-trigger-item',
                    panels: tabsClkCls + ' .ui-tab-cnt-item',
                    triggerType: 'click',
                    activeIndex: 0
                }).render();
            }
        }
    }

    // slide
    var Slide = require('slide');
    var itemSlide = new Slide({
        element: '#J-itemSlide',
        //triggers: '#J-itemSlide .ui-switchable-nav li',
        //panels: '#J-itemSlide .ui-switchable-content li',
        effect: 'scrollx',
        //easing: 'easeOutStrong',
        //interval: 5000,
        hasTriggers: true
    }).render();
    itemSlide.on('switched', function(toIndex, fromIndex) {});
    $('#J-slidePrev').click(function(e) {
        e.preventDefault();
        itemSlide.prev();
    });
    $('#J-slideNext').click(function(e) {
        e.preventDefault();
        itemSlide.next();
    });

    // carousel
    var Carousel = require('carousel');
    var itemCarousel = new Carousel({
        element: '#J-itemCarousel',
        panels: '#J-itemCarousel li',
        easing: 'easeOutStrong',
        effect: 'scrollx',
        step: 4,
        autoplay: false,
        interval: 3000,
        viewSize: [640],
        circular: true,
        prevBtn: '#J-itemCarousel .prev',
        nextBtn: '#J-itemCarousel .next',
        hasTriggers: false
    }).render();

    // accordion
    var Accordion = require('accordion');
    var itemAccordion = new Accordion({
        element: '#J-itemAccordion',
        triggerType: 'hover',
        multiple: false
    }).render();

    // calendar
    var Calendar = require('calendar');
    var calStartInit = '2014-01-01';
    var calEndInit = null;
    var calStart = new Calendar({
        trigger: '#J-calStartBtn',
        output: '#calStartInp',
        range: [calStartInit, null]
    });
    var calEnd = new Calendar({
        trigger: '#J-calEndBtn',
        output: '#calEndInp',
        range: [null, calEndInit]
    });
    calStart.on('selectDate', function(date) {
        calEnd.range([date, calEndInit]);
    });
    calEnd.on('selectDate', function(date) {
        calStart.range([calStartInit, date]);
    });

    // zeroclipboard
    var ZeroClipboard = require('zeroclipboard');
    var copyCnt = new ZeroClipboard(
        $('#J-copyBtn'), {
        moviePath: 'http://static.n8n8.cn/Public/Js/gallery/zeroclipboard/1.1.7/ZeroClipboard.swf',
        trustedDomains: 'http://www.n8n8.cn',
        allowScriptAccess: 'always'
    });

    copyCnt.on('complete', function(client, args) {
        ConfirmBox.alert('内容复制成功: ' + args.text, function(){}, {
            hasMask:false
        });
    });

    // validator
    var Validator = require('validator');
    Validator.addRule('mobicode', /^\d{6}$/, '请输入正确的{{display}}');
    Validator.addRule('mobileunique', function(options, commit) {
        $.post('/index.php?m=ucenter&c=user&a=checkMobile', {mobile: options.element.val()}, function(data) {
            commit(data.code == '-1' ? null : data.code, data.response);
        }, 'json');
    });
    var itemValidator = new Validator({
        element: '#itemForm',
        autoSubmit: false
    });
    itemValidator.addItem({
        element: '#itemForm [name=mobiCode]',
        required: true,
        rule: 'number minlength{min:6} maxlength{max:6}',
        errormessageRequired: '请正确输入6位手机验证码'
    });
    itemValidator.query('#itemForm [name=mobiCode]').execute(function(err, msg, ele) {
        if(!errTips) {
            var errTips = msg;
        }
    });

    // upload
    var Uploader = require('upload');
    var itemUpload = new Uploader({
        trigger: '#uploadBtn',
        name: 'file',
        accept: 'image/*',
        action: '#',
        progress: function(e, position, total, percent, files) {
            $('#progress').text('Uploading ... ' + percent + '%');
        }
    }).change(function(filename) {

    }).success(function(r) {
        var r = $.parseJSON(r);
        Confirmbox.alert('上传成功！');
    }
    itemUpload.submit();

    // ckeditor
    var Ckeditor = require('ckeditor');
    var ckEditor = CKEDITOR.replace('editor', {
        customConfig: '/js/gallery/ckeditor/4.3.0/ckeconfig.js',
        startupFocus: true,
        extraPlugins: 'mathjax'
    });
    var editText = ckEditor.document.getBody().getText();
    var editData = ckEditor.getData();
    ckEditor.setData(editCont, function() {
        ckEditor.focus();
    });

    // kindeditor
    var KindEditor = require('kindeditor');
    var wordLimit,
        kEditor;
    KindEditor.ready(function(K) {
        kEditor = K.create('textarea[name="content"]', {
            uploadJson: '#',
            fileManagerJson: '#',
            urlType: 'relative',
            allowFileManager: false,
            afterChange: function() {
                var wordStat = this.count('text');
                if (wordStat > 10000 || wordStat < 50) {
                    wordLimit = false;
                } else {
                    wordLimit = true;
                }
            },
            items: ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'flash', 'table', 'hr', 'emoticons', 'map', 'code', 'pagebreak', 'link', 'unlink', '|', 'about'
            ]
        });
    });

    // Echo
    var Echo = require('echo');
    Echo.init({
        offset: 100,
        throttle: 250
    });

    // lazyload
    var lazyload = require('lazyload');
    $('img.lazy').lazyload();

    // store
    var store = require('store');
    // 设置本地存储
    store.set(key, value);
    // 读取存储内容
    store.forEach(function(val, key) {
        console.log(key, '==', val)
    }
    // 删除存储内容
    store.remove(key);
    // 移除存储内容
    store.clear();

    // sticky
    var sticky = require('sticky');
    sticky('#J-sidenav');

    // menuaim
    var menuAim = require('menuaim');
    var $sideNav = $('#sideNav');
    $sideNav.menuAim({
        activate: activateSubmenu,
        deactivate: deactivateSubmenu,
        exitMenu: function() { return true; }
    });

    function activateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data('submenuId'),
            $submenu = $('#' + submenuId);

        var offset = $submenu.parent().offset(),
            navHei = $sideNav.outerHeight(),
            navWid = $sideNav.outerWidth(),
            subHei = $submenu.height();

        if($submenu.find('a').length) {
            $submenu.css({
                display: 'block',
                position: 'absolute',
                top: - (subHei / 2) + 16,
                left: navWid - 3
            });        
        }

        $row.addClass('ui-nav-item-current');
    }

    function deactivateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data('submenuId'),
            $submenu = $('#' + submenuId);

        $submenu.css('display', 'none');
        $row.removeClass('ui-nav-item-current');
    }

    // moment
    var Moment = require('moment');
    // 格式化时间
    function update() {
        var todayTime = Moment(new Date()).format('YYYY-MM-DD a HH:mm:ss', 'zh-cn');
        var timestamp = Moment(1394698884*1000).format('YYYY-MM-DD HH:mm:ss');
        var toTimestamp = Moment('2014-03-13 16:21:24').format('X');
        $('body').html(todayTime + '<br>' + timestamp + '<br>' + toTimestamp);
    }
    function timeUpdate() {
        update();
        setTimeout(timeUpdate, 1000);
    }
    timeUpdate();
    // 倒计时应用
    function countdown(obj, sTime, eTime, lTime) {
        var examTimeLen = eTime - sTime || lTime;
        var examTimeMil = Moment.duration(examTimeLen * 1000, 'milliseconds');

        var countdownInt = setInterval(function(){
            examTimeMil = Moment.duration(examTimeMil - 1000, 'milliseconds');
            var examTimeHour = examTimeMil.hours();
            var examTimeMin = examTimeMil.minutes();
            var examTimeSec = examTimeMil.seconds();
            obj.text((examTimeHour < 10 ? '0' + examTimeHour : examTimeHour) + ':' + (examTimeMin < 10 ? '0' + examTimeMin : examTimeMin) + ':' + (examTimeSec < 10 ? '0' + examTimeSec : examTimeSec));
        }, 1000);
    }
    //countdown($('body'), 0, 0, 2400);
    //countdown($('body'), 1366547400, 1366549200);

    // jiathis
    if($('.jiathis_style').length) {
        var Jiathis = require.async('jiathis');
    }

    // navselected
    var Navselected = require('navselected');
    var navSel = new Navselected({
        triggers: '#J-mainNav li'
    }).render();

    // BaiduAd
    var BaiduAd = require('baiduad');
    var BdAdv = new BaiduAd({
        adSrc: 'http://cbjs.baidu.com/js/m.js',
        adArr: [741044, 741045, 741046, 741051],
        prefix: 'baiduAd-'
    }).render();

    // chatting
    require.async('http://s.n8n8.cn/Js/common/jzim/3.0.0/jzim.js');

    // youkuplayer
    require.async('http://player.youku.com/jsapi#', function() {
        var vidVal = $('#J-youkuplayer').data('vid');
        player = new YKU.Player('J-youkuplayer', {
            styleid: '0',
            client_id: '1872b5d5537128ab',
            vid: vidVal,
            events: {
                onPlayerReady: function() {
                },
                onPlayStart: function() {
                },
                onPlayEnd: function() {
                }
            }
        });
        // 播放
        player.playVideo();
        // 暂停
        player.pauseVideo();
    });

});