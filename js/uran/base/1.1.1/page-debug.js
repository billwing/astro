define("uran/base/1.1.1/page-debug", [ "$-debug", "lib/base/1.1.1/base-debug", "lib/class/1.1.0/class-debug", "lib/events/1.1.0/events-debug", "./path-debug", "./navigation-debug", "./history-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), Base = require("lib/base/1.1.1/base-debug"), Path = require("./path-debug"), Navigation = require("./navigation-debug"), $win = $(window), page;
    var Page = Base.extend({
        attrs: {
            initPath: "",
            animate: false,
            easeout: "page-slideoutleft",
            easein: "page-slideinright",
            easeoutreverse: "page-slideoutright",
            easeinreverse: "page-slideinleft"
        },
        init: function(pages) {
            this._initPages(pages);
            this._initEvents();
        },
        _initPages: function(pages) {
            this.pages = [];
            for (var url in pages) {
                var $page = $('[data-url="' + url + '"]');
                this.pages.push({
                    url: Path.parseUrl(Path.makeUrlAbsolute(url)),
                    dom: $page,
                    title: $page.data("title"),
                    control: pages[url]
                });
            }
            var initPath = this.get("initPath");
            if (!initPath) {
                this.activePage = this.pages[0];
            } else {
                var url = Path.parseUrl(Path.squash(Path.makeUrlAbsolute(initPath)));
                this.activePage = this.pages[this._getIndexByUrl(url)];
            }
            this.forward(this.activePage.url, this.get("data"));
        },
        _initEvents: function() {
            var that = this;
            //jquery navigation widget
            $win.on("navigate", function(e, data) {
                var state = data.state;
                // TODO: hack
                if (!state.url && that.get("data").backUrl) {
                    window.location.href = that.get("data").backUrl;
                } else if (state.direction === "forward") {
                    that.forward(state.url);
                } else {
                    that.backward(state.url);
                }
            });
            $(document).on("click", "[data-transition]", function(e) {
                e.preventDefault();
                that.forward(this.href);
            });
            $(document).on("click", "[data-rel=back]", function(e) {
                e.preventDefault();
                window.history.back();
            });
        },
        /**
     * 前进
     * @param href
     * @param data
     * @param post
     */
        forward: function(href, data, post) {
            if (this.transiting) return;
            if (href) {
                this.transiting = true;
                var url = $.type(href) === "object" ? href : Path.parseUrl(Path.squash(Path.makeUrlAbsolute(href))), i;
                if ((i = this._getIndexByUrl(url)) < 0) {
                    this._createPage({
                        url: url,
                        data: data,
                        post: post
                    });
                } else {
                    this.transition(this.pages[i], false, data);
                }
            }
        },
        /**
     * 后退
     * @param href
     * @param data
     * @param post
     */
        backward: function(href, data, post) {
            if (this.transiting) return;
            if (href) {
                this.transiting = true;
                var url = $.type(href) === "object" ? href : Path.parseUrl(Path.squash(Path.makeUrlAbsolute(href))), i;
                if ((i = this._getIndexByUrl(url)) < 0) {
                    this._createPage({
                        url: url,
                        data: data,
                        post: post
                    }, true);
                } else {
                    this.transition(this.pages[i], true, data);
                }
            } else {
                window.history.back();
            }
        },
        /**
     * 转场动画函数
     * @param nextPage
     * @param backward
     */
        transition: function(nextPage, backward, data) {
            // if (nextPage === this.activePage) return;
            var that = this, url = nextPage.url, nextDom = nextPage.dom, currentPage = this.activePage, currentDom = currentPage.dom, currentUrl = currentPage.url, slideto = backward ? this.get("easeoutreverse") : this.get("easeout"), slidefrom = backward ? this.get("easeinreverse") : this.get("easein");
            that.trigger("transiting");
            nextPage.title && (document.title = nextPage.title);
            var currentAction = function() {
                currentDom.removeClass("ui-page-active");
                if (that.get("animate")) {
                    currentDom.removeClass(slideto).off("animationend webkitAnimationEnd", arguments.callee);
                }
                if (currentDom.data("cache") === false) {
                    that.pages.splice(that._getIndexByUrl(currentUrl), 1);
                    currentDom.remove();
                }
            }, nextAction = function() {
                if (that.get("animate")) {
                    nextDom.removeClass(slidefrom).off("animationend webkitAnimationEnd", arguments.callee);
                }
                that.activePage = nextPage;
                that.transiting = false;
                that.trigger("transition", nextPage);
                window.scrollTo(0, 0);
            };
            if (this.get("animate")) {
                currentDom.on("animationend webkitAnimationEnd", currentAction).addClass(slideto);
                nextDom.on("animationend webkitAnimationEnd", nextAction).addClass("ui-page-active " + slidefrom);
            } else {
                currentAction();
                nextAction();
                nextDom.addClass("ui-page-active");
            }
            Navigation.go(url, backward);
            nextPage.control && nextPage.control(data);
        },
        /**
     * 获取page的Index
     * @param url
     * @returns {number}
     * @private
     */
        _getIndexByUrl: function(url) {
            var pages = this.pages, i = 0, len = pages.length;
            for (;i < len; i++) {
                if (url.hrefNoHash === pages[i].url.hrefNoHash) return i;
            }
            return -1;
        },
        /**
     * 异步页面载入
     * @param o
     * @param backward
     * @private
     */
        _createPage: function(o, backward) {
            this.trigger("loading");
            $.ajax(o.url.href, {
                type: o.post ? "post" : "get",
                data: o.data,
                context: this,
                success: function(data) {
                    var html = $("<div></div>"), pages = this.pages, title, body, dom, page;
                    title = data.match(/<title[^>]*>([^<]*)/) && RegExp.$1;
                    body = data.match(/<body[^>]*>([\s\S]*)<\/body>/gim) && RegExp.$1;
                    html.get(0).innerHTML = body;
                    dom = html.find("[data-role=page]").eq(0);
                    if (o.post) {
                        dom.data("cache", false);
                    }
                    this.activePage.dom.after(dom);
                    page = {
                        url: o.url,
                        dom: dom,
                        title: title
                    };
                    this.trigger("load", page);
                    if (backward) {
                        pages.unshift(page);
                        this.transition(page, true);
                    } else {
                        pages.push(page);
                        this.transition(page);
                    }
                },
                error: function() {
                    this.trigger("error", o);
                    this.transiting = false;
                }
            });
        }
    });
    return Page;
});

