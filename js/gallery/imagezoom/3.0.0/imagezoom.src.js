var f = void 0,
    h = !0,
    j = null,
    k = !1,
    q, r = jQuery,
    s = ["DOMMouseScroll", "mousewheel"];

function t(a) {
    var c = a || window.event,
        b = [].slice.call(arguments, 1),
        d = 0,
        e = 0,
        g = 0;
    a = r.event.fix(c);
    a.type = "mousewheel";
    c.wheelDelta && (d = c.wheelDelta / 120);
    c.detail && (d = -c.detail / 3);
    g = d;
    c.axis !== f && c.axis === c.HORIZONTAL_AXIS && (g = 0, e = -1 * d);
    c.wheelDeltaY !== f && (g = c.wheelDeltaY / 120);
    c.wheelDeltaX !== f && (e = -1 * c.wheelDeltaX / 120);
    b.unshift(a, d, e, g);
    return (r.event.dispatch || r.event.handle).apply(this, b)
}
if (r.event.fixHooks) for (var v = s.length; v;) r.event.fixHooks[s[--v]] = r.event.mouseHooks;
r.event.special.mousewheel = {
    setup: function () {
        if (this.addEventListener) for (var a = s.length; a;) this.addEventListener(s[--a], t, k);
        else this.onmousewheel = t
    },
    teardown: function () {
        if (this.removeEventListener) for (var a = s.length; a;) this.removeEventListener(s[--a], t, k);
        else this.onmousewheel = j
    }
};
r.fn.extend({
    mousewheel: function (a) {
        return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
    },
    unmousewheel: function (a) {
        return this.unbind("mousewheel", a)
    }
});
window.ya = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
    window.setTimeout(a, 20)
};
var w = document.getElementsByTagName("script"),
    x = w[w.length - 1].src.slice(0, w[w.length - 1].src.lastIndexOf("/"));

function y(a) {
    return a;
}
function z(a) {
    for (var c = "", b, d = y("charCodeAt"), e = a[d](0) - 32, g = 1; g < a.length - 1; g++) b = a[d](g), b ^= e & 31, e++, c += String[y("fromCharCode")](b);
    a[d](g);
    return c
}
function A(a, c) {
    var b = c.uriEscapeMethod;
    return "escape" == b ? escape(a) : "encodeURI" == b ? encodeURI(a) : a
}
var B = window,
    C = B["Function"],
    D = h,
    E = k,
    F = "NOTAPP",
    G = "TRIAL".length,
    H = k,
    I = k;
5 == G ? I = h : 4 == G && (H = h);

