define("uran/base/1.1.1/flex-debug", [ "$-debug", "lib/detector/1.2.1/detector-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Detector = require("lib/detector/1.2.1/detector-debug");
    //IOS 是否是Web App模式
    if (!navigator.standalone) {
        var device = Detector.device, browser = Detector.browser, support = $.support;
        if (!device.wp) {
            var win = window, doc = document;
            var bodyStyle = doc.body.style;
            var orientationevent = "onorientationchange" in win ? "orientationchange" : "resize";
            var fullscreen = function() {
                if (browser.safari && device.iphone) {
                    return function() {
                        bodyStyle.minHeight = doc.documentElement.clientHeight + 60 + "px";
                        win.scrollTo(0, 0);
                    };
                } else {
                    return function() {
                        win.scrollTo(0, 0);
                    };
                }
            }();
            //阻止页面默认滚动效果 wp可以通过css -ms-touch-action:none; 实现
            if ($.support.touch) {
                $(win).on("touchmove", function(e) {
                    e.preventDefault();
                });
            }
            $(win).on(orientationevent, fullscreen);
            //页面加载完毕，隐藏地址栏
            $(fullscreen);
        }
    }
});
