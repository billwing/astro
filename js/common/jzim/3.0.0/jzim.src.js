/*!
 *@Name:JZ Web Chatting
 *@Autor:Billwing
 *@Version:3.0.0
 *@Date:2012-06-01
 *@Modify:2014-05-21
 */

var JZIM = window.JZIM || {};

/* 浏览器检测 */
//var isIE = !-[1,]; /* ie */
//var isIE6 = !-[1,]&&!window.XMLHttpRequest; /* ie6 */
//var isIE8 = !-[1,]&&!!document.documentMode; /* ie8 */
//var isIE7 = !-[1,]&&!isIE6&&!isIE8; /* ie7 */
var ua = (window.navigator.userAgent || "").toLowerCase(),
	isIE = /\msie [678]\.0\b/.test(ua),
	isIE6 = ua.indexOf("msie 6") !== -1,
	isIE7 = ua.indexOf("msie 7") !== -1,
	isIE8 = ua.indexOf("msie 8") !== -1;

/* 弹出层插件 */
(function(j, o) {
	var d = j.document,
		p = d.documentElement,
		w = function() {
			var m = d.body,
				s = isIE,
				q = isIE6,
				n = 1,
				t = "cache" + (+new Date + "").slice(-8),
				l = {},
				e = function() {};
			e.prototype = {
				getOptions: function(a) {
					var b, c = {},
						f = {
							container: null,
							overlay: !0,
							drag: !0,
							fixed: !0,
							follow: null,
							followX: 0,
							followY: 0,
							autoClose: 0,
							lock: !1,
							callback: null
						};
					for (b in f) c[b] = a[b] !== o ? a[b] : f[b];
					e.data("options", c);
					return c
				},
				setBodyBg: function() {
					if (m.currentStyle.backgroundAttachment !== "fixed") m.style.backgroundImage = "url(about:blank)", m.style.backgroundAttachment = "fixed"
				},
				appendIframe: function(a) {
					a.innerHTML = '<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"></iframe>'
				},
				setFollow: function(a, b, c, f) {
					b = typeof b === "string" ? d.getElementById(b) : b;
					a = a.style;
					a.position = "absolute";
					a.left = e.getOffset(b, "left") + c + "px";
					a.top = e.getOffset(b, "top") + f + "px"
				},
				setPosition: function(a, b) {
					var c = a.style;
					c.position = q ? "absolute" : b ? "fixed" : "absolute";
					if(!isIE8) {
						b ? (q ? c.setExpression("top", 'fuckIE6=document.documentElement.scrollTop+document.documentElement.clientHeight/2+"px"') : c.top = "50%", c.left = "50%") : (q && c.removeExpression("top"), c.top = p.clientHeight / 2 + e.getScroll("top") + "px", c.left = p.clientWidth / 2 + e.getScroll("left") + "px")
					} else {
						c.top = p.clientHeight / 2 + e.getScroll("top") + "px";
						c.left = p.clientWidth / 2 + e.getScroll("left") + "px";
					}
				},
				createOverlay: function() {
					var a = d.createElement("div"),
						b = a.style;
					b.cssText = "margin:0;padding:0;border:none;width:100%;height:100%;background:#333;opacity:0.6;filter:alpha(opacity=60);z-index:9999;position:fixed;top:0;left:0;";
					if (q) m.style.height = "100%", b.position = "absolute", b.setExpression("top", 'fuckIE6=document.documentElement.scrollTop+"px"');
					a.id = "overlay";
					return a
				},
				createDialogBox: function() {
					var a = d.createElement("div");
					a.style.cssText = "margin:0;padding:0;border:none;z-index:999;";
					a.id = "chatBox";
					return a
				},
				createDialogWrap: function(a) {
					var b = typeof a.yesFn === "function" ? '<button class="chat_yes_btn" id="chatYesBtn">' + (typeof a.yesText === "string" ? a.yesText : "\u786e\u5b9a") + "</button>" : "",
						c = typeof a.noFn === "function" || a.noFn === !0 ? '<button class="chat_no_btn" id="chatNoBtn">' + (typeof a.noText === "string" ? a.noText : "\u53d6\u6d88") + "</button>" : "",
						a = ['<div class="chat_cont">', a.header ? '<h4 class="chat_tit" id="chatTit"><a href="javascript:void(0)" title="\u5173\u95ed\u7a97\u53e3" class="close_btn" id="chatCls">&times;</a>' + a.header + "</h4>" : "", '<div class="chat_txt">' + a.content + "</div>", b === "" && c === "" ? "" : '<div class="chat_footer">' + c + b + "</div>", "</div>"].join(""),
						b = d.getElementById("sendMsg");
					if (!b) b = d.createElement("div"), b.id = "sendMsg", b.className = "chat_wrap";
					b.innerHTML = a.replace(/<[\/]*script[\s\S]*?>/ig, "");
					return b
				}
			};
			e.data = function(a, b, c) {
				if (typeof a === "string") return b !== o && (l[a] = b), l[a];
				else if (typeof a === "object") return a = a === j ? 0 : a.nodeType === 9 ? 1 : a[t] ? a[t] : a[t] = ++n, a = l[a] ? l[a] : l[a] = {}, c !== o && (a[b] = c), a[b]
			};
			e.removeData = function(a, b) {
				if (typeof a === "string") delete l[a];
				else if (typeof a === "object") {
					var c = a === j ? 0 : a.nodeType === 9 ? 1 : a[t];
					if (c !== o) {
						var e = function(a) {
								for (var b in a) return !1;
								return !0
							},
							g = function() {
								delete l[c];
								if (!(c <= 1)) try {
									delete a[t]
								} catch (b) {
									a.removeAttribute(t)
								}
							};
						b ? (delete l[c][b], e(l[c]) && g()) : g()
					}
				}
			};
			e.event = {
				bind: function(a, b, c) {
					var f = e.data(a, "e" + b) || e.data(a, "e" + b, []);
					f.push(c);
					f.length === 1 && (c = this.eventHandler(a), e.data(a, b + "Handler", c), a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c))
				},
				unbind: function(a, b, c) {
					var f = e.data(a, "e" + b);
					if (f) {
						if (c) for (var g = f.length - 1, d = f[g]; g >= 0; g--) d === c && f.splice(g, 1);
						else f = o;
						if (!f || !f.length) c = e.data(a, b + "Handler"), a.addEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent && a.detachEvent("on" + b, c), e.removeData(a, b + "Handler"), e.removeData(a, "e" + b)
					}
				},
				eventHandler: function(a) {
					return function(b) {
						for (var b = e.event.fixEvent(b || j.event), c = e.data(a, "e" + b.type), f = 0, g; g = c[f++];) g.call(a, b) === !1 && (b.preventDefault(), b.stopPropagation())
					}
				},
				fixEvent: function(a) {
					if (a.target) return a;
					var b = {},
						c;
					b.target = a.srcElement || document;
					b.preventDefault = function() {
						a.returnValue = !1
					};
					b.stopPropagation = function() {
						a.cancelBubble = !0
					};
					for (c in a) b[c] = a[c];
					return b
				}
			};
			e.capitalize = function(a) {
				var b = a.charAt(0);
				return b.toUpperCase() + a.replace(b, "")
			};
			e.getScroll = function(a) {
				a = this.capitalize(a);
				return p["scroll" + a] || m["scroll" + a]
			};
			e.getOffset = function(a, b) {
				var c = this.capitalize(b),
					c = p["client" + c] || m["client" + c] || 0,
					e = this.getScroll(b),
					g = a.getBoundingClientRect();
				return Math.round(g[b]) + e - c
			};
			e.drag = function(a, b) {
				var c = "getSelection" in j ?
				function() {
					j.getSelection().removeAllRanges()
				} : function() {
					try {
						d.selection.empty()
					} catch (a) {}
				}, f = this, g = f.event, i = !1, h = s ? a : d, k = b.style.position === "fixed", m = e.data("options").fixed;
				g.bind(a, "mousedown", function(c) {
					i = !0;
					var d = f.getScroll("top"),
						j = f.getScroll("left"),
						o = k ? 0 : j,
						r = k ? 0 : d;
					e.data("dragData", {
						x: c.clientX - f.getOffset(b, "left") + (k ? j : 0),
						y: c.clientY - f.getOffset(b, "top") + (k ? d : 0),
						el: o,
						et: r,
						er: o + p.clientWidth - b.offsetWidth,
						eb: r + p.clientHeight - b.offsetHeight
					});
					s && (q && m && b.style.removeExpression("top"), a.setCapture());
					g.bind(h, "mousemove", l);
					g.bind(h, "mouseup", n);
					s && g.bind(a, "losecapture", n);
					c.stopPropagation();
					c.preventDefault()
				});
				var l = function(a) {
						if (i) {
							c();
							var d = e.data("dragData"),
								f = a.clientX - d.x,
								g = a.clientY - d.y,
								h = d.et,
								k = d.er,
								m = d.eb,
								d = d.el,
								j = b.style;
							j.marginLeft = j.marginTop = "0px";
							j.left = (f <= d ? d : f >= k ? k : f) + "px";
							j.top = (g <= h ? h : g >= m ? m : g) + "px";
							a.stopPropagation()
						}
					},
					n = function(c) {
						i = !1;
						s && g.unbind(a, "losecapture", arguments.callee);
						g.unbind(h, "mousemove", l);
						g.unbind(h, "mouseup", arguments.callee);
						if (s && (a.releaseCapture(), q && m)) {
							var d = parseInt(b.style.top) - f.getScroll("top");
							b.style.setExpression("top", "fuckIE6=document.documentElement.scrollTop+" + d + '+"px"')
						}
						c.stopPropagation()
					}
			};
			var r, u = function(a) {
					a.keyCode === 27 && v.close()
				},
				v = {
					open: function(a) {
						var b = new e,
							c = b.getOptions(a || {}),
							a = e.event,
							f = this,
							g, i, h, k;
						r && (clearTimeout(r), r = o);
						if (c.overlay) g = d.getElementById("overlay"), g || (g = b.createOverlay(), m.appendChild(g), q && b.appendIframe(g)), g.style.display = "block";
						q && b.setBodyBg();
						i = d.getElementById("chatBox");
						i || (i = b.createDialogBox(), m.appendChild(i));
						if (c.follow) {
							b.setFollow(i, c.follow, c.followX, c.followY);
							if (g) g.style.display = "none";
							c.fixed = !1
						} else b.setPosition(i, c.fixed);
						i.style.display = "block";
						!c.follow && !c.fixed && (h = function() {
							b.setPosition(i, !1)
						}, a.bind(j, "resize", h), e.data("resize", h));
						h = typeof c.container === "string" ? d.getElementById(c.container) : b.createDialogWrap(c.container);
						if (k = i.getElementsByTagName("*")[0]) {
							if (k && h !== k) k.style.display = "none", m.appendChild(k), i.appendChild(h)
						} else i.appendChild(h);
						h.style.display = "block";
						k = h.offsetWidth;
						var l = h.offsetHeight;
						h.style.marginTop = h.style.marginRight = h.style.marginBottom = h.style.marginLeft = "0px";
						c.follow ? i.style.marginLeft = i.style.marginTop = "0px" : (i.style.marginLeft = "-" + k / 2 + "px", i.style.marginTop = "-" + l / 2 + "px");
						if (q && !c.overlay) i.style.width = k + "px", i.style.height = l + "px";
						h = d.getElementById("chatCls");
						k = d.getElementById("chatTit");
						var l = d.getElementById("chatYesBtn"),
							n = d.getElementById("chatNoBtn");
						l && a.bind(l, "click", function(a) {
							c.container.yesFn.call(f, a) !== !1 && f.close()
						});
						if (n) {
							var p = function(a) {
									(c.container.noFn === !0 || c.container.noFn.call(f, a) !== !1) && f.close()
								};
							a.bind(n, "click", p);
							h && a.bind(h, "click", p)
						} else h && a.bind(h, "click", f.close);
						c.lock || a.bind(d, "keyup", u);
						c.autoClose && typeof c.autoClose === "number" && (r = setTimeout(f.close, c.autoClose));
						if (c.drag && k) k.style.cursor = "move", e.drag(k, i);
						e.data("dialogElements", {
							overlay: g,
							dialogBox: i,
							chatCls: h,
							dialogTitle: k,
							dialogYesBtn: l,
							dialogNoBtn: n
						})
					},
					close: function() {
						var a = e.data("options"),
							b = e.data("dialogElements"),
							c = e.event;
						r && (clearTimeout(r), r = o);
						if (a.overlay && b.overlay) b.overlay.style.display = "none";
						b.dialogBox.style.display = "none";
						q && b.dialogBox.style.removeExpression("top");
						b.chatCls && c.unbind(b.chatCls, "click");
						b.dialogTitle && c.unbind(b.dialogTitle, "mousedown");
						b.dialogYesBtn && c.unbind(b.dialogYesBtn, "click");
						b.dialogNoBtn && c.unbind(b.dialogNoBtn, "click");
						!a.follow && !a.fixed && (b = e.data("resize"), c.unbind(j, "resize", b), e.removeData("resize"));
						a.lock || c.unbind(d, "keyup", u);
						typeof a.callback === "function" && a.callback.call(v);
						e.removeData("options");
						e.removeData("dialogElements")
					}
				};
			return v
		},
		n = function() {
			j.jzChat = w()
		},
		u = function() {
			if (!d.body) {
				try {
					p.doScroll("left")
				} catch (j) {
					setTimeout(u, 1);
					return
				}
				n()
			}
		};
	(function() {
		if (d.body) n();
		else if (d.addEventListener) d.addEventListener("DOMContentLoaded", function() {
			d.removeEventListener("DOMContentLoaded", arguments.callee, !1);
			n()
		}, !1), j.addEventListener("load", n, !1);
		else if (d.attachEvent) {
			d.attachEvent("onreadystatechange", function() {
				d.readyState === "complete" && (d.detachEvent("onreadystatechange", arguments.callee), n())
			});
			j.attachEvent("onload", n);
			var m = !1;
			try {
				m = j.frameElement == null
			} catch (o) {}
			p.doScroll && m && u()
		}
	})()
})(window, void 0);