define("uran/base/1.1.1/path-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var $base = $("head").find("base");
    var Path = {
        // This scary looking regular expression parses an absolute URL or its relative
        // variants (protocol, site, document, query, and hash), into the various
        // components (protocol, host, path, query, fragment, etc that make up the
        // URL as well as some other commonly used sub-parts. When used with RegExp.exec()
        // or String.match, it parses the URL into a results array that looks like this:
        //
        //     [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
        //     [1]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread
        //     [2]: http://jblas:password@mycompany.com:8080/mail/inbox
        //     [3]: http://jblas:password@mycompany.com:8080
        //     [4]: http:
        //     [5]: //
        //     [6]: jblas:password@mycompany.com:8080
        //     [7]: jblas:password
        //     [8]: jblas
        //     [9]: password
        //    [10]: mycompany.com:8080
        //    [11]: mycompany.com
        //    [12]: 8080
        //    [13]: /mail/inbox
        //    [14]: /mail/
        //    [15]: inbox
        //    [16]: ?msg=1234&type=unread
        //    [17]: #msg-content
        //
        urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
        // Abstraction to address xss (Issue #4787) by removing the authority in
        // browsers that auto	decode it. All references to location.href should be
        // replaced with a call to this method so that it can be dealt with properly here
        getLocation: function(url) {
            var uri = url ? this.parseUrl(url) : location, hash = this.parseUrl(url || location.href).hash;
            // mimic the browser with an empty string when the hash is empty
            hash = hash === "#" ? "" : hash;
            // Make sure to parse the url or the location object for the hash because using location.hash
            // is autodecoded in firefox, the rest of the url should be from the object (location unless
            // we're testing) to avoid the inclusion of the authority
            return uri.protocol + "//" + uri.host + uri.pathname + uri.search + hash;
        },
        parseLocation: function() {
            return this.parseUrl(this.getLocation());
        },
        //Parse a URL into a structure that allows easy access to
        //all of the URL components by name.
        parseUrl: function(url) {
            // If we're passed an object, we'll assume that it is
            // a parsed url object and just return it back to the caller.
            if ($.type(url) === "object") {
                return url;
            }
            var matches = Path.urlParseRE.exec(url || "") || [];
            // Create an object that allows the caller to access the sub-matches
            // by name. Note that IE returns an empty string instead of undefined,
            // like all other browsers do, so we normalize everything so its consistent
            // no matter what browser we're running on.
            return {
                href: matches[0] || "",
                hrefNoHash: matches[1] || "",
                hrefNoSearch: matches[2] || "",
                domain: matches[3] || "",
                protocol: matches[4] || "",
                doubleSlash: matches[5] || "",
                authority: matches[6] || "",
                username: matches[8] || "",
                password: matches[9] || "",
                host: matches[10] || "",
                hostname: matches[11] || "",
                port: matches[12] || "",
                pathname: matches[13] || "",
                directory: matches[14] || "",
                filename: matches[15] || "",
                search: matches[16] || "",
                hash: matches[17] || ""
            };
        },
        //Turn relPath into an asbolute path. absPath is
        //an optional absolute path which describes what
        //relPath is relative to.
        makePathAbsolute: function(relPath, absPath) {
            if (relPath && relPath.charAt(0) === "/") {
                return relPath;
            }
            relPath = relPath || "";
            absPath = absPath ? absPath.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, "") : "";
            var absStack = absPath ? absPath.split("/") : [], relStack = relPath.split("/");
            for (var i = 0; i < relStack.length; i++) {
                var d = relStack[i];
                switch (d) {
                  case ".":
                    break;

                  case "..":
                    if (absStack.length) {
                        absStack.pop();
                    }
                    break;

                  default:
                    absStack.push(d);
                    break;
                }
            }
            return "/" + absStack.join("/");
        },
        //Returns true if both urls have the same domain.
        isSameDomain: function(absUrl1, absUrl2) {
            return Path.parseUrl(absUrl1).domain === Path.parseUrl(absUrl2).domain;
        },
        //Returns true for any relative variant.
        isRelativeUrl: function(url) {
            // All relative Url variants have one thing in common, no protocol.
            return Path.parseUrl(url).protocol === "";
        },
        //Returns true for an absolute url.
        isAbsoluteUrl: function(url) {
            return Path.parseUrl(url).protocol !== "";
        },
        //Turn the specified realtive URL into an absolute one. This function
        //can handle all relative variants (protocol, site, document, query, fragment).
        makeUrlAbsolute: function(relUrl, absUrl) {
            if (!Path.isRelativeUrl(relUrl)) {
                return relUrl;
            }
            if (absUrl === undefined) {
                absUrl = this.documentBase;
            }
            var relObj = Path.parseUrl(relUrl), absObj = Path.parseUrl(absUrl), protocol = relObj.protocol || absObj.protocol, doubleSlash = relObj.protocol ? relObj.doubleSlash : relObj.doubleSlash || absObj.doubleSlash, authority = relObj.authority || absObj.authority, hasPath = relObj.pathname !== "", pathname = Path.makePathAbsolute(relObj.pathname || absObj.filename, absObj.pathname), search = relObj.search || !hasPath && absObj.search || "", hash = relObj.hash;
            return protocol + doubleSlash + authority + pathname + search + hash;
        },
        //Add search (aka query) params to the specified url.
        addSearchParams: function(url, params) {
            var u = Path.parseUrl(url), p = typeof params === "object" ? $.param(params) : params, s = u.search || "?";
            return u.hrefNoSearch + s + (s.charAt(s.length - 1) !== "?" ? "&" : "") + p + (u.hash || "");
        },
        //get path from current hash, or from a file path
        get: function(newPath) {
            if (newPath === undefined) {
                newPath = Path.parseLocation().hash;
            }
            return Path.stripHash(newPath).replace(/[^\/]*\.[^\/*]+$/, "");
        },
        //set location hash to path
        set: function(Path) {
            location.hash = Path;
        },
        //test if a given url (string) is a path
        //NOTE might be exceptionally naive
        isPath: function(url) {
            return /\//.test(url);
        },
        //return a url path with the window's location protocol/hostname/pathname removed
        clean: function(url) {
            return url.replace(this.documentBase.domain, "");
        },
        //just return the url without an initial #
        stripHash: function(url) {
            return url.replace(/^#/, "");
        },
        stripQueryParams: function(url) {
            return url.replace(/\?.*$/, "");
        },
        //remove the preceding hash, any query params, and dialog notations
        cleanHash: function(hash) {
            return Path.stripHash(hash.replace(/\?.*$/, ""));
        },
        isHashValid: function(hash) {
            return /^#[^#]+$/.test(hash);
        },
        //check whether a url is referencing the same domain, or an external domain or different protocol
        //could be mailto, etc
        isExternal: function(url) {
            var u = Path.parseUrl(url);
            return u.protocol && u.domain !== this.documentUrl.domain ? true : false;
        },
        hasProtocol: function(url) {
            return /^(:?\w+:)/.test(url);
        },
        squash: function(url, resolutionUrl) {
            var state, href, cleanedUrl, search, isPath = this.isPath(url), uri = this.parseUrl(url), preservedHash = uri.hash;
            //uiState = "";
            // produce a url against which we can resole the provided path
            resolutionUrl = resolutionUrl || (Path.isPath(url) ? Path.getLocation() : Path.getDocumentUrl());
            // If the url is anything but a simple string, remove any preceding hash
            // eg #foo/bar -> foo/bar
            //    #foo -> #foo
            cleanedUrl = isPath ? Path.stripHash(url) : url;
            // If the url is a full url with a hash check if the parsed hash is a path
            // if it is, strip the #, and use it otherwise continue without change
            cleanedUrl = Path.isPath(uri.hash) ? Path.stripHash(uri.hash) : cleanedUrl;
            // make the cleanedUrl absolute relative to the resolution url
            href = Path.makeUrlAbsolute(cleanedUrl, resolutionUrl);
            // grab the search from the resolved url since parsing from
            // the passed url may not yield the correct result
            search = this.parseUrl(href).search;
            // TODO all this crap is terrible, clean it up
            if (isPath) {
                // reject the hash if it's a path or it's just a dialog key
                if (Path.isPath(preservedHash)) {
                    preservedHash = "";
                }
                // make sure that pound is on the front of the hash
                if (preservedHash.indexOf("#") === -1 && preservedHash !== "") {
                    preservedHash = "#" + preservedHash;
                }
                // reconstruct each of the pieces with the new search string and hash
                href = Path.parseUrl(href);
                href = href.protocol + "//" + href.host + href.pathname + search + preservedHash;
            }
            return href;
        }
    };
    Path.documentUrl = Path.parseLocation();
    Path.documentBase = $base.length ? Path.parseUrl(Path.makeUrlAbsolute($base.attr("href"), Path.documentUrl.href)) : Path.documentUrl;
    Path.documentBaseDiffers = Path.documentUrl.hrefNoHash !== Path.documentBase.hrefNoHash;
    //return the original document url
    Path.getDocumentUrl = function(asParsedObject) {
        return asParsedObject ? $.extend({}, Path.documentUrl) : Path.documentUrl.href;
    };
    //return the original document base url
    Path.getDocumentBase = function(asParsedObject) {
        return asParsedObject ? $.extend({}, Path.documentBase) : Path.documentBase.href;
    };
    return Path;
});

define("uran/base/1.1.1/navigation-debug", [ "$-debug", "uran/base/1.1.1/path-debug", "uran/base/1.1.1/history-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), Path = require("uran/base/1.1.1/path-debug"), History = require("uran/base/1.1.1/history-debug"), $win = $(window), isInit;
    var Navigation = {
        currentHref: Path.documentBase.hrefNoHash,
        go: function(newPath, backward) {
            var index = History.find(newPath.hrefNoHash);
            //回到baseURL
            if (Path.documentBase.hrefNoHash === newPath.hrefNoHash) {
                Path.set("#");
            } else {
                Path.set("#" + newPath.pathname);
            }
            if (index < 0) {
                //如果是forward，则需要把current对应的数据之后的清除
                backward || History.clearForward(this.currentHref);
                History.add(newPath.hrefNoHash, backward);
            }
            backward && History.clearForward(newPath.hrefNoHash);
            this.currentHref = newPath.hrefNoHash;
        }
    };
    $win.on("hashchange", function(e) {
        /*
     * 获取hashchange之后hash部分对应的页面地址，ex:
     * http://127.0.0.1/dev/handyjs/base/examples/flex.html#/dev/handyjs/base/examples/page1.html
     * 得到的newURL = "http://127.0.0.1/dev/handyjs/base/examples/page1.html"
     */
        var newUrl = Path.parseUrl(Path.squash(location.href)), newHref = newUrl.hrefNoHash;
        //判断页面是否跳转
        if (newHref !== Navigation.currentHref) {
            //原页面对应的History索引，这个是肯定能找到的
            var oldIndex = History.find(Navigation.currentHref);
            //新页面对应History索引，如果没找到(-1)那就是首次访问
            var newIndex = History.find(newHref);
            //触发自定义事件
            $(this).trigger("navigate", {
                state: {
                    //如果在History中能获取到index，并且是在老页面索引之前，那就是“后退”了。否则，判定为前进！
                    direction: -1 < newIndex || newIndex < oldIndex ? "backward" : "forward",
                    url: -1 < newIndex ? newUrl : null
                }
            });
        }
    });
    return Navigation;
});

define("uran/base/1.1.1/history-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), undefined = window.undefined;
    function History() {
        this._stack = [];
    }
    $.extend(History.prototype, {
        /**
     * 新增url到历史
     * @param url
     * @param backward
     */
        add: function(url, backward) {
            this._stack[backward ? "unshift" : "push"](url);
        },
        /**
     * 删除当前页之后的History数据
     * @param url
     */
        clearForward: function(url) {
            this._stack = this._stack.slice(0, this.find(url) + 1);
        },
        /**
     * 查找url对应的历史索引
     * @param url
     * @returns {*}
     */
        find: function(url) {
            return this._stack.indexOf(url);
        }
    });
    return new History();
});