function J(a, c) {
    function b() {
        g.update();
        window.ya(b)
    }
    function d() {
        var b;
        b = "" != c.image ? c.image : "" + a.attr("src");
        c.lazyLoadZoom ? a.bind("touchstart.preload " + g.options.mouseTriggerEvent + ".preload", function () {
            g.I(b, c.zoomImage);
            return k
        }) : g.I(b, c.zoomImage)
    }
    function e(a, b) {
        return Math.sqrt((a.pageX - b.pageX) * (a.pageX - b.pageX) + (a.pageY - b.pageY) * (a.pageY - b.pageY))
    }
    var g = this;
    c = r.extend({}, r.fn.ImageZoom.defaults, c);
    var n = J.ja(a);
    c = r.extend({}, c, n);
    1 > c.easing && (c.easing = 1);
    n = a.parent();
    n.is("a") && "" == c.zoomImage && (c.zoomImage = n.attr("href"), n.removeAttr("href"));
    n = r("<div class='" + c.zoomClass + "'</div>");
    r("body").append(n);
    this.ga = n.width();
    this.fa = n.height();
    n.remove();
    this.options = c;
    this.a = a;
    this.g = this.e = this.d = this.c = 0;
    this.D = this.l = j;
    this.k = this.n = 0;
    this.W = {
        x: 0,
        y: 0
    };
    this.Ca = this.caption = "";
    this.V = {
        x: 0,
        y: 0
    };
    this.m = [];
    this.b = this.v = this.u = j;
    this.N = "";
    this.U = this.$ = this.T = k;
    this.j = this.C = j;
    this.id = ++J.id;
    this.F = this.na = this.ma = 0;
    this.o = this.h = j;
    this.z = this.A = this.f = this.i = this.ca = 0;
    var l, m, p;
    this.Ga = {
        reset: function () {
            return l = m = j
        },
        la: function (a) {
            var b = "";
            if ("touchend" == a.type || 2 != a.touches.length) return l = m = j;
            l == j ? (l = a.touches[0], m = a.touches[1], p = e(l, m), b = "start") : l && m && (b = "move");
            return {
                scale: e(a.touches[0], a.touches[1]) / p,
                pageX: (a.touches[0].pageX + a.touches[1].pageX) / 2,
                pageY: (a.touches[0].pageY + a.touches[1].pageY) / 2,
                status: b
            }
        }
    };
    this.ha(a);
    if (a.is(":hidden")) var u = setInterval(function () {
            a.is(":hidden") || (clearInterval(u), d())
        }, 100);
    else d();
    b()
}
J.prototype.update = function () {
    var a = this.h;
    a != j && (this.q(this.W, 0), this.f != this.i && (this.i += (this.f - this.i) / this.options.easing, 1E-4 > Math.abs(this.f - this.i) && (this.i = this.f), this.wa()), a.update())
};
J.id = 0;
J.prototype.ra = function (a) {
    var c = this.N.replace(/^\/|\/$/g, "");
    if (0 == this.m.length) return {
            href: this.options.zoomImage,
            title: this.a.attr("title")
    };
    if (a != f) return this.m;
    a = [];
    for (var b = 0; b < this.m.length && this.m[b].href.replace(/^\/|\/$/g, "") != c; b++);
    for (c = 0; c < this.m.length; c++) a[c] = this.m[b], b++, b >= this.m.length && (b = 0);
    return a
};
J.prototype.getGalleryList = J.prototype.ra;
J.prototype.K = function () {
    clearTimeout(this.ca);
    this.o != j && this.o.remove()
};
J.prototype.I = function (a, c) {
    var b = this;
    b.a.unbind("touchstart.preload " + b.options.mouseTriggerEvent + ".preload");
    b.C = j;
    this.a.unbind("mouseover.prehov mousemove.prehov mouseout.prehov");
    this.a.bind("mouseover.prehov mousemove.prehov mouseout.prehov", function (a) {
        b.C = "mouseout" == a.type ? j : {
            pageX: a.pageX,
            pageY: a.pageY
        }
    });
    this.K();
    b.j != j && (b.j.remove(), b.j = j);
    this.v != j && (this.v.cancel(), this.v = j);
    this.u != j && (this.u.cancel(), this.u = j);
    this.N = "" != c && c != f ? c : a;
    this.U = this.$ = k;
    b.T && !("inside" == b.options.zoomPosition && b.h != j) && (b.j = r(new Image).css({
        position: "absolute"
    }), b.j.attr("src", b.a.attr("src")), b.j.width(b.a.width()), b.j.height(b.a.height()), b.j.offset(b.a.offset()), r("body").append(b.j));
    this.va();
    this.u = new K(b.a, a, function (a, c) {
        b.u = j;
        b.U = h;
        b.j != j && b.j.fadeOut(b.options.fadeTime, function () {
            b.j = j;
            r(this).remove()
        });
        c !== f ? (b.K(), b.options.errorCallback({
            $element: b.a,
            type: "IMAGE_NOT_FOUND",
            data: c.ia
        })) : b.ka()
    })
};
J.prototype.va = function () {
    var a = this;
    a.ca = setTimeout(function () {
        a.o = r("<div class='imagezoom-ajax-loader' style='position:absolute;left:0px;top:0px'/>");
        r("body").append(a.o);
        var b = a.o.width(),
            c = a.o.height(),
            b = a.a.offset().left + a.a.width() / 2 - b / 2,
            c = a.a.offset().top + a.a.height() / 2 - c / 2;
        a.o.offset({
            left: b,
            top: c
        })
    }, 250);
    var c = r(new Image).css({
        display: "none",
        position: "absolute"
    });
    r("body").append(c);
    this.v = new K(c, this.N, function (b, d) {
        a.v = j;
        a.$ = h;
        a.e = c.width();
        a.g = c.height();
        c.remove();
        d !== f ? (a.K(), a.options.errorCallback({
            $element: a.a,
            type: "IMAGE_NOT_FOUND",
            data: d.ia
        })) : a.ka()
    })
};
J.prototype.loadImage = J.prototype.I;
J.prototype.pa = function () {
    alert("Image Zoom API OK")
};
J.prototype.apiTest = J.prototype.pa;
J.prototype.t = function () {
    this.h != j && this.h.S();
    this.h = j
};
J.prototype.S = function () {
    r(document).unbind("mousemove." + this.id);
    this.a.unbind();
    this.b != j && (this.b.unbind(), this.t());
    this.a.removeData("ImageZoom")
};
J.prototype.destroy = J.prototype.S;
q = J.prototype;
q.Q = function () {
    var a = this;
    a.a.bind(a.options.mouseTriggerEvent + ".trigger", function (c) {
        if (!a.ea() && a.b == j) {
            var b = a.a.offset();
            c = new J.B(c.pageX - b.left, c.pageY - b.top);
            a.H();
            a.w();
            a.q(c, 0)
        }
    })
};
q.ea = function () {
    if (this.options.disableZoom === k) return k;
    if (this.options.disableZoom === h) return h;
    if ("auto" == this.options.disableZoom) {
        if (!isNaN(this.options.maxMagnification) && 1 < this.options.maxMagnification) return k;
        if (this.a.width() >= this.e) return h
    }
    return k
};
q.ka = function () {
    var a = this;
    if (a.$ && a.U) {
        this.da();
        a.e = a.a.width() * this.i;
        a.g = a.a.height() * this.i;
        this.K();
        this.Y();
        a.h != j && (a.t(), a.w(), a.D.attr("src", A(this.a.attr("src"), this.options)), a.q(a.V, 0));
        if (!a.T) {
            a.T = h;
            r(document).bind("mousemove." + this.id, function (b) {
                if (a.b != j) {
                    var c = a.a.offset();
                    b = new J.B(b.pageX - Math.floor(c.left), b.pageY - Math.floor(c.top));
                    if (-1 > b.x || b.x > a.d || 0 > b.y || b.y > a.c) a.b.remove(), a.t(), a.b = j;
                    a.W = b
                }
            });
            a.Q();
            var c = 0,
                b = 0,
                d = 0,
                e = function (a, b) {
                    return Math.sqrt((a.pageX - b.pageX) * (a.pageX - b.pageX) + (a.pageY - b.pageY) * (a.pageY - b.pageY))
                };
            a.a.bind("touchstart touchmove touchend", function (g) {
                if (a.ea()) return h;
                var l = a.a.offset(),
                    m = g.originalEvent;
                g = {
                    x: 0,
                    y: 0
                };
                var p = m.type;
                if ("touchend" == p && 0 == m.touches.length) return a.X(p, g), k;
                g = new J.B(m.touches[0].pageX - Math.floor(l.left), m.touches[0].pageY - Math.floor(l.top));
                a.W = g;
                if ("touchstart" == p && 1 == m.touches.length && a.b == j) return a.X(p, g), k;
                2 > c && 2 == m.touches.length && (b = a.f, d = e(m.touches[0], m.touches[1]));
                c = m.touches.length;
                2 == c && a.options.variableMagnification && (l = e(m.touches[0], m.touches[1]) / d, a.f = "inside" == a.options.zoomPosition ? b * l : b / l, a.f < a.A && (a.f = a.A), a.f > a.z && (a.f = a.z));
                a.X("touchmove", g);
                return k
            });
            if (a.C != j) {
                var g = a.a.offset(),
                    g = new J.B(a.C.pageX - g.left, a.C.pageY - g.top);
                a.H();
                a.w();
                a.q(g, 0)
            }
        }
        a.a.trigger("imagezoom_ready")
    }
};
q.X = function (a, c) {
    var b = this;
    switch (a) {
        case "touchstart":
            if (b.b != j) break;
            clearTimeout(b.interval);
            b.interval = setTimeout(function () {
                b.H();
                b.w();
                b.q(c, b.k / 2);
                b.update()
            }, 150);
            break;
        case "touchend":
            clearTimeout(b.interval);
            b.b == j ? b.Z() : (b.b.remove(), b.b = j, b.t());
            break;
        case "touchmove":
            b.b == j && (clearTimeout(b.interval), b.H(), b.w())
    }
};
q.wa = function () {
    var a = this.i;
    if (this.b != j) {
        var c = this.h;
        this.n = c.b.width() / (this.a.width() * a) * this.a.width();
        this.k = c.b.height() / (this.a.height() * a) * this.a.height();
        this.k -= c.r / a;
        this.l.width(this.n);
        this.l.height(this.k);
        this.q(this.V, 0)
    }
};
q.ba = function (a) {
    this.f += a;
    this.f < this.A && (this.f = this.A);
    this.f > this.z && (this.f = this.z)
};
q.ha = function (a) {
    this.caption = j;
    "attr" == this.options.captionType ? (a = a.attr(this.options.captionSource), "" != a && a != f && (this.caption = a)) : "html" == this.options.captionType && (a = r(this.options.captionSource), a.length && (this.caption = a.clone(), a.css("display", "none")))
};
q.sa = function (a, c) {
    if ("html" == c.captionType) {
        var b;
        b = r(c.captionSource);
        b.length && b.css("display", "none")
    }
};
q.da = function () {
    this.f = this.i = "auto" === this.options.startMagnification ? this.e / this.a.width() : this.options.startMagnification
};
q.w = function () {
    var a = this;
    this.da();
    a.e = a.a.width() * this.i;
    a.g = a.a.height() * this.i;
    var c = this.l,
        b = a.d,
        d = a.c,
        e = a.e,
        g = a.g,
        n = a.caption;
    if ("inside" == a.options.zoomPosition) c.width(a.d / a.e * a.d), c.height(a.c / a.g * a.c), c.css("display", "none"), a.h = new L({
            zoom: a,
            L: a.a.offset().left + a.options.zoomOffsetX,
            M: a.a.offset().top + a.options.zoomOffsetY,
            e: a.d,
            g: a.c,
            caption: n,
            G: a.options.zoomInsideClass
        }), a.h.b.bind("click." + a.id, function () {
            a.Z()
        }), a.h.b.bind("touchmove touchstart touchend", function (b) {
            a.a.trigger(b);
            return k
        });
    else if (isNaN(a.options.zoomPosition)) {
        var l = r(a.options.zoomPosition);
        c.width(l.width() / a.e * a.d);
        c.height(l.height() / a.g * a.c);
        c.fadeIn(a.options.fadeTime);
        a.options.zoomFullSize || "full" == a.options.zoomSizeMode ? (c.width(a.d), c.height(a.c), c.css("display", "none"), a.h = new L({
            zoom: a,
            L: l.offset().left,
            M: l.offset().top,
            e: a.e,
            g: a.g,
            caption: n,
            G: a.options.zoomClass
        })) : a.h = new L({
            zoom: a,
            L: l.offset().left,
            M: l.offset().top,
            e: l.width(),
            g: l.height(),
            caption: n,
            G: a.options.zoomClass
        })
    } else {
        var l = a.options.zoomOffsetX,
            m = a.options.zoomOffsetY,
            p = k,
            e = c.width() / b * e,
            g = c.height() / d * g,
            u = a.options.zoomSizeMode;
        a.options.zoomFullSize || "full" == u ? (e = a.e, g = a.g, c.width(a.d), c.height(a.c), c.css("display", "none"), p = h) : a.options.zoomMatchSize || "image" == u ? (c.width(a.d / a.e * a.d), c.height(a.c / a.g * a.c), e = a.d, g = a.c) : "zoom" == u && (c.width(a.ga / a.e * a.d), c.height(a.fa / a.g * a.c), e = a.ga, g = a.fa);
        b = [
            [b / 2 - e / 2, -g],
            [b - e, -g],
            [b, -g],
            [b, 0],
            [b, d / 2 - g / 2],
            [b, d - g],
            [b, d],
            [b - e, d],
            [b / 2 - e / 2, d],
            [0, d],
            [-e, d],
            [-e, d - g],
            [-e, d / 2 - g / 2],
            [-e, 0],
            [-e, -g],
            [0, -g]
        ];
        l += b[a.options.zoomPosition][0];
        m += b[a.options.zoomPosition][1];
        p || c.fadeIn(a.options.fadeTime);
        a.h = new L({
            zoom: a,
            L: a.a.offset().left + l,
            M: a.a.offset().top + m,
            e: e,
            g: g,
            caption: n,
            G: a.options.zoomClass
        })
    }
    a.h.p = f;
    a.n = c.width();
    a.k = c.height();
    this.options.variableMagnification && a.l.bind("mousewheel", function (b, c) {
        a.ba(0.1 * c);
        return k
    })
};
q.ua = function () {
    return this.h ? h : k
};
J.prototype.isZoomOpen = J.prototype.ua;
J.prototype.qa = function () {
    this.a.unbind(this.options.mouseTriggerEvent + ".trigger");
    var a = this;
    this.b != j && (this.b.remove(), this.b = j);
    this.t();
    setTimeout(function () {
        a.Q()
    }, 1)
};
J.prototype.closeZoom = J.prototype.qa;
J.prototype.Z = function () {
    var a = this;
    this.a.unbind(a.options.mouseTriggerEvent + ".trigger");
    this.a.trigger("click");
    setTimeout(function () {
        a.Q()
    }, 1)
};
J.prototype.H = function () {
    5 == F.length && E == k && (D = h);
    var a = this,
        c;
    a.Y();
    a.l = r("<div class='" + a.options.lensClass + "' style='overflow:hidden;display:none;position:absolute;top:0px;left:0px;'/>");
    var b = r('<img style="position:absolute;left:0;top:0;max-width:none" src="' + A(this.a.attr("src"), this.options) + '">');
    b.width(this.a.width());
    b.height(this.a.height());
    a.D = b;
    a.D.attr("src", A(this.a.attr("src"), this.options));
    var d = a.l;
    a.b = r("<div class='imagezoom-blank' style='position:absolute;'/>");
    var e = a.b;
    c = r("<div style='background-color:" + a.options.tintColor + ";width:100%;height:100%;'/>");
    c.css("opacity", a.options.tintOpacity);
    c.fadeIn(a.options.fadeTime);
    e.width(a.d);
    e.height(a.c);
    e.offset(a.a.offset());
    r("body").append(e);
    e.append(c);
    e.append(d);
    e.bind("touchmove touchstart touchend", function (b) {
        a.a.trigger(b);
        return k
    });
    d.append(b);
    a.F = parseInt(d.css("borderTopWidth"), 10);
    isNaN(a.F) && (a.F = 0);
    a.b.bind("click." + a.id, function () {
        a.Z()
    });
};
J.prototype.q = function (a, c) {
    var b, d;
    this.V = a;
    b = a.x;
    d = a.y;
    c = 0;
    "inside" == this.options.zoomPosition && (c = 0);
    b -= this.n / 2 + 0;
    d -= this.k / 2 + c;
    b > this.d - this.n ? b = this.d - this.n : 0 > b && (b = 0);
    d > this.c - this.k ? d = this.c - this.k : 0 > d && (d = 0);
    var e = this.F;
    this.l.parent();
    this.l.css({
        left: Math.ceil(b) - e,
        top: Math.ceil(d) - e
    });
    b = -b;
    d = -d;
    this.D.css({
        left: Math.floor(b) + "px",
        top: Math.floor(d) + "px"
    });
    this.ma = b;
    this.na = d
};
J.ja = function (a) {
    var c = r.fn.ImageZoom.attr,
        b = j;
    a = a.attr(c);
    if ("string" == typeof a) {
        a = r.trim(a);
        var d = a.indexOf("{"),
            e = a.indexOf("}");
        e != a.length - 1 && (e = a.indexOf("};"));
        if (-1 != d && -1 != e) {
            a = a.substr(d, e - d + 1);
            try {
                b = r.parseJSON(a)
            } catch (g) {
                console.error("Invalid JSON in " + c + " attribute:" + a)
            }
        } else b = (new C("return {" + a + "}"))()
    }
    return b
};
J.B = function (a, c) {
    this.x = a;
    this.y = c
};
J.point = J.B;