/* 焦点定位在内容后面 */
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

/* 表情功能插件 */
(function($) {
	$.fn.setCursorPosition = function(position) {
		if (this.length == 0) return this;
		return $(this).setSelection(position, position)
	};
	$.fn.setSelection = function(selectionStart, selectionEnd) {
		if (this.length == 0) return this;
		input = this[0];
		if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select()
		} else if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd)
		}
		return this;

	};
	$.fn.focusEnd = function() {
		this.setCursorPosition(this.text().length)
	};
	$.expBlock = {};
	var faceAdd = 'http://static.n8n8.cn/Public/Images/chatFace/';
	var EXP_DATA = [{
		name: '默认',
		icons: [{
			url: "1.gif",
			title: "0",
			alt: "微笑"
		}, {
			url: "2.gif",
			title: "1",
			alt: "撇嘴"
		}, {
			url: "3.gif",
			title: "2",
			alt: "色"
		}, {
			url: "4.gif",
			title: "3",
			alt: "发呆"
		}, {
			url: "5.gif",
			title: "4",
			alt: "得意"
		}, {
			url: "6.gif",
			title: "5",
			alt: "流泪"
		}, {
			url: "7.gif",
			title: "6",
			alt: "害羞"
		}, {
			url: "8.gif",
			title: "7",
			alt: "闭嘴"
		}, {
			url: "9.gif",
			title: "8",
			alt: "睡"
		}, {
			url: "10.gif",
			title: "9",
			alt: "大哭"
		}, {
			url: "11.gif",
			title: "10",
			alt: "尴尬"
		}, {
			url: "12.gif",
			title: "11",
			alt: "发怒"
		}, {
			url: "13.gif",
			title: "12",
			alt: "调皮"
		}, {
			url: "14.gif",
			title: "13",
			alt: "呲牙"
		}, {
			url: "15.gif",
			title: "14",
			alt: "惊讶"
		}, {
			url: "16.gif",
			title: "15",
			alt: "难过"
		}, {
			url: "17.gif",
			title: "16",
			alt: "酷"
		}, {
			url: "18.gif",
			title: "17",
			alt: "冷汗"
		}, {
			url: "19.gif",
			title: "18",
			alt: "抓狂"
		}, {
			url: "20.gif",
			title: "19",
			alt: "吐"
		}, {
			url: "21.gif",
			title: "20",
			alt: "偷笑"
		}, {
			url: "22.gif",
			title: "21",
			alt: "可爱"
		}, {
			url: "23.gif",
			title: "22",
			alt: "白眼"
		}, {
			url: "24.gif",
			title: "23",
			alt: "傲慢"
		}, {
			url: "25.gif",
			title: "24",
			alt: "饥饿"
		}, {
			url: "26.gif",
			title: "25",
			alt: "困"
		}, {
			url: "27.gif",
			title: "26",
			alt: "惊恐"
		}, {
			url: "28.gif",
			title: "27",
			alt: "流汗"
		}, {
			url: "29.gif",
			title: "28",
			alt: "憨笑"
		}, {
			url: "30.gif",
			title: "29",
			alt: "大兵"
		}, {
			url: "31.gif",
			title: "30",
			alt: "奋斗"
		}, {
			url: "32.gif",
			title: "31",
			alt: "咒骂"
		}, {
			url: "33.gif",
			title: "32",
			alt: "疑问"
		}, {
			url: "34.gif",
			title: "33",
			alt: "嘘.."
		}, {
			url: "35.gif",
			title: "34",
			alt: "晕"
		}, {
			url: "36.gif",
			title: "35",
			alt: "折磨"
		}, {
			url: "37.gif",
			title: "36",
			alt: "衰"
		}, {
			url: "38.gif",
			title: "37",
			alt: "骷髅"
		}, {
			url: "39.gif",
			title: "38",
			alt: "敲打"
		}, {
			url: "40.gif",
			title: "39",
			alt: "再见"
		}, {
			url: "41.gif",
			title: "40",
			alt: "擦汗"
		}, {
			url: "42.gif",
			title: "41",
			alt: "抠鼻"
		}, {
			url: "43.gif",
			title: "42",
			alt: "鼓掌"
		}, {
			url: "44.gif",
			title: "43",
			alt: "糗大了"
		}, {
			url: "45.gif",
			title: "44",
			alt: "坏笑"
		}, {
			url: "46.gif",
			title: "45",
			alt: "左哼哼"
		}, {
			url: "47.gif",
			title: "46",
			alt: "右哼哼"
		}, {
			url: "48.gif",
			title: "47",
			alt: "哈欠"
		}, {
			url: "49.gif",
			title: "48",
			alt: "鄙视"
		}, {
			url: "50.gif",
			title: "49",
			alt: "委屈"
		}, {
			url: "51.gif",
			title: "50",
			alt: "快哭了"
		}, {
			url: "52.gif",
			title: "51",
			alt: "阴险"
		}, {
			url: "53.gif",
			title: "52",
			alt: "亲亲"
		}, {
			url: "54.gif",
			title: "53",
			alt: "吓"
		}, {
			url: "55.gif",
			title: "54",
			alt: "可怜"
		}, {
			url: "56.gif",
			title: "55",
			alt: "菜刀"
		}, {
			url: "57.gif",
			title: "56",
			alt: "西瓜"
		}, {
			url: "58.gif",
			title: "57",
			alt: "啤酒"
		}, {
			url: "59.gif",
			title: "58",
			alt: "篮球"
		}, {
			url: "60.gif",
			title: "59",
			alt: "乒乓"
		}, {
			url: "61.gif",
			title: "60",
			alt: "咖啡"
		}, {
			url: "62.gif",
			title: "61",
			alt: "饭"
		}, {
			url: "63.gif",
			title: "62",
			alt: "猪头"
		}, {
			url: "64.gif",
			title: "63",
			alt: "玫瑰"
		}, {
			url: "65.gif",
			title: "64",
			alt: "凋谢"
		}, {
			url: "66.gif",
			title: "65",
			alt: "示爱"
		}, {
			url: "67.gif",
			title: "66",
			alt: "爱心"
		}, {
			url: "68.gif",
			title: "67",
			alt: "心碎"
		}, {
			url: "69.gif",
			title: "68",
			alt: "蛋糕"
		}, {
			url: "70.gif",
			title: "69",
			alt: "闪电"
		}, {
			url: "71.gif",
			title: "70",
			alt: "炸弹"
		}, {
			url: "72.gif",
			title: "71",
			alt: "刀"
		}, {
			url: "73.gif",
			title: "72",
			alt: "足球"
		}, {
			url: "74.gif",
			title: "73",
			alt: "瓢虫"
		}, {
			url: "75.gif",
			title: "74",
			alt: "便便"
		}, {
			url: "76.gif",
			title: "75",
			alt: "月亮"
		}, {
			url: "77.gif",
			title: "76",
			alt: "太阳"
		}, {
			url: "78.gif",
			title: "77",
			alt: "礼物"
		}, {
			url: "79.gif",
			title: "78",
			alt: "拥抱"
		}, {
			url: "80.gif",
			title: "79",
			alt: "强"
		}, {
			url: "81.gif",
			title: "80",
			alt: "弱"
		}, {
			url: "82.gif",
			title: "81",
			alt: "握手"
		}, {
			url: "83.gif",
			title: "82",
			alt: "胜利"
		}, {
			url: "84.gif",
			title: "83",
			alt: "抱拳"
		}, {
			url: "85.gif",
			title: "84",
			alt: "勾引"
		}, {
			url: "86.gif",
			title: "85",
			alt: "拳头"
		}, {
			url: "87.gif",
			title: "86",
			alt: "差劲"
		}, {
			url: "88.gif",
			title: "87",
			alt: "爱你"
		}, {
			url: "89.gif",
			title: "88",
			alt: "NO"
		}, {
			url: "90.gif",
			title: "89",
			alt: "OK"
		}, {
			url: "91.gif",
			title: "90",
			alt: "爱情"
		}, {
			url: "92.gif",
			title: "91",
			alt: "飞吻"
		}, {
			url: "93.gif",
			title: "92",
			alt: "跳跳"
		}, {
			url: "94.gif",
			title: "93",
			alt: "发抖"
		}, {
			url: "95.gif",
			title: "94",
			alt: "怄火"
		}, {
			url: "96.gif",
			title: "95",
			alt: "转圈"
		}, {
			url: "97.gif",
			title: "96",
			alt: "磕头"
		}, {
			url: "98.gif",
			title: "97",
			alt: "回头"
		}, {
			url: "99.gif",
			title: "98",
			alt: "跳绳"
		}, {
			url: "100.gif",
			title: "99",
			alt: "挥手"
		}, {
			url: "101.gif",
			title: "100",
			alt: "激动"
		}, {
			url: "102.gif",
			title: "101",
			alt: "街舞"
		}, {
			url: "103.gif",
			title: "102",
			alt: "献吻"
		}, {
			url: "104.gif",
			title: "103",
			alt: "左太极"
		}, {
			url: "105.gif",
			title: "104",
			alt: "右太极"
		}]
	}],
		IMGS_DATA = [],
		expEnable = true,
		config = {
			expData: null,
			holder: '.exp-holder',
			textarea: 'textarea',
			trigger: '.exp-block-trigger',
			grpNum: 5,
			posType: 'absolute',
			zIndex: '1000001'
		},
		pos_correct_left = 30,
		exp_close_tri = '.exp-close',
		grp_num_per_panel = 1,
		win = window || document,
		bd = 'body';

	function init(cfg) {
		$.extend(config, cfg);
		if (config.expData != null) EXP_DATA = config.expData;
		_getImgData();
		var triggers = $(config.trigger);
		triggers.each(function() {
			$(this).unbind('click');
			$(this).bind('click', function() {
				var me = $(this),
					holder = $(me.parents(config.holder)[0]),
					ta = $(holder.find(config.textarea)[0]),
					exp = $(_genrt_html()),
					off = me.offset(),
					me_l = off.left - 50,
					me_t = off.top,
					me_w = me.width(),
					me_h = me.height(),
					exp_t = me_t + me_h,
					exp_l = me_l + (me_w + pos_correct_left) / 2,
					exp_close = exp.find(exp_close_tri),
					exp_sub_tab = exp.find('.exp-sub-tab'),
					sub_tab_items = exp_sub_tab.children('.group-name'),
					sub_tab_pre = exp_sub_tab.find('.pre'),
					sub_tab_next = exp_sub_tab.find('.next'),
					curGroup = null,
					grpCnt = EXP_DATA.length,
					grpPgCnt = (function() {
						var p = Math.floor(grpCnt / config.grpNum);
						if (grpCnt % config.grpNum != 0) {
							return p + 1
						} else {
							return p
						}
					})(),
					curGrpPg = 1,
					expUl = exp.find('.exp-detail');
				var showXGroupExp = function(i) {
						var expList = '',
							listDOM;
						if (curGroup != null && curGroup != i) {
							sub_tab_items.eq(curGroup).removeClass('slct');
							curGroup = i;
							sub_tab_items.eq(i).addClass('slct');
							sub_tab_items.eq(i).addClass('slct');
							for (var j = 0; j < EXP_DATA[i].icons.length; j++) {
								expList += '<li action-data="[:){' + EXP_DATA[i].icons[j].title + '}(:]"><img title="' + EXP_DATA[i].icons[j].alt + '" alt="' + EXP_DATA[i].icons[j].alt + '" src="' + faceAdd + EXP_DATA[i].icons[j].url + '"></li>'
							}
							listDOM = $(expList);
							listDOM.each(function() {
								$(this).click(function() {
									var me = $(this),
										actData = me.attr('action-data'),
										taVal = ta.val();
									ta.val(taVal + actData);
									$(bd).unbind('click');
									me.unbind('mouseout');
									$(win).unbind('resize');
									exp.remove();
								})
							});
							expUl.children().remove();
							expUl.append(listDOM)
						} else if (curGroup == null) {
							curGroup = i;
							sub_tab_items.eq(i).addClass('slct');
							for (var j = 0; j < EXP_DATA[i].icons.length; j++) {
								expList += '<li action-data="[:){' + EXP_DATA[i].icons[j].title + '}(:]"><img title="' + EXP_DATA[i].icons[j].alt + '" alt="' + EXP_DATA[i].icons[j].alt + '" src="' + faceAdd + EXP_DATA[i].icons[j].url + '" data-name="[:){' + EXP_DATA[i].icons[j].title + '}(:]" data-val="' + EXP_DATA[i].icons[j].title + '"></li>';
							}
							listDOM = $(expList);
							listDOM.each(function() {
								$(this).click(function() {
									var me = $(this),
										actData = me.attr('action-data'),
										taVal = ta.text();
									// ta.text(taVal + actData);
									if(isIE8) {
										ta.append( me.html() + "&nbsp;");
									} else {
										ta.append(me.html());
									}
									$(bd).unbind('click');
									me.unbind('mouseout');
									$(win).unbind('resize');
									exp.remove();
									ta.focusEnd();
									placeCaretAtEnd(document.getElementById('chatInp'));
								})
							});
							expUl.children().remove();
							expUl.append(listDOM)
						} else if (curGroup != null && curGroup == i) {}
					},
					showGrp = function(i) {
						var range = {};
						range.left = (i - 1) * config.grpNum;
						range.left = Math.max(0, range.left);
						range.right = (i) * config.grpNum - 1;
						range.right = Math.min(range.right, grpCnt - 1);
						sub_tab_items.hide();
						for (var j = range.left; j <= range.right; j++) {
							sub_tab_items.eq(j).show()
						}
						curGrpPg = i;
						if (curGrpPg == 1) {
							sub_tab_pre.addClass('pre-disable')
						} else {
							sub_tab_pre.removeClass('pre-disable')
						}
						if (curGrpPg >= grpPgCnt) {
							sub_tab_next.addClass('next-disalbe')
						} else {
							sub_tab_next.removeClass('next-disalbe')
						}
					};
				if (config.posType == 'fixed') {
					me_t = off.top - $(win).scrollTop();
					exp_t = me_t + me_h
				}
				if (expEnable) {
					exp.css({
						position: config.posType,
						zIndex: config.zIndex,
						left: '-200px',
						top: '57px'
					});
					$(win).resize(function() {
						off = me.offset(), me_l = off.left - 50, me_t = off.top;
						exp_t = me_t + me_h, exp_l = me_l + (me_w + pos_correct_left) / 2;
						exp.css({
							left: exp_l + 'px',
							top: exp_t + 'px'
						})
					});
					exp_close.click(function() {
						$(bd).unbind('click');
						me.unbind('mouseout');
						$(win).unbind('resize');
						exp.remove()
					});
					me.mouseout(function() {
						$(bd).click(function(e) {
							var clickDOM = $(e.target);
							var a = clickDOM.parents('.exp-layer');
							if (!a.hasClass('exp-layer')) {
								exp.remove();
								$(bd).unbind('click');
								me.unbind('mouseout');
								$(win).unbind('resize')
							}
						})
					});
					showGrp(1);
					sub_tab_pre.click(function() {
						var p = curGrpPg - 1,
							rg;
						p = (p < 1) ? 1 : p;
						showGrp(p)
					});
					sub_tab_next.click(function() {
						var p = curGrpPg + 1,
							rg;
						p = (p > grpPgCnt) ? curGrpPg : p;
						showGrp(p)
					});
					showXGroupExp(0);
					sub_tab_items.each(function() {
						$(this).click(function() {
							var me = $(this),
								groupIndex = me.attr('grp-index');
							showXGroupExp(groupIndex)
						})
					});
					$('#chatBox').append(exp);
					exp.show()
				}
			})
		})
	}
	function disableExp() {
		expEnable = false
	}
	function enableExp() {
		expEnable = true
	}
	function getRemoteNewExp(data_url) {
		$.ajax({
			url: data_url,
			success: function(data) {
				EXP_DATA = eval(data);
				_getImgData()
			},
			error: function() {
				('传入的url错误')
			}
		})
	}
	function textFormat(str) {
		var reg = /\[\:\)\{(\d+)\}\(\:\]/g,
			src = str,
			rslt, temp;
		_getImgData();
		while (temp = reg.exec(src)) {
			var s = _switchImg(temp[1]),
				creg, t = "\\[\\:\\)\\{" + temp[1] + "\\}\\(\\:\\]";
			creg = new RegExp(t, "g");
			if (src.match(temp[0]) && s != temp[1]) {
				src = src.replace(creg, s)
			}
		}
		return src
	}
	function _genrt_html() {
		var html = '<div class="exp-layer"><div class="holder"><div class="content"><div class="exp-tab clearfix"><a href="javascript:;">常用表情</a></div><div class="exp-sub-tab clearfix">';
		html += '<div class="sub-tab-pagination"><a class="pre"></a><a class="next"></a></div></div><ul class="exp-detail clearfix">';
		html += '</ul></div><a class="exp-close" href="javascript:;" target="_self" title="关闭"></a></div><a class="exp-tri" href="javascript:;"></a></div>';
		return html
	}
	function _switchImg(str) {
		for (var i = 0; i < IMGS_DATA.length; i++) {
			if (IMGS_DATA[i].title == str) {
				return '<img src="' + faceAdd + IMGS_DATA[i].url + '" width="24" height="24" />'
			}
		}
		return str
	}
	function _getImgData() {
		for (var i = 0; i < EXP_DATA.length; i++) {
			IMGS_DATA.push(EXP_DATA[i].icons);
			for (var j = 0; j < EXP_DATA[i].icons.length; j++) {
				IMGS_DATA.push(EXP_DATA[i].icons[j])
			}
		}
	}
	$.expBlock = {
		initExp: init,
		disableExp: disableExp,
		enableExp: enableExp,
		getRemoteExp: getRemoteNewExp,
		textFormat: textFormat
	}
})(jQuery);
//20121010->left:exp_l+'px',top:+'px'修改为常数，$('body')修改为$('#chatBox')

