define("lib/overlay/1.1.3/mask",["$","./overlay","lib/position/1.0.1/position","lib/iframe-shim/1.0.2/iframe-shim","lib/widget/1.1.1/widget","lib/base/1.1.1/base","lib/class/1.1.0/class","lib/events/1.1.0/events"],function(a,b,c){var d=a("$"),e=a("./overlay"),f=(window.navigator.userAgent||"").toLowerCase(),g=-1!==f.indexOf("msie 6"),h=d(document.body),i=d(document),j=e.extend({attrs:{width:g?i.outerWidth(!0):"100%",height:g?i.outerHeight(!0):"100%",className:"ui-mask",opacity:.2,backgroundColor:"#000",style:{position:g?"absolute":"fixed",top:0,left:0},align:{baseElement:g?h:void 0}},show:function(){return g&&(this.set("width",i.outerWidth(!0)),this.set("height",i.outerHeight(!0))),j.superclass.show.call(this)},_onRenderBackgroundColor:function(a){this.element.css("backgroundColor",a)},_onRenderOpacity:function(a){this.element.css("opacity",a)}});c.exports=new j}),define("lib/overlay/1.1.3/overlay",["$","lib/position/1.0.1/position","lib/iframe-shim/1.0.2/iframe-shim","lib/widget/1.1.1/widget","lib/base/1.1.1/base","lib/class/1.1.0/class","lib/events/1.1.0/events"],function(a,b,c){function d(a){return g.contains(document.documentElement,a)}function e(a){g(k.blurOverlays).each(function(b,c){if(c&&c.get("visible")){for(var d=0;d<c._relativeElements.length;d++){var e=g(c._relativeElements[d])[0];if(e===a.target||g.contains(e,a.target))return}c.hide()}})}function f(a,b){for(var c=0;c<b.length;c++)if(a===b[c])return b.splice(c,1),b}var g=a("$"),h=a("lib/position/1.0.1/position"),i=a("lib/iframe-shim/1.0.2/iframe-shim"),j=a("lib/widget/1.1.1/widget"),k=j.extend({attrs:{width:null,height:null,zIndex:99,visible:!1,align:{selfXY:[0,0],baseElement:h.VIEWPORT,baseXY:[0,0]},parentNode:document.body},show:function(){return this.rendered||this.render(),this.set("visible",!0),this},hide:function(){return this.set("visible",!1),this},setup:function(){var a=this;this._setupShim(),this._setupResize(),this.after("show",function(){a._setPosition()})},destroy:function(){return f(this,k.allOverlays),f(this,k.blurOverlays),k.superclass.destroy.call(this)},_setPosition:function(a){if(d(this.element[0])&&(a||(a=this.get("align")),a)){var b="none"===this.element.css("display");return b&&this.element.css({visibility:"hidden",display:"block"}),h.pin({element:this.element,x:a.selfXY[0],y:a.selfXY[1]},{element:a.baseElement,x:a.baseXY[0],y:a.baseXY[1]}),b&&this.element.css({visibility:"",display:"none"}),this}},_setupShim:function(){var a=new i(this.element);this.after("hide _setPosition",a.sync,a);var b=["width","height"];for(var c in b)b.hasOwnProperty(c)&&this.on("change:"+c,a.sync,a);this.before("destroy",a.destroy,a)},_setupResize:function(){k.allOverlays.push(this)},_blurHide:function(a){a=g.makeArray(a),a.push(this.element),this._relativeElements=a,k.blurOverlays.push(this)},_onRenderWidth:function(a){this.element.css("width",a)},_onRenderHeight:function(a){this.element.css("height",a)},_onRenderZIndex:function(a){this.element.css("zIndex",a)},_onRenderAlign:function(a){this._setPosition(a)},_onRenderVisible:function(a){this.element[a?"show":"hide"]()}});k.blurOverlays=[],g(document).on("click",function(a){e(a)});var l,m=g(window).width(),n=g(window).height();k.allOverlays=[],g(window).resize(function(){l&&clearTimeout(l),l=setTimeout(function(){var a=g(window).width(),b=g(window).height();(m!==a||n!==b)&&g(k.allOverlays).each(function(a,b){b&&b.get("visible")&&b._setPosition()}),m=a,n=b},80)}),c.exports=k});