function K(a, c, b, d) {
    this.a = a;
    this.src = c;
    this.R = b;
    this.J = h;
    this.aa = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    var e = this;
    a.bind("error", function () {
        e.R(a, {
            ia: c
        })
    });
    J.browser.webkit && a.attr("src", this.aa);
    a.bind("load", function () {
        a.unbind("load");
        d != f ? setTimeout(function () {
            e.J = k;
            e.R(a)
        }, d) : (e.J = k, e.R(a));
        return k
    });
    a.attr("src", c);
    a[0].complete && a.trigger("load")
}
K.prototype.cancel = function () {
    this.J && (this.a.unbind("load"), this.a.attr("src", this.aa), this.J = k)
};
J.Aa = function (a) {
    x = a
};
J.setScriptPath = J.Aa;
J.xa = function () {
    r(function () {
        r(".imagezoom").ImageZoom();
        r(".imagezoom-gallery").ImageZoom()
    })
};
J.quickStart = J.xa;
J.prototype.Y = function () {
    this.d = this.a.outerWidth();
    this.c = this.a.outerHeight()
};
J.prototype.refreshImage = J.prototype.Y;
J.version = "3.0 rev 1303170612";
J.Ba = function () {
    r["ajax"]({
        url: x + "/" + "license.js",
        dataType: "script",
        async: k,
        Da: h,
        success: function () {
            E = h
        }
    })
};
J.la = function () {
    J.browser = {};
    J.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    var a = new C("h", "var hosts = h.split(',');for(var i=0;i<hosts.length;i++) {if(hosts[i] == window.location.hostname.replace(/^www./,'')) {return false;}}return true;");
    if (5 != F.length) {
        var c = "recv.ru";
        D = a(c)
    } else D = k, J.Ba();
    this._ = ",_dzjc+`vwc8em9Ohyo$KRHCO$PUBZ)Fboh`|u+\\<U5Rvl| V}o>-3-\"1445%";
    this.ta = -1 != navigator.platform.indexOf("iPhone") || -1 != navigator.platform.indexOf("iPod") || -1 != navigator.platform.indexOf("iPad");
    this.Ha = "ontouchstart" in window
};
J.za = function (a) {
    r.fn.ImageZoom.attr = a
};
J.setAttr = J.za;
r.fn.ImageZoom = function (a) {
    return this.each(function () {
        if (r(this).hasClass("imagezoom-gallery")) {
            var c = J.ja(r(this)),
                b = r(c.useZoom).data("ImageZoom");
            b.sa(r(this), c);
            var d = r.extend({}, b.options, c),
                e = r(this).parent(),
                g = d.zoomImage;
            e.is("a") && (g = e.attr("href"));
            b.m.push({
                href: g,
                title: r(this).attr("title")
            });
            r(this).bind(d.galleryEvent, function () {
                b.options = r.extend({}, b.options, c);
                b.ha(r(this));
                var a = r(this).parent();
                a.is("a") && (c.zoomImage = a.attr("href"));
                b.I(c.image, c.zoomImage);
                return k
            })
        } else r(this).data("ImageZoom", new J(r(this), a))
    })
};
r.fn.ImageZoom.attr = "data-imagezoom";
r.fn.ImageZoom.defaults = {
    image: "",
    zoomImage: "",
    tintColor: "#fff",
    tintOpacity: 0.5,
    animationTime: 500,
    sizePriority: "lens",
    lensClass: "imagezoom-lens",
    lensProportions: "CSS",
    lensAutoCircle: k,
    innerZoom: k,
    galleryEvent: "click",
    easeTime: 500,
    zoomSizeMode: "lens",
    zoomMatchSize: k,
    zoomPosition: 3,
    zoomOffsetX: 15,
    zoomOffsetY: 0,
    zoomFullSize: k,
    zoomFlyOut: h,
    zoomClass: "imagezoom-zoom",
    zoomInsideClass: "imagezoom-zoom-inside",
    captionSource: "title",
    captionType: "attr",
    captionPosition: "top",
    imageEvent: "click",
    uriEscapeMethod: k,
    errorCallback: function () {},
    variableMagnification: h,
    startMagnification: "auto",
    minMagnification: "auto",
    maxMagnification: "auto",
    easing: 8,
    lazyLoadZoom: k,
    mouseTriggerEvent: "mousemove",
    disableZoom: k
};