/* 弹框初始化 */
$(function(){
	//弹框样式
	var bg = "http://static.n8n8.cn/Public/Images/ucenter/";
	var chatCss = '<style type="text/css">ul,dl{list-style:none;margin:0;padding:0;}h4,p{margin:0;}.msg_wrap{display:none;width:400px;font-family:Arial;color:#444;border:3px solid rgba(0,0,0,0);-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0 0 10px rgba(0,0,0,0.4);-moz-box-shadow:0 0 10px rgba(0,0,0,0.4);box-shadow:0 0 10px rgba(0,0,0,0.4)}.chat{margin:0;background:#FFF;}.msg_wrap .msg_tit{overflow:hidden;height:30px;padding:0 10px;line-height:30px;font-size:14px;color:#666;border-bottom:1px solid #e5e5e5;border-radius:4px 4px 0 0;background:#f7f7f7}#chatBtn{display:none;position:fixed;_position:absolute;*+cursor:pointer;top:230px;right:50px;width:75px;height:85px;background:url(' + bg + 'u_chat_sprites.png) no-repeat -670px -468px}#chatBtn .sc_lnk{display:block;cursor:pointer;width:75px;height:85px;font-size:13px;}#chatBtn a.sc_lnk{text-decoration:none;color:#000;}#chatBtn .sc_txt{display:block;width:74px;padding:62px 0 0 1px;text-align:center}.chat{display:none;position:relative;width:542px;font:13px/1.5 Arial,sans-serif;text-align:left;border:0;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.chat .msg_cont{border:0;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.chat .msg_tit{height:25px;padding-left:30px;font-weight:normal;font-size:13px;line-height:25px;color:#070707;border:0;background:url(' + bg + 'u_chat_sprites.png) no-repeat -2px -13px}.chat .msg_tit .minimize{float:right;width:12px;height:25px;margin-right:5px;background:url(' + bg + 'u_chat_sprites.png) no-repeat -733px -290px}.chat .msg_tit .maximize{float:right;width:12px;height:25px;margin-right:5px;background:url(' + bg + 'u_chat_sprites.png) no-repeat -733px -379px}.chat .msg_tit .close_btn{float:right;width:13px;height:25px;text-indent:-9999px;background:url(' + bg + 'u_chat_sprites.png) no-repeat -732px -244px}.chat .ann{height:32px;margin-top:2px;padding-left:10px;line-height:32px;color:#666;background:url(' + bg + 'u_chat_sprites.png) no-repeat -2px -40px}.chat .ann .p1{height:25px;line-height:25px}.chat .record{overflow-y:scroll;height:240px;margin:0 0 1px 1px;padding:10px;background:url(' + bg + 'chat_c_bg.jpg) repeat-x 0 0}.chat .record .rec_c{padding-bottom:10px;}.chat .record .rec_c .rec_l dt{height:25px;line-height:25px;color:#018ddd}.chat .record .rec_c .rec_l dt.own{color:#008040;}.chat .record .rec_c .rec_l dd.rec_t{line-height:1.4;margin:0;padding-left:1em;word-wrap:break-word;}.chat .record .rec_c .rec_l dd.rec_t img{vertical-align:middle;}.chat .record .rec_c .rec_l dd.rec_t .lnk{color:#0000FF;text-decoration:underline;}.chat .tool{height:25px;line-height:25px;border-bottom:1px solid #ced5e0;background:#d7ebf6}.chat .tool .t_btn{padding:2px 0 0 1px}.chat .tool .t_btn li{float:left;height:21px;margin-left:2px;background:url(' + bg + 'u_chat_sprites.png) no-repeat}.chat .tool .t_btn li a{display:block;height:21px}.chat .tool .t_btn .txt,.chat .tool .t_btn .txt .txt_a{width:23px}.chat .tool .t_btn .txt{background-position:-722px -14px}.chat .tool .t_btn .exp,.chat .tool .t_btn .exp .exp_a{width:22px}.chat .tool .t_btn .exp{background-position:-723px -193px;}.de-emoticons{z-index:10001!important}.chat .tool .t_btn .img,.chat .tool .t_btn .img .img_a{width:24px}.chat .tool .t_btn .img{background-position:-719px -117px}.chat .tool .t_btn .scr,.chat .tool .t_btn .scr .scr_a{width:22px}.chat .tool .t_btn .scr{background-position:-721px -57px}.chat .area{height:80px}.chat .area .c_inp{overflow:auto;width:532px;height:80px;padding:5px;font-size:13px;resize:none;border:0}.chat .area .c_inp img{vertical-align:bottom;}.chat .area .c_inp:focus{outline:0}.chat .btm{height:65px;background:url(' + bg + 'u_chat_sprites.png) no-repeat -2px -303px}.chat .btm .sub{float:right;width:120px;height:22px;margin:25px 20px 0 0;_margin-right:10px;line-height:22px}.chat .btm .sub input{cursor:pointer;height:22px;line-height:18px;color:#666;border:0}.chat .btm .sub .c_clo{width:41px;background:url(' + bg + 'u_chat_sprites.png) no-repeat -2px -203px}.chat .btm .sub .c_sub{float:right;width:70px;height:22px;background:url(' + bg + 'u_chat_sprites.png) no-repeat -2px -260px}.chat .btm .sub .c_sub .c_s_btn{float:left;width:57px;background:0}.chat .btm .sub .c_sub .c_s_help .c_s_h_a{display:block;float:left;width:13px;height:22px}.exp-layer{display:none;position:absolute;left:200px;top:200px;z-index:10;width:457px;border-radius:4px;padding:4px;background:url(' + bg + 'exp/layer_bg.png)}.exp-layer .holder{position:relative;z-index:30;border:1px solid #c3c3c3;border-radius:4px;background:#fff}.exp-layer .exp-tri{display:none;position:absolute;left:30px;top:-7px;z-index:40;width:16px;height:12px;background:url(' + bg + 'exp/layer_arrow.png)}.exp-layer .exp-close{display:block;position:absolute;right:5px;top:5px;z-index:20;width:20px;height:20px;background:url(' + bg + 'exp/ico.png) 5px -250px no-repeat}.exp-layer .exp-close:hover{background-position:0 -1954px}.exp-layer .exp-tab{padding:4px 4px 0 6px;background:#f0f0f0}.exp-layer .exp-tab a{display:block;float:left;height:25px;margin:0 3px;padding:0 10px;border:1px solid #e8e8e8;border-bottom:0;border-radius:4px 4px 0 0;background:#fff;font-size:12px;font-weight:400;text-overflow:clip;color:#666;text-decoration:none;line-height:25px}.exp-layer .exp-sub-tab{position:relative;margin:10px 0 0 16px;padding-right:60px;overflow:hidden}.exp-layer .exp-sub-tab a{display:block;float:left;height:23px;padding:0 7px;color:#9abbc8;font-size:12px;font-weight:400;text-decoration:none;line-height:23px}.exp-layer .exp-sub-tab a.slct{background:none repeat scroll 0 0 #f0f0f0;border-radius:3px 3px 3px 3px;cursor:default;position:relative;text-decoration:none;z-index:2}.exp-layer .exp-sub-tab span{float:left;margin:0 5px;color:#9abbc8}.exp-layer .sub-tab-pagination{position:absolute;right:10px;top:0;height:100%}.exp-layer .sub-tab-pagination a{display:none;width:17px;height:17px;margin:0 2px;padding:0;background:url(' + bg + 'exp/ico.png) no-repeat;cursor:pointer;display:inline;line-height:17px}.exp-layer .sub-tab-pagination .pre{background-position:0 -1290px}.exp-layer .sub-tab-pagination .next{background-position:0 -1176px}.exp-layer .sub-tab-pagination a.pre-disable{background-position:0 -1367px;cursor:default}.exp-layer .sub-tab-pagination a.next-disalbe{background-position:0 -1253px;cursor:default}.exp-layer .exp-detail{margin:0 10px 10px 10px;}.exp-detail li{overflow:hidden;display:block;float:left;width:28px;height:28px;margin:-1px 0 0 -1px;line-height:28px;border:1px solid #e8e8e8;padding:0;text-align:center;cursor:pointer}.exp-detail li:hover{position:relative;border:1px solid #0095cd;background:#fff9ec;z-index:50}.clearfix:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}* html .clearfix{zoom:1}*:first-child+html .clearfix{zoom:1}</style>';
	$("head").append(chatCss);
	//弹框按钮
/*	var chatBtn ="<div id='chatBtn' title='客服中心'><a class='sc_lnk' href='javascript:;' target='_self'><span class='sc_txt'>客服中心</span></a></div>";
	$("body").append(chatBtn);*/
});

