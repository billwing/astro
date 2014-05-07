define("uran/page-transitions/1.1.0/page-transitions-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var configs = {};
    var isInit = false;
    var supported = $.support.transform && $.support.transition;
    var tapEvent = $.support.touch ? "touchstart" : "click";
    var transitionEvent = "webkitTransitionEnd transitionend";
    var PageTransitions;
    function getPageName(url) {
        var match = url.match(/([^/?]+?)(?:\.htm[l]?)?(?:\?.+)?$/i);
        return match ? match[1].toLowerCase() : false;
    }
    function pageLoad(href, data, reverse, state) {
        if (!href) return;
        if (typeof data === "boolean") {
            state = reverse;
            reverse = data;
            data = null;
        }
        $.ajax({
            url: href,
            type: data ? "post" : "get",
            data: data,
            dataType: "html",
            success: function(html, textStatus, xhr) {
                var all = $("<div></div>"), newPageTitle = html.match(/<title[^>]*>([^<]*)/) && RegExp.$1, page;
                all.get(0).innerHTML = html;
                page = all.find("[data-role=page]").first().removeClass("ui-page-active").css("transition", "0ms").hide().attr("data-url", getPageName(href));
                if (newPageTitle) {
                    page.data("title", newPageTitle);
                }
                $("body").append(page);
                transition(page, reverse, state);
                configs.onPageload && configs.onPageload(page);
            }
        });
    }
    function transition(to, reverse, state) {
        var activePage = $(".ui-page-active");
        if (activePage.data("transited")) return;
        activePage.data("transited", true);
        to.data("transited", true);
        var url = to.data("url");
        window.scrollTo(0, 1);
        //处理data-rel="back"
        $("[data-rel=back]", to).data("href", activePage.data("url"));
        var pageWidth = activePage.width();
        activePage.one(transitionEvent, function() {
            $(this).removeClass("ui-page-active").width("100%").css("transition", "0ms").css("transform", "").removeData("transited").hide();
        });
        to.show().one(transitionEvent, function() {
            $(this).addClass("ui-page-active").width("100%").css("transition", "0ms").css("transform", "").removeData("transited");
            window.scrollTo(0, 0);
            PageTransitions.transitted = false;
            configs.onTransform && configs.onTransform($(this), reverse);
        });
        PageTransitions.transitted = true;
        configs.onTransformBegin && configs.onTransformBegin(to, reverse);
        activePage.width(pageWidth + "px").css("transform", "translateX(0px)");
        to.width(pageWidth + "px").css("transform", reverse ? "translateX(-" + pageWidth + "px)" : "translateX(" + pageWidth + "px)");
        setTimeout(function() {
            activePage.css("transition", "350ms");
            to.css("transition", "350ms");
            activePage.css("transform", reverse ? "translateX(" + pageWidth + "px)" : "translateX(-" + pageWidth + "px)");
            to.css("transform", "translateX(0px)");
        }, 50);
        document.title = to.data("title") || document.title;
    }
    PageTransitions = {
        init: function(options) {
            //不支持动画和变形特性，直接跳转
            if (!supported) return;
            if (isInit) return;
            $.extend(configs, options);
            $(document).on(tapEvent, "a[data-transition]", function(e) {
                var href = $(this).attr("href"), state = !($(this).data("state") === false), match = getPageName(href), page;
                if (match) {
                    page = $('[data-url="' + match + '"]');
                }
                if (page && page.length) {
                    transition(page, false, state);
                } else {
                    pageLoad(href);
                }
                return false;
            });
            $(document).on("submit", "form[data-transition]", function(e) {
                if (!this.onsubmit || this.onsubmit()) {
                    var href = $(this).attr("action"), state = !($(this).data("state") === false), match = getPageName(href), page;
                    if (match) {
                        $('[data-url="' + match + '"]').remove();
                    }
                    pageLoad(href, $(this).serialize(), false, state);
                    return false;
                }
            });
            $(document).on(tapEvent, "[data-rel=back]", function() {
                var href = $(this).attr("href"), match = getPageName($(this).data("href")), page;
                if (match) {
                    page = $('[data-url="' + match + '"]');
                }
                if (page && page.length) {
                    transition(page, true, true);
                } else {
                    pageLoad(href, true, true);
                }
                return false;
            });
            $("[data-role=page]").addClass("ui-page-active").css("transition", "0ms").attr("data-url", getPageName(location.href)).data("title", document.title);
        },
        forward: function(url, state) {
            if (supported) {
                var match = getPageName(url), page;
                if (match) {
                    page = $('[data-url="' + match + '"]');
                }
                if (page && page.length) {
                    transition(page, false, state);
                } else {
                    pageLoad(url);
                }
            } else {
                self.location.href = url;
            }
        },
        backward: function(url) {
            if (supported) {
                var match = getPageName(url), page;
                if (match) {
                    page = $('[data-url*="' + match + '"]');
                }
                if (page && page.length) {
                    transition(page, true, true);
                } else {
                    pageLoad(url, true, true);
                }
            } else {
                self.location.href = url;
            }
        }
    };
    return PageTransitions;
});