function L(a) {
    var c = a.zoom,
        b = a.L,
        d = a.M,
        e = a.e,
        g = a.g;
    this.data = a;
    this.O = this.b = j;
    this.oa = 0;
    this.zoom = c;
    this.P = h;
    this.Fa = this.Ea = j;
    this.r = this.interval = this.s = this.p = 0;
    var n = this,
        l;
    n.b = r("<div class='" + a.G + "' style='position:absolute;overflow:hidden'></div>");
    var m = r("<img style='position:absolute;max-width:none' src='" + A(c.N, c.options) + "'/>");
    c.options.variableMagnification && m.bind("mousewheel", function (a, b) {
        n.zoom.ba(0.1 * b);
        return k
    });
    n.O = m;
    m.width(n.zoom.e);
    m.height(n.zoom.g);
    J.ta && n.O.css("-webkit-transform", "perspective(400px)");
    var p = n.b;
    p.append(m);
    var u = r("<div style='position:absolute;'></div>");
    a.caption ? ("html" == c.options.captionType ? l = a.caption : "attr" == c.options.captionType && (l = r("<div class='imagezoom-caption'>" + a.caption + "</div>")), l.css("display", "block"), u.css({
        width: e
    }), p.append(u), u.append(l), r("body").append(p), this.r = l.outerHeight(), "bottom" == c.options.captionPosition || "inside" == c.options.zoomPosition ? u.css("top", g) : (u.css("top", 0), this.oa = this.r)) : r("body").append(p);
    p.css({
        opacity: 0,
        width: e,
        height: g + this.r
    });
    this.zoom.A = "auto" === c.options.minMagnification ? e / c.a.width() : c.options.minMagnification;
    this.zoom.z = "auto" === c.options.maxMagnification ? m.width() / c.a.width() : c.options.maxMagnification;
    a = p.height();
    this.P = k;
    c.options.zoomFlyOut ? (g = c.a.offset(), g.left += c.d / 2, g.top += c.c / 2, p.offset(g), p.width(0), p.height(0), p.animate({
        left: b,
        top: d,
        width: e,
        height: a,
        opacity: 1
    }, {
        duration: c.options.animationTime,
        complete: function () {
            n.P = h
        }
    })) : (p.offset({
        left: b,
        top: d
    }), p.width(e), p.height(a), p.animate({
        opacity: 1
    }, {
        duration: c.options.animationTime,
        complete: function () {
            n.P = h
        }
    }))
}
L.prototype.update = function () {
    var a = this.zoom,
        c = a.i,
        b = -a.ma + a.n / 2,
        d = -a.na + a.k / 2;
    this.p == f && (this.p = b, this.s = d);
    this.p += (b - this.p) / a.options.easing;
    this.s += (d - this.s) / a.options.easing;
    var b = -this.p * c,
        b = b + a.n / 2 * c,
        d = -this.s * c,
        d = d + a.k / 2 * c,
        e = a.a.width() * c,
        a = a.a.height() * c;
    0 < b && (b = 0);
    0 < d && (d = 0);
    b + e < this.b.width() && (b += this.b.width() - (b + e));
    d + a < this.b.height() - this.r && (d += this.b.height() - this.r - (d + a));
    this.O.css({
        left: b + "px",
        top: d + this.oa + "px",
        width: e,
        height: a
    })
};
L.prototype.S = function () {
    var a = this;
    a.b.bind("touchstart", function () {
        return k
    });
    var c = this.zoom.a.offset();
    this.zoom.options.zoomFlyOut ? this.b.animate({
        left: c.left + this.zoom.d / 2,
        top: c.top + this.zoom.c / 2,
        opacity: 0,
        width: 1,
        height: 1
    }, {
        duration: this.zoom.options.animationTime,
        step: function () {
            J.browser.webkit && a.b.width(a.b.width())
        },
        complete: function () {
            a.b.remove()
        }
    }) : this.b.animate({
        opacity: 0
    }, {
        duration: this.zoom.options.animationTime,
        complete: function () {
            a.b.remove()
        }
    })
};
B.ImageZoom = J;
J.la();;