/* 弹出层函数 */
JZIM.chatPopUp = function() {
    jzChat.open({
        container: 'chat',
        overlay: false
    });
    // 自动聚焦输入框
    placeCaretAtEnd(document.getElementById('chatInp'));
    $("#chatCls").live("click", function() {
        $("body").unbind("mouseover");
    });
    $("#chatCls2").live("click", function() {
        //jzChat.close();
		$("#chatBox").css("display","none");
        $("body").unbind("mouseover");
    });
    $("#minimize").live("click", function() {
        $("#chatBox").css("display","none");
        $("body").unbind("mouseover");
    });
    $.expBlock.initExp({
        textarea: '#chatInp'
    });
    //使表情失效
    $.expBlock.disableExp();
    //使表情重新启动
    $.expBlock.enableExp();
};

/* 将url替换为超链接 */
function urlToLnk(str){
    return (str.replace(/((https?|ftp|file):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*)/g,'<a class="lnk" href="$1" title="点击查看">$1</a>'));
}

/* 将字符串中如"[:){0}(:]"类的表情代号替换为<img />标签 */
function expToImg() {
    var ta = $("#chatCon dl:last").find('.rec_t');
    var s, val = ta.html();
    s = $.expBlock.textFormat(val);
    ta.html(s);
}

/* 控制让函数只触发一次 */
var onceObj = {};
onceObj.triggerOnce = function(fn){
	return function(){
		try {
			fn.apply(this, arguments);
		} catch(e) {

		} finally {
			fn = null;
		}
	}
};

/* 聊天功能函数 */
JZIM.CPS_NAME = JZIM.CPS_NAME || '经传-客服中心';
JZIM.GREETING = JZIM.GREETING || '您好，这里是经传软件全国客服在线服务中心，请问有什么能够帮到您？';

var BOSH_SERVICE = 'http://im.jingzhuan.cn/im/proxy.php';
var XMPP_SERVICE = 'http://im.jingzhuan.cn/xmpp-service/cpsImSelector/status';
var XMPP_DOMAIN = 'im.jingzhuan.cn';
var LOG_FLAG = false;
var CPS_JID = null;
var ANONYMOUS_NAME = '我';
var connection = null;
var userID = $("#UserNick").attr("val");
function log(msg) {
    if (LOG_FLAG) {
        $('#log').append('<div></div>').append(document.createTextNode(msg));
    }
}
function rawInput(data) {
    log('RECV: ' + data);
}
function rawOutput(data) {
    log('SENT: ' + data);
}
function onConnect(status) {
    if (status == Strophe.Status.CONNECTING) {
        log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
        log('Strophe failed to connect.');
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
        log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
        log('Strophe is disconnected.');
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
        log('Strophe is connected.');
        openChat();
        connection.addHandler(onMessage, null, 'message', null, null, null);
        connection.send($pres().tree());
    }
}
function onMessage(msg) {
    to = msg.getAttribute('to');
    from = msg.getAttribute('from');
    var id = MD5.hexdigest(from.split('/')[0]);
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');
    var message = null;
    var myDate3 = new Date();
    var mytime3 = myDate3.toLocaleTimeString();
    if (document.getElementById("chatBox").style.display=="none") {
    	document.getElementById("chatBox").style.display="block";
    }
    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        message = Strophe.getText(body);
        log(new Date().toLocaleTimeString() + '  ' + from + ' say: ' + message);

        var conversation = $("#" + id);
        if (conversation.length == 0) {
            openChat();
        }
        conversation = $("#" + id);
        message = urlToLnk(message);
        conversation.find("#chatCon").append("<dl class='rec_l'><dt>" + JZIM.CPS_NAME + "&nbsp;&nbsp;<span class='rec_d'>" + mytime3 + "</span></dt>" + "<dd class='rec_t'>" + message + "</dd></dl>");
    }
    expToImg();
    $("#chatRec").scrollTop(99999);
    // we must return true to keep the handler alive.
    // returning false would remove it after it finishes.
    return true;
}

// 设置页面Cookie值
function setCookieVal(name, val, expiredDays){
	var date = new Date();
	date.setTime(date.getTime() + expiredDays * 24 * 3600 * 1000);
	document.cookie = name + '=' + val + '; expires=' + date.toGMTString();
}
// 获取页面Cookie值
function getCookieVal(name){
	var allCookie = document.cookie.split('; ');
	for (var i = 0; i < allCookie.length; i++) {
		var arr = allCookie[i].split('=');
		if (name == arr[0]) {
			if (arr.length > 1) {
				return unescape(arr[1]);
			} else {
				return 0;
			}
		}
	}
	return 0;
}

/* 获取页面Cookie中所需Name对应的Value */
/*var allCookie = document.cookie.split("; ");
var date = new Date();
var jzExpireDays = 1;   //几天后自动弹框再次生效
date.setTime(date.getTime() + jzExpireDays * 24 * 3600 * 1000);
function getCookieVal(name) {
	for (var i = 0; i < allCookie.length; i++) {
		var arr = allCookie[i].split("=");
		if (name == arr[0]) {
			if (arr.length > 1) {
				return unescape(arr[1]);
			} else {
				return 0;
			}
		}
	}
	return 0;
}*/

$(function() {
    //获取当前页面url的cpsid
    var cpsId = JZIM.cpsId || getCookieVal("VisitorCpsid");
	//cpsId = 16876;
    //TODO: Just set userID to 0 for Testing
    userID = isNaN(userID) ? 0 : 0;
    request = $.ajax({
        url: XMPP_SERVICE,
        type: "GET",
        cache: false,
        data: {
            cpsid: cpsId,
            userid: userID
        },
        dataType: "jsonp",
        success: function(imPeer) {
            if (imPeer.jid === undefined || imPeer.online === false) {
                return;
            }
            connection = new Strophe.Connection(BOSH_SERVICE);
            connection.rawInput = rawInput;
            connection.rawOutput = rawOutput;
            //auto connect to XMPP server
            //anonymous login
            connection.connect(XMPP_DOMAIN, null, onConnect);
            JZIM.imPeerJid = JZIM.imPeerJid || imPeer.jid;
			//imPeerJid = '11356@im.jingzhuan.cn';
        }
    });
});

/* 聊天消息发送 */
function openChat() {
    var to = JZIM.imPeerJid;
    var id = MD5.hexdigest(to);
    var chat = $("<div id='chat' class='msg_wrap chat'><div id='" + id + "' class='msg_cont exp-holder'><h4 class='msg_tit' id='chatTit'><a href='javascript:void(0)' target='_self' title='关闭窗口' class='close_btn' id='chatCls'>&times;</a><a id='maximize' class='maximize' href='javascript:;' target='_self' title='最大化'></a><a id='minimize' class='minimize' href='javascript:;' target='_self' title='最小化'></a><span id='chatTitTxt'>" + JZIM.CPS_NAME + "</span></h4><div id='chatAnn' class='ann'><p class='p1'>经过我们的努力，把知识与财富传递到你的手中</p></div><div id='chatRec' class='record'><div id='chatCon' class='rec_c'></div></div><div class='tool'><ul class='t_btn'><!--<li class='txt'><a class='txt_a' href='javascript:;' target='_self'></a></li>--><li class='exp'><a id='insertExpBtn2' class='exp_a exp-block-trigger' href='javascript:;' target='_self'></a></li><!--<li class='img'><a class='img_a' href='javascript:;' target='_self'></a></li><li class='scr'><a class='scr_a' href='javascript:;' target='_self'></a></li></ul>--></div><div class='area'><div id='chatInp' class='c_inp' name='chatInp' contenteditable='true'></div></div><div class='btm'><div class='sub'><input id='chatCls2' class='c_clo' type='button' title='关闭窗口' value='关闭' /><p class='c_sub'><input id='chatSub' class='c_s_btn' type='submit' title='按Enter键发送消息' value='发送' /><span class='c_s_help'><a class='c_s_h_a' href='javascript:;' target='_self'></a></span></p></div></div></div></div><div id='chatBtn' title='客服中心'><a class='sc_lnk' href='javascript:;' target='_self'><span class='sc_txt'>客服中心</span></a></div>");
    var input = chat.find("#chatInp");
    var sendBut = chat.find("#chatSub");
    var conversation = chat.find("#chatCon");
    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
   	
   	//自动发送用户所在当前页面的url和title
	function autSend(){
		//获取当前页面url
		var pageUrl = window.location.href;
		//获取当前页面title
		var pageTit = $("title").html();
		var delBlankReg = /^\s*|\s*$/g;
		var pageTit = pageTit.replace(delBlankReg,"");   //删除title首尾空白字符
        var from2 = connection.sid + '@' + XMPP_DOMAIN;
		var autSenCon ='来源地址：' + pageUrl + '\n' + '网页标题：' + pageTit + '\r';
        var reply2 = $msg({
            to: to,
            from: from2,
            type: 'chat'
        }).cnode(Strophe.xmlElement('body', '', autSenCon));
        connection.send(reply2.tree());
	}
	var autSendOnce = onceObj.triggerOnce(autSend);

    function chatSend() {
        //var to = getToJid(100);
        //autSendOnce(1);
        var myDate2 = new Date();
        var mytime2 = myDate2.toLocaleTimeString();
        var from = connection.sid + '@' + XMPP_DOMAIN;
        //将img标签如"微笑"替换为字符串"[:){0}(:]"形式
        input.find("img").each(function(){
        	var str = $(this).attr("data-name");
        	var val = $(this).attr("data-val");
        	$(this).replaceWith("&lt;BitMap Index='" + val + "'/&gt;" + str);
        	// input4=input2.replace(/<\s?img[^>]*>/gi,str); 
        });
        var inpVal = input.text();
        var inpValMsg = "<Message id='inpValMsg' FontName='新宋体' FontSize='200' FontColr='0' FontBold='0'>" + inpVal + "</Message>";
        // inpVal = inpVal.replace(/^\s*|\s*$/g,"");
        inpVal = inpVal.replace(/\<br>/gi,"\r\n");
        // inpVal = inpVal.replace(/<\/?[^>]*>/g,"");
        inpVal = inpVal.replace(/\&nbsp;/gi," ");
        var reply = $msg({
            to: to,
            from: from,
            type: 'chat'
        }).cnode(Strophe.xmlElement('body', '', inpValMsg));
        connection.send(reply.tree());
        inpVal2 = urlToLnk(input.text());
        conversation.append("<dl class='rec_l'><dt class='own'>" + ANONYMOUS_NAME + "&nbsp;&nbsp;<span class='rec_d'>" + mytime2 + "</span></dt>" + "<dd class='rec_t'>" + inpVal2 + "</dd></dl>");
        input.html("");
        expToImg();
        $("#chatRec").scrollTop(99999);
    }
    function chatCheck() {
    	var inputVal = input.text();
    	var delBlankReg = /^\s*|\s*$/g;
		inputVal = inputVal.replace(delBlankReg,""); 
    	// inputVal = inputVal.replace(/<\/?[^>]*>/g,"");
    	inputVal = inputVal.replace(/<br>/g,"");
    	inputVal = inputVal.replace(/[ | ]*\n/g,"");
    	// inputVal = inputVal.replace(/<[^>].*?>/g,"");
    	inputVal = inputVal.replace(/&nbsp;/g,"");
    	if(inputVal.length || input.find("img").length > 0){
    		chatSend();
    	} else {
    		alert("发送内容不能为空，请重新输入");
    		input.html("");
        	return false;
        }
    }
    $("#chatSub").live("click", function() {
    	chatCheck();
    });
    // 自动发送一次网页信息
    var isAutoSended = 0;
    $('#chatInp').live('focus', function() {
    	if(!isAutoSended) {
	    	autSendOnce(1);
	    	isAutoSended = 1;
	    }
    });
    //输入框滚动条保持在底部
    $("#chatInp").live("keyup", function(e) {
    	$(this).scrollTop(99999);
    });    
    $("#chatInp").live("keydown", function(e) {
		e = e || event;
		//实现Ctrl + Enter 换行
		if (e.ctrlKey && e.keyCode == 13) {
            $(this).html($(this).html() + "<br>&nbsp;");
            placeCaretAtEnd(document.getElementById('chatInp'));
            return;
        }
        //实现Enter键发送消息
        if (e.keyCode == 13) {
        	e.preventDefault();
            chatCheck();
        }
    });
    conversation.append("<dl class='rec_l'><dt>" + JZIM.CPS_NAME + "&nbsp;&nbsp;<span class='rec_d'>" + mytime + "</span></dt>" + "<dd class='rec_t'>" + JZIM.GREETING + "</dd></dl>");
    $("body").append(chat);
    //隐藏浮动弹框按钮和创建页面弹框按钮
	if ($("#chatBtn2").length <= 0) {
		$("#chatBtn").show()
	}
	//显示浮动弹框按钮和创建页面弹框按钮
	if ($("#chatBtn3").length > 0) {
		$("#chatBtn").show()
	}
	// 自动弹出聊天框
    if($('#chatAuto').length) {
    	JZIM.chatPopUp();
    	if(!$('#chatAuto').data('btn')) {
	    	$("#chatBtn").hide();
	    }
    }
}

