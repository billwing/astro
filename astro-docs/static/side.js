define(function(require, exports, module) {

    var $ = require('$');

    exports.init = function() {
        var titles = $('.content-area > .content > h2, #module-wrapper > h2');
        var doc = $(document);
        if (titles.length <= 0) {
            return;
        }

        $(window).scroll(function() {
            var top = doc.scrollTop(), i;
            if (top >= doc.height()- $(window).height() - 20) {
                i = titles.length - 1;
            } else {
                for (i=0; i<titles.length; i++) {
                    if (top < titles.eq(i).offset().top - 20) {  
                        break;
                    }
                }
                i--;
                i = (i<0) ? 0 : i;
            }
            $('.side-area .side-highlight').removeClass('side-highlight');
            $('.side-area > ul > li').eq(i).addClass('side-highlight');
        });
    };

});