/* 聊天内容传输 */
var Base64 = (function() {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var obj = {
		encode: function(input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			do {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64
				} else if (isNaN(chr3)) {
					enc4 = 64
				}
				output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4)
			} while (i < input.length);
			return output
		},
		decode: function(input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			do {
				enc1 = keyStr.indexOf(input.charAt(i++));
				enc2 = keyStr.indexOf(input.charAt(i++));
				enc3 = keyStr.indexOf(input.charAt(i++));
				enc4 = keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2)
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3)
				}
			} while (i < input.length);
			return output
		}
	};
	return obj
})();
var MD5 = (function() {
	var hexcase = 0;
	var b64pad = "";
	var chrsz = 8;
	var safe_add = function(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF)
		};
	var bit_rol = function(num, cnt) {
			return (num << cnt) | (num >>> (32 - cnt))
		};
	var str2binl = function(str) {
			var bin = [];
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < str.length * chrsz; i += chrsz) {
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32)
			}
			return bin
		};
	var binl2str = function(bin) {
			var str = "";
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < bin.length * 32; i += chrsz) {
				str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask)
			}
			return str
		};
	var binl2hex = function(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF)
			}
			return str
		};
	var binl2b64 = function(binarray) {
			var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			var str = "";
			var triplet, j;
			for (var i = 0; i < binarray.length * 4; i += 3) {
				triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
				for (j = 0; j < 4; j++) {
					if (i * 8 + j * 6 > binarray.length * 32) {
						str += b64pad
					} else {
						str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F)
					}
				}
			}
			return str
		};
	var md5_cmn = function(q, a, b, x, s, t) {
			return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
		};
	var md5_ff = function(a, b, c, d, x, s, t) {
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
		};
	var md5_gg = function(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
		};
	var md5_hh = function(a, b, c, d, x, s, t) {
			return md5_cmn(b ^ c ^ d, a, b, x, s, t)
		};
	var md5_ii = function(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
		};
	var core_md5 = function(x, len) {
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;
			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;
			var olda, oldb, oldc, oldd;
			for (var i = 0; i < x.length; i += 16) {
				olda = a;
				oldb = b;
				oldc = c;
				oldd = d;
				a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
				a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
				a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
				a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
				a = safe_add(a, olda);
				b = safe_add(b, oldb);
				c = safe_add(c, oldc);
				d = safe_add(d, oldd)
			}
			return [a, b, c, d]
		};
	var core_hmac_md5 = function(key, data) {
			var bkey = str2binl(key);
			if (bkey.length > 16) {
				bkey = core_md5(bkey, key.length * chrsz)
			}
			var ipad = new Array(16),
				opad = new Array(16);
			for (var i = 0; i < 16; i++) {
				ipad[i] = bkey[i] ^ 0x36363636;
				opad[i] = bkey[i] ^ 0x5C5C5C5C
			}
			var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
			return core_md5(opad.concat(hash), 512 + 128)
		};
	var obj = {
		hexdigest: function(s) {
			return binl2hex(core_md5(str2binl(s), s.length * chrsz))
		},
		b64digest: function(s) {
			return binl2b64(core_md5(str2binl(s), s.length * chrsz))
		},
		hash: function(s) {
			return binl2str(core_md5(str2binl(s), s.length * chrsz))
		},
		hmac_hexdigest: function(key, data) {
			return binl2hex(core_hmac_md5(key, data))
		},
		hmac_b64digest: function(key, data) {
			return binl2b64(core_hmac_md5(key, data))
		},
		hmac_hash: function(key, data) {
			return binl2str(core_hmac_md5(key, data))
		},
		test: function() {
			return MD5.hexdigest("abc") === "900150983cd24fb0d6963f7d28e17f72"
		}
	};
	return obj
})();
if (!Function.prototype.bind) {
	Function.prototype.bind = function(obj) {
		var func = this;
		return function() {
			return func.apply(obj, arguments)
		}
	}
}
if (!Function.prototype.prependArg) {
	Function.prototype.prependArg = function(arg) {
		var func = this;
		return function() {
			var newargs = [arg];
			for (var i = 0; i < arguments.length; i++) {
				newargs.push(arguments[i])
			}
			return func.apply(this, newargs)
		}
	}
}
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt) {
		var len = this.length;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len
		}
		for (; from < len; from++) {
			if (from in this && this[from] === elt) {
				return from
			}
		}
		return -1
	}
}(function(callback) {
	var Strophe;

	function $build(name, attrs) {
		return new Strophe.Builder(name, attrs)
	}
	function $msg(attrs) {
		return new Strophe.Builder("message", attrs)
	}
	function $iq(attrs) {
		return new Strophe.Builder("iq", attrs)
	}
	function $pres(attrs) {
		return new Strophe.Builder("presence", attrs)
	}
	Strophe = {
		VERSION: "1.0.1",
		NS: {
			HTTPBIND: "http://jabber.org/protocol/httpbind",
			BOSH: "urn:xmpp:xbosh",
			CLIENT: "jabber:client",
			AUTH: "jabber:iq:auth",
			ROSTER: "jabber:iq:roster",
			PROFILE: "jabber:iq:profile",
			DISCO_INFO: "http://jabber.org/protocol/disco#info",
			DISCO_ITEMS: "http://jabber.org/protocol/disco#items",
			MUC: "http://jabber.org/protocol/muc",
			SASL: "urn:ietf:params:xml:ns:xmpp-sasl",
			STREAM: "http://etherx.jabber.org/streams",
			BIND: "urn:ietf:params:xml:ns:xmpp-bind",
			SESSION: "urn:ietf:params:xml:ns:xmpp-session",
			VERSION: "jabber:iq:version",
			STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas"
		},
		addNamespace: function(name, value) {
			Strophe.NS[name] = value
		},
		Status: {
			ERROR: 0,
			CONNECTING: 1,
			CONNFAIL: 2,
			AUTHENTICATING: 3,
			AUTHFAIL: 4,
			CONNECTED: 5,
			DISCONNECTED: 6,
			DISCONNECTING: 7,
			ATTACHED: 8
		},
		LogLevel: {
			DEBUG: 0,
			INFO: 1,
			WARN: 2,
			ERROR: 3,
			FATAL: 4
		},
		ElementType: {
			NORMAL: 1,
			TEXT: 3
		},
		TIMEOUT: 1.1,
		SECONDARY_TIMEOUT: 0.1,
		forEachChild: function(elem, elemName, func) {
			var i, childNode;
			for (i = 0; i < elem.childNodes.length; i++) {
				childNode = elem.childNodes[i];
				if (childNode.nodeType == Strophe.ElementType.NORMAL && (!elemName || this.isTagEqual(childNode, elemName))) {
					func(childNode)
				}
			}
		},
		isTagEqual: function(el, name) {
			return el.tagName.toLowerCase() == name.toLowerCase()
		},
		_xmlGenerator: null,
		_makeGenerator: function() {
			var doc;
			if (window.ActiveXObject) {
				doc = new ActiveXObject("Microsoft.XMLDOM");
				doc.appendChild(doc.createElement('strophe'))
			} else {
				doc = document.implementation.createDocument('jabber:client', 'strophe', null)
			}
			return doc
		},
		xmlElement: function(name) {
			if (!name) {
				return null
			}
			var node = null;
			if (!Strophe._xmlGenerator) {
				Strophe._xmlGenerator = Strophe._makeGenerator()
			}
			node = Strophe._xmlGenerator.createElement(name);
			var a, i, k;
			for (a = 1; a < arguments.length; a++) {
				if (!arguments[a]) {
					continue
				}
				if (typeof(arguments[a]) == "string" || typeof(arguments[a]) == "number") {
					node.appendChild(Strophe.xmlTextNode(arguments[a]))
				} else if (typeof(arguments[a]) == "object" && typeof(arguments[a].sort) == "function") {
					for (i = 0; i < arguments[a].length; i++) {
						if (typeof(arguments[a][i]) == "object" && typeof(arguments[a][i].sort) == "function") {
							node.setAttribute(arguments[a][i][0], arguments[a][i][1])
						}
					}
				} else if (typeof(arguments[a]) == "object") {
					for (k in arguments[a]) {
						if (arguments[a].hasOwnProperty(k)) {
							node.setAttribute(k, arguments[a][k])
						}
					}
				}
			}
			return node
		},
		xmlescape: function(text) {
			text = text.replace(/\&/g, "&amp;");
			text = text.replace(/</g, "&lt;");
			text = text.replace(/>/g, "&gt;");
			return text
		},
		xmlTextNode: function(text) {
			text = Strophe.xmlescape(text);
			if (!Strophe._xmlGenerator) {
				Strophe._xmlGenerator = Strophe._makeGenerator()
			}
			return Strophe._xmlGenerator.createTextNode(text)
		},
		getText: function(elem) {
			if (!elem) {
				return null
			}
			var str = "";
			if (elem.childNodes.length === 0 && elem.nodeType == Strophe.ElementType.TEXT) {
				str += elem.nodeValue
			}
			for (var i = 0; i < elem.childNodes.length; i++) {
				if (elem.childNodes[i].nodeType == Strophe.ElementType.TEXT) {
					str += elem.childNodes[i].nodeValue
				}
			}
			return str
		},
		copyElement: function(elem) {
			var i, el;
			if (elem.nodeType == Strophe.ElementType.NORMAL) {
				el = Strophe.xmlElement(elem.tagName);
				for (i = 0; i < elem.attributes.length; i++) {
					el.setAttribute(elem.attributes[i].nodeName.toLowerCase(), elem.attributes[i].value)
				}
				for (i = 0; i < elem.childNodes.length; i++) {
					el.appendChild(Strophe.copyElement(elem.childNodes[i]))
				}
			} else if (elem.nodeType == Strophe.ElementType.TEXT) {
				el = Strophe.xmlTextNode(elem.nodeValue)
			}
			return el
		},
		escapeNode: function(node) {
			return node.replace(/^\s+|\s+$/g, '').replace(/\\/g, "\\5c").replace(/ /g, "\\20").replace(/\"/g, "\\22").replace(/\&/g, "\\26").replace(/\'/g, "\\27").replace(/\//g, "\\2f").replace(/:/g, "\\3a").replace(/</g, "\\3c").replace(/>/g, "\\3e").replace(/@/g, "\\40")
		},
		unescapeNode: function(node) {
			return node.replace(/\\20/g, " ").replace(/\\22/g, '"').replace(/\\26/g, "&").replace(/\\27/g, "'").replace(/\\2f/g, "/").replace(/\\3a/g, ":").replace(/\\3c/g, "<").replace(/\\3e/g, ">").replace(/\\40/g, "@").replace(/\\5c/g, "\\")
		},
		getNodeFromJid: function(jid) {
			if (jid.indexOf("@") < 0) {
				return null
			}
			return jid.split("@")[0]
		},
		getDomainFromJid: function(jid) {
			var bare = Strophe.getBareJidFromJid(jid);
			if (bare.indexOf("@") < 0) {
				return bare
			} else {
				var parts = bare.split("@");
				parts.splice(0, 1);
				return parts.join('@')
			}
		},
		getResourceFromJid: function(jid) {
			var s = jid.split("/");
			if (s.length < 2) {
				return null
			}
			s.splice(0, 1);
			return s.join('/')
		},
		getBareJidFromJid: function(jid) {
			return jid.split("/")[0]
		},
		log: function(level, msg) {
			return
		},
		debug: function(msg) {
			this.log(this.LogLevel.DEBUG, msg)
		},
		info: function(msg) {
			this.log(this.LogLevel.INFO, msg)
		},
		warn: function(msg) {
			this.log(this.LogLevel.WARN, msg)
		},
		error: function(msg) {
			this.log(this.LogLevel.ERROR, msg)
		},
		fatal: function(msg) {
			this.log(this.LogLevel.FATAL, msg)
		},
		serialize: function(elem) {
			var result;
			if (!elem) {
				return null
			}
			if (typeof(elem.tree) === "function") {
				elem = elem.tree()
			}
			var nodeName = elem.nodeName;
			var i, child;
			if (elem.getAttribute("_realname")) {
				nodeName = elem.getAttribute("_realname")
			}
			result = "<" + nodeName;
			for (i = 0; i < elem.attributes.length; i++) {
				if (elem.attributes[i].nodeName != "_realname") {
					result += " " + elem.attributes[i].nodeName.toLowerCase() + "='" + elem.attributes[i].value.replace("&", "&amp;").replace("'", "&apos;").replace("<", "&lt;") + "'"
				}
			}
			if (elem.childNodes.length > 0) {
				result += ">";
				for (i = 0; i < elem.childNodes.length; i++) {
					child = elem.childNodes[i];
					if (child.nodeType == Strophe.ElementType.NORMAL) {
						result += Strophe.serialize(child)
					} else if (child.nodeType == Strophe.ElementType.TEXT) {
						result += child.nodeValue
					}
				}
				result += "</" + nodeName + ">"
			} else {
				result += "/>"
			}
			return result
		},
		_requestId: 0,
		_connectionPlugins: {},
		addConnectionPlugin: function(name, ptype) {
			Strophe._connectionPlugins[name] = ptype
		}
	};
	Strophe.Builder = function(name, attrs) {
		if (name == "presence" || name == "message" || name == "iq") {
			if (attrs && !attrs.xmlns) {
				attrs.xmlns = Strophe.NS.CLIENT
			} else if (!attrs) {
				attrs = {
					xmlns: Strophe.NS.CLIENT
				}
			}
		}
		this.nodeTree = Strophe.xmlElement(name, attrs);
		this.node = this.nodeTree
	};
	Strophe.Builder.prototype = {
		tree: function() {
			return this.nodeTree
		},
		toString: function() {
			return Strophe.serialize(this.nodeTree)
		},
		up: function() {
			this.node = this.node.parentNode;
			return this
		},
		attrs: function(moreattrs) {
			for (var k in moreattrs) {
				if (moreattrs.hasOwnProperty(k)) {
					this.node.setAttribute(k, moreattrs[k])
				}
			}
			return this
		},
		c: function(name, attrs) {
			var child = Strophe.xmlElement(name, attrs);
			this.node.appendChild(child);
			this.node = child;
			return this
		},
		cnode: function(elem) {
			this.node.appendChild(elem);
			this.node = elem;
			return this
		},
		t: function(text) {
			var child = Strophe.xmlTextNode(text);
			this.node.appendChild(child);
			return this
		}
	};
	Strophe.Handler = function(handler, ns, name, type, id, from, options) {
		this.handler = handler;
		this.ns = ns;
		this.name = name;
		this.type = type;
		this.id = id;
		this.options = options || {
			matchbare: false
		};
		if (!this.options.matchBare) {
			this.options.matchBare = false
		}
		if (this.options.matchBare) {
			this.from = Strophe.getBareJidFromJid(from)
		} else {
			this.from = from
		}
		this.user = true
	};
	Strophe.Handler.prototype = {
		isMatch: function(elem) {
			var nsMatch;
			var from = null;
			if (this.options.matchBare) {
				from = Strophe.getBareJidFromJid(elem.getAttribute('from'))
			} else {
				from = elem.getAttribute('from')
			}
			nsMatch = false;
			if (!this.ns) {
				nsMatch = true
			} else {
				var self = this;
				Strophe.forEachChild(elem, null, function(elem) {
					if (elem.getAttribute("xmlns") == self.ns) {
						nsMatch = true
					}
				});
				nsMatch = nsMatch || elem.getAttribute("xmlns") == this.ns
			}
			if (nsMatch && (!this.name || Strophe.isTagEqual(elem, this.name)) && (!this.type || elem.getAttribute("type") === this.type) && (!this.id || elem.getAttribute("id") === this.id) && (!this.from || from === this.from)) {
				return true
			}
			return false
		},
		run: function(elem) {
			var result = null;
			try {
				result = this.handler(elem)
			} catch (e) {
				if (e.sourceURL) {
					Strophe.fatal("error: " + this.handler + " " + e.sourceURL + ":" + e.line + " - " + e.name + ": " + e.message)
				} else if (e.fileName) {
					if (typeof(console) != "undefined") {
						console.trace();
						console.error(this.handler, " - error - ", e, e.message)
					}
					Strophe.fatal("error: " + this.handler + " " + e.fileName + ":" + e.lineNumber + " - " + e.name + ": " + e.message)
				} else {
					Strophe.fatal("error: " + this.handler)
				}
				throw e
			}
			return result
		},
		toString: function() {
			return "{Handler: " + this.handler + "(" + this.name + "," + this.id + "," + this.ns + ")}"
		}
	};
	Strophe.TimedHandler = function(period, handler) {
		this.period = period;
		this.handler = handler;
		this.lastCalled = new Date().getTime();
		this.user = true
	};
	Strophe.TimedHandler.prototype = {
		run: function() {
			this.lastCalled = new Date().getTime();
			return this.handler()
		},
		reset: function() {
			this.lastCalled = new Date().getTime()
		},
		toString: function() {
			return "{TimedHandler: " + this.handler + "(" + this.period + ")}"
		}
	};
	Strophe.Request = function(elem, func, rid, sends) {
		this.id = ++Strophe._requestId;
		this.xmlData = elem;
		this.data = Strophe.serialize(elem);
		this.origFunc = func;
		this.func = func;
		this.rid = rid;
		this.date = NaN;
		this.sends = sends || 0;
		this.abort = false;
		this.dead = null;
		this.age = function() {
			if (!this.date) {
				return 0
			}
			var now = new Date();
			return (now - this.date) / 1000
		};
		this.timeDead = function() {
			if (!this.dead) {
				return 0
			}
			var now = new Date();
			return (now - this.dead) / 1000
		};
		this.xhr = this._newXHR()
	};
	Strophe.Request.prototype = {
		getResponse: function() {
			var node = null;
			if (this.xhr.responseXML && this.xhr.responseXML.documentElement) {
				node = this.xhr.responseXML.documentElement;
				if (node.tagName == "parsererror") {
					Strophe.error("invalid response received");
					Strophe.error("responseText: " + this.xhr.responseText);
					Strophe.error("responseXML: " + Strophe.serialize(this.xhr.responseXML));
					throw "parsererror"
				}
			} else if (this.xhr.responseText) {
				Strophe.error("invalid response received");
				Strophe.error("responseText: " + this.xhr.responseText);
				Strophe.error("responseXML: " + Strophe.serialize(this.xhr.responseXML))
			}
			return node
		},
		_newXHR: function() {
			var xhr = null;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
				if (xhr.overrideMimeType) {
					xhr.overrideMimeType("text/xml")
				}
			} else if (window.ActiveXObject) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP")
			}
			xhr.onreadystatechange = this.func.prependArg(this);
			return xhr
		}
	};
	Strophe.Connection = function(service) {
		this.service = service;
		this.jid = "";
		this.rid = Math.floor(Math.random() * 4294967295);
		this.sid = null;
		this.streamId = null;
		this.do_session = false;
		this.do_bind = false;
		this.timedHandlers = [];
		this.handlers = [];
		this.removeTimeds = [];
		this.removeHandlers = [];
		this.addTimeds = [];
		this.addHandlers = [];
		this._idleTimeout = null;
		this._disconnectTimeout = null;
		this.authenticated = false;
		this.disconnecting = false;
		this.connected = false;
		this.errors = 0;
		this.paused = false;
		this.hold = 1;
		this.wait = 1800;
		this.window = 5;
		this._data = [];
		this._requests = [];
		this._uniqueId = Math.round(Math.random() * 10000);
		this._sasl_success_handler = null;
		this._sasl_failure_handler = null;
		this._sasl_challenge_handler = null;
		this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
		for (var k in Strophe._connectionPlugins) {
			if (Strophe._connectionPlugins.hasOwnProperty(k)) {
				var ptype = Strophe._connectionPlugins[k];
				var F = function() {};
				F.prototype = ptype;
				this[k] = new F();
				this[k].init(this)
			}
		}
	};
	Strophe.Connection.prototype = {
		reset: function() {
			this.rid = Math.floor(Math.random() * 4294967295);
			this.sid = null;
			this.streamId = null;
			this.do_session = false;
			this.do_bind = false;
			this.timedHandlers = [];
			this.handlers = [];
			this.removeTimeds = [];
			this.removeHandlers = [];
			this.addTimeds = [];
			this.addHandlers = [];
			this.authenticated = false;
			this.disconnecting = false;
			this.connected = false;
			this.errors = 0;
			this._requests = [];
			this._uniqueId = Math.round(Math.random() * 10000)
		},
		pause: function() {
			this.paused = true
		},
		resume: function() {
			this.paused = false
		},
		getUniqueId: function(suffix) {
			if (typeof(suffix) == "string" || typeof(suffix) == "number") {
				return ++this._uniqueId + ":" + suffix
			} else {
				return ++this._uniqueId + ""
			}
		},
		connect: function(jid, pass, callback, wait, hold) {
			this.jid = jid;
			this.pass = pass;
			this.connect_callback = callback;
			this.disconnecting = false;
			this.connected = false;
			this.authenticated = false;
			this.errors = 0;
			this.wait = wait || this.wait;
			this.hold = hold || this.hold;
			this.domain = Strophe.getDomainFromJid(this.jid);
			var body = this._buildBody().attrs({
				to: this.domain,
				"xml:lang": "en",
				wait: this.wait,
				hold: this.hold,
				content: "text/xml; charset=utf-8",
				ver: "1.6",
				"xmpp:version": "1.0",
				"xmlns:xmpp": Strophe.NS.BOSH
			});
			this._changeConnectStatus(Strophe.Status.CONNECTING, null);
			this._requests.push(new Strophe.Request(body.tree(), this._onRequestStateChange.bind(this).prependArg(this._connect_cb.bind(this)), body.tree().getAttribute("rid")));
			this._throttledRequestHandler()
		},
		attach: function(jid, sid, rid, callback, wait, hold, wind) {
			this.jid = jid;
			this.sid = sid;
			this.rid = rid;
			this.connect_callback = callback;
			this.domain = Strophe.getDomainFromJid(this.jid);
			this.authenticated = true;
			this.connected = true;
			this.wait = wait || this.wait;
			this.hold = hold || this.hold;
			this.window = wind || this.window;
			this._changeConnectStatus(Strophe.Status.ATTACHED, null)
		},
		xmlInput: function(elem) {
			return
		},
		xmlOutput: function(elem) {
			return
		},
		rawInput: function(data) {
			return
		},
		rawOutput: function(data) {
			return
		},
		send: function(elem) {
			if (elem === null) {
				return
			}
			if (typeof(elem.sort) === "function") {
				for (var i = 0; i < elem.length; i++) {
					this._queueData(elem[i])
				}
			} else if (typeof(elem.tree) === "function") {
				this._queueData(elem.tree())
			} else {
				this._queueData(elem)
			}
			this._throttledRequestHandler();
			clearTimeout(this._idleTimeout);
			this._idleTimeout = setTimeout(this._onIdle.bind(this), 100)
		},
		flush: function() {
			clearTimeout(this._idleTimeout);
			this._onIdle()
		},
		sendIQ: function(elem, callback, errback, timeout) {
			var timeoutHandler = null;
			var that = this;
			if (typeof(elem.tree) === "function") {
				elem = elem.tree()
			}
			var id = elem.getAttribute('id');
			if (!id) {
				id = this.getUniqueId("sendIQ");
				elem.setAttribute("id", id)
			}
			var handler = this.addHandler(function(stanza) {
				if (timeoutHandler) {
					that.deleteTimedHandler(timeoutHandler)
				}
				var iqtype = stanza.getAttribute('type');
				if (iqtype === 'result') {
					if (callback) {
						callback(stanza)
					}
				} else if (iqtype === 'error') {
					if (errback) {
						errback(stanza)
					}
				} else {
					throw {
						name: "StropheError",
						message: "Got bad IQ type of " + iqtype
					}
				}
			}, null, 'iq', null, id);
			if (timeout) {
				timeoutHandler = this.addTimedHandler(timeout, function() {
					that.deleteHandler(handler);
					if (errback) {
						errback(null)
					}
					return false
				})
			}
			this.send(elem);
			return id
		},
		_queueData: function(element) {
			if (element === null || !element.tagName || !element.childNodes) {
				throw {
					name: "StropheError",
					message: "Cannot queue non-DOMElement."
				}
			}
			this._data.push(element)
		},
		_sendRestart: function() {
			this._data.push("restart");
			this._throttledRequestHandler();
			clearTimeout(this._idleTimeout);
			this._idleTimeout = setTimeout(this._onIdle.bind(this), 100)
		},
		addTimedHandler: function(period, handler) {
			var thand = new Strophe.TimedHandler(period, handler);
			this.addTimeds.push(thand);
			return thand
		},
		deleteTimedHandler: function(handRef) {
			this.removeTimeds.push(handRef)
		},
		addHandler: function(handler, ns, name, type, id, from, options) {
			var hand = new Strophe.Handler(handler, ns, name, type, id, from, options);
			this.addHandlers.push(hand);
			return hand
		},
		deleteHandler: function(handRef) {
			this.removeHandlers.push(handRef)
		},
		disconnect: function(reason) {
			this._changeConnectStatus(Strophe.Status.DISCONNECTING, reason);
			Strophe.info("Disconnect was called because: " + reason);
			if (this.connected) {
				this._disconnectTimeout = this._addSysTimedHandler(3000, this._onDisconnectTimeout.bind(this));
				this._sendTerminate()
			}
		},
		_changeConnectStatus: function(status, condition) {
			for (var k in Strophe._connectionPlugins) {
				if (Strophe._connectionPlugins.hasOwnProperty(k)) {
					var plugin = this[k];
					if (plugin.statusChanged) {
						try {
							plugin.statusChanged(status, condition)
						} catch (err) {
							Strophe.error("" + k + " plugin caused an exception " + "changing status: " + err)
						}
					}
				}
			}
			if (this.connect_callback) {
				try {
					this.connect_callback(status, condition)
				} catch (e) {
					Strophe.error("User connection callback caused an " + "exception: " + e)
				}
			}
		},
		_buildBody: function() {
			var bodyWrap = $build('body', {
				rid: this.rid++,
				xmlns: Strophe.NS.HTTPBIND
			});
			if (this.sid !== null) {
				bodyWrap.attrs({
					sid: this.sid
				})
			}
			return bodyWrap
		},
		_removeRequest: function(req) {
			Strophe.debug("removing request");
			var i;
			for (i = this._requests.length - 1; i >= 0; i--) {
				if (req == this._requests[i]) {
					this._requests.splice(i, 1)
				}
			}
			req.xhr.onreadystatechange = function() {};
			this._throttledRequestHandler()
		},
		_restartRequest: function(i) {
			var req = this._requests[i];
			if (req.dead === null) {
				req.dead = new Date()
			}
			this._processRequest(i)
		},
		_processRequest: function(i) {
			var req = this._requests[i];
			var reqStatus = -1;
			try {
				if (req.xhr.readyState == 4) {
					reqStatus = req.xhr.status
				}
			} catch (e) {
				Strophe.error("caught an error in _requests[" + i + "], reqStatus: " + reqStatus)
			}
			if (typeof(reqStatus) == "undefined") {
				reqStatus = -1
			}
			var time_elapsed = req.age();
			var primaryTimeout = (!isNaN(time_elapsed) && time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait));
			var secondaryTimeout = (req.dead !== null && req.timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait));
			var requestCompletedWithServerError = (req.xhr.readyState == 4 && (reqStatus < 1 || reqStatus >= 500));
			if (primaryTimeout || secondaryTimeout || requestCompletedWithServerError) {
				if (secondaryTimeout) {
					Strophe.error("Request " + this._requests[i].id + " timed out (secondary), restarting")
				}
				req.abort = true;
				req.xhr.abort();
				req.xhr.onreadystatechange = function() {};
				this._requests[i] = new Strophe.Request(req.xmlData, req.origFunc, req.rid, req.sends);
				req = this._requests[i]
			}
			if (req.xhr.readyState === 0) {
				Strophe.debug("request id " + req.id + "." + req.sends + " posting");
				req.date = new Date();
				try {
					req.xhr.open("POST", this.service, true)
				} catch (e2) {
					Strophe.error("XHR open failed.");
					if (!this.connected) {
						this._changeConnectStatus(Strophe.Status.CONNFAIL, "bad-service")
					}
					this.disconnect();
					return
				}
				var sendFunc = function() {
						req.xhr.send(req.data)
					};
				if (req.sends > 1) {
					var backoff = Math.pow(req.sends, 3) * 1000;
					setTimeout(sendFunc, backoff)
				} else {
					sendFunc()
				}
				req.sends++;
				this.xmlOutput(req.xmlData);
				this.rawOutput(req.data)
			} else {
				Strophe.debug("_processRequest: " + (i === 0 ? "first" : "second") + " request has readyState of " + req.xhr.readyState)
			}
		},
		_throttledRequestHandler: function() {
			if (!this._requests) {
				Strophe.debug("_throttledRequestHandler called with " + "undefined requests")
			} else {
				Strophe.debug("_throttledRequestHandler called with " + this._requests.length + " requests")
			}
			if (!this._requests || this._requests.length === 0) {
				return
			}
			if (this._requests.length > 0) {
				this._processRequest(0)
			}
			if (this._requests.length > 1 && Math.abs(this._requests[0].rid - this._requests[1].rid) < this.window - 1) {
				this._processRequest(1)
			}
		},
		_onRequestStateChange: function(func, req) {
			Strophe.debug("request id " + req.id + "." + req.sends + " state changed to " + req.xhr.readyState);
			if (req.abort) {
				req.abort = false;
				return
			}
			var reqStatus;
			if (req.xhr.readyState == 4) {
				reqStatus = 0;
				try {
					reqStatus = req.xhr.status
				} catch (e) {}
				if (typeof(reqStatus) == "undefined") {
					reqStatus = 0
				}
				if (this.disconnecting) {
					if (reqStatus >= 400) {
						this._hitError(reqStatus);
						return
					}
				}
				var reqIs0 = (this._requests[0] == req);
				var reqIs1 = (this._requests[1] == req);
				if ((reqStatus > 0 && reqStatus < 500) || req.sends > 5) {
					this._removeRequest(req);
					Strophe.debug("request id " + req.id + " should now be removed")
				}
				if (reqStatus == 200) {
					if (reqIs1 || (reqIs0 && this._requests.length > 0 && this._requests[0].age() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait))) {
						this._restartRequest(0)
					}
					Strophe.debug("request id " + req.id + "." + req.sends + " got 200");
					func(req);
					this.errors = 0
				} else {
					Strophe.error("request id " + req.id + "." + req.sends + " error " + reqStatus + " happened");
					if (reqStatus === 0 || (reqStatus >= 400 && reqStatus < 600) || reqStatus >= 12000) {
						this._hitError(reqStatus);
						if (reqStatus >= 400 && reqStatus < 500) {
							this._changeConnectStatus(Strophe.Status.DISCONNECTING, null);
							this._doDisconnect()
						}
					}
				}
				if (!((reqStatus > 0 && reqStatus < 10000) || req.sends > 5)) {
					this._throttledRequestHandler()
				}
			}
		},
		_hitError: function(reqStatus) {
			this.errors++;
			Strophe.warn("request errored, status: " + reqStatus + ", number of errors: " + this.errors);
			if (this.errors > 4) {
				this._onDisconnectTimeout()
			}
		},
		_doDisconnect: function() {
			Strophe.info("_doDisconnect was called");
			this.authenticated = false;
			this.disconnecting = false;
			this.sid = null;
			this.streamId = null;
			this.rid = Math.floor(Math.random() * 4294967295);
			if (this.connected) {
				this._changeConnectStatus(Strophe.Status.DISCONNECTED, null);
				this.connected = false
			}
			this.handlers = [];
			this.timedHandlers = [];
			this.removeTimeds = [];
			this.removeHandlers = [];
			this.addTimeds = [];
			this.addHandlers = []
		},
		_dataRecv: function(req) {
			try {
				var elem = req.getResponse()
			} catch (e) {
				if (e != "parsererror") {
					throw e
				}
				this.disconnect("strophe-parsererror")
			}
			if (elem === null) {
				return
			}
			this.xmlInput(elem);
			this.rawInput(Strophe.serialize(elem));
			var i, hand;
			while (this.removeHandlers.length > 0) {
				hand = this.removeHandlers.pop();
				i = this.handlers.indexOf(hand);
				if (i >= 0) {
					this.handlers.splice(i, 1)
				}
			}
			while (this.addHandlers.length > 0) {
				this.handlers.push(this.addHandlers.pop())
			}
			if (this.disconnecting && this._requests.length === 0) {
				this.deleteTimedHandler(this._disconnectTimeout);
				this._disconnectTimeout = null;
				this._doDisconnect();
				return
			}
			var typ = elem.getAttribute("type");
			var cond, conflict;
			if (typ !== null && typ == "terminate") {
				cond = elem.getAttribute("condition");
				conflict = elem.getElementsByTagName("conflict");
				if (cond !== null) {
					if (cond == "remote-stream-error" && conflict.length > 0) {
						cond = "conflict"
					}
					this._changeConnectStatus(Strophe.Status.CONNFAIL, cond)
				} else {
					this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown")
				}
				this.disconnect();
				return
			}
			var self = this;
			Strophe.forEachChild(elem, null, function(child) {
				var i, newList;
				newList = self.handlers;
				self.handlers = [];
				for (i = 0; i < newList.length; i++) {
					var hand = newList[i];
					if (hand.isMatch(child) && (self.authenticated || !hand.user)) {
						if (hand.run(child)) {
							self.handlers.push(hand)
						}
					} else {
						self.handlers.push(hand)
					}
				}
			})
		},
		_sendTerminate: function() {
			Strophe.info("_sendTerminate was called");
			var body = this._buildBody().attrs({
				type: "terminate"
			});
			if (this.authenticated) {
				body.c('presence', {
					xmlns: Strophe.NS.CLIENT,
					type: 'unavailable'
				})
			}
			this.disconnecting = true;
			var req = new Strophe.Request(body.tree(), this._onRequestStateChange.bind(this).prependArg(this._dataRecv.bind(this)), body.tree().getAttribute("rid"));
			this._requests.push(req);
			this._throttledRequestHandler()
		},
		_connect_cb: function(req) {
			Strophe.info("_connect_cb was called");
			this.connected = true;
			var bodyWrap = req.getResponse();
			if (!bodyWrap) {
				return
			}
			this.xmlInput(bodyWrap);
			this.rawInput(Strophe.serialize(bodyWrap));
			var typ = bodyWrap.getAttribute("type");
			var cond, conflict;
			if (typ !== null && typ == "terminate") {
				cond = bodyWrap.getAttribute("condition");
				conflict = bodyWrap.getElementsByTagName("conflict");
				if (cond !== null) {
					if (cond == "remote-stream-error" && conflict.length > 0) {
						cond = "conflict"
					}
					this._changeConnectStatus(Strophe.Status.CONNFAIL, cond)
				} else {
					this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown")
				}
				return
			}
			if (!this.sid) {
				this.sid = bodyWrap.getAttribute("sid")
			}
			if (!this.stream_id) {
				this.stream_id = bodyWrap.getAttribute("authid")
			}
			var wind = bodyWrap.getAttribute('requests');
			if (wind) {
				this.window = parseInt(wind, 10)
			}
			var hold = bodyWrap.getAttribute('hold');
			if (hold) {
				this.hold = parseInt(hold, 10)
			}
			var wait = bodyWrap.getAttribute('wait');
			if (wait) {
				this.wait = parseInt(wait, 10)
			}
			var do_sasl_plain = false;
			var do_sasl_digest_md5 = false;
			var do_sasl_anonymous = false;
			var mechanisms = bodyWrap.getElementsByTagName("mechanism");
			var i, mech, auth_str, hashed_auth_str;
			if (mechanisms.length > 0) {
				for (i = 0; i < mechanisms.length; i++) {
					mech = Strophe.getText(mechanisms[i]);
					if (mech == 'DIGEST-MD5') {
						do_sasl_digest_md5 = true
					} else if (mech == 'PLAIN') {
						do_sasl_plain = true
					} else if (mech == 'ANONYMOUS') {
						do_sasl_anonymous = true
					}
				}
			} else {
				var body = this._buildBody();
				this._requests.push(new Strophe.Request(body.tree(), this._onRequestStateChange.bind(this).prependArg(this._connect_cb.bind(this)), body.tree().getAttribute("rid")));
				this._throttledRequestHandler();
				return
			}
			if (Strophe.getNodeFromJid(this.jid) === null && do_sasl_anonymous) {
				this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
				this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
				this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
				this.send($build("auth", {
					xmlns: Strophe.NS.SASL,
					mechanism: "ANONYMOUS"
				}).tree())
			} else if (Strophe.getNodeFromJid(this.jid) === null) {
				this._changeConnectStatus(Strophe.Status.CONNFAIL, 'x-strophe-bad-non-anon-jid');
				this.disconnect()
			} else if (do_sasl_digest_md5) {
				this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
				this._sasl_challenge_handler = this._addSysHandler(this._sasl_challenge1_cb.bind(this), null, "challenge", null, null);
				this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
				this.send($build("auth", {
					xmlns: Strophe.NS.SASL,
					mechanism: "DIGEST-MD5"
				}).tree())
			} else if (do_sasl_plain) {
				auth_str = Strophe.getBareJidFromJid(this.jid);
				auth_str = auth_str + "\u0000";
				auth_str = auth_str + Strophe.getNodeFromJid(this.jid);
				auth_str = auth_str + "\u0000";
				auth_str = auth_str + this.pass;
				this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
				this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
				this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
				hashed_auth_str = Base64.encode(auth_str);
				this.send($build("auth", {
					xmlns: Strophe.NS.SASL,
					mechanism: "PLAIN"
				}).t(hashed_auth_str).tree())
			} else {
				this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
				this._addSysHandler(this._auth1_cb.bind(this), null, null, null, "_auth_1");
				this.send($iq({
					type: "get",
					to: this.domain,
					id: "_auth_1"
				}).c("query", {
					xmlns: Strophe.NS.AUTH
				}).c("username", {}).t(Strophe.getNodeFromJid(this.jid)).tree())
			}
		},
		_sasl_challenge1_cb: function(elem) {
			var attribMatch = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/;
			var challenge = Base64.decode(Strophe.getText(elem));
			var cnonce = MD5.hexdigest(Math.random() * 1234567890);
			var realm = "";
			var host = null;
			var nonce = "";
			var qop = "";
			var matches;
			this.deleteHandler(this._sasl_failure_handler);
			while (challenge.match(attribMatch)) {
				matches = challenge.match(attribMatch);
				challenge = challenge.replace(matches[0], "");
				matches[2] = matches[2].replace(/^"(.+)"$/, "$1");
				switch (matches[1]) {
				case "realm":
					realm = matches[2];
					break;
				case "nonce":
					nonce = matches[2];
					break;
				case "qop":
					qop = matches[2];
					break;
				case "host":
					host = matches[2];
					break
				}
			}
			var digest_uri = "xmpp/" + this.domain;
			if (host !== null) {
				digest_uri = digest_uri + "/" + host
			}
			var A1 = MD5.hash(Strophe.getNodeFromJid(this.jid) + ":" + realm + ":" + this.pass) + ":" + nonce + ":" + cnonce;
			var A2 = 'AUTHENTICATE:' + digest_uri;
			var responseText = "";
			responseText += 'username=' + this._quote(Strophe.getNodeFromJid(this.jid)) + ',';
			responseText += 'realm=' + this._quote(realm) + ',';
			responseText += 'nonce=' + this._quote(nonce) + ',';
			responseText += 'cnonce=' + this._quote(cnonce) + ',';
			responseText += 'nc="00000001",';
			responseText += 'qop="auth",';
			responseText += 'digest-uri=' + this._quote(digest_uri) + ',';
			responseText += 'response=' + this._quote(MD5.hexdigest(MD5.hexdigest(A1) + ":" + nonce + ":00000001:" + cnonce + ":auth:" + MD5.hexdigest(A2))) + ',';
			responseText += 'charset="utf-8"';
			this._sasl_challenge_handler = this._addSysHandler(this._sasl_challenge2_cb.bind(this), null, "challenge", null, null);
			this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
			this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
			this.send($build('response', {
				xmlns: Strophe.NS.SASL
			}).t(Base64.encode(responseText)).tree());
			return false
		},
		_quote: function(str) {
			return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'
		},
		_sasl_challenge2_cb: function(elem) {
			this.deleteHandler(this._sasl_success_handler);
			this.deleteHandler(this._sasl_failure_handler);
			this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
			this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
			this.send($build('response', {
				xmlns: Strophe.NS.SASL
			}).tree());
			return false
		},
		_auth1_cb: function(elem) {
			var iq = $iq({
				type: "set",
				id: "_auth_2"
			}).c('query', {
				xmlns: Strophe.NS.AUTH
			}).c('username', {}).t(Strophe.getNodeFromJid(this.jid)).up().c('password').t(this.pass);
			if (!Strophe.getResourceFromJid(this.jid)) {
				this.jid = Strophe.getBareJidFromJid(this.jid) + '/strophe'
			}
			iq.up().c('resource', {}).t(Strophe.getResourceFromJid(this.jid));
			this._addSysHandler(this._auth2_cb.bind(this), null, null, null, "_auth_2");
			this.send(iq.tree());
			return false
		},
		_sasl_success_cb: function(elem) {
			Strophe.info("SASL authentication succeeded.");
			this.deleteHandler(this._sasl_failure_handler);
			this._sasl_failure_handler = null;
			if (this._sasl_challenge_handler) {
				this.deleteHandler(this._sasl_challenge_handler);
				this._sasl_challenge_handler = null
			}
			this._addSysHandler(this._sasl_auth1_cb.bind(this), null, "stream:features", null, null);
			this._sendRestart();
			return false
		},
		_sasl_auth1_cb: function(elem) {
			var i, child;
			for (i = 0; i < elem.childNodes.length; i++) {
				child = elem.childNodes[i];
				if (child.nodeName == 'bind') {
					this.do_bind = true
				}
				if (child.nodeName == 'session') {
					this.do_session = true
				}
			}
			if (!this.do_bind) {
				this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
				return false
			} else {
				this._addSysHandler(this._sasl_bind_cb.bind(this), null, null, null, "_bind_auth_2");
				var resource = Strophe.getResourceFromJid(this.jid);
				if (resource) {
					this.send($iq({
						type: "set",
						id: "_bind_auth_2"
					}).c('bind', {
						xmlns: Strophe.NS.BIND
					}).c('resource', {}).t(resource).tree())
				} else {
					this.send($iq({
						type: "set",
						id: "_bind_auth_2"
					}).c('bind', {
						xmlns: Strophe.NS.BIND
					}).tree())
				}
			}
			return false
		},
		_sasl_bind_cb: function(elem) {
			if (elem.getAttribute("type") == "error") {
				Strophe.info("SASL binding failed.");
				this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
				return false
			}
			var bind = elem.getElementsByTagName("bind");
			var jidNode;
			if (bind.length > 0) {
				jidNode = bind[0].getElementsByTagName("jid");
				if (jidNode.length > 0) {
					this.jid = Strophe.getText(jidNode[0]);
					if (this.do_session) {
						this._addSysHandler(this._sasl_session_cb.bind(this), null, null, null, "_session_auth_2");
						this.send($iq({
							type: "set",
							id: "_session_auth_2"
						}).c('session', {
							xmlns: Strophe.NS.SESSION
						}).tree())
					} else {
						this.authenticated = true;
						this._changeConnectStatus(Strophe.Status.CONNECTED, null)
					}
				}
			} else {
				Strophe.info("SASL binding failed.");
				this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
				return false
			}
		},
		_sasl_session_cb: function(elem) {
			if (elem.getAttribute("type") == "result") {
				this.authenticated = true;
				this._changeConnectStatus(Strophe.Status.CONNECTED, null)
			} else if (elem.getAttribute("type") == "error") {
				Strophe.info("Session creation failed.");
				this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
				return false
			}
			return false
		},
		_sasl_failure_cb: function(elem) {
			if (this._sasl_success_handler) {
				this.deleteHandler(this._sasl_success_handler);
				this._sasl_success_handler = null
			}
			if (this._sasl_challenge_handler) {
				this.deleteHandler(this._sasl_challenge_handler);
				this._sasl_challenge_handler = null
			}
			this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
			return false
		},
		_auth2_cb: function(elem) {
			if (elem.getAttribute("type") == "result") {
				this.authenticated = true;
				this._changeConnectStatus(Strophe.Status.CONNECTED, null)
			} else if (elem.getAttribute("type") == "error") {
				this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
				this.disconnect()
			}
			return false
		},
		_addSysTimedHandler: function(period, handler) {
			var thand = new Strophe.TimedHandler(period, handler);
			thand.user = false;
			this.addTimeds.push(thand);
			return thand
		},
		_addSysHandler: function(handler, ns, name, type, id) {
			var hand = new Strophe.Handler(handler, ns, name, type, id);
			hand.user = false;
			this.addHandlers.push(hand);
			return hand
		},
		_onDisconnectTimeout: function() {
			Strophe.info("_onDisconnectTimeout was called");
			var req;
			while (this._requests.length > 0) {
				req = this._requests.pop();
				req.abort = true;
				req.xhr.abort();
				req.xhr.onreadystatechange = function() {}
			}
			this._doDisconnect();
			return false
		},
		_onIdle: function() {
			var i, thand, since, newList;
			while (this.removeTimeds.length > 0) {
				thand = this.removeTimeds.pop();
				i = this.timedHandlers.indexOf(thand);
				if (i >= 0) {
					this.timedHandlers.splice(i, 1)
				}
			}
			while (this.addTimeds.length > 0) {
				this.timedHandlers.push(this.addTimeds.pop())
			}
			var now = new Date().getTime();
			newList = [];
			for (i = 0; i < this.timedHandlers.length; i++) {
				thand = this.timedHandlers[i];
				if (this.authenticated || !thand.user) {
					since = thand.lastCalled + thand.period;
					if (since - now <= 0) {
						if (thand.run()) {
							newList.push(thand)
						}
					} else {
						newList.push(thand)
					}
				}
			}
			this.timedHandlers = newList;
			var body, time_elapsed;
			if (this.authenticated && this._requests.length === 0 && this._data.length === 0 && !this.disconnecting) {
				Strophe.info("no requests during idle cycle, sending " + "blank request");
				this._data.push(null)
			}
			if (this._requests.length < 2 && this._data.length > 0 && !this.paused) {
				body = this._buildBody();
				for (i = 0; i < this._data.length; i++) {
					if (this._data[i] !== null) {
						if (this._data[i] === "restart") {
							body.attrs({
								to: this.domain,
								"xml:lang": "en",
								"xmpp:restart": "true",
								"xmlns:xmpp": Strophe.NS.BOSH
							})
						} else {
							body.cnode(this._data[i]).up()
						}
					}
				}
				delete this._data;
				this._data = [];
				this._requests.push(new Strophe.Request(body.tree(), this._onRequestStateChange.bind(this).prependArg(this._dataRecv.bind(this)), body.tree().getAttribute("rid")));
				this._processRequest(this._requests.length - 1)
			}
			if (this._requests.length > 0) {
				time_elapsed = this._requests[0].age();
				if (this._requests[0].dead !== null) {
					if (this._requests[0].timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) {
						this._throttledRequestHandler()
					}
				}
				if (time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait)) {
					Strophe.warn("Request " + this._requests[0].id + " timed out, over " + Math.floor(Strophe.TIMEOUT * this.wait) + " seconds since last activity");
					this._throttledRequestHandler()
				}
			}
			clearTimeout(this._idleTimeout);
			this._idleTimeout = setTimeout(this._onIdle.bind(this), 100)
		}
	};
	if (callback) {
		callback(Strophe, $build, $msg, $iq, $pres)
	}
})(function() {
	window.Strophe = arguments[0];
	window.$build = arguments[1];
	window.$msg = arguments[2];
	window.$iq = arguments[3];
	window.$pres = arguments[4]
});
(function(global) {
	var SETTIMEOUT = global.setTimeout,
		doc = global.document,
		callback_counter = 0;
	global.jXHR = function() {
		var script_url, script_loaded, jsonp_callback, scriptElem, publicAPI = null;

		function removeScript() {
			try {
				scriptElem.parentNode.removeChild(scriptElem)
			} catch (err) {}
		}
		function reset() {
			script_loaded = false;
			script_url = "";
			removeScript();
			scriptElem = null;
			fireReadyStateChange(0)
		}
		function ThrowError(msg) {
			try {
				publicAPI.onerror.call(publicAPI, msg, script_url)
			} catch (err) {}
		}
		function handleScriptLoad() {
			if ((this.readyState && this.readyState !== "complete" && this.readyState !== "loaded") || script_loaded) {
				return
			}
			this.onload = this.onreadystatechange = null;
			script_loaded = true;
			if (publicAPI.readyState !== 4) ThrowError("handleScriptLoad: Script failed to load [" + script_url + "].");
			removeScript()
		}
		function parseXMLString(xmlStr) {
			var xmlDoc = null;
			if (window.DOMParser) {
				var parser = new DOMParser();
				xmlDoc = parser.parseFromString(xmlStr, "text/xml")
			} else {
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = "false";
				xmlDoc.loadXML(xmlStr)
			}
			return xmlDoc
		}
		function fireReadyStateChange(rs, args) {
			args = args || [];
			publicAPI.readyState = rs;
			if (rs == 4) {
				publicAPI.responseText = args[0].reply;
				publicAPI.responseXML = parseXMLString(args[0].reply)
			}
			if (typeof publicAPI.onreadystatechange === "function") publicAPI.onreadystatechange.apply(publicAPI, args)
		}
		publicAPI = {
			onerror: null,
			onreadystatechange: null,
			readyState: 0,
			status: 200,
			responseBody: null,
			responseText: null,
			responseXML: null,
			open: function(method, url) {
				reset();
				var internal_callback = "cb" + (callback_counter++);
				(function(icb) {
					global.jXHR[icb] = function() {
						try {
							fireReadyStateChange.call(publicAPI, 4, arguments)
						} catch (err) {
							publicAPI.readyState = -1;
							ThrowError("Script failed to run [" + script_url + "].")
						}
						global.jXHR[icb] = null
					}
				})(internal_callback);
				script_url = url + '?callback=?jXHR&data=';
				script_url = script_url.replace(/=\?jXHR/, "=jXHR." + internal_callback);
				fireReadyStateChange(1)
			},
			send: function(data) {
				script_url = script_url + encodeURIComponent(data);
				SETTIMEOUT(function() {
					scriptElem = doc.createElement("script");
					scriptElem.setAttribute("type", "text/javascript");
					scriptElem.onload = scriptElem.onreadystatechange = function() {
						handleScriptLoad.call(scriptElem)
					};
					scriptElem.setAttribute("src", script_url);
					doc.getElementsByTagName("head")[0].appendChild(scriptElem)
				}, 0);
				fireReadyStateChange(2)
			},
			abort: function() {},
			setRequestHeader: function() {},
			getResponseHeader: function() {
				return ""
			},
			getAllResponseHeaders: function() {
				return []
			}
		};
		reset();
		return publicAPI
	}
})(window);
Strophe.addConnectionPlugin('jxhr', {
	init: function(s) {
		if (jXHR) {
			Strophe.Request.prototype._newXHR = function() {
				var xhr = new jXHR();
				xhr.onreadystatechange = this.func.prependArg(this);
				return xhr
			}
		} else {
			Strophe.error("jXHR plugin loaded, but jXHR not found." + "  Falling back to native XHR implementation.")
		}
	}
});

/* 弹出层函数调用 */
$(function() {
	/*//把自动弹框次数写入cookie
	var autoNoUse = getCookieVal("popUpNo");   //popUpNo为同一Domain下自动弹框次数
	//绑定自动弹框
	if(autoNoUse < 1){
	 	$("body").bind("mouseover", function() {
	 		var puTime = 60000;   //隔多长时间弹框
	 		setTimeout(function(){chatPopUp();$("body").unbind("mouseover");},puTime);
	 		$(this).keydown(function(event) {
	 			if (window.event.keyCode === 27) {
	 				$("body").unbind("mouseover");
	 			}
	 		});
	 		$("body").unbind("mouseover");
	 		//判断是否设置了过期时间			
	 		if (jzExpireDays > 0) {
	 			document.cookie = "popUpNo=1; expires="+date.toGMTString();
	 		} else {
	 			document.cookie = "popUpNo=1";
	 		}
	 	});	
		$("body").trigger("mouseover");
	}*/
	// 体验版自动弹框
	if($("#chatBtn4").length > 0) {
		var autoNoUse = getCookieVal("popUpNo");
		if(autoNoUse < 1){
	 		var puTime = 60000;   //隔多长时间弹框
	 		setTimeout(function(){JZIM.chatPopUp();},puTime);
	 		setCookieVal("popUpNo", 1, 1);
		}
	}
	// 点击按钮弹框
    $("#chatBtn").live("click", function() {
        JZIM.chatPopUp();
    });
	$("#chatBtn2").live("click", function() {
        JZIM.chatPopUp();
    });
    $("#chatBtn3").live("click", function() {
        JZIM.chatPopUp();
    });
    $("#chatBtn4").live("click", function() {
        JZIM.chatPopUp();
    });
});